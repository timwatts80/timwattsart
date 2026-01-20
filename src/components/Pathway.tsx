'use client';

import { useEffect, useRef, useState } from 'react';

function TitleDecoration({ seed = 0 }: { seed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Calculate scroll progress (0 to 1)
          const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
          setScrollProgress(progress);
          ticking = false;
        });

        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 180 * dpr;
    canvas.height = 32 * dpr;
    canvas.style.width = '180px';
    canvas.style.height = '32px';
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, 180, 32);

    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Random function seeded
    const random = (min: number, max: number, offset: number) => {
      const x = Math.sin(seed * 12.9898 + offset * 78.233) * 43758.5453;
      return min + (x - Math.floor(x)) * (max - min);
    };

    // Draw squiggly line with optional progress limit
    const drawSquigglyLine = (startX: number, startY: number, endX: number, lineSeed: number, opacity: number, maxProgress = 1) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(163, 163, 163, ${opacity})`;
      ctx.moveTo(startX, startY);

      const segments = 20;
      const totalLength = endX - startX;
      const drawLength = totalLength * maxProgress;
      const segmentLength = drawLength / segments;
      const freq1 = random(0.5, 1.5, lineSeed);
      const freq2 = random(0.8, 2.2, lineSeed + 1);
      const amp1 = random(2.5, 4.0, lineSeed + 2);
      const amp2 = random(1.8, 3.2, lineSeed + 3);

      for (let i = 0; i <= segments; i++) {
        const x = startX + i * segmentLength;
        const segmentRatio = (i * segmentLength) / totalLength;
        const variation = Math.sin(segmentRatio * segments * freq1 + lineSeed) * amp1 + Math.cos(segmentRatio * segments * freq2 + lineSeed * 2) * amp2;
        const y = startY + variation;
        ctx.lineTo(x, y);
      }

      ctx.stroke();
    };

    const shortLength = random(90, 120, 1);
    const mediumLength = random(130, 155, 2);
    const longLength = random(180, 220, 3);
    const line1Y = random(14, 16, 4);
    const line2Y = random(15, 17, 5);
    const line3Y = random(16, 18, 6);
    const seed1 = random(1, 5, 7);
    const seed2 = random(6, 10, 8);
    const seed3 = random(11, 15, 9);

    // Draw all lines with scroll-triggered animation
    const drawProgress = Math.max(0, Math.min(1, scrollProgress * 2)); // Draw during first half of scroll
    drawSquigglyLine(0, line1Y, shortLength, seed1, 0.4, drawProgress);
    drawSquigglyLine(3, line2Y, mediumLength, seed2, 0.7, drawProgress);
    drawSquigglyLine(5, line3Y, longLength, seed3, 1.0, drawProgress);
  }, [seed, scrollProgress]);

  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef} className="opacity-60" />
    </div>
  );
}

export default function Pathway() {
    return (
        <section className="relative py-32 bg-neutral-100">
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-sm font-light mb-6 text-neutral-900 uppercase tracking-wide">Pathways</h2>
                <p className="text-xl text-neutral-700 mb-16 leading-relaxed">
                    This work takes a couple different forms.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-6">
                    {/* Block 1 */}
                    <div className="flex flex-col p-6 rounded-lg bg-white shadow-xl">
                        <h3 className="text-2xl font-light text-neutral-900 mb-3">Art Riot</h3>
                        <div className="mb-6">
                            <TitleDecoration key="art-riot" seed={1} />
                        </div>
                        <p className="text-lg text-neutral-700 leading-relaxed mb-6 flex-grow">
                            Shared, in-person art experiences and gatherings focused on presence over output.
                        </p>
                        <a
                            href="https://www.artriot.live"
                            className="group inline-flex items-center gap-2.5 text-neutral-600 hover:text-neutral-800 transition-colors duration-500"
                        >
                            <span className="text-base font-normal tracking-normal border-b border-neutral-300 group-hover:border-neutral-500 pb-0.5 transition-colors duration-500">
                                Learn more
                            </span>
                            <svg
                                className="w-4 h-4 opacity-50 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all duration-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>

                    {/* Block 2 */}
                    <div className="flex flex-col p-6 rounded-lg bg-white shadow-xl">
                        <h3 className="text-2xl font-light text-neutral-900 mb-3">Events</h3>
                        <div className="mb-6">
                            <TitleDecoration key="events" seed={2} />
                        </div>
                        <p className="text-lg text-neutral-700 leading-relaxed mb-6 flex-grow">
                            Occasional workshops and exhibitions where the work enters physical space.
                        </p>
                        {/* <a
                            href="/"
                            className="group inline-flex items-center gap-2.5 text-neutral-600 hover:text-neutral-800 transition-colors duration-500"
                        >
                            <span className="text-base font-normal tracking-normal border-b border-neutral-300 group-hover:border-neutral-500 pb-0.5 transition-colors duration-500">
                                Stay tuned
                            </span>
                            <svg
                                className="w-4 h-4 opacity-50 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all duration-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a> */}
                    </div>


                    {/* Block 3 */}
                    <div className="flex flex-col p-6 rounded-lg bg-white shadow-xl">
                        <h3 className="text-2xl font-light text-neutral-900 mb-3">The Work</h3>
                        <div className="mb-6">
                            <TitleDecoration key="the-work" seed={3} />
                        </div>
                        <p className="text-lg text-neutral-700 leading-relaxed mb-6 flex-grow">
                            A broader body of visual work, shared with context rather than interpretation.
                        </p>
                        <a
                            href="/gallery"
                            className="group inline-flex items-center gap-2.5 text-neutral-600 hover:text-neutral-800 transition-colors duration-500"
                        >
                            <span className="text-base font-normal tracking-normal border-b border-neutral-300 group-hover:border-neutral-500 pb-0.5 transition-colors duration-500">
                                Selected work
                            </span>
                            <svg
                                className="w-4 h-4 opacity-50 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all duration-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
