'use client';

/**
 * ORIENTATION SECTION — Gallery Wall Text Aesthetic
 * 
 * Design Strategy:
 * - Asymmetric, architectural composition
 * - Overscaled artwork fragment extending beyond viewport
 * - Editorial body text as continuous prose
 * - Minimal infrastructural label
 * - Active negative space with diagonal eye movement
 * - Gallery white cube materiality
 */

export default function OrientationSection() {
  return (
    <section 
      id="orientation" 
      className="relative overflow-hidden bg-[#FAFAFA]"
    >
      {/* Overscaled artwork field — extends beyond viewport */}
      <div className="absolute -right-[15%] top-[8%] w-[55%] h-[85%] pointer-events-none hidden lg:block">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{ 
            backgroundImage: 'url(/images/TIM_IMG_003.png)',
            transform: 'scale(1.4) rotate(-3deg)',
            filter: 'saturate(0.6)'
          }}
        />
      </div>

      {/* Main spatial container */}
      <div className="relative min-h-screen">
        <div className="max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-20 xl:px-28 py-32 lg:py-48">
          
          {/* Orientation label — small, utilitarian, offset */}
          <div className="mb-20 lg:mb-32 lg:ml-[8%]">
            <span className="text-[0.6875rem] tracking-[0.25em] uppercase text-neutral-400 font-light">
              ORIENTATION
            </span>
          </div>

          {/* Editorial text block — positioned left, away from artwork */}
          <div className="lg:ml-[8%] lg:mr-[52%]">
            <div className="max-w-[620px]">
              <p className="text-[1.0625rem] leading-[1.85] tracking-[0.002em] text-neutral-700 font-light">
                Art doesn't need to be impressive, expressive, or resolved to be meaningful. In this space, it's used as a way of staying with what's present rather than shaping it into output, identity, or improvement. The work here isn't about mastery or interpretation, but about attention — and what becomes possible when attention is allowed to settle without expectation.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle paper texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />
    </section>
  );
}
