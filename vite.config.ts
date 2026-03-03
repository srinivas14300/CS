import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate cacheable chunks
          'vendor-router': ['react-router-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})
