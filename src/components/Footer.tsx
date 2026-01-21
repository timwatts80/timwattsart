'use client';

import { useState } from 'react';
import CommissionForm from './CommissionForm';

export default function Footer() {
  const [showCommissionForm, setShowCommissionForm] = useState(false);
  const [thumbAnimation, setThumbAnimation] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleThumbClick = () => {
    setThumbAnimation(true);
    setTimeout(() => setThumbAnimation(false), 600);
    setShowPopover(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/website-interest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail('');
        setValidationMessage({ type: 'success', text: "Awesome! I'll be in touch." });
        setTimeout(() => {
          setValidationMessage(null);
          setShowPopover(false);
        }, 10000);
      } else {
        setValidationMessage({ type: 'error', text: 'Something went wrong. Please email me directly at info@timwatts.art' });
        setTimeout(() => {
          setValidationMessage(null);
          setShowPopover(false);
        }, 10000);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setValidationMessage({ type: 'error', text: 'Something went wrong. Please email me directly at info@timwatts.art' });
      setTimeout(() => {
        setValidationMessage(null);
        setShowPopover(false);
      }, 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <img 
                src="/tim_signature_white.svg" 
                alt="Tim Watts" 
                className="h-20 w-auto mb-4"
              />
              <p className="text-gray-300 max-w-md leading-relaxed mb-4">
                Contemporary artist working with attention, process, and form.
              </p>
              
              {!showPopover ? (
                <div className="relative inline-block">
                  <p className="inline">
                    If you like my website, let me know.
                  </p>
                  <button
                    onClick={handleThumbClick}
                    className="relative inline-flex items-center ml-2 text-gray-300 hover:text-white transition-colors bg-white bg-opacity-20 rounded-full p-2"
                    aria-label="Like"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    
                    {/* Animated thumb overlay */}
                    {thumbAnimation && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 pointer-events-none">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="#fbbf24"
                          stroke="#fbbf24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="drop-shadow-2xl"
                          style={{
                            animation: 'thumbBounce 0.6s ease-out'
                          }}
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <div className="max-w-sm relative">
                  {!validationMessage ? (
                    <>
                      <button
                        onClick={() => setShowPopover(false)}
                        className="absolute -top-3 -right-3 text-gray-400 hover:text-white transition-colors bg-white rounded-full bg-opacity-20"
                        aria-label="Close"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </button>
                      <label className="block text-gray-300 text-sm mb-2">
                        Thanks! I can build you one. Interested?
                      </label>
                      <form onSubmit={handleEmailSubmit} className="flex gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          disabled={isSubmitting}
                          className="flex-1 px-3 py-2 text-sm bg-white text-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-white text-black px-4 py-2 text-sm rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Sending...' : 'Send'}
                        </button>
                      </form>
                    </>
                  ) : (
                    <p className={`text-sm ${validationMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {validationMessage.text}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Column */}
            <div>
              <h3 className="text-white font-medium mb-4">Navigation</h3>
              <ul className="space-y-3">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="/gallery" className="text-gray-300 hover:text-white transition-colors">Work</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Me</a></li>
                <li><a href="/links" className="text-gray-300 hover:text-white transition-colors">Links</a></li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h3 className="text-white font-medium mb-4">Connect</h3>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/timwattsartgallery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/timwatts.art/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a 
                  href="https://www.tiktok.com/@timwatts.art" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Tim Watts. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Commission Form Modal */}
      <CommissionForm 
        isOpen={showCommissionForm}
        onClose={() => setShowCommissionForm(false)}
      />

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes thumbBounce {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}