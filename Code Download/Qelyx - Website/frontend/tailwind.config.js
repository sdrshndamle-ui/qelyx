/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#0A1A2F',
        'primary-ocean': '#0F2A4A',
        'primary-legacy': '#1A3A5C',
        'secondary-azure': '#1E4D7B',
        'secondary-bright': '#2563EB',
        'accent-sky': '#3B82F6',
        'accent-aqua': '#06B6D4',
        'accent-cyan': '#22D3EE',
        'graphite': '#374151',
        'cloud-white': '#F8FAFC',
        'pure-white': '#FFFFFF',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      maxWidth: {
        'content': '1280px',
      },
    },
  },
  plugins: [],
}


