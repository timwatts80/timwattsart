'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface CommissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

function CommissionForm({ isOpen, onClose }: CommissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://formspree.io/f/xdkobjwq', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-black">Commission a Piece</h2>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2 text-black">Thank you!</h3>
            <p className="text-gray-600 mb-4">Your commission request has been received. I'll get back to you within 24-48 hours.</p>
            <button
              onClick={onClose}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="project" className="block text-sm font-medium text-black mb-1">Project Description</label>
              <textarea
                id="project"
                name="project"
                rows={4}
                required
                placeholder="Tell me about your vision..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-black mb-1">Timeline</label>
              <select
                id="timeline"
                name="timeline"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select timeline</option>
                <option value="flexible">Flexible</option>
                <option value="1-2 months">1-2 months</option>
                <option value="2-3 months">2-3 months</option>
                <option value="3+ months">3+ months</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-black mb-1">Budget Range</label>
              <select
                id="budget"
                name="budget"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select budget</option>
                <option value="under-500">Under $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500+">$2,500+</option>
              </select>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function About() {
  const [showCommissionForm, setShowCommissionForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img 
                  src="/tim_signature_white.svg" 
                  alt="Tim Watts" 
                  className="h-12 w-auto"
                />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="/#home" className="text-white hover:text-gray-300 transition-colors">Home</a>
              <a href="/about" className="text-white hover:text-gray-300 transition-colors">About</a>
              <a href="/links" className="text-white hover:text-gray-300 transition-colors">Links</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md border-t border-gray-800">
                <a 
                  href="/#home" 
                  className="block px-3 py-2 text-white hover:text-gray-300 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="/about" 
                  className="block px-3 py-2 text-white hover:text-gray-300 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="/links" 
                  className="block px-3 py-2 text-white hover:text-gray-300 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Links
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 pt-24 lg:pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              They call it chaos. I call it home.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              My work lives in the tension between disorder and harmony, where thousands of lines converge into form, depth, and meaning. Each piece is both a meditation and an exploration — a way of capturing human emotion in its raw, layered complexity.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-80 h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/SLC_Trish_Headshot_250919 1.jpg"
                alt="Portrait of Tim Watts in the studio"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Who I Am Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Who I Am</h2>
        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
          <p>
            I'm Tim Watts, a professional artist with a 20-year background in design and visual storytelling. After years working in digital and commercial design, I returned to my roots in traditional media — pen, ink, and graphite — to create works that are unapologetically human.
          </p>
          <p>
            My style, which I call Neurolinealism, reflects both my personal journey and my fascination with how order emerges from chaos. Each line is intentional, yet unpredictable — just like the experiences that shape us.
          </p>
        </div>
      </div>

      {/* What I Create Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">What I Create</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Original Works</h3>
            <p className="text-gray-300">
              Large-scale pieces that embody depth and presence.
            </p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Fine Art Prints</h3>
            <p className="text-gray-300">
              Museum-quality reproductions, crafted for collectors who want lasting pieces in their homes.
            </p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Commissions</h3>
            <p className="text-gray-300">
              Personalized works created in collaboration with clients, designed to capture their vision through my unique artistic lens.
            </p>
          </div>
        </div>
      </div>

      {/* Why I Create Section */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Why I Create</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Art is more than a product — it's a dialogue between artist and viewer. My goal is to create pieces that don't just hang on a wall, but live in the spaces where people reflect, feel, and connect.
        </p>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/#gallery"
            className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors duration-300 flex-1 sm:flex-none"
          >
            View the Collection →
          </Link>
          <button
            onClick={() => setShowCommissionForm(true)}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-white hover:text-black transition-all duration-300 flex-1 sm:flex-none"
          >
            Commission a Piece →
          </button>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
            <p className="text-gray-300 italic">
              "Tim's work transforms any space into something deeply personal and meaningful."
            </p>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
            <p className="text-gray-300 italic">
              "The intricate detail and emotional depth in each piece makes it impossible to look away."
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-8">
          <div className="border-b border-gray-700 pb-6">
            <h3 className="text-xl font-semibold mb-3">How long does a commission take?</h3>
            <p className="text-gray-300">
              Most commissioned pieces are completed within 2-4 weeks, depending on size and complexity.
            </p>
          </div>
          <div className="border-b border-gray-700 pb-6">
            <h3 className="text-xl font-semibold mb-3">What do you need to get started?</h3>
            <p className="text-gray-300">
              Just your vision and any reference materials that inspire you — I'll guide you through the rest.
            </p>
          </div>
          <div className="pb-6">
            <h3 className="text-xl font-semibold mb-3">What sizes and framing options are available?</h3>
            <p className="text-gray-300">
              Commissions range from 12"×16" to large-scale works, with professional framing available upon request.
            </p>
          </div>
        </div>
      </div>

      {/* Commission Form Modal */}
      <CommissionForm 
        isOpen={showCommissionForm}
        onClose={() => setShowCommissionForm(false)}
      />
    </div>
  );
}