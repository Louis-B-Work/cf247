import { Faq } from '../sections/Faq'
import { Founders } from '../sections/Founders'
import { Guides } from '../sections/Guides'
import { ModernFinalCta } from './ModernFinalCta'
import { ModernHero } from './ModernHero'
import { ModernHowItWorks } from './ModernHowItWorks'
import { ModernReviews } from './ModernReviews'
import { ModernSituations } from './ModernSituations'
import { ModernStats } from './ModernStats'
import { ModernTrust } from './ModernTrust'

/**
 * Test option "Site design: Modern" (settings cog): the homepage rebuilt with large panels.
 * Section backgrounds alternate (lilac, white, lilac, blackcurrant, white, lilac, white) so each section reads as its own band.
 */
export function ModernHome() {
  return (
    <div className="bg-purple-10">
      <ModernHero />
      <ModernTrust />
      <ModernHowItWorks />
      <ModernStats />
      <ModernSituations />
      <ModernReviews />
      <Founders />
      <Guides />
      <Faq />
      <ModernFinalCta />
    </div>
  )
}
