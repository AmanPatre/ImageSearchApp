import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  
  // We are setting the frontend to run on port 3000
  server: {
    port: 3000, 
    proxy: {
      // This will proxy any request starting with /api
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // This will proxy any request starting with /auth
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})