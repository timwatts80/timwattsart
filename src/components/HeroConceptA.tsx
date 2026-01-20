'use client';

/**
 * CONCEPT A — "QUIET DEPTH"
 * 
 * Emotional Entry: Inward, contemplative, almost private
 * 
 * Design Intention:
 * The visitor has already been exhausted by noise.
 * They've already tried improvement.
 * They've already learned the language of healing.
 * 
 * This hero doesn't greet them — it simply makes space.
 * 
 * Visual: Single abstract artwork, barely visible
 * Mood: A quiet studio, late afternoon, dust in the light
 */

export default function HeroConceptA() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-end lg:items-center"
    >
      {/* Atmospheric Artwork — Presence Without Demand */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 
          Single artwork, abstract/ambiguous, positioned off-center
          Low opacity creates atmosphere, not content
          The work is felt more than seen
        */}
        <div 
          className="absolute -right-[10%] top-[15%] w-[70%] h-[70%] bg-contain bg-no-repeat bg-right opacity-[0.06]"
          style={{ backgroundImage: 'url(/images/TIM_IMG_003.png)' }}
        />
        
        {/* Soft warm wash — late afternoon light quality */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white/95 to-stone-100/40" />
        
        {/* Subtle grain texture — analog, handmade quality */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }}
        />
      </div>
      
      {/* Content — Asymmetric, Placed Not Centered */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 pb-24 lg:pb-0">
        <div className="lg:max-w-xl">
          
          {/* Headline — Quiet, Left-Aligned, Unhurried */}
          <h1 className="font-serif text-[1.75rem] sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-light leading-[1.35] tracking-[-0.015em] text-neutral-800">
            This isn't about making better art.
          </h1>
          
          {/* Long Vertical Pause — Slower Than Expected */}
          <div className="h-12 sm:h-16 lg:h-20" aria-hidden="true" />
          
          {/* Subhead — Softer Weight, Generous Line Height */}
          <div className="space-y-5 lg:space-y-6">
            <p className="font-sans text-base sm:text-lg lg:text-xl font-light leading-[1.8] text-neutral-500 max-w-md">
              This is a space where art is used to reconnect, not perform.
            </p>
            <p className="font-sans text-base sm:text-lg lg:text-xl font-light leading-[1.8] text-neutral-400 max-w-md">
              Where creativity doesn't need productivity, healing, or improvement to matter.
            </p>
          </div>
          
          {/* Extended Breath — Deliberate Slowness */}
          <div className="h-20 sm:h-24 lg:h-32" aria-hidden="true" />
          
          {/* CTA — Nearly Whispered */}
          <a 
            href="#gallery-preview"
            className="group inline-flex items-center gap-3 text-neutral-400 hover:text-neutral-600 transition-colors duration-700"
          >
            <span className="text-sm sm:text-base font-light tracking-[0.02em]">
              Stay here for a moment
            </span>
            <svg 
              className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 group-hover:translate-y-0.5 transition-all duration-700" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          
        </div>
      </div>
      
      {/* Bottom Gradient — Dissolve Into Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
