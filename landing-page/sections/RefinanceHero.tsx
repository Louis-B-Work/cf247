import { motion } from 'motion/react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { trustpilot } from '../../src/data/reviews'
import { heroBullets, refinanceApr, refinanceImages, refinanceQuoteUrl, softSearchNote } from '../../src/data/refinance'
import { Button } from '../../src/components/ui/Button'
import { Icon } from '../../src/components/ui/Icon'
import { Accent, EndSmile } from '../../src/components/ui/Smile'
import { TrustpilotLogo, TrustpilotStars } from '../../src/components/ui/Trustpilot'

const ease = [0.22, 1, 0.36, 1] as const

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.22em] block overflow-hidden pr-[0.4em] pb-[0.34em] whitespace-nowrap hero-centered:px-[0.2em]">
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

/** UK number plate input with the quote button. The reg is passed to the quote journey when entered. */
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
    <form onSubmit={onSubmit} className="flex w-full max-w-[640px] flex-col gap-3 sm:flex-row sm:items-stretch hero-centered:mx-auto">
      <label htmlFor={id} className="sr-only">
        Your car registration (optional)
      </label>
      <div className="flex h-[60px] w-full shrink-0 overflow-hidden rounded-brand sm:w-auto sm:flex-1 bg-[#FFD500] shadow-[0_18px_40px_-18px_rgba(22,1,50,0.6)] ring-2 ring-blackcurrant/80 focus-within:ring-4 focus-within:ring-lime sm:h-16">
        {/* The blue UK identifier strip found on the left of a real plate. */}
        <span aria-hidden className="flex w-11 shrink-0 flex-col items-center justify-end bg-[#0B4EA2] pb-2 text-[11px] font-bold tracking-wide text-white sm:w-12">
          UK
        </span>
        <input
          id={id}
          value={reg}
          onChange={(e) => setReg(formatReg(e.target.value))}
          placeholder="ENTER REG"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          inputMode="text"
          className="h-full min-w-0 flex-1 bg-transparent px-4 text-center font-display text-[26px] font-bold tracking-[0.08em] text-blackcurrant uppercase outline-none placeholder:text-blackcurrant/40 sm:text-[30px] [&:focus-visible]:outline-none"
        />
      </div>
      <Button type="submit" variant="reverse" size="xl">
        Get my quote
      </Button>
    </form>
  )
}

export function RefinanceHero() {
  const img = refinanceImages.hero
  return (
    <section id="top" className="on-dark relative isolate overflow-hidden bg-purple pt-[var(--nav-height)]">
      {/* Photo on the right on desktop; on phones it sits beneath the copy as a framed image. */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-[46%] lg:block hero-centered:lg:hidden">
        <img src={img.src} alt="" className="h-full w-full object-cover object-[35%_50%]" fetchPriority="high" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-purple)_0%,rgba(105,5,242,0.55)_18%,rgba(105,5,242,0)_45%)]" />
      </div>

      <div className="container-wide relative grid grid-cols-1 gap-10 pt-[clamp(28px,5svh,48px)] pb-14 lg:grid-cols-12 lg:pt-16 lg:pb-20">
        {/* Test option "Centred, no car": no photo, everything centred. */}
        <div className="lg:col-span-7 hero-centered:mx-auto hero-centered:w-full hero-centered:max-w-4xl hero-centered:min-w-0 hero-centered:text-center hero-centered:lg:col-span-12">
          <h1 className="text-[clamp(3rem,13.5vw,3.75rem)] leading-[calc(var(--leading-title)-0.12)] font-medium tracking-[-0.035em] sm:text-[clamp(3.5rem,5.6vw,5.5rem)]">
            <Line delay={0.1}>Refinance</Line>
            <Line delay={0.22}>
              your <EndSmile tone="white" size={0.62} delay={1}><Accent>car</Accent></EndSmile>
            </Line>
          </h1>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="mt-6 flex flex-col gap-2.5 text-[17px] sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-x-6 md:text-lg hero-centered:items-center hero-centered:sm:justify-center"
          >
            {heroBullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-[7px] bg-lime text-blackcurrant">
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
            <p className="mb-3 font-display text-base font-semibold text-white/90">Enter your reg to get started</p>
            <RegForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-7"
          >
            <a href={trustpilot.url} className="group flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] hero-centered:justify-center">
              <strong className="font-display">Excellent</strong>
              <TrustpilotStars tone="light" boxClassName="size-[22px]" />
              <span className="text-white/75 transition-colors group-hover:text-white">{trustpilot.reviews} reviews on</span>
              <TrustpilotLogo tone="light" className="text-[16px]" />
            </a>
          </motion.div>

          <div className="mt-6 max-w-xl space-y-1.5 text-[13px] leading-relaxed text-white/75 hero-centered:mx-auto">
            <p className="flex gap-2 hero-centered:justify-center">
              <Icon name="shield" className="mt-0.5 size-4 shrink-0 text-lime" />
              <span>{softSearchNote}</span>
            </p>
            <p>Representative {refinanceApr}% APR. Car Finance 247 Limited is a credit broker, not a lender.</p>
          </div>
        </div>

        {/* Phones and tablets: the photo as a framed image under the copy. */}
        <div className="overflow-hidden rounded-brand lg:hidden hero-centered:hidden">
          <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[16/10] w-full object-cover object-[40%_50%]" />
        </div>
      </div>
    </section>
  )
}
