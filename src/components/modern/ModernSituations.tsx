import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { carSrc } from '../../data/cars'
import { images, type BrandImage } from '../../data/images'
import { quoteUrl } from '../../data/nav'
import { trustpilot } from '../../data/reviews'
import { cn, siteUrl } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Accent } from '../ui/Smile'
import { TrustpilotStars } from '../ui/Trustpilot'
import { ModernHeading, panel } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

type BaseCard = {
  title: string
  body: string
  cta: string
  href: string
  className?: string
  children: ReactNode
  dark?: boolean
  /** Keep the title on one line from tablet up. */
  wideTitle?: boolean
  /** No visual above the copy, so when the cards stack the card only needs to fit its text. */
  plain?: boolean
}

function SituationCard({ title, body, cta, href, className, children, dark, wideTitle, plain }: BaseCard) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease }}
      className={cn(
        'group relative isolate flex flex-col overflow-hidden',
        plain ? 'min-h-[220px] sm:min-h-[240px]' : 'min-h-[300px] sm:min-h-[360px]',
        'overflow-hidden p-5 shadow-[0_28px_70px_-48px_rgba(22,1,50,0.55)] ring-1 transition-shadow duration-500 ease-[var(--ease-brand)] hover:shadow-[0_36px_85px_-48px_rgba(22,1,50,0.68)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple motion-reduce:transition-none sm:p-6',
        panel,
        dark ? 'on-dark bg-purple ring-white/15 focus-visible:outline-lime' : 'bg-purple-10 ring-purple/10',
        className,
      )}
    >
      {children}
      <div className="relative z-10 mt-auto">
        <h3
          className={cn(
            'text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.02] font-medium tracking-[-0.03em]',
            wideTitle && 'sm:whitespace-nowrap',
            dark ? 'text-white' : 'text-purple',
          )}
        >
          {title}
        </h3>
        <p className={cn('mt-2.5 max-w-xl text-sm leading-relaxed sm:text-[15px]', dark ? 'text-white/78' : 'text-blackcurrant/70')}>{body}</p>
        <div className="mt-5">
          <Button asSpan variant={dark ? 'reverse' : 'light'} size="md">
            {cta}
          </Button>
        </div>
      </div>
    </motion.a>
  )
}

function PhotoBackdrop({ image }: { image: BrandImage }) {
  return (
    <>
      <img
        src={image.src}
        alt=""
        loading="lazy"
        style={{ objectPosition: image.objectPosition }}
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.06]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(22,1,50,0.2),rgba(22,1,50,0.78))]" />
    </>
  )
}

const stats = [
  { value: '500,000+', label: 'Customers helped' },
  { value: 'Excellent', label: `${trustpilot.reviews} Trustpilot reviews`, stars: true },
  { value: '100,000+', label: 'Cars in our members area' },
]

/** The three proof points, stacked in a quiet card beside the large "Found a car" card. */
function StatsCard({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease }}
      className={cn('flex flex-col justify-center bg-purple-10 px-5 py-2 ring-1 ring-purple/10 sm:px-6', panel, className)}
    >
      <dl className="divide-y divide-purple/15">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-0.5 py-3.5">
            <dt className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-blackcurrant/60">
              {stat.stars && <TrustpilotStars boxClassName="size-3.5" />}
              {stat.label}
            </dt>
            <dd className="font-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-blackcurrant">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  )
}

export function ModernSituations() {
  const car = { src: carSrc('kia', 'sportage', 2023, 1000), alt: 'White Kia Sportage' }

  return (
    <section aria-labelledby="situations-title" className="overflow-hidden bg-white py-14 md:py-20">
      <div className="container-xl">
        <Reveal>
          <ModernHeading id="situations-title">
            Car finance for every <span className="whitespace-nowrap"><Accent>si</Accent>tuation</span>
          </ModernHeading>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-blackcurrant/70 md:text-lg">
            Whether you have found the car, need help with your budget, or want to explore refinancing, we can help you
            take the next step.
          </p>
        </Reveal>

        {/* Desktop: the large card spans two rows; beside it the stats card sits on top and the refinancing card below. The three remaining cards share the last row. */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-[repeat(2,minmax(0,1fr))_auto] lg:gap-5 xl:mt-12">
          <SituationCard
            title="Found a car you love?"
            body="Tell us about the car and we’ll search our panel of lenders for a finance quote that fits."
            cta="Get my quote"
            href={quoteUrl}
            wideTitle
            className="lg:col-span-4 lg:row-span-2 lg:row-start-1 lg:min-h-[460px] 2xl:min-h-[520px]"
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_65%_15%,rgba(210,180,251,0.85),rgba(240,230,254,0)_38%),linear-gradient(145deg,#f0e6fe,#f7f1ff)]" />
            <div className="relative mb-6 pt-4">
              <div className="grid place-items-center rounded-brand bg-white/70 p-6 ring-1 ring-purple/10">
                <img
                  src={car.src}
                  alt={car.alt}
                  loading="lazy"
                  className="w-[min(72%,460px)] max-w-none 2xl:w-[min(72%,580px)] transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute top-0 left-0 max-w-[230px] rounded-brand bg-white p-4 text-sm font-semibold text-blackcurrant shadow-[0_24px_60px_-28px_rgba(22,1,50,0.55)] ring-1 ring-purple/10">
                Seen it, love it, now quote it.
              </div>
            </div>
          </SituationCard>

          <StatsCard className="lg:col-span-2 lg:col-start-5 lg:row-start-1" />

          <SituationCard
            title="Thinking of refinancing your car?"
            body="See if you could pay less each month by checking your refinance options. Extending the term of your loan could increase the interest payable."
            cta="See what I could save"
            href={siteUrl('/refinance-car-finance')}
            dark
            plain
            className="lg:col-span-2 lg:col-start-5 lg:row-start-2"
          >
            {/* Kept simple like the bad credit card: just a soft glow behind the copy. */}
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(165,105,247,0.75),rgba(105,5,242,0)_40%)]" />
          </SituationCard>

          <SituationCard
            title="Still searching for the perfect car?"
            body="Use the calculator to explore what might fit your monthly budget before you start looking."
            cta="See what I can afford"
            href={siteUrl('/car-finance-calculator')}
            dark
            className="lg:col-span-2 lg:row-start-3 lg:min-h-[340px] 2xl:min-h-[400px]"
          >
            <PhotoBackdrop image={images.situationSearching} />
          </SituationCard>

          <SituationCard
            title="Bad credit? We look beyond your score"
            body="Some of our lenders specialise in helping people with bad credit."
            cta="Find out more"
            href={siteUrl('/bad-credit-car-finance')}
            plain
            className="lg:col-span-2 lg:row-start-3 lg:min-h-[340px] 2xl:min-h-[400px]"
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(210,180,251,0.9),rgba(240,230,254,0)_36%)]" />
          </SituationCard>

          <SituationCard
            title="Value my car"
            body="Use your part exchange as a deposit and see how it could shape your next car finance quote."
            cta="Value my car"
            href={siteUrl('/valuations')}
            dark
            className="lg:col-span-2 lg:row-start-3 lg:min-h-[340px] 2xl:min-h-[400px]"
          >
            <PhotoBackdrop image={images.situationFound} />
          </SituationCard>
        </div>
      </div>
    </section>
  )
}
