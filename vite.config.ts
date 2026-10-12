import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Two pages share one set of components and styles: the homepage (/) and the refinance landing page (/landing-page/).
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/cf247/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        landingPage: resolve(import.meta.dirname, 'landing-page/index.html'),
      },
    },
  },
})