import { commissionNote, refinanceQuoteUrl } from '../../src/data/refinance'
import { Button } from '../../src/components/ui/Button'
import { Reveal } from '../../src/components/ui/Reveal'
import { Accent, EndSmile } from '../../src/components/ui/Smile'

/** Closing purple band with the live page's "Ready to go?" call to action, then its commission disclosure. */
export function RefinanceFinalCta() {
  return (
    <section aria-labelledby="lp-final-title" className="bg-white">
      <div className="on-dark relative isolate overflow-hidden bg-purple py-16 md:py-24">
        <Reveal className="container-cf flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          {/* Not a heading on the live page, so it stays a paragraph to keep the same heading outline. */}
          <p id="lp-final-title" className="font-display text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[var(--leading-title)] font-medium">
            Ready to <EndSmile tone="white" size={0.66}><Accent>go?</Accent></EndSmile>
          </p>
          <Button href={refinanceQuoteUrl} variant="reverse" size="xl" attention>
            Get my quote
          </Button>
        </Reveal>
      </div>
      <p className="container-cf py-8 text-sm leading-relaxed text-blackcurrant/65">{commissionNote}</p>
    </section>
  )
}
