import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/farmers-market/', //I think remove this for docker container
  plugins: [
    react(),
    tailwindcss
  ],
})
