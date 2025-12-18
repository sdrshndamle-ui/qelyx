/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors (Qelyx Solutioning Platform)
        'bg': '#0a0f1c',
        'bg-alt': '#0f1625',
        'surface': '#151b2e',
        'surface-elevated': '#1c2438',
        
        // Text Colors
        'text': '#ffffff',
        'text-muted': '#a0aec0',
        'text-subtle': '#718096',
        
        // Primary Colors (Brand)
        'primary': '#00d9ff',
        'primary-dark': '#00b8d4',
        'primary-light': '#33e0ff',
        
        // Accent Colors
        'accent': '#6366f1',
        'accent-dark': '#4f46e5',
        
        // Legacy colors for backward compatibility
        'primary-navy': '#0a0f1c',
        'primary-ocean': '#0f1625',
        'primary-legacy': '#1A3A5C',
        'secondary-azure': '#1E4D7B',
        'secondary-bright': '#2563EB',
        'accent-sky': '#3B82F6',
        'accent-aqua': '#00d9ff',
        'accent-cyan': '#22D3EE',
        'graphite': '#374151',
        'cloud-white': '#F8FAFC',
        'pure-white': '#FFFFFF',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        'mono': ['source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.02em' }],
        'section': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.02em' }],
        'h1': ['2.5rem', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.02em' }],
        'h2': ['2rem', { lineHeight: '1.2', fontWeight: '800', letterSpacing: '-0.02em' }],
        'h3': ['1.4rem', { lineHeight: '1.3', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h4': ['1.2rem', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '-0.01em' }],
        'body-large': ['1.15rem', { lineHeight: '1.7', fontWeight: '400', letterSpacing: '-0.01em' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '-0.01em' }],
        'body-small': ['0.9rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '-0.01em' }],
        'eyebrow': ['0.8rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '0.12em' }],
        'button': ['0.95rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '0' }],
        'caption': ['0.85rem', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0.01em' }],
        'label': ['0.9rem', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.02em' }],
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'md': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'lg': '0 16px 48px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 40px rgba(0, 217, 255, 0.2)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      maxWidth: {
        'content': '1280px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00d9ff, #00b8d4)',
        'gradient-accent': 'linear-gradient(135deg, #6366f1, #4f46e5)',
      },
    },
  },
  plugins: [],
}




