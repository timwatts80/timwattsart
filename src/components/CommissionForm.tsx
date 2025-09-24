'use client';

import { useState } from 'react';

interface CommissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommissionForm({ isOpen, onClose }: CommissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xyznyrbg', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
        }, 2000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>

          <div className="p-8">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-light mb-2">Commission Inquiry</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Tell me about your vision and I'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="form-input"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="project" className="form-label">
                      Project Type
                    </label>
                    <select
                      id="project"
                      name="project"
                      required
                      className="form-input"
                    >
                      <option value="">Select project type</option>
                      <option value="original">Original Artwork</option>
                      <option value="print">Custom Print</option>
                      <option value="series">Series Commission</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">
                      Tell me about your vision
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="form-input"
                      placeholder="Size, style, colors, timeline, budget range..."
                    />
                  </div>

                  {/* Hidden field for form identification */}
                  <input type="hidden" name="_subject" value="New Commission Inquiry from timwatts.art" />
                  
                  {error && (
                    <div className="text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-secondary flex-1"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-light mb-2">Message Sent!</h3>
                <p className="text-gray-600 text-sm">
                  Thank you for your interest. I'll respond within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}