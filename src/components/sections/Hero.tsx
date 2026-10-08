import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { heroCar } from '../../data/assets'
import { quoteUrl } from '../../data/nav'
import { trustpilot } from '../../data/reviews'
import { Button } from '../ui/Button'
import { Accent, EndSmile } from '../ui/Smile'
import { TrustpilotLogo, TrustpilotStars } from '../ui/Trustpilot'
import { HeroSearch } from './HeroSearch'

const ease = [0.22, 1, 0.36, 1] as const

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.22em] block overflow-hidden pr-[0.4em] pb-[0.34em] whitespace-nowrap">
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  // z-10 and overflow-x-clip let the car hang over the white section below without causing sideways scroll.
  return (
    <section id="top" className="on-dark relative isolate z-10 flex flex-col overflow-x-clip bg-purple pt-[var(--nav-height)] max-sm:min-h-[80svh]">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-[20vw] bottom-[-40vh] aspect-square w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(165,105,247,0.45),rgba(105,5,242,0))]" />
      </div>

      <div className="container-wide relative flex flex-1 flex-col pt-[clamp(24px,4svh,40px)] pb-0 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-12 lg:pb-16 xl:pt-14 xl:pb-16">
        <div className="relative z-10 flex flex-1 flex-col justify-center sm:block sm:flex-none lg:col-span-8">
          <h1 className="text-[clamp(3rem,13.5vw,3.75rem)] sm:text-[clamp(3.5rem,5.6vw,5.75rem)] leading-[calc(var(--leading-title)-0.12)] font-medium tracking-[-0.035em]">
            <Line delay={0.1}>Car finance</Line>
            <Line delay={0.22}>
              made <EndSmile tone="white" size={0.62} delay={1}><Accent>easy</Accent></EndSmile>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/85 sm:mt-5 sm:text-base md:mt-6 md:text-lg"
          >
            Find your next car, compare finance from our panel of lenders and get a decision in minutes. No impact
            on your credit score.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="mt-[clamp(28px,4.5svh,40px)] flex max-w-[820px] flex-col items-center gap-5 sm:mt-6 sm:flex-row sm:items-stretch sm:gap-3 md:mt-7"
          >
            <div className="w-full flex-1">
              <HeroSearch />
            </div>
            {/* Separates the two routes in: search for help, or go straight to a quote. */}
            <span
              aria-hidden
              className="flex w-full items-center gap-3 font-display text-base font-medium text-white/70 sm:w-auto sm:px-1"
            >
              <span className="h-px flex-1 bg-white/20 sm:hidden" />
              or
              <span className="h-px flex-1 bg-white/20 sm:hidden" />
            </span>
            <Button href={quoteUrl} variant="reverse" size="xl">
              Get my quote
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-[clamp(28px,4.5svh,40px)] flex justify-center sm:mt-5 sm:justify-start md:mt-6"
          >
            {/* Phones: two short centred lines under the centred quote button. Larger screens: one line. */}
            <a
              href={trustpilot.url}
              className="group flex flex-col items-center gap-2.5 text-[15px] sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-2"
            >
              <span className="flex items-center gap-3">
                <strong className="font-display">Excellent</strong>
                <TrustpilotStars tone="light" boxClassName="size-[22px]" />
              </span>
              <span className="flex items-center gap-2">
                <span className="text-white/75 transition-colors group-hover:text-white">
                  {trustpilot.reviews} reviews on
                </span>
                <TrustpilotLogo tone="light" className="text-[16px]" />
              </span>
            </a>
          </motion.div>

          <p className="mx-auto mt-6 max-w-[34ch] text-center text-xs leading-relaxed text-white/65 sm:mx-0 sm:mt-4 sm:max-w-md sm:text-left sm:text-[13px] sm:text-white/70">
            Rates from 8.9% APR. Representative 19.5% APR. Car Finance 247 Limited is a credit broker, not a lender.
          </p>
        </div>

        {/*
          The animated wrapper is itself the positioned element. Putting the transform on a parent of an
          absolutely positioned image changes its containing block mid-animation, which made the car jump.
        */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.35 }}
          className="relative mt-auto pt-[clamp(24px,4.5svh,40px)] sm:mt-6 sm:pt-0 lg:absolute lg:mt-0 lg:right-[var(--wide-right)] lg:bottom-0 lg:w-[32vw] xl:w-[min(32vw,600px)]"
        >
          <img
            src={heroCar.src}
            alt={heroCar.alt}
            width={1800}
            height={1125}
            fetchPriority="high"
            className="relative z-0 mx-auto -mb-[33%] w-[min(70%,360px)] sm:mt-0 sm:mr-0 sm:ml-auto sm:-mb-[18%] lg:mt-0 drop-shadow-[0_24px_24px_rgba(22,1,50,0.28)] sm:w-[min(48%,360px)] lg:mb-0 lg:w-full lg:translate-y-[34%]"
          />
        </motion.div>
      </div>
    </section>
  )
}
