'use client';

import { useState, useEffect, useRef } from 'react';

export default function Perspective() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Handle scroll for line drawing animation
    useEffect(() => {
        let rafId: number | null = null;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                rafId = window.requestAnimationFrame(() => {
                    if (!sectionRef.current) {
                        ticking = false;
                        return;
                    }

                    const rect = sectionRef.current.getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    // Calculate progress: 0 when section enters viewport, 1 when it leaves
                    const progress = Math.max(0, Math.min(1,
                        (windowHeight - rect.top) / (windowHeight + rect.height)
                    ));

                    setScrollProgress(progress);
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) window.cancelAnimationFrame(rafId);
        };
    }, []);

    // Draw straight lines on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateSize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            drawLines();
        };

        const random = (x: number, y: number): number => {
            const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
            return value - Math.floor(value);
        };

        const drawLines = () => {
            const width = canvas.width / window.devicePixelRatio;
            const height = canvas.height / window.devicePixelRatio;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            const lineCount = 15;

            // Position in bottom right corner - adjust for mobile
            const isMobile = width < 768;
            const bottomRightX = isMobile ? width * 0.75 : width * 0.85; // Further right on desktop
            const bottomRightY = isMobile ? height * 0.92 : height * 0.75;
            const topLeftX = isMobile ? width * 0.25 : width * 0.15; // Further left on desktop
            const topLeftY = isMobile ? height * 0.10 : height * 0.25; // Higher on mobile
            const maxLength = Math.min(width, height) / 3;

            // Draw bottom right lines
            for (let i = 0; i < lineCount; i++) {
                const seed = i * 123.456;

                // Random start time for each line (between 0% and 30% of scroll)
                const startDelay = random(seed * 5.7, seed * 6.8) * 0.3;
                // Lines complete at 70% scroll progress
                const completionPoint = 0.7;
                const drawDuration = completionPoint - startDelay;

                // Calculate adjusted progress for this line
                const adjustedProgress = Math.max(0, Math.min(1,
                    (scrollProgress - startDelay) / drawDuration
                ));

                if (adjustedProgress <= 0) continue;

                const opacity = (0.2 + random(seed, seed * 2.0) * 0.5) * 0.6;

                ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
                ctx.lineWidth = 1.5;
                ctx.lineCap = 'round';

                const isHorizontal = random(seed, seed * 3.0) > 0.5;
                const lineLength = maxLength * (0.5 + random(seed * 2, seed * 4) * 0.5);
                const currentLength = lineLength * adjustedProgress;

                const offsetRange = maxLength * 0.8;
                const offsetX = (random(seed * 5, seed * 6) - 0.5) * offsetRange;
                const offsetY = (random(seed * 7, seed * 8) - 0.5) * offsetRange;

                ctx.beginPath();

                if (isHorizontal) {
                    const startX = bottomRightX - lineLength / 2 + offsetX;
                    const endX = startX + currentLength;
                    const y = bottomRightY + offsetY;

                    ctx.moveTo(startX, y);
                    ctx.lineTo(endX, y);
                } else {
                    const x = bottomRightX + offsetX;
                    const startY = bottomRightY - lineLength / 2 + offsetY;
                    const endY = startY + currentLength;

                    ctx.moveTo(x, startY);
                    ctx.lineTo(x, endY);
                }

                ctx.stroke();
            }

            // Draw top left lines
            for (let i = 0; i < lineCount; i++) {
                const seed = (i + lineCount) * 123.456; // Different seed for variety

                const startDelay = random(seed * 5.7, seed * 6.8) * 0.3;
                const completionPoint = 0.7;
                const drawDuration = completionPoint - startDelay;

                const adjustedProgress = Math.max(0, Math.min(1,
                    (scrollProgress - startDelay) / drawDuration
                ));

                if (adjustedProgress <= 0) continue;

                const opacity = (0.2 + random(seed, seed * 2.0) * 0.5) * 0.6;

                ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
                ctx.lineWidth = 1.5;
                ctx.lineCap = 'round';

                const isHorizontal = random(seed, seed * 3.0) > 0.5;
                const lineLength = maxLength * (0.5 + random(seed * 2, seed * 4) * 0.5);
                const currentLength = lineLength * adjustedProgress;

                const offsetRange = maxLength * 0.8;
                const offsetX = (random(seed * 5, seed * 6) - 0.5) * offsetRange;
                const offsetY = (random(seed * 7, seed * 8) - 0.5) * offsetRange;

                ctx.beginPath();

                if (isHorizontal) {
                    const startX = topLeftX - lineLength / 2 + offsetX;
                    const endX = startX + currentLength;
                    const y = topLeftY + offsetY;

                    ctx.moveTo(startX, y);
                    ctx.lineTo(endX, y);
                } else {
                    const x = topLeftX + offsetX;
                    const startY = topLeftY - lineLength / 2 + offsetY;
                    const endY = startY + currentLength;

                    ctx.moveTo(x, startY);
                    ctx.lineTo(x, endY);
                }

                ctx.stroke();
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [scrollProgress]);

    return (
        <section ref={sectionRef} className="relative py-32 bg-white overflow-hidden">
            {/* Canvas for straight lines */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
                <h2 className="text-sm font-light mb-6 text-neutral-900 uppercase tracking-wide">Perspective</h2>
                <p className="text-xl text-neutral-700 mb-8 leading-relaxed">
                    I don't approach the work as something to be completed or resolved.
                    I stay with it until it no longer asks to be shaped.
                </p>
                <p className="text-lg text-neutral-700 mb-12 mx-auto">
                    The lines that make up the work are not planned in advance. They accumulate through attention;
                    through repetition, hesitation, and return. What matters to me isn't what the work communicates,
                    but what happens while staying with it.
                </p>
                <p className="text-lg text-neutral-700 mb-12 mx-auto">
                    I’m not interested in turning creativity into performance, identity, or outcome. I’m interested
                    in the quiet shift that occurs when attention is allowed to remain without direction and how
                    that same quality of attention carries beyond the work itself.
                </p>
            </div>
        </section>
    );
}
