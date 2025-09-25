'use client';

import { useState, useEffect } from 'react';
import PreorderForm from '@/components/PreorderForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Types
type Artwork = {
  id: number;
  title: string;
  medium: string;
  image_path: string;
  available: boolean;
  preorder: boolean;
  likes: number;
};

interface CommissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

function CommissionForm({ isOpen, onClose }: CommissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xyznyrbg', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
        }, 2000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>

          <div className="p-8">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-light mb-2">Commission Inquiry</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Tell me about your vision and I'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:outline-none text-black bg-white"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:outline-none text-black bg-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="project" className="form-label">
                      Project Type
                    </label>
                    <select
                      id="project"
                      name="project"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:outline-none text-black bg-white"
                    >
                      <option value="">Select project type</option>
                      <option value="original">Original Artwork</option>
                      <option value="print">Custom Print</option>
                      <option value="series">Series Commission</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">
                      Tell me about your vision
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:outline-none text-black bg-white"
                      placeholder="Size, style, colors, timeline, budget range..."
                    />
                  </div>

                  {/* Hidden field for form identification */}
                  <input type="hidden" name="_subject" value="New Commission Inquiry from timwatts.art" />
                  
                  {error && (
                    <div className="text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-secondary flex-1"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-light mb-2">Message Sent!</h3>
                <p className="text-gray-600 text-sm">
                  Thank you for your interest. I'll respond within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

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
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCommissionForm, setShowCommissionForm] = useState(false);
  const [showPreorderForm, setShowPreorderForm] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<{ id: number; title: string; src: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [heartAnimations, setHeartAnimations] = useState<Record<number, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

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
    console.log('Opening lightbox with index:', index);
    setCurrentLightboxIndex(index);
    setLightboxOpen(true);
    console.log('Lightbox state set to true');
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentLightboxIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentLightboxIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
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

  const handlePreorderClick = (artworkId: number, artworkTitle: string, artworkSrc: string) => {
    setSelectedArtwork({ id: artworkId, title: artworkTitle, src: artworkSrc });
    setShowPreorderForm(true);
  };

  const handleClosePreorderForm = () => {
    setShowPreorderForm(false);
    setSelectedArtwork(null);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('_subject', 'New Email Subscription from timwatts.art');

    try {
      const response = await fetch('https://formspree.io/f/xyznyrbg', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      // Still show success message to avoid confusing users
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section with Mosaic */}
      <section id="home" className="mt-16 relative overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden lg:block h-[80vh]">
          {/* Background Image - reduced height */}
          <div 
            className="absolute inset-0 h-[68vh] bg-cover bg-left bg-no-repeat"
            style={{ backgroundImage: 'url(/images/TIM_HZMU_006.png)' }}
          ></div>
          {/* Light filter overlay */}
          <div className="absolute inset-0 bg-white/70 h-[68vh]"></div>
          
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 h-full flex items-center">
            <div className="grid lg:grid-cols-2 lg:gap-32 items-center w-full h-full">
              {/* Left side - Text content */}
              <div className="space-y-8">
                <div>
                  <h1>
                    They Call It Chaos.
                    <br />
                    <span className="italic">I Call It Home.</span>
                  </h1>
                  <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                    Step into a world where thousands of lines converge into balance. Each piece holds both tension and calm, inviting you to see your own reflection in the art.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <a href="#gallery" className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors inline-block text-center">
                    View Gallery
                  </a>
                  <button 
                    onClick={() => setShowCommissionForm(true)}
                    className="border border-black text-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
                  >
                    Commission Work
                  </button>
                </div>
              </div>
              
              {/* Right side - Artwork Mosaic */}
              <div className="relative w-full max-h-[600px]">
                <div className="flex flex-col gap-[20px] items-start justify-center relative h-full scale-125 pt-2">
                  <div className="flex gap-[25.633px] items-end justify-start relative shrink-0">
                    <div className="h-[168px] shrink-0 w-[132px] hover:opacity-80 transition-opacity group cursor-pointer overflow-hidden" onClick={() => {
                      console.log('Desktop image clicked, index: 0');
                      openLightbox(0);
                    }}>
                      <img src="/images/TIM_IMG_001.png" alt="Artwork" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-[301px] shrink-0 w-[236px] hover:opacity-80 transition-opacity group cursor-pointer overflow-hidden" onClick={() => openLightbox(3)}>
                      <img src="/images/TIM_IMG_004.png" alt="Artwork" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-[258px] shrink-0 w-[206px] hover:opacity-80 transition-opacity group cursor-pointer overflow-hidden" onClick={() => openLightbox(2)}>
                      <img src="/images/TIM_IMG_003.png" alt="Artwork" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex gap-[26.273px] items-start justify-start relative shrink-0 ml-20">
                    <div className="h-[203px] shrink-0 w-[162px] hover:opacity-80 transition-opacity group cursor-pointer overflow-hidden" onClick={() => openLightbox(1)}>
                      <img src="/images/TIM_IMG_002.png" alt="Artwork" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-[266px] shrink-0 w-[212px] hover:opacity-80 transition-opacity group cursor-pointer overflow-hidden" onClick={() => openLightbox(4)}>
                      <img src="/images/TIM_IMG_005.png" alt="Artwork" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden bg-gray-100">
          {/* Title Block */}
          <div className="px-4 sm:px-6 pt-8 pb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-light leading-tight">
                They Call It Chaos.
                <br />
                <span className="italic">I Call It Home.</span>
              </h1>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                Step into a world where thousands of lines converge into balance. Each piece holds both tension and calm, inviting you to see your own reflection in the art.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#gallery" className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors inline-block text-center">
                View Gallery
              </a>
              <button className="border border-black text-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
                Commission Work
              </button>
            </div>
          </div>

          {/* Mosaic Block */}
          <div className="px-4 sm:px-6 pb-12">
            <MobileMosaic onImageClick={openLightbox} />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Gallery</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A curated selection of contemporary works exploring themes of identity, technology, and human connection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">Loading artworks...</p>
              </div>
            ) : (
              artworks.map((piece) => (
                <div key={piece.id} className="group relative">
                  <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative mb-4">
                    <img 
                      src={piece.image_path} 
                      alt={piece.title}
                      className="w-full h-full object-cover"
                    />
                  
                  {/* Animated heart in center */}
                  {mounted && heartAnimations[piece.id] && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="#ef4444"
                        className="drop-shadow-lg"
                        style={{
                          animation: 'heartBounce 0.6s ease-out'
                        }}
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                  )}
                  
                  {/* Like button and counter - bottom left */}
                  {mounted && (
                    <div className="absolute bottom-3 left-3 z-10">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleLike(piece.id);
                        }}
                        className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-full hover:bg-black/80 transition-colors"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-red-500 hover:scale-110 transition-transform"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="text-sm font-medium">{likes[piece.id] || 0}</span>
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Title and details below image */}
                <div className="space-y-2">
                  <h3 className="text-xl font-light text-gray-900">{piece.title}</h3>
                  <p className="text-sm text-gray-600">{piece.medium}</p>
                  
                  {/* Action buttons */}
                  <div className="pt-2">
                    {[1, 2, 3].includes(piece.id) && (
                      <button 
                        onClick={() => handlePreorderClick(piece.id, piece.title, piece.image_path)}
                        className="bg-black text-white py-2 px-4 text-sm hover:bg-gray-800 transition-colors"
                      >
                        Preorder Print
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light mb-6">Stay Connected</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Be the first to know about new works, exhibitions, and exclusive print releases. 
            Join our community of art enthusiasts.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white text-black placeholder-gray-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black px-8 py-3 hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
          
          {isSubmitted && (
            <p className="mt-4 text-green-400">Thank you for subscribing!</p>
          )}
        </div>
      </section>

      <Footer />

      {/* Preorder Form Modal */}
      {selectedArtwork && (
        <PreorderForm
          isOpen={showPreorderForm}
          onClose={handleClosePreorderForm}
          artworkTitle={selectedArtwork.title}
          artworkId={selectedArtwork.id}
          artworkSrc={selectedArtwork.src}
        />
      )}
      {/* Hero Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl z-10"
              aria-label="Close lightbox"
            >
              ×
            </button>
            
            <div className="relative">
              <img
                src={heroImages[currentLightboxIndex].src}
                alt={heroImages[currentLightboxIndex].title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl"
                aria-label="Next image"
              >
                ›
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded">
                {currentLightboxIndex + 1} / {heroImages.length}
              </div>
              
              {/* Thumbnail navigation */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentLightboxIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentLightboxIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
