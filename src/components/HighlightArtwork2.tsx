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

export default function HighlightArtwork2() {
    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const response = await fetch('/api/artworks/6');
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

    if (loading || !artwork) {
        return null;
    }

    return (
        <section ref={sectionRef} className="relative bg-white overflow-hidden" style={{ height: '100vh' }}>
            <div className="absolute inset-0 flex flex-col lg:flex-row justify-between items-center">
                {/* Left/Top side - Artwork (swapped) */}
                <Link href={`/artwork/${artwork.id}`} className="relative flex-1 w-full lg:w-1/2 h-full">
                    <img
                        src={artwork.image_path}
                        alt={artwork.title}
                        className="h-full w-full object-cover lg:object-contain"
                    />
                    {/* Gradient overlay on left side */}
                    <div className="hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                    {/* Gradient overlay on right side */}
                    <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                </Link>

                {/* Right/Bottom side - Title (swapped) */}
                <div className="flex w-full lg:w-1/2 items-center justify-center lg:justify-start px-8 py-8 lg:py-0">
                    <div className='flex flex-col gap-10 justify-center items-center'>
                        <h2 className="text-gray-600 uppercase text-base font-light tracking-wide">
                            {artwork.title}
                        </h2>
                        {/* <p>
                            <AnimatedArrow color="black" href="#highlight-artwork-1" />
                        </p> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
