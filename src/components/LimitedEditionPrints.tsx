'use client';

type Artwork = {
  id: number;
  title: string;
  medium: string;
  image_path: string;
  available: boolean;
  preorder: boolean;
  likes: number;
};

interface LimitedEditionPrintsProps {
  artworks: Artwork[];
  loading: boolean;
  mounted: boolean;
  likes: Record<number, number>;
  heartAnimations: Record<number, boolean>;
  lastTap: Record<number, number>;
  handleLike: (pieceId: number) => void;
  handleDoubleTap: (pieceId: number) => void;
}

export default function LimitedEditionPrints({
  artworks,
  loading,
  mounted,
  likes,
  heartAnimations,
  lastTap,
  handleLike,
  handleDoubleTap
}: LimitedEditionPrintsProps) {
  return (
    <section id="gallery-preview" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4">Limited Edition Prints</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            High-quality giclée prints of select works, available for preorder. Each print is numbered and signed.
          </p>
        </div>
        
        {/* Three-column grid for the 3 preorder pieces */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">Loading prints...</p>
            </div>
          ) : (
            artworks.filter(piece => piece.preorder).map((piece) => (
              <div key={piece.id} className="group relative">
                {/* Standard size image for prints in 3-column grid */}
                <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative mb-6 shadow-lg">
                  <a href={`/artwork/${piece.id}`} className="block w-full h-full">
                    <img 
                      src={piece.image_path} 
                      alt={piece.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        handleDoubleTap(piece.id);
                      }}
                    />
                  </a>
                  
                  {/* Preorder badge */}
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-sm font-medium pointer-events-none">
                    Limited Edition
                  </div>
                
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
                          e.stopPropagation();
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

                  {/* External link button - bottom right */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <a 
                      href={`/artwork/${piece.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="block w-12 h-12 bg-gray-600/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/90 transition-colors"
                    >
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="2"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Title and details below image */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-light text-gray-900">{piece.title}</h3>
                    <p className="text-gray-600">{piece.medium}</p>
                  </div>
                  
                  {/* Print details */}
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>• Limited edition of 50 prints</p>
                    <p>• High-quality giclée on archival paper</p>
                    <p>• Signed and numbered by the artist</p>
                    <p>• Multiple sizes available</p>
                  </div>
                  
                  {/* Order button */}
                  <a 
                    href={`/artwork/${piece.id}`}
                    className="block w-full bg-black text-white py-3 px-6 text-lg font-medium hover:bg-gray-800 transition-colors transform hover:scale-105 duration-200 text-center"
                  >
                    Order Print
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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
    </section>
  );
}
