'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AnimatedArrow from './AnimatedArrow';

type Artwork = {
    id: number;
    title: string;
    medium: string;
    image_path: string;
    available: boolean;
    preorder: boolean;
    featured: boolean;
    likes: number;
};

export default function HighlightArtwork() {
    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const response = await fetch('/api/artworks/2');
                if (response.ok) {
                    const data = await response.json();
                    setArtwork(data);
                }
            } catch (error) {
                console.error('Error fetching highlight artwork:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtwork();
    }, []);

    // Handle scroll for line drawing animation
    useEffect(() => {
        let rafId: number | null = null;
        let lastKnownScrollPosition = 0;
        let ticking = false;

        const handleScroll = () => {
            lastKnownScrollPosition = window.scrollY;

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

    // Draw squiggly lines on canvas
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

        const noise = (x: number, y: number): number => {
            const ix = Math.floor(x);
            const iy = Math.floor(y);
            const fx = x - ix;
            const fy = y - iy;

            const random = (x: number, y: number) => {
                const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
                return value - Math.floor(value);
            };

            const a = random(ix, iy);
            const b = random(ix + 1, iy);
            const c = random(ix, iy + 1);
            const d = random(ix + 1, iy + 1);

            const ux = fx * fx * (3 - 2 * fx);
            const uy = fy * fy * (3 - 2 * fy);

            return a * (1 - ux) * (1 - uy) +
                b * ux * (1 - uy) +
                c * (1 - ux) * uy +
                d * ux * uy;
        };

        const drawLines = () => {
            const rect = canvas.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            const lineCount = 14;

            // Group lines together in the left column around the text
            const groupCenterX = width * 0.16; // Center of left 1/3
            const groupCenterY = height * 0.5;

            for (let i = 0; i < lineCount; i++) {
                const seed = i * 123.456;

                // Vertical offset to spread lines out
                const verticalSpacing = 20; // Very tight spacing for overlap
                const verticalOffset = (i - lineCount / 2) * verticalSpacing;

                // Random rotation for each line with wider range
                const rotation = (Math.sin(seed * 0.7) * Math.PI) + (Math.cos(seed * 1.3) * Math.PI * 0.3); // More varied rotation

                ctx.save();
                ctx.translate(groupCenterX, groupCenterY + verticalOffset);
                ctx.rotate(rotation);

                // Varied opacity for each line
                const opacity = 0.4 + Math.sin(seed * 1.9) * 0.4; // Range from 0.4 to 0.8
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // Create varied lengths - some much longer
                let lengthMultiplier = (i === 1 || i === 4) ? 1.8 : 1.0; // Lines 1 and 4 are much longer
                const isExtendedLine = (i === 0); // Line 0 is the special extended line

                if (isExtendedLine) {
                    lengthMultiplier = 6.5; // Make it very long to reach bottom and loop back
                }

                const baseLength = 180 * lengthMultiplier;
                const lengthVariation = Math.sin(seed * 2.3) * 60;
                const maxLength = baseLength + lengthVariation;

                // Delay lines' drawing with random starts
                let adjustedProgress = scrollProgress;
                if (isExtendedLine) {
                    // Extended line starts at 20% scroll, finishes at 90% scroll
                    adjustedProgress = Math.max(0, (scrollProgress - 0.20) / 0.7);
                } else {
                    // Other lines randomly start at 10% or 15%
                    const startDelay = Math.sin(seed * 5.7) > 0 ? 0.10 : 0.15;
                    adjustedProgress = Math.max(0, (scrollProgress - startDelay) / (1 - startDelay));
                }

                const currentLength = maxLength * adjustedProgress;
                const step = 0.5;

                // Make specific lines circular with stronger motion
                const isCircular = (i === 2 || i === 5); // Lines 2 and 5 are circular
                const circularRadius = 50 + Math.sin(seed * 3.1) * 25;

                ctx.beginPath();
                let firstPoint = true;

                // Draw from fixed starting point (left side) to current length
                const startX = isExtendedLine ? -150 : -maxLength / 2; // Start extended line offscreen left
                for (let x = startX; x <= startX + currentLength; x += step) {
                    const nx = x / 100;

                    let y;

                    if (isExtendedLine) {
                        // Special extended line with elegant swirls
                        const progress = (x - startX) / maxLength;

                        if (progress < 0.35) {
                            // First 35%: swirl down and right with smooth curves
                            const angle = progress * Math.PI * 3; // Multiple rotations
                            y = progress * 280; // Move down
                            y += Math.sin(angle) * 60; // Large swirls
                            y += Math.cos(angle * 1.5) * 35; // Additional wave
                        } else if (progress < 0.65) {
                            // Middle 30%: continue downward with tighter spirals
                            const midProgress = (progress - 0.35) / 0.3;
                            const angle = (progress - 0.35) * Math.PI * 4;
                            y = 98 + midProgress * 280; // Continue down to bottom
                            y += Math.sin(angle) * 45; // Tighter spirals
                            y += Math.cos(angle * 2) * 25;
                        } else {
                            // Last 35%: sweep back up with dramatic upward curve
                            const returnProgress = (progress - 0.65) / 0.35;
                            const angle = returnProgress * Math.PI * 2;
                            const maxY = 378; // Lowest point reached

                            // Strong upward curve - goes from bottom back to near top
                            y = maxY - (Math.pow(returnProgress, 1.2) * maxY * 1.1);
                            y += Math.sin(angle) * 70; // Wide sweeping motion
                            y += Math.cos(angle * 1.5) * 45; // Additional elegance
                        }
                    } else if (isCircular) {
                        // Circular, squiggly pattern with more fluid motion
                        const angle = nx * 4;
                        const radius = circularRadius + Math.sin(nx * 10) * 20;
                        y = Math.sin(angle) * radius;
                        y += Math.cos(nx * 12.0 + seed) * 25;
                        y += noise(nx * 5.0, seed) * 30;
                    } else {
                        // Regular squiggly lines with enhanced circular motion in all directions
                        // Create base circular/elliptical paths with random orientation
                        const circlePhase = nx * (3.0 + Math.sin(seed * 2.1) * 2.0); // Varied frequency per line
                        const ellipseA = 50 + Math.cos(seed * 1.7) * 30; // Random ellipse width
                        const ellipseB = 40 + Math.sin(seed * 2.3) * 25; // Random ellipse height

                        // Primary circular motion with random phase offset
                        y = Math.sin(circlePhase + seed) * ellipseA;
                        y += Math.cos(circlePhase * 1.3 + seed * 2.0) * ellipseB;

                        // Add secondary circular patterns at different scales
                        y += Math.sin(circlePhase * 2.1 + seed * 1.5) * 25;
                        y += Math.cos(circlePhase * 3.7 + seed * 2.8) * 18;

                        // Layer in some noise for organic feel
                        y += noise(nx * 3.0, seed) * 30;
                        y += noise(nx * 7.0, seed * 1.8) * 15;
                    }

                    // Calculate taper: thin at ends, thicker in middle
                    const progress = (x - startX) / currentLength;
                    const taper = Math.sin(progress * Math.PI);
                    const lineWidth = 1 + taper * 2.5; // Range from 1 to 3.5
                    ctx.lineWidth = lineWidth;

                    if (firstPoint) {
                        ctx.moveTo(x, y);
                        firstPoint = false;
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.stroke();
                ctx.restore();
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [scrollProgress]);

    if (loading || !artwork) {
        return null;
    }

    return (
        <section ref={sectionRef} className="relative bg-black overflow-hidden" style={{ height: '100vh' }}>
            <div className="absolute inset-0 flex flex-col lg:flex-row justify-between items-center">
                {/* Left/Top side - Title */}
                <div className="flex w-full lg:w-1/2 items-center justify-center lg:justify-end px-8 py-8 lg:py-0">
                    <div className='flex flex-col gap-10 justify-center items-center'>
                        <h2 className="text-gray-400 uppercase text-base font-light tracking-wide">
                            {artwork.title}
                        </h2>
                        {/* <p className='opacity-60'>
                            <AnimatedArrow color="white" href="#highlight-artwork-1" />
                        </p> */}
                    </div>
                </div>

                {/* Right/Bottom side - Artwork */}
                <Link href={`/artwork/${artwork.id}`} className="relative flex-1 w-full lg:w-1/2 h-full">
                    <img
                        src={artwork.image_path}
                        alt={artwork.title}
                        className="h-full w-full object-cover lg:object-contain"
                    />
                    {/* Gradient overlay on left side */}
                    <div className="hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
                    {/* Gradient overlay on right side */}
                    <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
                </Link>
            </div>

            {/* Canvas for squiggly lines - positioned over entire section */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
        </section>
    );
}
