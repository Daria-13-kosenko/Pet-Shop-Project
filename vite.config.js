import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/product_img': 'http://localhost:3333',
      '/category_img': 'http://localhost:3333',
    },
  },
})
