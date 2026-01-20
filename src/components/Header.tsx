'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation — Minimal, Non-Intrusive */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 ${scrolled || mobileMenuOpen ? 'backdrop-blur-sm border-b border-neutral-800' : ''} ${className}`}
        style={{
          backgroundColor: scrolled || mobileMenuOpen ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.65)',
          transition: 'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/">
                <Image
                  src={"/images/tim_signature_white.svg"}
                  alt="Tim Watts"
                  width={120}
                  height={40}
                  className="h-8 lg:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
            
            {/* Desktop Navigation — Understated */}
            <div className="hidden md:flex space-x-10">
              <a href="/" className={`text-sm tracking-wide transition-colors ${
                'text-neutral-300 hover:text-white'
              }`}>Home</a>
              <a href="/gallery" className={`text-sm tracking-wide transition-colors ${
                'text-neutral-300 hover:text-white'
              }`}>Work</a>
              <a href="https://www.artriot.live" target="_blank" rel="noopener noreferrer" className={`text-sm tracking-wide transition-colors ${
                'text-neutral-300 hover:text-white'
              }`}>Art Riot</a>
              <a href="/about" className={`text-sm tracking-wide transition-colors ${
                'text-neutral-300 hover:text-white'
              }`}>About</a>
              <a href="/links" className={`text-sm tracking-wide transition-colors ${
                'text-neutral-300 hover:text-white'
              }`}>Links</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`focus:outline-none p-2 transition-colors ${
                  'text-neutral-300 hover:text-white'
                }`}
                aria-label="Toggle menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu — Clean, Spacious */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className={`px-2 pt-4 pb-6 space-y-1 bg-transparent`}>
                <a 
                  href="/" 
                  className={`block px-4 py-3 transition-colors text-base ${
                    'text-neutral-300 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="/gallery" 
                  className={`block px-4 py-3 transition-colors text-base ${
                    'text-neutral-300 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Work
                </a>
                <a 
                  href="https://www.artriot.live" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block px-4 py-3 transition-colors text-base ${
                    'text-neutral-300 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Art Riot
                </a>
                <a 
                  href="/about" 
                  className={`block px-4 py-3 transition-colors text-base ${
                    'text-neutral-300 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="/links" 
                  className={`block px-4 py-3 transition-colors text-base ${
                    'text-neutral-300 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Links
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}