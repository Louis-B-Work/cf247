import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { heroCycle } from '../../data/cars'
import { images } from '../../data/images'
import { quoteUrl } from '../../data/nav'
import { trustpilot } from '../../data/reviews'
import { Button } from '../ui/Button'
import { Accent, EndSmile } from '../ui/Smile'
import { TrustpilotLogo, TrustpilotStars } from '../ui/Trustpilot'
import { cn } from '../../lib/utils'
import { useTestOption } from '../../lib/useTestOption'

const ease = [0.22, 1, 0.36, 1] as const

function Line({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <span className={cn('-mb-[0.22em] block overflow-hidden pr-[0.4em] pb-[0.34em] whitespace-nowrap hero-centered:md:inline-block hero-centered:md:align-top', className)}>
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

const CYCLE_MS = 4000

/** The hero car rotates through the Fiesta and the three value card models. It only runs while the car is shown (Cycling cars and Big headline). */
function useHeroCar(layout: string) {
  const cycling = layout === 'car' || layout === 'big'
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!cycling) return
    // Warm the cache so each swap is instant rather than waiting on the network.
    for (const car of heroCycle) new Image().src = car.src
    const t = window.setInterval(() => setIndex((i) => (i + 1) % heroCycle.length), CYCLE_MS)
    return () => window.clearInterval(t)
  }, [cycling])

  return heroCycle[index]
}

export function Hero() {
  const layout = useTestOption('hero')
  const car = useHeroCar(layout)

  // z-10 and overflow-x-clip let the car hang over the white section below without causing sideways scroll.
  return (
    <section id="top" className="on-dark relative isolate z-10 flex flex-col overflow-x-clip bg-purple pt-[var(--nav-height)] max-sm:min-h-[80svh]">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-[20vw] bottom-[-40vh] aspect-square w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(165,105,247,0.45),rgba(105,5,242,0))] hero-bleed:hidden" />
        {/* Test option "Photo": a full-bleed lifestyle photo under a purple wash, strongest behind the copy. */}
        <div className="hidden hero-bleed:block">
          <img
            src={images.heroBleed.src}
            alt=""
            fetchPriority="high"
            style={{ objectPosition: images.heroBleed.objectPosition }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(to_right,rgba(105,5,242,0.8)_0%,rgba(105,5,242,0.55)_40%,rgba(105,5,242,0.15)_75%,rgba(105,5,242,0.05)_100%)] max-lg:bg-[linear-gradient(to_bottom,rgba(105,5,242,0.75)_0%,rgba(105,5,242,0.6)_60%,rgba(105,5,242,0.35)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(22,1,50,0.45)_0%,rgba(22,1,50,0.2)_40%,rgba(22,1,50,0)_65%)] max-lg:bg-blackcurrant/30" />
          {/* Shade under the clear nav so its white links stay legible on the brighter parts of the photo. */}
          <div className="absolute inset-x-0 top-0 h-[calc(var(--nav-height)*2.5)] bg-[linear-gradient(to_bottom,rgba(22,1,50,0.55),rgba(22,1,50,0))]" />
        </div>
      </div>

      <div className="container-wide relative flex flex-1 flex-col lg:[--wide-left:max(var(--nav-pad),calc((100vw-1480px)/2))] lg:[--wide-right:max(var(--nav-pad),calc((100vw-1480px)/2))] pt-[clamp(24px,4svh,40px)] pb-0 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-12 lg:pb-16 lg:min-h-[clamp(592px,calc(100svh-var(--nav-height)-min(6.8vw,128px)-24px-56px),1240px)] xl:pt-14 xl:pb-16 hero-centered:pb-20 hero-centered:md:pt-20 hero-centered:md:pb-28 hero-centered:lg:pt-12 hero-centered:lg:pb-16 hero-centered:lg:min-h-[clamp(592px,calc(100svh-var(--nav-height)-40px-56px),1240px)] hero-bleed:pb-20 hero-bleed:md:pt-20 hero-bleed:md:pb-28 hero-bleed:lg:pt-12 hero-bleed:lg:pb-16 hero-bleed:lg:min-h-[clamp(592px,calc(100svh-var(--nav-height)-40px-56px),1240px)]">
        {/* Test option "Centred, no car": the copy and actions centre across the full width and the car is hidden. */}
        <div className="relative z-10 flex flex-1 flex-col justify-center sm:block sm:flex-none lg:col-span-8 hero-centered:mx-auto hero-centered:w-full hero-centered:max-w-none hero-centered:min-w-0 hero-centered:text-center hero-centered:lg:col-span-12">
          {/* Test option "Big headline": the Cycling cars layout with an oversized headline. */}
          <h1 className="text-[clamp(3rem,13.5vw,3.75rem)] sm:text-[clamp(3.5rem,5.6vw,5.75rem)] hero-centered:md:text-[min(6.3vw,7.25rem)] hero-big:text-[clamp(3.5rem,16vw,5rem)] hero-big:sm:text-[clamp(5rem,11vw,7rem)] hero-big:lg:text-[min(9.4vw,10.5rem)] leading-[calc(var(--leading-title)-0.12)] font-medium tracking-[-0.035em]">
            <Line delay={0.1} className="hero-centered:md:pr-0 hero-centered:md:pl-[0.2em]">
              Car finance
            </Line>{' '}
            <Line delay={0.22} className="hero-centered:md:pl-0 hero-centered:md:pr-[0.2em]">
              made <EndSmile tone="white" size={0.62} delay={1}><Accent>easy</Accent></EndSmile>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/85 hero-centered:mx-auto hero-centered:md:max-w-2xl sm:mt-5 sm:text-base md:mt-6 md:text-lg"
          >
            Find your next car, compare finance from our panel of lenders and get a decision in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="mt-[clamp(28px,4.5svh,44px)] flex w-full max-w-[520px] justify-center sm:mt-7 sm:w-auto sm:max-w-none sm:justify-start hero-centered:mx-auto hero-centered:justify-center md:mt-8"
          >
            <Button href={quoteUrl} variant="reverse" size="2xl" className="max-sm:w-full max-sm:justify-center">
              Get my quote
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-[clamp(28px,4.5svh,40px)] flex justify-center sm:mt-5 sm:justify-start md:mt-6 hero-centered:sm:justify-center"
          >
            {/* Phones: two short centred lines under the centred quote button. Larger screens: one line. */}
            <a
              href={trustpilot.url}
              className="group flex flex-col items-center gap-2.5 text-[15px] sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-2 hero-centered:justify-center"
            >
              <span className="flex items-center gap-3">
                <strong className="font-display">Excellent</strong>
                <TrustpilotStars boxClassName="size-[22px]" />
              </span>
              <span className="flex items-center gap-2">
                <span className="text-white/75 transition-colors group-hover:text-white">
                  {trustpilot.reviews} reviews on
                </span>
                <TrustpilotLogo tone="light" className="text-[16px]" />
              </span>
            </a>
          </motion.div>

          <p className="mx-auto mt-6 max-w-[34ch] text-center text-xs leading-relaxed text-white/65 sm:mx-0 sm:mt-4 sm:max-w-md sm:text-left sm:text-[13px] sm:text-white/70 hero-centered:sm:mx-auto hero-centered:sm:text-center">
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
          className="relative mt-auto pt-[clamp(24px,4.5svh,40px)] sm:mt-6 sm:pt-0 hero-centered:hidden hero-bleed:hidden lg:absolute lg:mt-0 lg:right-[var(--wide-right)] lg:bottom-0 lg:w-[32vw] xl:w-[min(32vw,600px)]"
        >
          {/* Each new car drives in from the right as the previous one drives off to the left. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={car.src}
              src={car.src}
              alt={car.alt}
              width={1800}
              height={1125}
              fetchPriority="high"
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -70 }}
              transition={{ duration: 0.45, ease }}
              className="relative z-0 mx-auto -mb-[33%] w-[min(70%,360px)] sm:mt-0 sm:mr-0 sm:ml-auto sm:-mb-[18%] lg:mt-0 drop-shadow-[0_24px_24px_rgba(22,1,50,0.28)] sm:w-[min(48%,360px)] lg:mb-0 lg:w-full lg:translate-y-[34%]"
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
