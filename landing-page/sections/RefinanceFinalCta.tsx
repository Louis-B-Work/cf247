import { refinanceApr, refinanceQuoteUrl, softSearchNote } from '../../src/data/refinance'
import { Button } from '../../src/components/ui/Button'
import { Reveal } from '../../src/components/ui/Reveal'
import { Accent, EndSmile } from '../../src/components/ui/Smile'

/** Closing purple band: one clear action before the footer. */
export function RefinanceFinalCta() {
  return (
    <section aria-labelledby="lp-final-title" className="on-dark relative isolate overflow-hidden bg-purple py-16 md:py-24">
      <div
        aria-hidden
        className="absolute -right-[15vw] -bottom-[40%] -z-10 aspect-square w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(165,105,247,0.5),rgba(105,5,242,0))]"
      />
      <Reveal className="container-cf flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 id="lp-final-title" className="text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[var(--leading-title)] font-medium">
            Ready to see what you could <EndSmile tone="white" size={0.66}><Accent>save?</Accent></EndSmile>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/80">{softSearchNote}</p>
        </div>
        <div className="shrink-0">
          <Button href={refinanceQuoteUrl} variant="reverse" size="xl">
            Get my quote
          </Button>
          <p className="mt-3 text-[13px] text-white/70">Representative {refinanceApr}% APR</p>
        </div>
      </Reveal>
    </section>
  )
}
