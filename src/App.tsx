import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { FontSwitcher } from './components/layout/FontSwitcher'
import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { LiveSite } from './components/live/LiveSite'
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
import { livePage } from './data/liveHome'
import { useTestOption } from './lib/useTestOption'

/** While the live-content option is on, the page title and meta description match the live homepage too. */
function usePageMeta(live: boolean) {
  useEffect(() => {
    if (!live) return
    const title = document.title
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const created = !meta
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.append(meta)
    }
    const description = meta.content
    document.title = livePage.title
    meta.content = livePage.description
    return () => {
      document.title = title
      if (created) meta.remove()
      else meta.content = description
    }
  }, [live])
}

export default function App() {
  const modern = useTestOption('design') === 'modern'
  // Settings cog "Homepage content: Exact replica": the live homepage as it is, with only fonts and colours swapped.
  const live = useTestOption('content') === 'live'
  usePageMeta(live)

  return (
    <MotionConfig reducedMotion="user">
      {live ? (
        <LiveSite />
      ) : (
        <>
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
        </>
      )}
      <FontSwitcher />
    </MotionConfig>
  )
}
