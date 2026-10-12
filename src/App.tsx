import { MotionConfig } from 'motion/react'
import { FontSwitcher } from './components/layout/FontSwitcher'
import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { ModernHome } from './components/modern/ModernHome'
import { Faq } from './components/sections/Faq'
import { FinalCta } from './components/sections/FinalCta'
import { Founders } from './components/sections/Founders'
import { Guides } from './components/sections/Guides'
import { Hero } from './components/sections/Hero'
import { Partners } from './components/sections/Partners'
import { QuickLinks } from './components/sections/QuickLinks'
import { Reviews } from './components/sections/Reviews'
import { Situations } from './components/sections/Situations'
import { Statement } from './components/sections/Statement'
import { Steps } from './components/sections/Steps'
import { Values } from './components/sections/Values'
import { useScrollHover } from './lib/useScrollHover'
import { useTestOption } from './lib/useTestOption'

export default function App() {
  const modern = useTestOption('design') === 'modern'
  useScrollHover()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[70] rounded-brand bg-white px-4 py-3 font-bold text-purple focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        {modern ? (
          <ModernHome />
        ) : (
          <>
            <Hero />
            <QuickLinks />
            <Steps />
            <Statement />
            <Values />
            <Reviews />
            <Partners />
            <Situations />
            <Founders />
            <Guides />
            <Faq />
            <FinalCta />
          </>
        )}
      </main>
      <Footer />
      <FontSwitcher />
    </MotionConfig>
  )
}
