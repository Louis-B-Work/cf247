import { Faq } from '../sections/Faq'
import { Founders } from '../sections/Founders'
import { Guides } from '../sections/Guides'
import { Steps } from '../sections/Steps'
import { Accent } from '../ui/Smile'
import { ModernFinalCta } from './ModernFinalCta'
import { ModernAppSection } from './ModernAppSection'
import { ModernHero } from './ModernHero'
import { representativeExample } from '../../data/assets'
import { ModernHowItWorks } from './ModernHowItWorks'
import { ModernReviews } from './ModernReviews'
import { ModernSituations } from './ModernSituations'
import { ModernTrust } from './ModernTrust'

/**
 * Test option "Site design: Modern" (settings cog): the homepage rebuilt with large panels.
 * Section backgrounds alternate (lilac, white, lilac, blackcurrant, white, lilac, white) so each section reads as its own band.
 */
export function ModernHome() {
  return (
    <div className="bg-purple-10">
      <ModernHero />
      <section aria-label="Representative example" className="bg-white py-5 sm:py-6">
        <p className="container-cf text-center text-xs leading-relaxed text-blackcurrant/60 sm:text-[13px]">
          <span className="mx-auto block max-w-4xl">{representativeExample}</span>
        </p>
      </section>
      <ModernTrust />
      <ModernHowItWorks />
      <ModernSituations />
      <ModernAppSection />
      <ModernReviews />
      <Founders />
      <Guides />
      <Steps
        title={
          <>
            Quote, buy, <Accent>drive away</Accent>
          </>
        }
      />
      <Faq mobileTabs />
      <ModernFinalCta />
    </div>
  )
}
