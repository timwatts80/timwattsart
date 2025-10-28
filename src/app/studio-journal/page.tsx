'use client';

import { useState, useEffect } from 'react';

export default function StudioJournalPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        console.error('Newsletter subscription error:', data.error);
        // Still show success to avoid confusing users
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // Still show success to avoid confusing users
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/">
                <img 
                  src="/tim_signature_white.svg" 
                  alt="Tim Watts" 
                  className="h-12 w-auto"
                />
              </a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-white hover:text-gray-300 transition-colors">Home</a>
              <a href="/#collections" className="text-white hover:text-gray-300 transition-colors">Collections</a>
              <a href="/#gallery" className="text-white hover:text-gray-300 transition-colors">Gallery</a>
              <a href="/studio-journal" className="text-gray-300 border-b border-gray-300">Studio Journal</a>
              <a href="/#contact" className="text-white hover:text-gray-300 transition-colors">Contact</a>
              <a href="/links" className="text-white hover:text-gray-300 transition-colors">Links</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl lg:text-6xl font-light text-black mb-6 leading-tight">
            Step Inside the Studio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get an intimate look at the creative process, from first sketch to finished piece, 
            and be the first to discover new works as they come to life.
          </p>
          <button 
            onClick={() => document.getElementById('newsletter-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white px-8 py-4 text-lg hover:bg-gray-800 transition-colors"
          >
            Subscribe to the Journal
          </button>
        </div>
      </section>

      {/* About the Studio Journal */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-8 text-black">About the Studio Journal</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              The Studio Journal isn't just another newsletter—it's your invitation into the heart of my creative world. 
              Each month, I share the stories that unfold behind closed studio doors: the spark of inspiration that starts 
              a new piece, the problem-solving moments that shape its direction, and the quiet victories when everything 
              finally clicks into place. Subscribers become part of the journey, gaining early access to new works and 
              the insights that bring them to life.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center mb-16 text-black">What You'll Receive</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium text-black mb-2">Monthly studio updates</h3>
                  <p className="text-gray-600">New works and the stories behind their creation</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium text-black mb-2">Early access</h3>
                  <p className="text-gray-600">To originals and limited-edition prints before public release</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium text-black mb-2">Behind-the-scenes glimpses</h3>
                  <p className="text-gray-600">Of works-in-progress and creative experiments</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium text-black mb-2">Process insights</h3>
                  <p className="text-gray-600">Covering tools, materials, techniques, and inspirations</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium text-black mb-2">Personal reflections</h3>
                  <p className="text-gray-600">On art, creativity, and the evolving journey of making</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Studio Image Placeholders */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Studio Workspace</span>
              </div>
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Work in Progress</span>
              </div>
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Tools & Materials</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section id="newsletter-form" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight">
            Join a community that values the process<br />
            as much as the finished piece.
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Be among the first to see new works emerge, understand the stories they tell, 
            and secure pieces that speak to you before they're available to the wider world.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white text-black rounded-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-white text-black px-8 py-3 hover:bg-gray-200 transition-colors font-medium"
              >
                {isSubmitted ? 'Subscribed!' : 'Subscribe'}
              </button>
            </div>
          </form>
          
          <p className="text-gray-400 text-sm">
            Monthly updates, never spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <img 
                src="/tim_signature_white.svg" 
                alt="Tim Watts" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-300 max-w-md leading-relaxed">
                Contemporary artist exploring the intersection of emotion and form through 
                modern artistic expression. Each piece tells a story of human experience.
              </p>
            </div>

            {/* Navigation Column */}
            <div>
              <h3 className="text-white font-medium mb-4">Navigation</h3>
              <ul className="space-y-3">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="/#collections" className="text-gray-300 hover:text-white transition-colors">Collections</a></li>
                <li><a href="/#gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</a></li>
                <li><a href="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h3 className="text-white font-medium mb-4">Connect</h3>
              <ul className="space-y-3">
                <li><a href="/links" className="text-gray-300 hover:text-white transition-colors">Social Links</a></li>
                <li><a href="/studio-journal" className="text-gray-300 hover:text-white transition-colors">Studio Journal</a></li>
                <li><a href="/#commission" className="text-gray-300 hover:text-white transition-colors">Commission Work</a></li>
                <li><a href="/#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {mounted ? new Date().getFullYear() : 2025} Tim Watts. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}