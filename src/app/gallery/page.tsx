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

export default function GalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [heartAnimations, setHeartAnimations] = useState<{ [key: number]: boolean }>({});
  const [mounted, setMounted] = useState(false);
  const [showPreorderForm, setShowPreorderForm] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<{
    id: number;
    title: string;
    src: string;
  }>({ id: 0, title: '', src: '' });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch('/api/artworks/');
        const data = await response.json();
        setArtworks(data);
        
        // Initialize likes state with proper fallbacks
        const likesState: { [key: number]: number } = {};
        data.forEach((artwork: Artwork) => {
          likesState[artwork.id] = artwork.likes || 0;
        });
        setLikes(likesState);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const handleLike = async (artworkId: number) => {
    try {
      // Get current count for optimistic update
      const currentCount = likes[artworkId] || 0;
      
      // Optimistically update UI immediately
      setLikes(prev => ({
        ...prev,
        [artworkId]: currentCount + 1
      }));

      // Trigger heart animation
      setHeartAnimations(prev => ({ ...prev, [artworkId]: true }));
      setTimeout(() => {
        setHeartAnimations(prev => ({ ...prev, [artworkId]: false }));
      }, 600);

      // Send to database
      const response = await fetch('/api/likes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artworkId }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update with actual count from server (use likeCount from API)
        setLikes(prev => ({
          ...prev,
          [artworkId]: data.likeCount || currentCount + 1
        }));
      } else {
        console.error('Failed to like artwork:', response.status);
        // Revert optimistic update on error
        setLikes(prev => ({
          ...prev,
          [artworkId]: currentCount
        }));
      }
    } catch (error) {
      console.error('Error liking artwork:', error);
      // Revert optimistic update on error
      const currentCount = likes[artworkId] || 0;
      setLikes(prev => ({
        ...prev,
        [artworkId]: currentCount
      }));
    }
  };

  const handleDoubleTap = (artworkId: number) => {
    handleLike(artworkId);
  };

  const handlePreorderClick = (id: number, title: string, src: string) => {
    setSelectedArtwork({ id, title, src });
    setShowPreorderForm(true);
  };

  const handleClosePreorderForm = () => {
    setShowPreorderForm(false);
    setSelectedArtwork({ id: 0, title: '', src: '' });
  };

  return (
    <main>
      <Header />
      
      {/* Header Spacer */}
      <div className="pt-16"></div>
      
      {/* Gallery Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-black">Gallery</h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              A curated collection of contemporary works exploring themes of identity, technology, and human connection. 
              Each piece represents a moment of discovery in my artistic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      className="w-full h-full object-cover cursor-pointer"
                      onTouchEnd={() => handleDoubleTap(piece.id)}
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
                    
                    {/* Preorder button if applicable */}
                    <div className="pt-2">
                      {/* Show preorder button for preorder pieces */}
                      {piece.preorder && (
                        <button 
                          onClick={() => handlePreorderClick(piece.id, piece.title, piece.image_path)}
                          className="block bg-gray-800 text-white py-2 px-4 text-sm hover:bg-black transition-colors"
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

      <Footer />

      {/* Preorder Form Modal */}
      {showPreorderForm && selectedArtwork && (
        <PreorderForm
          isOpen={showPreorderForm}
          onClose={handleClosePreorderForm}
          artworkTitle={selectedArtwork.title}
          artworkId={selectedArtwork.id}
          artworkSrc={selectedArtwork.src}
        />
      )}

      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes heartBounce {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}