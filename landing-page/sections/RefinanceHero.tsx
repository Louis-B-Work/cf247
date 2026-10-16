import { motion } from 'motion/react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { trustpilot } from '../../src/data/reviews'
import { heroBullets, heroDisclaimer, refinanceImages, refinanceQuoteUrl } from '../../src/data/refinance'
import { Logo } from '../../src/components/brand/Logo'
import { Button } from '../../src/components/ui/Button'
import { Accent, EndSmile } from '../../src/components/ui/Smile'
import { TrustpilotLogo, TrustpilotStars } from '../../src/components/ui/Trustpilot'

const ease = [0.22, 1, 0.36, 1] as const

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.22em] block overflow-hidden pr-[0.4em] pb-[0.34em] whitespace-nowrap">
      <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay }}>
        {children}
      </motion.span>
    </span>
  )
}

/** Loosely normalises a UK registration for display: uppercase, letters and numbers, one space before the last three. */
function formatReg(value: string) {
  const raw = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
  return raw.length > 4 ? `${raw.slice(0, raw.length - 3)} ${raw.slice(-3)}` : raw
}

/** A plain reg box with the quote button directly beneath at the same size, as on the live page. The reg is passed to the quote journey when entered. */
function RegForm() {
  const [reg, setReg] = useState('')
  const id = useId()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const url = new URL(refinanceQuoteUrl)
    const clean = reg.replace(/\s/g, '')
    if (clean) url.searchParams.set('reg', clean)
    window.location.assign(url.toString())
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:w-[380px]">
      <label htmlFor={id} className="sr-only">
        Your car registration (optional)
      </label>
      <input
        id={id}
        value={reg}
        onChange={(e) => setReg(formatReg(e.target.value))}
        placeholder="Enter reg"
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        inputMode="text"
        className="h-[52px] w-full min-w-0 rounded-brand bg-white px-4 text-center font-display text-2xl font-bold tracking-[0.06em] text-blackcurrant uppercase outline-none placeholder:tracking-normal placeholder:text-blackcurrant/45 placeholder:normal-case focus-visible:ring-4 focus-visible:ring-lime sm:h-14"
      />
      <Button type="submit" variant="reverse" size="xl" fullWidth attention attentionDelay={1200}>
        Get my quote
      </Button>
    </form>
  )
}

export function RefinanceHero() {
  const img = refinanceImages.hero
  return (
    <section id="top" className="on-dark relative isolate overflow-hidden bg-purple">
      {/* Photo on the right on desktop; on phones it sits beneath the copy as a framed image. */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-[46%] lg:block">
        <img src={img.src} alt="" className="h-full w-full object-cover object-[35%_50%]" fetchPriority="high" />
      </div>

      {/* No nav on the landing page: just the logo, which is not a link so the page keeps one goal. Phones and tablets also get the live page's TrustScore link beside it. */}
      <div className="container-wide relative flex items-center justify-between gap-4 pt-6 sm:pt-8">
        <Logo title="Car Finance 247" className="h-[46px] w-auto text-white sm:h-14" />
        <a href={trustpilot.url} className="flex flex-col items-end gap-1 text-[13px] text-white/80 lg:hidden">
          <TrustpilotStars boxClassName="size-4" />
          <span>
            TrustScore <strong className="text-white">{trustpilot.score}</strong> | <strong className="text-white">{trustpilot.reviews}</strong> reviews
          </span>
        </a>
      </div>

      <div className="container-wide relative grid grid-cols-1 gap-10 pt-[clamp(24px,4svh,40px)] pb-14 lg:grid-cols-12 lg:pt-12 lg:pb-20">
        <div className="lg:col-span-7">
          <h1 className="text-[clamp(3rem,13.5vw,3.75rem)] leading-[calc(var(--leading-title)-0.12)] font-medium tracking-[-0.035em] sm:text-[clamp(3.5rem,5.6vw,5.5rem)] neue-haas:text-[clamp(2.5rem,11.5vw,3.25rem)] neue-haas:sm:text-[clamp(3rem,4.75vw,4.75rem)]">
            <Line delay={0.1}>Refinance</Line>{' '}
            <Line delay={0.22}>
              Car <EndSmile tone="white" size={0.62} delay={1}><Accent>Loan</Accent></EndSmile>
            </Line>
          </h1>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="mt-6 flex flex-col gap-2.5 text-[17px] sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-x-6 md:text-lg"
          >
            {heroBullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-inner bg-lime text-blackcurrant">
                  <svg viewBox="0 0 16 16" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="mt-8 md:mt-10"
          >
            <RegForm />
          </motion.div>

          <div className="mt-6 max-w-xl space-y-2 text-[13px] leading-relaxed text-white/75">
            <p>
              <strong className="text-white">{heroDisclaimer.lead}</strong> {heroDisclaimer.body}
            </p>
            <p>{heroDisclaimer.apr}</p>
            <p>{heroDisclaimer.broker}</p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-6"
          >
            <a href={trustpilot.url} className="group flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]">
              <TrustpilotStars boxClassName="size-[22px]" />
              <strong className="font-display">Rated {trustpilot.score} out of 5 stars</strong>{' '}
              <span className="text-white/75 transition-colors group-hover:text-white">59K reviews</span>{' '}
              <TrustpilotLogo tone="light" className="text-[16px]" />
            </a>
          </motion.div>
        </div>

        {/* Phones and tablets: the photo as a framed image under the copy. */}
        <div className="overflow-hidden rounded-brand lg:hidden">
          <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[16/10] w-full object-cover object-[40%_50%]" />
        </div>
      </div>
    </section>
  )
}
