import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { carSrc } from '../../data/cars'
import { images, type BrandImage } from '../../data/images'
import { quoteUrl } from '../../data/nav'
import { cn, siteUrl } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
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
}

function SituationCard({ title, body, cta, href, className, children, dark, wideTitle }: BaseCard) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease }}
      className={cn(
        'group relative isolate flex min-h-[340px] flex-col sm:min-h-[430px] overflow-hidden p-5 shadow-[0_28px_70px_-48px_rgba(22,1,50,0.55)] ring-1 transition-[transform,box-shadow] duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:shadow-[0_36px_85px_-48px_rgba(22,1,50,0.68)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6',
        panel,
        dark ? 'on-dark bg-purple ring-white/15 focus-visible:outline-lime' : 'bg-purple-10 ring-purple/10',
        className,
      )}
    >
      {children}
      <div className="relative z-10 mt-auto">
        <h3
          className={cn(
            'text-[clamp(1.75rem,3vw,2.65rem)] leading-[0.98] font-medium tracking-[-0.035em]',
            wideTitle && 'sm:whitespace-nowrap',
            dark ? 'text-white' : 'text-purple',
          )}
        >
          {title}
        </h3>
        <p className={cn('mt-3 max-w-2xl text-sm leading-relaxed sm:text-base', dark ? 'text-white/78' : 'text-blackcurrant/70')}>{body}</p>
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

function MiniMetric({ label, value, tone = 'light' }: { label: string; value: string; tone?: 'light' | 'dark' }) {
  return (
    <div className={cn('rounded-brand p-3 ring-1', tone === 'dark' ? 'bg-white/10 ring-white/15' : 'bg-purple-10 ring-purple/10')}>
      <p className={cn('text-[11px] font-medium', tone === 'dark' ? 'text-white/62' : 'text-blackcurrant/55')}>{label}</p>
      <p className={cn('mt-1 font-display text-sm font-semibold', tone === 'dark' ? 'text-white' : 'text-purple')}>{value}</p>
    </div>
  )
}

export function ModernSituations() {
  const car = { src: carSrc('kia', 'sportage', 2023, 1000), alt: 'White Kia Sportage' }

  return (
    <section aria-labelledby="situations-title" className="overflow-hidden bg-white py-12 md:py-16">
      <div className="container-cf">
        <Reveal>
          <ModernHeading id="situations-title">
            Car finance for every situation
          </ModernHeading>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-blackcurrant/70 md:text-xl">
            Whether you have found the car, need help with your budget, or want to explore refinancing, we can help you
            take the next step with a soft-search quote.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-6 lg:auto-rows-[minmax(250px,auto)] lg:gap-5 xl:mt-12">
          <SituationCard
            title="Found a car you love?"
            body="Tell us about the car and we’ll search our panel of lenders for a finance quote that fits."
            cta="Get my quote"
            href={quoteUrl}
            wideTitle
            className="lg:col-span-4 lg:min-h-[560px]"
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_65%_15%,rgba(210,180,251,0.85),rgba(240,230,254,0)_38%),linear-gradient(145deg,#f0e6fe,#f7f1ff)]" />
            <div className="relative mb-8 min-h-[230px] sm:min-h-[300px]">
              <div className="absolute top-4 right-0 left-0 grid place-items-center rounded-brand bg-white/70 p-8 ring-1 ring-purple/10">
                <img
                  src={car.src}
                  alt={car.alt}
                  loading="lazy"
                  className="w-[min(90%,640px)] max-w-none transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute top-0 left-0 max-w-[230px] rounded-brand bg-white p-4 text-sm font-semibold text-blackcurrant shadow-[0_24px_60px_-28px_rgba(22,1,50,0.55)] ring-1 ring-purple/10">
                Seen it, love it, now quote it.
              </div>
            </div>
          </SituationCard>

          <SituationCard
            title="Thinking of refinancing your car?"
            body="See if you could pay less each month by checking your refinance options."
            cta="See what I could save"
            href={siteUrl('/refinance-car-finance')}
            dark
            className="lg:col-span-2 lg:min-h-[560px]"
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(142,242,5,0.28),rgba(105,5,242,0)_35%),linear-gradient(180deg,rgba(165,105,247,0.55),rgba(105,5,242,0))]" />
            <div className="mb-8 space-y-3">
              <div className="rounded-brand bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                <p className="text-xs font-semibold text-white/58">Current agreement</p>
                <div className="mt-3 grid gap-2">
                  <MiniMetric tone="dark" label="Monthly payment" value="Review your options" />
                  <MiniMetric tone="dark" label="Balance" value="Check what is left" />
                </div>
              </div>
              <div className="flex justify-center text-lime">
                <Icon name="arrow" className="size-8 rotate-90" />
              </div>
              <div className="rounded-brand bg-white p-4 text-blackcurrant ring-1 ring-white/40">
                <p className="text-xs font-semibold text-blackcurrant/58">Your refinance quote</p>
                <p className="mt-3 font-display text-xl leading-tight font-semibold text-purple">See if you could pay less each month</p>
              </div>
              <p className="text-xs leading-relaxed text-white/68">
                Extending the term of your loan could increase the interest payable.
              </p>
            </div>
          </SituationCard>

          <SituationCard
            title="Still searching for the perfect car?"
            body="Use the calculator to explore what might fit your monthly budget before you start looking."
            cta="See what I can afford"
            href={siteUrl('/car-finance-calculator')}
            dark
            className="lg:col-span-2 lg:min-h-[420px]"
          >
            <PhotoBackdrop image={images.situationSearching} />
          </SituationCard>

          <SituationCard
            title="Bad credit? We look beyond your score"
            body="Some of our lenders specialise in helping people with bad credit, and checking won’t affect your score."
            cta="Find out more"
            href={siteUrl('/bad-credit-car-finance')}
            className="lg:col-span-2 lg:min-h-[420px]"
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(210,180,251,0.9),rgba(240,230,254,0)_36%)]" />
            <div className="mb-12 grid max-w-[260px] gap-3">
              {['Soft-search quote', 'Decision in minutes', 'Bad credit considered'].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-brand bg-white p-3 text-sm font-semibold shadow-[0_18px_45px_-32px_rgba(22,1,50,0.5)] ring-1 ring-purple/10"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-inner bg-purple text-white">
                    <Icon name={i === 0 ? 'search' : i === 1 ? 'heart' : 'shield'} className="size-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </SituationCard>

          <SituationCard
            title="Value my car"
            body="Use your part exchange as a deposit and see how it could shape your next car finance quote."
            cta="Value my car"
            href={siteUrl('/valuations')}
            dark
            className="lg:col-span-2 lg:min-h-[420px]"
          >
            <PhotoBackdrop image={images.situationFound} />
          </SituationCard>
        </div>
      </div>
    </section>
  )
}
