'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import PreorderForm from '@/components/PreorderForm';
import Head from 'next/head';

// Types
type ArtworkDetails = {
  id: number;
  title: string;
  medium: string;
  image_path: string;
  available: boolean;
  preorder: boolean;
  likes: number;
  // Extended properties for landing page
  story?: string;
  created_date?: string;
  dimensions?: string;
  year?: number;
  technique?: string;
  inspiration?: string;
  certificate_id?: string;
};

export default function ArtworkPage() {
  const params = useParams();
  const [artwork, setArtwork] = useState<ArtworkDetails | null>(null);
  const [relatedArtworks, setRelatedArtworks] = useState<ArtworkDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPreorderForm, setShowPreorderForm] = useState(false);
  const [likes, setLikes] = useState(0);
  const [heartAnimation, setHeartAnimation] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(`/api/artworks/${params.id}`);
        if (!response.ok) {
          throw new Error('Artwork not found');
        }
        const data = await response.json();
        setArtwork(data);
        setLikes(data.likes || 0);
      } catch (error) {
        console.error('Error fetching artwork:', error);
        setError(error instanceof Error ? error.message : 'Failed to load artwork');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedArtworks = async () => {
      try {
        const response = await fetch('/api/artworks/');
        if (response.ok) {
          const allArtworks = await response.json();
          // Filter out current artwork and randomize
          const filtered = allArtworks.filter((art: ArtworkDetails) => art.id !== parseInt(params.id as string));
          // Shuffle array and take first 4
          const shuffled = filtered.sort(() => 0.5 - Math.random());
          setRelatedArtworks(shuffled.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching related artworks:', error);
      }
    };

    if (params.id) {
      fetchArtwork();
      fetchRelatedArtworks();
    }
  }, [params.id]);

  const handleLike = async () => {
    if (!artwork) return;
    
    try {
      // Optimistic update
      setLikes(prev => prev + 1);
      
      // Trigger heart animation
      setHeartAnimation(true);
      setTimeout(() => setHeartAnimation(false), 600);

      const response = await fetch('/api/likes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artworkId: artwork.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likeCount || likes + 1);
      } else {
        // Revert on error
        setLikes(prev => prev - 1);
      }
    } catch (error) {
      console.error('Error liking artwork:', error);
      setLikes(prev => prev - 1);
    }
  };

  const handlePreorderClick = () => {
    setShowPreorderForm(true);
  };

  const handleClosePreorderForm = () => {
    setShowPreorderForm(false);
  };

  if (loading) {
    return (
      <main>
        <Header />
        <div className="pt-16"></div>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading artwork...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !artwork) {
    return (
      <main>
        <Header />
        <div className="pt-16"></div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-light mb-4 text-gray-900">Artwork Not Found</h1>
            <p className="text-gray-600 mb-6">The artwork you're looking for doesn't exist.</p>
            <Link 
              href="/gallery"
              className="bg-gray-900 text-white px-6 py-3 hover:bg-black transition-colors"
            >
              Back to Gallery
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div className="pt-16"></div>

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/gallery" className="hover:text-gray-900">Gallery</Link>
            <span>/</span>
            <span className="text-gray-900">{artwork.title}</span>
          </div>
        </div>
      </nav>

      {/* Main Artwork Showcase */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left: High-resolution Image */}
            <div className="relative">
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden shadow-2xl">
                <img 
                  src={artwork.image_path}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Animated heart overlay */}
                {heartAnimation && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="#ef4444"
                      className="drop-shadow-2xl"
                      style={{
                        animation: 'heartBounce 0.6s ease-out'
                      }}
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Like Button */}
              <div className="absolute bottom-4 left-4">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-full hover:bg-black transition-colors shadow-lg"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-red-500"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span className="font-medium">{likes}</span>
                </button>
              </div>
            </div>

            {/* Right: Artwork Details */}
            <div className="space-y-8">
              
              {/* Title and Basic Info */}
              <div>
                <p className="text-xl text-gray-600 mb-2 font-medium">TIM WATTS</p>
                <h1 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
                  {artwork.title}
                </h1>
                <div className="space-y-2 text-lg text-gray-700">
                  <p><strong>Medium:</strong> {artwork.medium}</p>
                  {artwork.dimensions && (
                    <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
                  )}
                  {artwork.year && (
                    <p><strong>Year:</strong> {artwork.year}</p>
                  )}
                  {artwork.technique && (
                    <p><strong>Technique:</strong> {artwork.technique}</p>
                  )}
                </div>
              </div>

              {/* Availability and Actions */}
              <div className="space-y-4">
                {artwork.preorder && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-white">
                        Print Available
                      </span>
                    </div>
                    <div className="text-gray-700">
                      <ul className="list-disc list-inside space-y-1 text-base">
                        <li>Only 25 Limited Edition Prints</li>
                        <li className="text-green-600 font-medium">Preorder now and get 20% off order placed before Nov 27, 2025</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {artwork.preorder && (
                    <button
                      onClick={handlePreorderClick}
                      className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 hover:bg-black transition-colors font-medium"
                    >
                      Preorder Limited Edition Print (20% off)
                    </button>
                  )}
                  
                  <Link
                    href="/gallery"
                    className="w-full sm:w-auto text-center border border-gray-300 text-gray-700 px-8 py-3 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Back to Gallery
                  </Link>
                </div>
              </div>

              {/* Artist's Story Section */}
              {artwork.story && (
                <div className="bg-gray-100 p-8 rounded-lg">
                  <h3 className="text-2xl font-light mb-4 text-gray-900">The Story Behind the Art</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {artwork.story}
                    </p>
                  </div>
                  {artwork.inspiration && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Inspiration</h4>
                      <p className="text-gray-600 italic">"{artwork.inspiration}"</p>
                    </div>
                  )}
                </div>
              )}

              {/* What's Included Section - Only for preorder items */}
              {artwork.preorder && (
                <div className="bg-white border border-gray-200 p-8 rounded-lg">
                  <h3 className="text-2xl font-light mb-6 text-gray-900">What's Included</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-black mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900">High-Quality Giclée Print</h4>
                        <p className="text-gray-600 text-sm">Museum-quality archival print on premium paper</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-black mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900">Certificate of Authenticity</h4>
                        <p className="text-gray-600 text-sm">Hand-signed certificate with unique edition number</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-black mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900">Protective Packaging</h4>
                        <p className="text-gray-600 text-sm">Carefully packaged with archival materials for safe delivery</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-black mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900">Limited Edition Status</h4>
                        <p className="text-gray-600 text-sm">Part of a strictly limited print run - each piece is numbered</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-black mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <h4 className="font-medium text-gray-900">Artist's Personal Touch</h4>
                        <p className="text-gray-600 text-sm">Hand-signed by the artist with a personal note</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Note about frame not included */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 italic">
                      <strong>Note:</strong> Frame not included. Print is ready for your choice of framing.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like Section */}
      {relatedArtworks.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-light text-center mb-12 text-gray-900">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedArtworks.map((relatedArt) => (
                <Link key={relatedArt.id} href={`/artwork/${relatedArt.id}`}>
                  <div className="group cursor-pointer">
                    <div className="aspect-[3/4] bg-gray-200 overflow-hidden mb-3 hover:shadow-lg transition-shadow">
                      <img 
                        src={relatedArt.image_path} 
                        alt={relatedArt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                      {relatedArt.title}
                    </h3>
                    <p className="text-sm text-gray-600">{relatedArt.medium}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Preorder Form Modal */}
      {showPreorderForm && (
        <PreorderForm
          isOpen={showPreorderForm}
          onClose={handleClosePreorderForm}
          artworkTitle={artwork.title}
          artworkId={artwork.id}
          artworkSrc={artwork.image_path}
        />
      )}

      {/* Animation Styles */}
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
        
        .font-script {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </main>
  );
}