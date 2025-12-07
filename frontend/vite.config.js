import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  assetsInclude: ['**/*.PNG', '**/*.png'],
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Minify output (using esbuild which is faster and included by default)
    minify: 'esbuild',
  },
})


