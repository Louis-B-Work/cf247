import { motion } from 'motion/react'
import { images } from '../../data/images'
import { quoteUrl } from '../../data/nav'
import { trustpilot } from '../../data/reviews'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Accent, EndSmile, SmileMark } from '../ui/Smile'
import { TrustpilotLogo, TrustpilotStars } from '../ui/Trustpilot'
import { panel } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

export function ModernFinalCta() {
  const img = images.finalCta

  return (
    <section aria-labelledby="final-title" className="bg-white py-14 md:py-20">
      <div className="container-xl">
        <div
          className={cn(
            'on-dark relative isolate overflow-hidden bg-purple p-5 shadow-[0_42px_100px_-60px_rgba(22,1,50,0.9)] ring-1 ring-white/20 sm:p-7 lg:p-8',
            panel,
          )}
        >
          <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_22%_10%,color-mix(in_srgb,var(--color-lime)_25%,transparent),rgba(105,5,242,0)_28%),radial-gradient(circle_at_84%_84%,rgba(165,105,247,0.55),rgba(105,5,242,0)_35%)]" />
          <div aria-hidden className="pointer-events-none absolute -top-28 -right-20 -z-10 text-[360px] leading-none opacity-[0.08] md:text-[500px]">
            <SmileMark tone="white" size={1} delay={0} className="ml-0 block" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.85fr)] lg:items-stretch">
            <Reveal className="flex flex-col justify-center px-1 py-5 sm:px-4 lg:px-6 lg:py-6">
              <h2 id="final-title" className="text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[0.98] font-medium tracking-[-0.05em] text-white">
                Let’s get you{' '}
                <EndSmile tone="white" size={0.62} delay={0.35}>
                  <Accent>started</Accent>
                </EndSmile>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/84 md:text-[17px]">
                Applying only takes a couple of minutes.
              </p>

              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                <Button href={quoteUrl} variant="reverse" size="2xl" className="max-sm:w-full max-sm:justify-center">
                  Get my quote
                </Button>
                <a href={trustpilot.url} className="group flex flex-col gap-1.5 text-sm text-white/78 transition-colors hover:text-white">
                  <span className="flex items-center gap-2">
                    <TrustpilotStars boxClassName="size-[19px]" />
                    <strong className="font-display text-white">Excellent</strong>
                  </span>
                  <span className="flex flex-wrap items-center gap-x-1.5">
                    {trustpilot.reviews} reviews on <TrustpilotLogo tone="light" className="text-sm" />
                  </span>
                </a>
              </div>

              <p className="mt-5 max-w-lg text-xs leading-relaxed text-white/66 sm:text-[13px]">
                Representative 19.5% APR. Car Finance 247 Limited is a credit broker, not a lender.
              </p>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 34, rotate: 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease, delay: 0.08 }}
              // Phones: the photo is cropped around the car and the "Quick to apply" card sits underneath it. Larger screens float the card over the empty sky, top right, so it never covers the car.
              className="relative flex flex-col overflow-hidden rounded-brand bg-blackcurrant ring-1 ring-white/20 sm:block sm:min-h-[300px] lg:min-h-[340px]"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ objectPosition: img.objectPosition }}
                className="aspect-[2/1] w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-brand)] hover:scale-[1.04] max-sm:[object-position:60%_45%]! sm:absolute sm:inset-0 sm:h-full"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(22,1,50,0.04),rgba(22,1,50,0.2)_48%,rgba(22,1,50,0.74))] max-sm:hidden" />
              <div className="relative p-4 text-white sm:absolute sm:top-5 sm:right-5 sm:left-auto sm:max-w-[300px] sm:rounded-brand sm:bg-blackcurrant/45 sm:ring-1 sm:ring-white/20 sm:backdrop-blur-md">
                <p className="font-display text-xl leading-tight font-semibold">Quick to apply</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Answer a few quick questions and see your personalised quote in minutes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
