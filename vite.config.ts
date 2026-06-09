import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    target: 'ES2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor'
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/framer-motion')) {
            return 'animations'
          }
          if (id.includes('node_modules/tailwindcss')) {
            return 'styles'
          }
          return undefined
        },
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name].[hash][extname]'
          }
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].some(ext => assetInfo.name?.endsWith(`.${ext}`))) {
            return 'images/[name].[hash][extname]'
          }
          if (assetInfo.name?.endsWith('.mp4') || assetInfo.name?.endsWith('.webm')) {
            return 'videos/[name].[hash][extname]'
          }
          return '[name].[hash][extname]'
        }
      }
    },
    // Optimize for performance
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
    lib: undefined
  },
  // Tree-shaking and optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'framer-motion', '@supabase/supabase-js'],
    exclude: []
  }
})
