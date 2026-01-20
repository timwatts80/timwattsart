'use client';

interface AnimatedArrowProps {
  href?: string;
  color?: 'white' | 'black';
}

export default function AnimatedArrow({ href, color = 'white' }: AnimatedArrowProps) {
  const colorClass = color === 'black' ? 'text-neutral-900' : 'text-gray-300';
  
  const arrow = (
    <svg 
      className={`w-6 h-6 ${colorClass}`}
      style={{
        animation: 'float 2s ease-in-out infinite',
      }}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M19 14l-7 7m0 0l-7-7m7 7V3" 
      />
    </svg>
  );

  return (
    <>
      {href ? (
        <a href={href} className="inline-block">
          {arrow}
        </a>
      ) : (
        arrow
      )}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </>
  );
}
