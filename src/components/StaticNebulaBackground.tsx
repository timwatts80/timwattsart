'use client';

import { useEffect, useRef } from 'react';

interface StaticNebulaBackgroundProps {
  lineCount?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function StaticNebulaBackground({ 
  lineCount = 48,
  className = '',
  style = {}
}: StaticNebulaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match display size
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

    const noise = (x: number, y: number): number => {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      const fx = x - ix;
      const fy = y - iy;
      
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

    const squiggleLine = (
      ctx: CanvasRenderingContext2D,
      seed: number,
      offset: number,
      rotation: number,
      opacity: number,
      width: number,
      height: number
    ) => {
      // This function is no longer used, logic moved to drawLines
    };

    const drawLines = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, width, height);

      // Draw all lines positioned in bottom right corner
      for (let i = 0; i < lineCount; i++) {
        const seed = i * 123.456;
        
        // Position lines in bottom right corner
        const centerX = width * 0.75;
        const centerY = height * 0.75;
        const maxLength = Math.min(width, height) / 3; // Length of lines
        
        const opacity = 0.2 + random(seed, seed * 2.0) * 0.5;

        ctx.save();
        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';

        // Randomly choose horizontal or vertical
        const isHorizontal = random(seed, seed * 3.0) > 0.5;
        
        // Random length for variety
        const lineLength = maxLength * (0.5 + random(seed * 2, seed * 4) * 0.5);
        
        // Random offset from center
        const offsetRange = maxLength * 0.8;
        const offsetX = (random(seed * 5, seed * 6) - 0.5) * offsetRange;
        const offsetY = (random(seed * 7, seed * 8) - 0.5) * offsetRange;
        
        ctx.beginPath();
        
        if (isHorizontal) {
          // Draw horizontal line
          const startX = centerX - lineLength / 2 + offsetX;
          const endX = centerX + lineLength / 2 + offsetX;
          const y = centerY + offsetY;
          
          ctx.moveTo(startX, y);
          ctx.lineTo(endX, y);
        } else {
          // Draw vertical line
          const x = centerX + offsetX;
          const startY = centerY - lineLength / 2 + offsetY;
          const endY = centerY + lineLength / 2 + offsetY;
          
          ctx.moveTo(x, startY);
          ctx.lineTo(x, endY);
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
  }, [lineCount]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style
      }}
    />
  );
}
