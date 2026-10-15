import { MotionConfig } from 'motion/react'
import { FontSwitcher } from '../src/components/layout/FontSwitcher'
import { Footer } from '../src/components/layout/Footer'
import { Faq } from '../src/components/sections/Faq'
import { Accent } from '../src/components/ui/Smile'
import { footerNotes, refinanceFaqs } from '../src/data/refinance'
import { Explainer, HowItWorks, ProsCons, TrustpilotBand, WhyUs } from './sections/Content'
import { RefinanceCalculator } from './sections/RefinanceCalculator'
import { RefinanceFinalCta } from './sections/RefinanceFinalCta'
import { RefinanceHero } from './sections/RefinanceHero'

/**
 * Refinance paid landing page: one goal (get a quote). Like the live page there is no nav, just the logo in the hero.
 * Sections, headings and copy follow the live page (carfinance247.co.uk/refinance) in the same order, for SEO.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[70] rounded-brand bg-white px-4 py-3 font-bold text-purple focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <main id="main">
        <RefinanceHero />
        <RefinanceCalculator />
        <Explainer />
        <ProsCons />
        <HowItWorks />
        <WhyUs />
        <TrustpilotBand />
        <RefinanceFinalCta />
        <Faq
          categories={refinanceFaqs}
          flat
          contact={false}
          title={
            <>
              Frequently Asked <Accent>Questions</Accent>
            </>
          }
        />
      </main>
      <Footer variant="compact" notes={footerNotes} />
      <FontSwitcher page="landing" />
    </MotionConfig>
  )
}
