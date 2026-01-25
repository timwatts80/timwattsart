'use client';

import { useEffect, useRef, useMemo } from 'react';

const SHADERS = {
  vertex: `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `,
  fragment: `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform vec3 u_color3;
    uniform vec3 u_color4;
    uniform vec3 u_color5;
    uniform float u_inverted;
    
    mat2 rot(float a) {
      float c = cos(a);
      float s = sin(a);
      return mat2(c, -s, s, c);
    }
    
    const float FIXED_ROTATION = 0.5236; // 30 degrees in radians
    
    // Random function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    // Smooth noise
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // Squiggly line function with accumulating drawing animation
    float squiggleLine(vec2 p, float seed, float offset, float rotation, float startTime) {
      // Apply random rotation to each line
      vec2 rotatedP = p * rot(rotation);
      
      float y = sin(rotatedP.x * 3.0 + seed) * 0.3;
      y += sin(rotatedP.x * 7.0 + seed * 2.0) * 0.15;
      y += sin(rotatedP.x * 13.0 + seed * 3.0) * 0.08;
      y += noise(vec2(rotatedP.x * 2.0, seed)) * 0.2;
      
      float dist = abs(rotatedP.y - y - offset);
      float line = smoothstep(0.006, 0.0, dist);
      
      // Fade out lines near the center
      float centerDist = length(p);
      float centerRadius = 1.2; // Radius of the clear center area
      float fadeWidth = 0.5; // Width of fade transition
      float centerFade = smoothstep(centerRadius - fadeWidth, centerRadius + fadeWidth, centerDist);
      line *= centerFade;
      
      // Draw the line progressively and leave it on canvas
      float timeSinceStart = u_time - startTime;
      
      if (timeSinceStart < 0.0) {
        // Line hasn't started yet
        return 0.0;
      }
      
      float drawDuration = 2.0; // Time to complete drawing
      float drawProgress = clamp(timeSinceStart / drawDuration, 0.0, 1.0);
      
      // Calculate the end position based on progress
      float drawStart = -2.0;
      float drawEnd = drawStart + drawProgress * 4.0; // Draw across the canvas
      
      // Show line up to the current draw position
      float reveal = smoothstep(drawStart - 0.1, drawStart, rotatedP.x) * 
                     step(rotatedP.x, drawEnd);
      
      return line * reveal;
    }
    
    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
      float dist = length(uv);
      
      vec2 mouseOffset = u_mouse * 0.3;
      vec2 p = (uv * 2.0 + mouseOffset) * rot(FIXED_ROTATION);
      
      // Accumulate lines over time
      float lines = 0.0;
      int maxLines = 200; // Maximum number of lines to draw
      float lineDelay = 0.3; // Delay between starting each new line
      
      for(int i = 0; i < 200; i++) {
        float fi = float(i);
        float seed = fi * 123.456;
        
        // Each line starts at a staggered time
        float startTime = fi * lineDelay;
        
        // Spread lines across the canvas
        float offset = (fi / 200.0 - 0.5) * 4.0;
        
        // Random rotation for each line
        float rotation = sin(seed * 0.5) * 3.14159 * 0.5;
        
        vec2 lineP = p * (1.0 + fi * 0.01);
        
        // Random opacity for each line (0.2 to 0.7)
        float lineOpacity = 0.2 + random(vec2(seed, seed * 2.0)) * 0.5;
        
        float line = squiggleLine(lineP, seed, offset, rotation, startTime);
        lines += line * lineOpacity;
      }
      
      lines = clamp(lines, 0.0, 1.0);
      lines = clamp(lines, 0.0, 1.0);
      
      // Simple white color for all lines, or inverted (black lines on white)
      vec3 finalColor = u_inverted > 0.5 ? vec3(1.0 - lines) : vec3(1.0) * lines;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

interface NebulaBackgroundProps {
  speed?: number;
  opacity?: number;
  colors?: [number, number, number][];
  className?: string;
  style?: React.CSSProperties;
  mouseX?: number;
  mouseY?: number;
  inverted?: boolean;
}

export default function NebulaBackground({ 
  speed = 1.0,
  opacity = 1.0,
  colors,
  className = '',
  style = {},
  mouseX = 0.5,
  mouseY = 0.5,
  inverted = false
}: NebulaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<any>({});
  const startTimeRef = useRef<number>(0);
  const colorsRef = useRef<number[][]>(colors || generateNebulaColors());

  // Memoize dependency values to prevent unnecessary effect reruns
  const depsKey = useMemo(() => JSON.stringify({ speed, mouseX, mouseY, inverted }), [speed, mouseX, mouseY, inverted]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      console.error('WebGL not supported');
      return;
    }
    
    glRef.current = gl;
    
    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, SHADERS.vertex);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, SHADERS.fragment);
    
    if (!vertexShader || !fragmentShader) return;
    
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;
    
    programRef.current = program;
    gl.useProgram(program);
    
    // Setup geometry
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Get uniforms
    uniformsRef.current = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      color1: gl.getUniformLocation(program, 'u_color1'),
      color2: gl.getUniformLocation(program, 'u_color2'),
      color3: gl.getUniformLocation(program, 'u_color3'),
      color4: gl.getUniformLocation(program, 'u_color4'),
      color5: gl.getUniformLocation(program, 'u_color5'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      inverted: gl.getUniformLocation(program, 'u_inverted'),
    };
    
    startTimeRef.current = Date.now();
    
    // Handle resize
    const handleResize = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      if (!glRef.current || !programRef.current) return;
      
      const time = ((Date.now() - startTimeRef.current) / 1000) * speed;
      
      glRef.current.uniform2f(uniformsRef.current.resolution, canvas.width, canvas.height);
      glRef.current.uniform1f(uniformsRef.current.time, time);
      glRef.current.uniform2f(uniformsRef.current.mouse, mouseX, mouseY);
      glRef.current.uniform3fv(uniformsRef.current.color1, colorsRef.current[0]);
      glRef.current.uniform3fv(uniformsRef.current.color2, colorsRef.current[1]);
      glRef.current.uniform3fv(uniformsRef.current.color3, colorsRef.current[2]);
      glRef.current.uniform3fv(uniformsRef.current.color4, colorsRef.current[3]);
      glRef.current.uniform3fv(uniformsRef.current.color5, colorsRef.current[4]);
      glRef.current.uniform1f(uniformsRef.current.inverted, inverted ? 1.0 : 0.0);
      
      glRef.current.drawArrays(glRef.current.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [depsKey]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity,
        pointerEvents: 'none',
        ...style
      }}
    />
  );
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  
  return program;
}

function generateNebulaColors(): number[][] {
  const hue1 = Math.random() * 360;
  const hue2 = (hue1 + 80 + Math.random() * 40) % 360;
  const hue3 = (hue2 + 80 + Math.random() * 40) % 360;
  const hue4 = (hue3 + 80 + Math.random() * 40) % 360;
  const hue5 = (hue1 + 180) % 360;
  
  return [
    hslToRgb(hue1, 0.8, 0.5),
    hslToRgb(hue2, 0.8, 0.6),
    hslToRgb(hue3, 0.9, 0.5),
    hslToRgb(hue4, 0.85, 0.6),
    hslToRgb(hue5, 0.9, 0.7)
  ];
}

function hslToRgb(h: number, s: number, l: number): number[] {
  h /= 360;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  return [
    hue2rgb(p, q, h + 1/3),
    hue2rgb(p, q, h),
    hue2rgb(p, q, h - 1/3)
  ];
}
