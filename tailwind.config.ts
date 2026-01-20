import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Override default Tailwind values with design tokens from CSS custom properties
    colors: {
      // Brand colors
      brand: {
        primary: '#000000',
        secondary: '#ffffff',
      },
      
      // Neutral colors (grays)
      neutral: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0a0a0a',
      },
      gray: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0a0a0a',
      },
      
      // Functional colors
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      
      // Semantic colors
      background: {
        primary: '#ffffff',
        secondary: '#f5f5f5',
        tertiary: '#000000',
        overlay: 'rgba(255, 255, 255, 0.7)',
      },
      text: {
        primary: '#000000',
        secondary: '#525252',
        tertiary: '#737373',
        inverse: '#ffffff',
        muted: '#a3a3a3',
      },
      border: {
        primary: '#e5e5e5',
        secondary: '#d4d4d4',
        dark: '#404040',
      },
      interactive: {
        primary: '#000000',
        primaryHover: '#262626',
        secondary: 'transparent',
        secondaryHover: '#000000',
        link: '#000000',
        linkHover: '#525252',
      },
      
      // Standard colors for compatibility
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      
      // Warm neutral for threshold experience
      stone: {
        50: '#fafaf9',
        100: '#f5f5f4',
        200: '#e7e5e4',
        300: '#d6d3d1',
        400: '#a8a29e',
        500: '#78716c',
        600: '#57534e',
        700: '#44403c',
        800: '#292524',
        900: '#1c1917',
        950: '#0c0a09',
      },
    },
    
    fontFamily: {
      primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      secondary: ['Georgia', 'Times New Roman', 'serif'],
      mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      serif: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    
    spacing: {
      0: '0',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    boxShadow: {
      none: 'none',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },
    
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      60: '60',
      70: '70',
      80: '80',
      90: '90',
      100: '100',
    },
    
    transitionDuration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    transitionTimingFunction: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      linear: 'linear',
    },
    
    extend: {
      // Custom CSS variables for dynamic theming
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      
      // Typography presets as utilities
      typography: {
        'hero-large': {
          fontSize: '4.5rem',
          fontWeight: '300',
          lineHeight: '1.25',
          letterSpacing: '-0.025em',
        },
        'hero-medium': {
          fontSize: '3rem',
          fontWeight: '300',
          lineHeight: '1.25',
          letterSpacing: '-0.025em',
        },
        'h1': {
          fontSize: '2.25rem',
          fontWeight: '300',
          lineHeight: '1.25',
          letterSpacing: '-0.025em',
        },
        'h2': {
          fontSize: '1.875rem',
          fontWeight: '400',
          lineHeight: '1.375',
          letterSpacing: 'normal',
        },
        'h3': {
          fontSize: '1.5rem',
          fontWeight: '500',
          lineHeight: '1.375',
          letterSpacing: 'normal',
        },
        'h4': {
          fontSize: '1.25rem',
          fontWeight: '500',
          lineHeight: '1.5',
          letterSpacing: 'normal',
        },
        'h5': {
          fontSize: '1.125rem',
          fontWeight: '600',
          lineHeight: '1.5',
          letterSpacing: 'normal',
        },
        'h6': {
          fontSize: '1rem',
          fontWeight: '600',
          lineHeight: '1.5',
          letterSpacing: '0.025em',
        },
        'body-large': {
          fontSize: '1.25rem',
          fontWeight: '400',
          lineHeight: '1.625',
          letterSpacing: 'normal',
        },
        'body-medium': {
          fontSize: '1.125rem',
          fontWeight: '400',
          lineHeight: '1.625',
          letterSpacing: 'normal',
        },
        'body-base': {
          fontSize: '1rem',
          fontWeight: '400',
          lineHeight: '1.5',
          letterSpacing: 'normal',
        },
        'body-small': {
          fontSize: '0.875rem',
          fontWeight: '400',
          lineHeight: '1.5',
          letterSpacing: 'normal',
        },
        'button-large': {
          fontSize: '1.125rem',
          fontWeight: '500',
          lineHeight: '1.25',
          letterSpacing: 'normal',
        },
        'button-medium': {
          fontSize: '1rem',
          fontWeight: '500',
          lineHeight: '1.25',
          letterSpacing: 'normal',
        },
        'caption': {
          fontSize: '0.875rem',
          fontWeight: '400',
          lineHeight: '1.375',
          letterSpacing: 'normal',
        },
        'label': {
          fontSize: '0.75rem',
          fontWeight: '500',
          lineHeight: '1.25',
          letterSpacing: '0.025em',
        },
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    // Custom plugin to add component utilities
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        // Typography presets
        '.text-hero-large': {
          fontSize: theme('extend.typography.hero-large.fontSize'),
          fontWeight: theme('extend.typography.hero-large.fontWeight'),
          lineHeight: theme('extend.typography.hero-large.lineHeight'),
          letterSpacing: theme('extend.typography.hero-large.letterSpacing'),
        },
        '.text-hero-medium': {
          fontSize: theme('extend.typography.hero-medium.fontSize'),
          fontWeight: theme('extend.typography.hero-medium.fontWeight'),
          lineHeight: theme('extend.typography.hero-medium.lineHeight'),
          letterSpacing: theme('extend.typography.hero-medium.letterSpacing'),
        },
        '.text-headline-1': {
          fontSize: theme('extend.typography.headline-1.fontSize'),
          fontWeight: theme('extend.typography.headline-1.fontWeight'),
          lineHeight: theme('extend.typography.headline-1.lineHeight'),
          letterSpacing: theme('extend.typography.headline-1.letterSpacing'),
        },
        '.text-headline-2': {
          fontSize: theme('extend.typography.headline-2.fontSize'),
          fontWeight: theme('extend.typography.headline-2.fontWeight'),
          lineHeight: theme('extend.typography.headline-2.lineHeight'),
          letterSpacing: theme('extend.typography.headline-2.letterSpacing'),
        },
        '.text-headline-3': {
          fontSize: theme('extend.typography.headline-3.fontSize'),
          fontWeight: theme('extend.typography.headline-3.fontWeight'),
          lineHeight: theme('extend.typography.headline-3.lineHeight'),
          letterSpacing: theme('extend.typography.headline-3.letterSpacing'),
        },
        '.text-body-large': {
          fontSize: theme('extend.typography.body-large.fontSize'),
          fontWeight: theme('extend.typography.body-large.fontWeight'),
          lineHeight: theme('extend.typography.body-large.lineHeight'),
          letterSpacing: theme('extend.typography.body-large.letterSpacing'),
        },
        '.text-body-medium': {
          fontSize: theme('extend.typography.body-medium.fontSize'),
          fontWeight: theme('extend.typography.body-medium.fontWeight'),
          lineHeight: theme('extend.typography.body-medium.lineHeight'),
          letterSpacing: theme('extend.typography.body-medium.letterSpacing'),
        },
        '.text-body-base': {
          fontSize: theme('extend.typography.body-base.fontSize'),
          fontWeight: theme('extend.typography.body-base.fontWeight'),
          lineHeight: theme('extend.typography.body-base.lineHeight'),
          letterSpacing: theme('extend.typography.body-base.letterSpacing'),
        },
        '.text-body-small': {
          fontSize: theme('extend.typography.body-small.fontSize'),
          fontWeight: theme('extend.typography.body-small.fontWeight'),
          lineHeight: theme('extend.typography.body-small.lineHeight'),
          letterSpacing: theme('extend.typography.body-small.letterSpacing'),
        },
        '.text-button-large': {
          fontSize: theme('extend.typography.button-large.fontSize'),
          fontWeight: theme('extend.typography.button-large.fontWeight'),
          lineHeight: theme('extend.typography.button-large.lineHeight'),
          letterSpacing: theme('extend.typography.button-large.letterSpacing'),
        },
        '.text-button-medium': {
          fontSize: theme('extend.typography.button-medium.fontSize'),
          fontWeight: theme('extend.typography.button-medium.fontWeight'),
          lineHeight: theme('extend.typography.button-medium.lineHeight'),
          letterSpacing: theme('extend.typography.button-medium.letterSpacing'),
        },
        '.text-caption': {
          fontSize: theme('extend.typography.caption.fontSize'),
          fontWeight: theme('extend.typography.caption.fontWeight'),
          lineHeight: theme('extend.typography.caption.lineHeight'),
          letterSpacing: theme('extend.typography.caption.letterSpacing'),
        },
        '.text-label': {
          fontSize: theme('extend.typography.label.fontSize'),
          fontWeight: theme('extend.typography.label.fontWeight'),
          lineHeight: theme('extend.typography.label.lineHeight'),
          letterSpacing: theme('extend.typography.label.letterSpacing'),
        },
        
        // Button components
        '.btn-primary': {
          backgroundColor: theme('colors.interactive.primary'),
          color: theme('colors.text.inverse'),
          padding: `${theme('spacing.3')} ${theme('spacing.8')}`,
          fontSize: theme('extend.typography.button-large.fontSize'),
          fontWeight: theme('extend.typography.button-large.fontWeight'),
          lineHeight: theme('extend.typography.button-large.lineHeight'),
          border: 'none',
          cursor: 'pointer',
          transition: `all ${theme('transitionDuration.normal')} ease-in-out`,
          '&:hover': {
            backgroundColor: theme('colors.interactive.primaryHover'),
          },
        },
        
        '.btn-secondary': {
          backgroundColor: 'transparent',
          color: theme('colors.text.primary'),
          padding: `${theme('spacing.3')} ${theme('spacing.8')}`,
          fontSize: theme('extend.typography.button-large.fontSize'),
          fontWeight: theme('extend.typography.button-large.fontWeight'),
          lineHeight: theme('extend.typography.button-large.lineHeight'),
          border: `1px solid ${theme('colors.text.primary')}`,
          cursor: 'pointer',
          transition: `all ${theme('transitionDuration.normal')} ease-in-out`,
          '&:hover': {
            backgroundColor: theme('colors.interactive.secondaryHover'),
            color: theme('colors.text.inverse'),
          },
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
