import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type ReactNode } from 'react'
import { carSrc } from '../../data/cars'
import { quoteUrl, quoteUrlWithBudget } from '../../data/nav'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { panel } from './ui'

const ease = [0.22, 1, 0.36, 1] as const
const STEP_DURATION = 5000

type Step = {
  title: string
  body: string
  icon: 'search' | 'car' | 'shield'
}

const steps: Step[] = [
  {
    title: 'Get your quote',
    body: 'Answer a few quick questions and get a decision in minutes.',
    icon: 'search',
  },
  {
    title: 'Choose your car',
    body: 'Browse 100,000+ cars in our members area and we will help agree the deal.',
    icon: 'car',
  },
  {
    title: 'Drive away',
    body: 'We sort the paperwork with the dealer and lender. You just turn up and drive away.',
    icon: 'shield',
  },
]

/** Body types rather than makes and models; `article` reads "Get a quote for a hatchback / an SUV / an estate". */
const cars = [
  { name: 'Hatchback', article: 'a hatchback', meta: 'Small and easy to park', src: carSrc('mini', 'hatch', 2022, 500) },
  { name: 'SUV', article: 'an SUV', meta: 'Space and a higher seat', src: carSrc('kia', 'sportage', 2023, 500) },
  { name: 'Estate', article: 'an estate', meta: 'Room for the whole family', src: carSrc('skoda', 'octavia', 2021, 500, 'es') },
]

const checklist = [
  { title: 'Approved in principle', body: 'A lender on our panel agrees in principle to lend to you.' },
  { title: 'Finance agreement signed', body: 'You review and sign your finance agreement.' },
  { title: 'Dealer paid by the lender', body: 'The lender pays the dealer for your car.' },
  { title: 'Ready to collect', body: 'Collect your car from the dealer and drive away.' },
]

function Tick({ className }: { className?: string }) {
  return (
    <span className={cn('grid size-6 shrink-0 place-items-center rounded-full bg-lime text-blackcurrant', className)}>
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 12 5 5L20 7" />
      </svg>
    </span>
  )
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      key="shell"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.45, ease }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}

const BUDGET_MIN = 100
const BUDGET_MAX = 1000
const budgetCar = { src: carSrc('volvo', 'xc40', 2022, 1600), alt: '' }

/** A working budget picker: drag the slider, then go straight to the quote form. */
function QuoteMockup({ budget, onBudget }: { budget: number; onBudget: (value: number) => void }) {
  const pct = ((budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100

  return (
    <Shell>
      {/* A large Volvo XC40 sits behind the card, drives in with the step and edges forward as the budget rises. Phones hide it: the card fills the stage, so only the wheels would show. */}
      <motion.img
        src={budgetCar.src}
        alt={budgetCar.alt}
        aria-hidden
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: (pct - 50) * 0.4 }}
        transition={{ duration: 0.7, ease }}
        className="pointer-events-none absolute top-1/2 left-1/2 w-[128%] max-w-none -translate-x-1/2 -translate-y-[44%] select-none max-sm:hidden"
      />
      <div className="relative mx-auto flex h-full max-w-[420px] flex-col justify-center">
        <div className={`${panel} bg-white p-5 shadow-[0_28px_80px_-42px_rgba(105,5,242,0.7)] ring-1 ring-purple/10 sm:p-6`}>
          <label htmlFor="how-budget" className="text-sm font-semibold text-blackcurrant/65">
            My monthly budget is
          </label>
          <p aria-hidden className="mt-3 font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-medium tracking-[-0.06em] text-purple tabular-nums">
            £{budget}
          </p>
          <input
            id="how-budget"
            type="range"
            min={BUDGET_MIN}
            max={BUDGET_MAX}
            step={25}
            value={budget}
            onChange={(e) => onBudget(Number(e.target.value))}
            aria-valuetext={`£${budget} a month`}
            style={{ '--pct': `${pct}%` } as CSSProperties}
            className="cf-range mt-3 w-full"
          />
          <div className="flex justify-between text-xs text-blackcurrant/50">
            <span>£{BUDGET_MIN}</span>
            <span>£{BUDGET_MAX}</span>
          </div>
          <a
            href={quoteUrlWithBudget(budget)}
            className="mt-5 block rounded-brand bg-purple px-4 py-3 text-center font-display font-semibold text-white transition-colors hover:bg-lime hover:text-blackcurrant active:bg-lime active:text-blackcurrant"
          >
            Get my quote
          </a>
        </div>
      </div>
    </Shell>
  )
}

/** Pick a car to see it highlighted, then go straight to a quote for it. */
function ChooseCarMockup() {
  const [picked, setPicked] = useState(0)

  return (
    <Shell>
      <div className="mx-auto flex h-full max-w-[510px] flex-col justify-center">
        <div className={`${panel} bg-white p-4 shadow-[0_28px_80px_-42px_rgba(105,5,242,0.7)] ring-1 ring-purple/10 sm:p-5`}>
          <p className="flex items-center gap-3 rounded-brand bg-purple-10 px-4 py-3 text-sm font-semibold text-blackcurrant/65">
            <Icon name="search" className="size-4 text-purple" />
            100,000+ cars in our members area
          </p>
          <div role="radiogroup" aria-label="Choose a car" className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {cars.map((car, index) => {
              const selected = picked === index
              return (
                <motion.button
                  key={car.name}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setPicked(index)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease, delay: index * 0.08 }}
                  className={cn(
                    'group relative overflow-hidden rounded-brand bg-purple-10 text-left ring-1 transition-[box-shadow,transform] duration-300 ease-[var(--ease-brand)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(105,5,242,0.7)] focus-visible:outline-offset-2',
                    selected ? 'ring-2 ring-purple' : 'ring-purple/10 hover:ring-purple/40',
                  )}
                >
                  {selected && (
                    <span className="absolute top-2 right-2 z-10">
                      <Tick className="size-5" />
                    </span>
                  )}
                  <span className="grid aspect-[1.18] place-items-center overflow-hidden bg-[linear-gradient(155deg,#efe4fe,#fff)]">
                    <img
                      src={car.src}
                      alt=""
                      className="w-[142%] max-w-none transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-[1.06]"
                    />
                  </span>
                  <span className="block p-2.5">
                    <span className="block truncate font-display text-sm font-semibold text-blackcurrant">{car.name}</span>
                    <span className="mt-0.5 block truncate text-[11px] text-blackcurrant/55">{car.meta}</span>
                  </span>
                </motion.button>
              )
            })}
          </div>
          <a
            href={quoteUrl}
            className="mt-4 flex items-center justify-between gap-3 rounded-brand bg-purple px-4 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-lime hover:text-blackcurrant"
          >
            Get a quote for {cars[picked].article}
            <Icon name="arrow" className="size-4" />
          </a>
        </div>
      </div>
    </Shell>
  )
}

/** Hover, focus or tap each step to see what happens at that stage. */
function DriveAwayMockup() {
  const car = carSrc('kia', 'sportage', 2023, 700)
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Shell>
      <div className="mx-auto grid h-full max-w-[500px] content-center gap-4">
        <div className={`${panel} relative overflow-hidden bg-white p-5 shadow-[0_28px_80px_-42px_rgba(105,5,242,0.7)] ring-1 ring-purple/10 sm:p-6`}>
          <div>
            <p className="font-display text-xl leading-none font-medium tracking-[-0.035em] text-purple sm:text-2xl">
              Your car is ready
            </p>
            <p className="mt-2 text-sm text-blackcurrant/60">We’ve sorted the paperwork with the dealer.</p>
          </div>
          <ul className="mt-5 grid gap-2" onMouseLeave={() => setOpen(null)}>
            {checklist.map((item, index) => {
              const isOpen = open === index
              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.1 + index * 0.1 }}
                  className="max-sm:[&:nth-child(n+4)]:hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onMouseEnter={() => setOpen(index)}
                    onFocus={() => setOpen(index)}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className={cn(
                      'w-full rounded-brand px-3 py-2 text-left transition-colors duration-200 sm:py-2.5',
                      isOpen ? 'bg-white ring-1 ring-purple/40' : 'bg-purple-10 hover:bg-white hover:ring-1 hover:ring-purple/30',
                    )}
                  >
                    <span className="flex items-center gap-3 text-[13px] font-semibold text-blackcurrant sm:text-sm">
                      <Tick />
                      {item.title}
                    </span>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease }}
                          className="block overflow-hidden pl-9 text-[13px] text-blackcurrant/65"
                        >
                          <span className="block pt-1">{item.body}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.li>
              )
            })}
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.18 }}
          className={`${panel} group grid h-28 place-items-center overflow-hidden bg-[linear-gradient(155deg,#efe4fe,#fff)] ring-1 ring-purple/10 max-sm:hidden sm:h-28`}
        >
          {/* The car eases forward when the card is hovered, ready to drive away. */}
          <img
            src={car}
            alt=""
            className="w-[min(92%,430px)] transition-transform duration-700 ease-[var(--ease-brand)] group-hover:translate-x-6"
          />
        </motion.div>
      </div>
    </Shell>
  )
}

function StepMockup({ active, budget, onBudget }: { active: number; budget: number; onBudget: (value: number) => void }) {
  return (
    <div
      data-step-demo
      className={`${panel} relative h-[440px] overflow-hidden bg-[radial-gradient(circle_at_20%_10%,color-mix(in_srgb,var(--color-lime)_22%,transparent),transparent_30%),linear-gradient(145deg,#f0e4ff,#fff)] p-4 ring-1 ring-purple/10 sm:p-6 lg:h-[460px]`}
    >
      <div className="absolute top-8 right-8 size-24 rounded-full bg-lime/25 blur-3xl" />
      <div className="absolute bottom-0 left-8 h-32 w-32 rounded-full bg-purple/10 blur-3xl" />
      <AnimatePresence mode="wait">
        {active === 0 && <QuoteMockup key="quote" budget={budget} onBudget={onBudget} />}
        {active === 1 && <ChooseCarMockup key="car" />}
        {active === 2 && <DriveAwayMockup key="drive" />}
      </AnimatePresence>
    </div>
  )
}

export function ModernHowItWorks() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [budget, setBudget] = useState(300)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)
  // The cycle only runs while the panel is on screen, and starts again from step 01 each time it scrolls in.
  const [inView, setInView] = useState(false)

  const onEnter = () => {
    setActive(0)
    progressRef.current = 0
    setProgress(0)
    setInView(true)
  }

  const setStepProgress = (value: number) => {
    progressRef.current = value
    setProgress(value)
  }

  const selectStep = (index: number) => {
    setActive(index)
    setStepProgress(0)
  }

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget
    if (!(next instanceof Node) || !event.currentTarget.contains(next)) setPaused(false)
  }

  // A drag can end anywhere on the page, so listen for the release on the window.
  useEffect(() => {
    if (!paused) return
    const release = () => setPaused(false)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    return () => {
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
  }, [paused])

  useEffect(() => {
    if (reduce || paused || !inView) return

    const startedAt = window.performance.now() - progressRef.current * STEP_DURATION
    const timer = window.setInterval(() => {
      const next = (window.performance.now() - startedAt) / STEP_DURATION

      if (next >= 1) {
        setActive((current) => (current + 1) % steps.length)
        setStepProgress(0)
        return
      }

      setStepProgress(next)
    }, 50)

    return () => window.clearInterval(timer)
  }, [active, paused, reduce, inView])

  return (
    <motion.section
      aria-labelledby="modern-how-title"
      className="bg-purple-10 pt-14 pb-14 md:pt-20 md:pb-20"
      viewport={{ amount: 0.45 }}
      onViewportEnter={onEnter}
      onViewportLeave={() => setInView(false)}
    >
      <div className="container-cf">
        <motion.div
          className={`${panel} grid gap-8 bg-white p-5 shadow-[0_34px_110px_-64px_rgba(105,5,242,0.75)] ring-1 ring-purple/10 md:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(400px,1fr)] lg:gap-10 lg:p-8 xl:p-10`}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
          onPointerDown={(e) => {
            // Using the demo (dragging the slider, picking a car) holds the step; a plain hover doesn't.
            if ((e.target as HTMLElement).closest('[data-step-demo]')) setPaused(true)
          }}
          onFocus={(e) => {
            if (e.target.matches(':focus-visible')) setPaused(true)
          }}
          onBlur={handleBlur}
        >
          <div className="flex flex-col lg:min-h-[440px]">
            <h2
              id="modern-how-title"
              className="font-display text-[clamp(2rem,3.2vw,3rem)] leading-[1.02] font-medium tracking-[-0.04em] text-purple"
            >
              Three steps to <span className="whitespace-nowrap">feel-good</span> car finance
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-blackcurrant/70">
              Get your quote in minutes.
            </p>

            <ol className="mt-7 divide-y divide-purple/10 border-y border-purple/10">
              {steps.map((step, index) => {
                const selected = active === index
                const barWidth = reduce ? 100 : selected ? progress * 100 : 0

                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      aria-expanded={selected}
                      aria-controls={`modern-how-step-${index}`}
                      onClick={() => selectStep(index)}
                      className={cn(
                        'group -mx-3 w-[calc(100%+1.5rem)] cursor-pointer rounded-inner px-3 py-4 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple',
                        selected ? 'bg-transparent' : 'hover:bg-purple-10 focus-visible:bg-purple-10',
                      )}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={cn(
                            'grid size-10 shrink-0 place-items-center rounded-inner transition-colors duration-300',
                            selected ? 'bg-purple text-white' : 'bg-purple-10 text-purple group-hover:bg-purple/15',
                          )}
                        >
                          <Icon name={step.icon} className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-4">
                            <span
                              className={cn(
                                'font-display text-[clamp(1.15rem,1.7vw,1.4rem)] leading-tight font-medium tracking-[-0.03em] transition-colors duration-200',
                                selected ? 'text-blackcurrant' : 'text-blackcurrant group-hover:text-purple',
                              )}
                            >
                              {step.title}
                            </span>
                            <span className="flex items-center gap-2 font-display text-sm text-purple/50">
                              {!selected && (
                                <Icon
                                  name="arrow"
                                  className="size-4 -translate-x-1 text-purple opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                                />
                              )}
                              0{index + 1}
                            </span>
                          </span>
                          <AnimatePresence initial={false}>
                            {selected && (
                              <motion.span
                                id={`modern-how-step-${index}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease }}
                                className="block overflow-hidden"
                              >
                                <span className="mt-2 block max-w-xl text-[15px] leading-relaxed text-blackcurrant/65">
                                  {step.body}
                                </span>
                                <span className="mt-4 block h-1 overflow-hidden rounded-full bg-purple-10">
                                  <span
                                    className="block h-full rounded-full bg-purple transition-[width] duration-100 ease-linear"
                                    style={{ width: `${barWidth}%` }}
                                  />
                                </span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="mt-7 lg:mt-auto lg:pt-8">
              <Button href={quoteUrl} variant="light" size="lg" className="max-sm:w-full max-sm:justify-center">
                Get my quote
              </Button>
            </div>
          </div>

          <StepMockup active={active} budget={budget} onBudget={setBudget} />
        </motion.div>
      </div>
    </motion.section>
  )
}
