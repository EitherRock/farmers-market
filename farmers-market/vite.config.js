import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // root: './farmers-market',
  plugins: [
    react(),
    tailwindcss
  ],
  build: {
    outDir: 'dist'
  }
})
