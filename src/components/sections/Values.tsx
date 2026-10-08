import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { valueCars } from '../../data/cars'
import { quoteUrl } from '../../data/nav'
import { cn } from '../../lib/utils'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { useVerticalWheelPassthrough } from '../../lib/useVerticalWheelPassthrough'

type Value = {
  title: string
  before: string
  accent: string
  after: string
  car: { src: string; alt: string }
  bg: string
}

const values: Value[] = [
  {
    title: 'Reliable',
    before: 'You can bank on us to find the',
    accent: 'best',
    after: 'car finance deal',
    car: valueCars.volvo,
    bg: 'bg-purple',
  },
  {
    title: 'Quick',
    before: 'A decision in',
    accent: 'minutes',
    after: 'so you can get on the road sooner',
    car: valueCars.kia,
    bg: 'bg-blackcurrant',
  },
  {
    title: 'Personal',
    before: 'A dedicated account manager',
    accent: 'with you',
    after: 'from quote to keys',
    car: valueCars.mini,
    bg: 'bg-purple-80',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

/** Lime cursive word finished with the smile hooking up from its end, as in the brand ad layouts. */
function LimeAccent({ children, delay }: { children: string; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="font-accent relative inline-block whitespace-nowrap pr-[0.3em] text-lime">
      {children}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
        className="pointer-events-none absolute right-[-0.05em] bottom-[-0.12em] h-[0.7em] w-[0.7em] overflow-visible"
      >
        <motion.path
          d="M78 32A38 38 0 0 1 21 72.9"
          stroke="currentColor"
          strokeWidth={13}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease, delay }}
        />
      </svg>
    </span>
  )
}

function ValueCard({ value, index }: { value: Value; index: number }) {
  return (
    <motion.a
      href={quoteUrl}
      variants={{ hidden: { opacity: 0, y: 40 }, shown: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.8, ease }}
      className={cn(
        'on-dark group relative isolate flex w-[84vw] sm:aspect-[4/4.3] lg:aspect-auto lg:h-[clamp(430px,34vw,560px)] shrink-0 snap-center flex-col overflow-hidden rounded-brand p-6 sm:w-[min(56vw,440px)] sm:p-8 lg:w-auto xl:p-10',
        value.bg,
      )}
    >
      <h3 className="text-[clamp(2.75rem,4.6vw,4.5rem)] leading-[var(--leading-title)] font-medium tracking-[-0.03em]">{value.title}</h3>
      <p className="mt-4 max-w-[15ch] font-display max-sm:mb-auto text-[clamp(1.15rem,1.5vw,1.45rem)] leading-snug font-medium">
        {value.before} <LimeAccent delay={0.5 + index * 0.12}>{value.accent}</LimeAccent> {value.after}
      </p>

      {/* Bottom row: the logo, plus a visible cue that the whole card starts a quote. */}
      <div className="order-2 mt-auto flex items-end justify-between gap-4 max-sm:-mt-3">
        <Logo className="h-14 w-auto shrink-0 text-white lg:max-xl:h-12 xl:h-16" />
        <Button asSpan variant="reverse" size="md">
          Get my quote
        </Button>
      </div>

      <motion.img
        src={value.car.src}
        alt={value.car.alt}
        loading="lazy"
        variants={{ hidden: { x: '30%', opacity: 0 }, shown: { x: '0%', opacity: 1 } }}
        transition={{ duration: 1, ease, delay: 0.2 }}
        className="pointer-events-none relative order-1 -mt-[18%] -mr-[10%] ml-auto -z-10 w-[68%] max-sm:self-end sm:absolute sm:right-[-12%] sm:bottom-[6%] sm:m-0 sm:w-[78%] lg:w-[min(78%,420px)] drop-shadow-[0_24px_24px_rgba(22,1,50,0.4)] transition-transform duration-700 ease-[var(--ease-brand)] group-hover:-translate-x-[4%]"
      />
    </motion.a>
  )
}

/** Brand value cards modelled on the CF247 ad layout: one word, one line with a lime pull-out, a car and the logo. */
export function Values() {
  const rowRef = useRef<HTMLDivElement>(null)
  useVerticalWheelPassthrough(rowRef)
  return (
    <section aria-label="Why Car Finance 247" className="bg-white pb-12 md:pb-[72px]">
      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.12 }}
        ref={rowRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x touch-pan-y scroll-px-[var(--wide-left)] px-[var(--wide-left)] pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible"
      >
        {values.map((value, i) => (
          <ValueCard key={value.title} value={value} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
