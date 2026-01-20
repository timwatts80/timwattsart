'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

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
  const [showInlineOrderForm, setShowInlineOrderForm] = useState(false);
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

  const handleOrderClick = () => {
    setShowInlineOrderForm(true);
  };

  const handleBackToDetails = () => {
    setShowInlineOrderForm(false);
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
      <div className="pt-20"></div>

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/gallery" className="hover:text-gray-900">Work</Link>
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

            {/* Right: Artwork Details or Order Form */}
            <div className="space-y-8">
              
              {/* Title - always visible */}
              <div>
                <p className="text-xl text-gray-600 mb-2 font-medium">TIM WATTS</p>
                <h1 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
                  {artwork.title}
                </h1>
              </div>

              {!showInlineOrderForm ? (
                // Original details view
                <>
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
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {artwork.preorder && (
                        <button
                          onClick={handleOrderClick}
                          className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 hover:bg-black transition-colors font-medium"
                        >
                          Order Print
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
                </>
              ) : (
                // Inline Order Form
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-light text-gray-900">Order Limited Edition Print</h2>
                    <button
                      onClick={handleBackToDetails}
                      className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      ← Back to Details
                    </button>
                  </div>

                  {/* Artwork Summary */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">{artwork.title}</h3>
                    <p className="text-gray-600 mb-3">Limited edition print • {artwork.medium}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      $95 <span className="text-lg font-normal text-gray-600">+ shipping</span>
                    </p>
                  </div>

                  {/* Order Form */}
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                        placeholder="Street address, city, state, ZIP code"
                      />
                    </div>

                    <div>
                      <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                        Print Size
                      </label>
                      <select
                        id="size"
                        name="size"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                      >
                        <option value="">Select print size</option>
                        <option value="8x10">8" × 10" - $95</option>
                        <option value="11x14">11" × 14" - $125</option>
                        <option value="16x20">16" × 20" - $165</option>
                      </select>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>What's included:</strong>
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Museum-quality giclée print on archival paper</li>
                        <li>• Hand-signed certificate of authenticity</li>
                        <li>• Protective packaging for safe delivery</li>
                        <li>• Limited edition numbering</li>
                      </ul>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-4 px-6 text-lg font-medium hover:bg-black transition-colors"
                      >
                        Place Order
                      </button>
                      <p className="text-sm text-gray-500 mt-3 text-center">
                        You will receive order confirmation and payment instructions via email
                      </p>
                    </div>
                  </form>
                </div>
              )}

              {/* Artist's Story Section - Always visible in right column */}
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

            </div>
          </div>
        </div>
      </section>
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