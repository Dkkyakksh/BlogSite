import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
        proxy: {
            '/api': { // This should match the path in your request
                target: 'http://localhost:8800', // Your API server
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'), // Optional: Keep the same path
            },
        },
    },
})
