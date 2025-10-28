'use client';

import { useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/">
                <Image
                  src="/tim_signature_white.svg"
                  alt="Tim Watts"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-white hover:text-gray-300 transition-colors">Home</a>
              <a href="/gallery" className="text-white hover:text-gray-300 transition-colors">Gallery</a>
              <a href="/about" className="text-white hover:text-gray-300 transition-colors">About Me</a>
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
                  href="/" 
                  className="block px-3 py-2 text-white hover:text-gray-300 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="/gallery" 
                  className="block px-3 py-2 text-white hover:text-gray-300 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </a>
                <a 
                  href="/about" 
                  className="block px-3 py-2 text-white hover:text-gray-300 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Me
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
    </>
  );
}