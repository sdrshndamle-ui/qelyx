import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// Plugin to copy staticwebapp.config.json to dist folder
const copyStaticWebAppConfig = () => {
  return {
    name: 'copy-staticwebapp-config',
    closeBundle() {
      try {
        copyFileSync(
          join(__dirname, 'staticwebapp.config.json'),
          join(__dirname, 'dist', 'staticwebapp.config.json')
        )
      } catch (error) {
        console.warn('Could not copy staticwebapp.config.json:', error.message)
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyStaticWebAppConfig()],
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


