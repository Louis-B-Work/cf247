import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// The Aeonik trial fonts are licensed for evaluation only, so public/fonts/aeonik is gitignored and only exists on machines that
// have them. Without the files (CI, the shared GitHub Pages site) the Aeonik option is dropped and Overused Grotesk is the default.
const hasAeonik = existsSync(resolve(import.meta.dirname, 'public/fonts/aeonik/AeonikTRIAL-Regular.otf'))

// https://vite.dev/config/
// Two pages share one set of components and styles: the homepage (/) and the refinance landing page (/landing-page/).
export default defineConfig({
  // SITE_BASE overrides the base, for the Aeonik build that is published under /cf247/aeonik/ (see the README).
  base: process.env.SITE_BASE ?? (process.env.GITHUB_ACTIONS === 'true' ? '/cf247/' : '/'),
  define: { __HAS_AEONIK__: JSON.stringify(hasAeonik) },
  plugins: [
    {
      // Listed first so it sees the CSS source before Tailwind rewrites it.
      name: 'has-aeonik-flag',
      enforce: 'pre',
      // The startup scripts in the two HTML pages need the same flag before first paint.
      transformIndexHtml: (html) => html.replaceAll('__HAS_AEONIK__', String(hasAeonik)),
      // Without the files, drop the Aeonik @font-face rules so nothing points at missing files.
      transform(code, id) {
        if (hasAeonik || !id.endsWith('/src/index.css')) return
        return code.replace(/@font-face\s*\{[^}]*font-family:\s*['"]?Aeonik['"]?\s*;[^}]*\}/g, '')
      },
    },
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        landingPage: resolve(import.meta.dirname, 'landing-page/index.html'),
      },
    },
  },
})
