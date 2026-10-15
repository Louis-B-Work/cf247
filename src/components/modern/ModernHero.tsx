import { motion } from 'motion/react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { heroCar } from '../../data/assets'
import { quoteUrl, quoteUrlWithBudget } from '../../data/nav'
import { trustpilot } from '../../data/reviews'
import { Button } from '../ui/Button'
import { Accent } from '../ui/Smile'
import { TrustpilotLogo, TrustpilotStars } from '../ui/Trustpilot'

const ease = [0.22, 1, 0.36, 1] as const

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.2em] inline-block overflow-hidden pr-[0.3em] pb-[0.2em]">
      <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay }}>
        {children}
      </motion.span>
    </span>
  )
}

const MAX_BUDGET = 5000

/** The old homepage's best-converting entry point: a monthly budget passed to the apply form. Empty or invalid input still goes to the form. */
function BudgetForm() {
  const [budget, setBudget] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const amount = Number(budget)
    window.location.href = amount > 0 && amount <= MAX_BUDGET ? quoteUrlWithBudget(amount) : quoteUrl
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5 sm:gap-3">
      <label htmlFor="hero-budget" className="font-display text-lg font-semibold text-white sm:text-xl">
        My monthly budget is
      </label>
      <div className="flex h-14 items-center rounded-inner bg-white px-5 text-blackcurrant shadow-[0_20px_45px_-28px_rgba(22,1,50,0.8)] focus-within:ring-4 focus-within:ring-lime sm:h-16">
        <span aria-hidden className="font-display text-2xl font-bold">
          £
        </span>
        <input
          id="hero-budget"
          name="monthlyBudget"
          inputMode="numeric"
          autoComplete="off"
          maxLength={4}
          placeholder="250"
          value={budget}
          onChange={(event) => setBudget(event.target.value.replace(/\D/g, ''))}
          aria-describedby="hero-budget-hint"
          className="h-full min-w-0 flex-1 bg-transparent pr-6 text-center font-display text-2xl font-semibold outline-none placeholder:text-blackcurrant/30"
        />
      </div>
      <span id="hero-budget-hint" className="sr-only">
        Amount in pounds per month. Optional.
      </span>
      <Button type="submit" variant="reverse" size="2xl" fullWidth className="justify-center">
        Get my quote
      </Button>
    </form>
  )
}

/** Centered modern hero with the brand car anchored beneath the content. */
export function ModernHero() {
  return (
    <section id="top" className="on-dark relative isolate flex min-h-[min(820px,100svh)] flex-col overflow-hidden bg-purple pt-[var(--nav-height)]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-[-12%] left-1/2 aspect-square w-[min(100vw,1050px)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(165,105,247,0.48),rgba(105,5,242,0))]" />
        <div className="absolute right-0 bottom-0 left-0 h-[36%] bg-[linear-gradient(to_bottom,transparent,rgba(22,1,50,0.2))]" />
      </div>

      <motion.img
        src={heroCar.src}
        alt={heroCar.alt}
        fetchPriority="high"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.25 }}
        className="pointer-events-none absolute right-[-8%] bottom-0 z-0 h-[140px] w-[min(112vw,920px)] object-contain object-right-bottom sm:right-[-4%] sm:h-[clamp(170px,32vh,310px)] md:right-0"
      />

      <div className="container-xl relative z-10 mx-auto flex w-full flex-1 flex-col items-center justify-center px-5 pt-10 pb-[150px] text-center sm:translate-y-8 sm:pt-[clamp(4rem,10vh,8rem)] sm:pb-[clamp(190px,32vh,310px)]">
        <h1 className="max-w-5xl text-[clamp(2.5rem,13vw,3.75rem)] leading-[0.98] font-medium tracking-[-0.045em] text-white sm:text-[clamp(1.5rem,7.2vw,6.25rem)] sm:whitespace-nowrap">
          <Line delay={0.1}>
            Car finance <br className="sm:hidden" />
            made{' '}
            <Accent className="text-white">easy</Accent>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
          className="mt-5 flex max-w-2xl flex-col gap-1.5 text-center"
        >
          <span className="text-balance text-base leading-relaxed font-medium text-white sm:text-xl 2xl:text-[22px]">
            Looking to finance or refinance your car? We’ll help you find an option that fits.
          </span>
          <span className="text-sm leading-relaxed text-white/80 sm:text-base">Get a decision in minutes.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
          className="mt-6 w-full max-w-[360px]"
        >
          <BudgetForm />
        </motion.div>

        <motion.a
          href={trustpilot.url}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.75 }}
          className="group mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full border border-white/15 bg-black/10 px-4 py-2 text-xs backdrop-blur-sm sm:text-[13px]"
        >
          <span className="flex items-center gap-2">
            <TrustpilotStars boxClassName="size-[17px]" />
            <strong className="font-display">Excellent</strong>
          </span>
          <span className="flex items-center gap-1.5 text-white/80 transition-colors group-hover:text-white">
            {trustpilot.reviews} reviews on <TrustpilotLogo tone="light" className="text-[13px]" />
          </span>
        </motion.a>

        <p className="mt-4 max-w-xl text-[11px] leading-relaxed text-white/70 sm:text-xs">
          Rates from 8.9% APR. Representative 19.5% APR. Car Finance 247 Limited is a credit broker, not a lender.
        </p>
      </div>
    </section>
  )
}
