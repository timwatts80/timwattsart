'use client';

import { useState, useEffect } from 'react';

import ScrollDrawnLine from '@/components/ScrollDrawnLine';
import CommissionForm from '@/components/CommissionForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroConceptB from '@/components/HeroConceptB';
import OrientationSection from '@/components/OrientationSection';
import OnTheWork from '@/components/OnTheWork';
import LimitedEditionPrints from '@/components/LimitedEditionPrints';
import FeaturedArtwork from '@/components/FeaturedArtwork';
import HighlightArtwork from '@/components/HighlightArtwork';
import HighlightArtwork2 from '@/components/HighlightArtwork2';
import Perspective from '@/components/Perspective';
import Pathway from '@/components/Pathway';
import EmailSignup from '@/components/EmailSignup';

// Types
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

// Mobile Mosaic Component - Scalable version
function MobileMosaic({ onImageClick }: { onImageClick: (index: number) => void }) {
  // Base width of the original Figma frame in px (sum of widths + gaps of the widest row)
  const BASE_WIDTH = 336.152;

  // Utility to convert an absolute width in px to a flex-basis percentage so that
  // the whole mosaic scales proportionally with its container width.
  const toPercent = (value: number) => `${(value / BASE_WIDTH) * 100}%`;

  // Gap ratios were derived from the original Figma design so that even the
  // spacing between blocks scales with the overall width.
  const GAP_ROW1 = 13.782 / BASE_WIDTH;
  const GAP_ROW2 = 14.127 / BASE_WIDTH;

  // A small helper describing the rectangles we need to render. Each item knows
  // its image source, the absolute width from Figma and its aspect-ratio so
  // that we can preserve the exact look on any screen size without having to
  // hard-code heights.
  const rows = [
    {
      gapRatio: GAP_ROW1,
      blocks: [
        { img: "/images/TIM_IMG_001.png", width: 70.911, aspect: 70.911 / 90.412, index: 0 },
        { img: "/images/TIM_IMG_004.png", width: 126.914, aspect: 126.914 / 161.816, index: 3 },
        { img: "/images/TIM_IMG_003.png", width: 110.763, aspect: 110.763 / 138.722, index: 2 },
      ],
      align: "items-end",
    },
    {
      gapRatio: GAP_ROW2,
      blocks: [
        { img: "/images/TIM_IMG_002.png", width: 87.105, aspect: 87.105 / 109.15, index: 1 },
        { img: "/images/TIM_IMG_005.png", width: 113.989, aspect: 113.989 / 143.024, index: 4 },
      ],
      align: "items-start",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center size-full" style={{ gap: "20px" }}>
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`flex shrink-0 ${row.align} w-full ${rowIdx === 1 ? 'ml-16' : ''}`}
          style={{ gap: `${row.gapRatio * 100}%` }}
        >
          {row.blocks.map((block, idx) => (
            <div
              key={idx}
              className="shrink-0 hover:opacity-80 transition-opacity cursor-pointer overflow-hidden"
              style={{
                flexBasis: toPercent(block.width),
                aspectRatio: `${block.aspect}`,
              }}
              onClick={() => {
                console.log('MobileMosaic image clicked, index:', block.index);
                onImageClick(block.index);
              }}
            >
              <img
                src={block.img}
                alt="Artwork"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Placeholder artwork data - replace with your actual artwork images
const artworkPieces = [
  { id: 1, src: '/artwork/piece1.jpg', alt: 'Abstract composition', available: true, preorder: true },
  { id: 2, src: '/artwork/piece2.jpg', alt: 'Modern landscape', available: false, preorder: false },
  { id: 3, src: '/artwork/piece3.jpg', alt: 'Contemporary portrait', available: true, preorder: true },
  { id: 4, src: '/artwork/piece4.jpg', alt: 'Geometric forms', available: true, preorder: false },
  { id: 5, src: '/artwork/piece5.jpg', alt: 'Urban scenes', available: false, preorder: false },
  { id: 6, src: '/artwork/piece6.jpg', alt: 'Color study', available: true, preorder: true },
];

// Art Collections
const artCollections = [
  {
    id: 1,
    title: 'ORIGINAL',
    description: 'Unique one-of-a-kind pieces',
    image: '/artwork/collection-original.jpg',
    href: '/collections/original',
    pieces: 15
  },
  {
    id: 2,
    title: 'GICLÉE (PRINT)',
    description: 'High-quality limited edition prints',
    image: '/artwork/collection-giclee.jpg',
    href: '/collections/giclee',
    pieces: 28
  },
  {
    id: 3,
    title: 'NEW RELEASE',
    description: 'Latest contemporary works',
    image: '/artwork/collection-new.jpg',
    href: '/collections/new-release',
    pieces: 8
  }
];

export default function HomePage() {
  const [showCommissionForm, setShowCommissionForm] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [heartAnimations, setHeartAnimations] = useState<Record<number, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastTap, setLastTap] = useState<Record<number, number>>({});

  // Create hero images from first 5 artworks for lightbox
  const heroImages = artworks.slice(0, 5).map(artwork => ({
    src: artwork.image_path,
    title: artwork.title
  }));

  useEffect(() => {
    setMounted(true);

    // Load artworks and likes from database
    fetch('/api/artworks/')
      .then(async res => {
        if (res.ok) {
          const artworkData = await res.json();
          setArtworks(artworkData);

          // Convert to likes format for existing like functionality
          const likesData: Record<number, number> = {};
          artworkData.forEach((artwork: Artwork) => {
            likesData[artwork.id] = artwork.likes;
          });
          setLikes(likesData);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading artworks:', error);
        setLoading(false);
      });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Remove the localStorage save effect since we're using database now

  const openLightbox = (index: number) => {
    if (heroImages.length > 0 && index < heroImages.length) {
      console.log('Opening lightbox with index:', index);
      setCurrentLightboxIndex(index);
      setLightboxOpen(true);
      console.log('Lightbox state set to true');
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (heroImages.length > 0) {
      setCurrentLightboxIndex((prev) => (prev + 1) % heroImages.length);
    }
  };

  const prevImage = () => {
    if (heroImages.length > 0) {
      setCurrentLightboxIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
  };

  const handleLike = async (pieceId: number) => {
    try {
      // Optimistically update UI
      setLikes(prev => ({
        ...prev,
        [pieceId]: (prev[pieceId] || 0) + 1
      }));

      // Trigger heart animation
      setHeartAnimations(prev => ({ ...prev, [pieceId]: true }));

      // Remove animation after it completes
      setTimeout(() => {
        setHeartAnimations(prev => ({ ...prev, [pieceId]: false }));
      }, 600);

      // Send to database
      const response = await fetch('/api/likes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artworkId: pieceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to like artwork');
      }

      const data = await response.json();

      // Update with actual count from server
      setLikes(prev => ({
        ...prev,
        [pieceId]: data.likeCount
      }));

    } catch (error) {
      console.error('Error liking artwork:', error);
      // Revert optimistic update on error
      setLikes(prev => ({
        ...prev,
        [pieceId]: Math.max(0, (prev[pieceId] || 0) - 1)
      }));
    }
  };



  const handleDoubleTap = (pieceId: number) => {
    const now = Date.now();
    const lastTapTime = lastTap[pieceId] || 0;
    const timeDiff = now - lastTapTime;

    setLastTap(prev => ({ ...prev, [pieceId]: now }));

    // If double tap detected (within 300ms), trigger like
    if (timeDiff < 300 && timeDiff > 0) {
      handleLike(pieceId);
      // Reset to prevent triple tap issues
      setLastTap(prev => ({ ...prev, [pieceId]: 0 }));
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <ScrollDrawnLine />
      <Header />

      {/* Hero Section — Grounded Contact */}
      <div className="pt-16 lg:pt-20">
        <HeroConceptB />
      </div>
      {/* On The Work Section */}
      <div id="on-the-work">
        <OnTheWork />
      </div>

      {/* Limited Edition Prints Section
      <FeaturedArtwork
        artworks={artworks}
        loading={loading}
        mounted={mounted}
        likes={likes}
        heartAnimations={heartAnimations}
        lastTap={lastTap}
        handleLike={handleLike}
        handleDoubleTap={handleDoubleTap}
      /> */}

      {/* Highlight Artwork 2 Section */}
      <div id="highlight-artwork-2">
        <HighlightArtwork2 />
      </div>

      {/* Highlight Artwork Section */}
      <div id="highlight-artwork-1">
        <HighlightArtwork />
      </div>

      {/* Perspective Section */}
      <Perspective />

      {/* Pathway Section */}
      <div id="pathway">
        <Pathway />
      </div>

      {/* Email Signup Section */}
      <EmailSignup />

      <Footer />

    </main>
  );
}
