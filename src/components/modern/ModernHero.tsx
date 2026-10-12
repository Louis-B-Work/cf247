import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { heroCar } from '../../data/assets'
import { quoteUrl } from '../../data/nav'
import { trustpilot } from '../../data/reviews'
import { Button } from '../ui/Button'
import { Accent, EndSmile } from '../ui/Smile'
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
        className="pointer-events-none absolute right-[-8%] bottom-0 z-0 h-[clamp(170px,32vh,310px)] w-[min(112vw,920px)] object-contain object-right-bottom sm:right-[-4%] md:right-0"
      />

      <div className="container-xl relative z-10 mx-auto flex w-full flex-1 translate-y-6 flex-col items-center justify-center px-5 pt-[clamp(4rem,10vh,8rem)] pb-[clamp(190px,32vh,310px)] text-center sm:translate-y-8">
        <h1 className="max-w-5xl text-[clamp(1.5rem,7.2vw,6.25rem)] leading-[0.98] font-medium tracking-[-0.045em] whitespace-nowrap text-white">
          <Line delay={0.1}>
            Car finance made{' '}
            <EndSmile tone="white" size={0.62} delay={1}>
              <Accent className="text-white">easy</Accent>
            </EndSmile>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
          className="mt-5 flex max-w-2xl flex-col gap-1.5 text-center"
        >
          <span className="text-base leading-relaxed font-medium text-white sm:text-xl 2xl:text-[22px]">
            Tell us your budget and we’ll search our panel of lenders
            {' '}for a deal that fits.
          </span>
          <span className="text-sm leading-relaxed text-white/80 sm:text-base">Get a decision in minutes.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
          className="mt-6"
        >
          <Button href={quoteUrl} variant="reverse" size="2xl">
            Get my quote
          </Button>
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
