import { MotionConfig } from 'motion/react'
import { FontSwitcher } from '../src/components/layout/FontSwitcher'
import { Footer } from '../src/components/layout/Footer'
import { Nav } from '../src/components/layout/Nav'
import { Faq } from '../src/components/sections/Faq'
import { Partners } from '../src/components/sections/Partners'
import { Reviews } from '../src/components/sections/Reviews'
import { footerNotes, refinanceFaqs, refinanceQuoteUrl } from '../src/data/refinance'
import { Explainer, ProsCons, WhyUs } from './sections/Content'
import { RefinanceCalculator } from './sections/RefinanceCalculator'
import { RefinanceFinalCta } from './sections/RefinanceFinalCta'
import { RefinanceHero } from './sections/RefinanceHero'

/** Refinance paid landing page: one goal (get a quote), no site navigation, built from the homepage design system. */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[70] rounded-brand bg-white px-4 py-3 font-bold text-purple focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav variant="minimal" quoteHref={refinanceQuoteUrl} />
      <main id="main">
        <RefinanceHero />
        <RefinanceCalculator />
        <Explainer />
        <ProsCons />
        <WhyUs />
        <Reviews showVideos={false} quoteHref={refinanceQuoteUrl} />
        <Partners />
        <Faq categories={refinanceFaqs} />
        <RefinanceFinalCta />
      </main>
      <Footer variant="compact" notes={footerNotes} />
      <FontSwitcher />
    </MotionConfig>
  )
}
