'use client';

import Image from 'next/image';
import StaticNebulaBackground from './StaticNebulaBackground';

/**
 * CONCEPT B — "GROUNDED CONTACT"
 * 
 * Emotional Entry: Relational, human, present-moment
 * 
 * Design Intention:
 * The visitor is curious but cautious.
 * They're drawn to people more than ideas.
 * They're looking for sincerity rather than depth signaling.
 * 
 * This hero acknowledges their presence without assessing them.
 * 
 * Visual: Split layout with human element or grounded artwork
 * Mood: Standing in a doorway, being noticed without being assessed
 */

export default function HeroConceptB() {
  return (
    <section 
      id="home" 
      className="relative"
    >
      {/* Split Layout Container */}
      <div className="relative flex flex-col lg:flex-row">
        
        {/* Left Side — Visual Anchor */}
        <div className="relative lg:w-1/2 h-[50vh] lg:h-screen order-1 lg:order-1">
          {/* 
            Human presence or grounded artwork
            Using portrait that feels unposed, candid, present
            The image creates contact, not performance
          */}
          <div 
            className="absolute inset-0 bg-cover bg-top"
            style={{ backgroundImage: 'url(/images/tw-68.jpg)', backgroundPosition: '0% 30%' }}
          />
          
          {/* Soft overlay — reduces contrast, creates gentleness */}
          <div className="absolute inset-0 bg-stone-100/20" />
        </div>
        
        {/* Right Side — Text Content */}
        <div className="relative lg:w-1/2 flex items-center order-2 lg:order-2 bg-white overflow-hidden">
          {/* Static Nebula Background */}
          <StaticNebulaBackground lineCount={15} />
          {/* Light filter overlay */}
          <div className="absolute inset-0 bg-white/75 z-[1]"></div>
          
          <div className="relative z-10 w-full px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-0">
            
            {/* Content Block — Clear Hierarchy, Grounded */}
            <div className="max-w-lg">
              
              {/* Headline — Present, Direct, Warm */}
              <h1 className="text-[1.875rem] sm:text-3xl lg:text-4xl xl:text-[2.625rem] font-light leading-[1.25] tracking-[-0.01em] text-neutral-900">
                This isn't about making better art.
              </h1>
              
              {/* Moderate Pause — Enough to Breathe, Not Drift */}
              <div className="h-8 sm:h-10 lg:h-12" aria-hidden="true" />
              
              {/* Subhead — Grounded, Readable, Human Scale */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg lg:text-xl font-normal leading-[1.75] text-neutral-600">
                  This is a space where art is used to reconnect, not perform.
                </p>
                <p className="text-base sm:text-lg lg:text-xl font-normal leading-[1.75] text-neutral-500">
                  Where creativity doesn't need productivity, healing, or improvement to matter.
                </p>
              </div>
              
              {/* Clear Pause Before Action */}
              <div className="h-12 sm:h-14 lg:h-16" aria-hidden="true" />
              
              {/* CTA — Grounded, Present, Unhurried */}
              <a 
                href="#on-the-work"
                className="group inline-flex items-center gap-2.5 text-neutral-600 hover:text-neutral-800 transition-colors duration-500"
              >
                <span className="text-base font-normal tracking-normal border-b border-neutral-300 group-hover:border-neutral-500 pb-0.5 transition-colors duration-500">
                  Stay here for a moment
                </span>
                <svg 
                  className="w-4 h-4 opacity-50 group-hover:opacity-80 group-hover:translate-y-0.5 transition-all duration-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              
            </div>
          </div>
        </div>
        
        {/* Signature Overlay - Centered across entire screen */}
        <div className="absolute inset-0 flex justify-center items-start pt-[calc(50vh-80px)] lg:items-center lg:pt-0 pointer-events-none z-40">
          <Image
            src="/images/tim_signature_black.svg"
            alt="Tim Watts signature"
            width={100}
            height={48}
            className="opacity-90 lg:w-[200px] lg:h-[200px]"
          />
        </div>
        
      </div>
    </section>
  );
}
