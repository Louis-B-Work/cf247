import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import { loadBrandFonts } from '../src/lib/fonts'
import App from './App.tsx'

loadBrandFonts()

// iOS Safari only applies :active styles (the button press state) when a touch listener exists.
document.addEventListener('touchstart', () => {}, { passive: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)