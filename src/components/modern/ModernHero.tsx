import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { quoteUrl } from '../../data/nav'
import { trustpilot } from '../../data/reviews'
import { cn } from '../../lib/utils'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { Icon, type IconName } from '../ui/Icon'
import { Accent, EndSmile, SmileMark } from '../ui/Smile'
import { TrustpilotLogo, TrustpilotStars } from '../ui/Trustpilot'
import { SmileBand } from './SmileBand'

const ease = [0.22, 1, 0.36, 1] as const

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.2em] block overflow-hidden pr-[0.3em] pb-[0.2em]">
      <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay }}>
        {children}
      </motion.span>
    </span>
  )
}

/**
 * The phone shows the real apply form (apply.carfinance247.co.uk/?option=monthly), one screen at a time.
 * Question wording, answer options and the closing screen are copied from the live form; the form's middle
 * steps (licence, date of birth, address, employment) are summarised by the progress bar.
 */
type FormScreen = { progress: number; render: (picked: boolean) => ReactNode }

function Option({ label, picked }: { label: string; picked?: boolean }) {
  return (
    <span
      className={cn(
        'flex items-center justify-between rounded-inner border px-3.5 py-3 text-[13px] font-semibold transition-colors duration-300',
        picked ? 'border-purple bg-purple-10 text-purple' : 'border-blackcurrant/15 bg-white text-blackcurrant',
      )}
    >
      {label}
      <span className={cn('grid size-4 place-items-center rounded-full border transition-colors duration-300', picked ? 'border-purple bg-purple' : 'border-blackcurrant/25')}>
        {picked && <span className="size-1.5 rounded-full bg-white" />}
      </span>
    </span>
  )
}

function Field({ label, value, placeholder }: { label: string; value?: string; placeholder?: string }) {
  return (
    <span className="block">
      <span className="block text-[12px] font-semibold text-blackcurrant/70">{label}</span>
      <span className="mt-1.5 flex h-11 items-center rounded-inner border border-blackcurrant/15 bg-white px-3.5 text-[14px]">
        {value ? <span className="font-semibold text-blackcurrant">{value}</span> : <span className="text-blackcurrant/35">{placeholder}</span>}
      </span>
    </span>
  )
}

function Question({ children }: { children: ReactNode }) {
  return <p className="font-display text-[19px] leading-tight font-semibold tracking-[-0.01em] text-blackcurrant">{children}</p>
}

const screens: FormScreen[] = [
  {
    progress: 0.08,
    render: (picked) => (
      <>
        <Question>What would you like a quote for?</Question>
        <span className="mt-4 grid gap-2">
          <Option label="Car" picked={picked} />
          <Option label="Van" />
          <Option label="Bike" />
          <Option label="Caravan / Motorhome" />
        </span>
      </>
    ),
  },
  {
    progress: 0.18,
    render: (picked) => (
      <>
        <Question>Have you found a vehicle?</Question>
        <span className="mt-4 grid grid-cols-2 gap-2">
          <Option label="Yes" picked={picked} />
          <Option label="No" />
        </span>
      </>
    ),
  },
  {
    progress: 0.78,
    render: (picked) => (
      <>
        <Question>How much would you like to borrow?</Question>
        <span className="mt-1.5 block text-[12px] text-blackcurrant/60">You can change this later on.</span>
        <span className="mt-4 grid gap-3">
          <Field label="Amount" value={picked ? '£12,000' : undefined} placeholder="£" />
          <Option label="I’m not sure" />
        </span>
      </>
    ),
  },
  {
    progress: 0.94,
    render: (picked) => (
      <>
        <Question>And finally, where should we send your quote?</Question>
        <span className="mt-4 grid gap-3">
          <Field label="Email address" placeholder="Email address" />
          <Field label="Phone number" placeholder="Phone number" />
          <span className="flex items-start gap-2 text-[11px] leading-snug text-blackcurrant/65">
            <span className={cn('mt-0.5 grid size-4 shrink-0 place-items-center rounded-[4px] border transition-colors duration-300', picked ? 'border-purple bg-purple text-white' : 'border-blackcurrant/30')}>
              {picked && (
                <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5L20 7" />
                </svg>
              )}
            </span>
            I have read and agree to Car Finance 247’s terms and conditions
          </span>
        </span>
      </>
    ),
  },
  {
    progress: 1,
    render: () => (
      <>
        <span className="grid size-10 place-items-center rounded-full bg-lime text-blackcurrant">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <span className="mt-3 block"><Question>Thank you for applying.</Question></span>
        <span className="mt-1.5 block text-[12px] text-blackcurrant/65">Check your email now for what happens next.</span>
        <span className="mt-4 block font-display text-[14px] font-semibold text-blackcurrant">What happens next?</span>
        <span className="mt-2 grid gap-2">
          {['View your full quote details', 'Browse and quote thousands of cars', 'Get personalised support with your finance'].map((s) => (
            <span key={s} className="flex items-center gap-2.5 rounded-inner bg-purple-10 px-3 py-2.5 text-[12px] font-semibold text-blackcurrant">
              <span className="size-1.5 shrink-0 rounded-full bg-purple" />
              {s}
            </span>
          ))}
        </span>
      </>
    ),
  },
]

const SCREEN_MS = 2600
const PICK_MS = 1100

/** Steps through the screens: each one appears, its answer is picked after a beat, then it moves on. */
function useFormDemo() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(false)

  useEffect(() => {
    if (reduce) return
    const pick = window.setTimeout(() => setPicked(true), PICK_MS)
    const last = index === screens.length - 1
    const next = window.setTimeout(() => {
      setPicked(false)
      setIndex((i) => (i + 1) % screens.length)
    }, last ? SCREEN_MS * 2 : SCREEN_MS)
    return () => {
      window.clearTimeout(pick)
      window.clearTimeout(next)
    }
  }, [index, reduce])

  return reduce ? { index: 0, picked: true } : { index, picked }
}

/** A phone running the real CF247 apply form. */
function PhoneDemo() {
  const { index, picked } = useFormDemo()
  const screen = screens[index]
  const last = index === screens.length - 1

  return (
    <div className="relative mx-auto w-[min(78vw,320px)] rounded-[46px] bg-blackcurrant p-[9px] shadow-[0_60px_120px_-40px_rgba(22,1,50,0.85),inset_0_0_0_2px_rgba(255,255,255,0.12)] sm:w-[340px]">
      <div aria-hidden className="relative flex h-[min(150vw,600px)] flex-col overflow-hidden rounded-[38px] bg-white sm:h-[640px]">
        <div className="absolute top-2.5 left-1/2 z-10 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-blackcurrant" />

        {/* The form's own header: stacked logo, Trustpilot score and a progress bar. */}
        <div className="px-5 pt-12">
          <div className="flex items-start justify-between">
            <Logo className="h-9 w-auto text-purple" />
            <span className="text-right text-[9px] leading-tight text-blackcurrant/70">
              <TrustpilotStars boxClassName="size-3" />
              <span className="mt-1 block">
                TrustScore <strong>{trustpilot.score}</strong> | <strong>{trustpilot.reviews}</strong> reviews
              </span>
            </span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-blackcurrant/10">
            <motion.div className="h-full rounded-full bg-purple" animate={{ width: `${screen.progress * 100}%` }} transition={{ duration: 0.6, ease }} />
          </div>
        </div>

        <div className="relative flex-1 px-5 pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
              className="flex flex-col"
            >
              {screen.render(picked)}
            </motion.div>
          </AnimatePresence>
        </div>

        {!last && (
          <div className="px-5 pb-5">
            <span
              className={cn(
                'flex h-12 items-center justify-center rounded-brand font-display text-[15px] font-semibold transition-colors duration-300',
                picked ? 'bg-purple text-white' : 'bg-purple/30 text-white',
              )}
            >
              Continue
            </span>
            <span className="mt-3 block text-center text-[10px] text-blackcurrant/50">
              Car Finance 247 Limited is a credit broker, not a lender.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * A plain-text benefit beside the phone: a lime icon and two short lines of white text, no box.
 * It sits fully clear of the phone (which is white) so the text stays legible.
 */
function Chip({ children, icon, side, className, delay }: { children: ReactNode; icon: IconName; side: 'left' | 'right'; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay }}
      className={cn(
        'absolute z-20 hidden w-[150px] flex-col gap-2 font-display text-[15px] leading-snug font-semibold text-white md:flex lg:hidden xl:flex',
        side === 'left' ? 'right-[calc(50%+196px)] items-end text-right' : 'left-[calc(50%+196px)] items-start text-left',
        className,
      )}
    >
      <Icon name={icon} className="size-5 text-lime" />
      <p>{children}</p>
    </motion.div>
  )
}

/**
 * Modern design hero, after Weav (godly.design): a large left-aligned headline and one call to action,
 * with a phone demo of the CF247 journey on the right. Ends in a band of smile marks.
 */
export function ModernHero() {
  return (
    <section id="top" className="on-dark relative isolate overflow-hidden bg-purple pt-[var(--nav-height)]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-[5%] right-[-10%] aspect-square w-[min(90vw,900px)] rounded-full bg-[radial-gradient(closest-side,rgba(165,105,247,0.55),rgba(105,5,242,0))]" />
        <div className="absolute bottom-[-25%] left-[-15%] aspect-square w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(22,1,50,0.35),rgba(22,1,50,0))]" />
      </div>

      <div className="container-wide grid items-center gap-14 pt-10 pb-28 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-12 lg:pb-36 lg:[--wide-left:max(var(--nav-pad),calc((100vw-1360px)/2))] lg:[--wide-right:max(var(--nav-pad),calc((100vw-1360px)/2))]">
        <div className="max-lg:text-center lg:col-span-7 xl:col-span-6">
          <h1 className="text-[clamp(3.25rem,13vw,4.75rem)] leading-[0.98] font-medium tracking-[-0.045em] text-purple-10 sm:text-[clamp(4.5rem,8vw,7.25rem)]">
            <Line delay={0.1}>Car finance</Line>
            <Line delay={0.22}>
              made{' '}
              <EndSmile tone="white" size={0.62} delay={1}>
                <Accent className="text-white">easy</Accent>
              </EndSmile>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/85 max-lg:mx-auto md:text-lg"
          >
            Tell us your budget and we’ll search our panel of lenders for a deal that fits. A decision in minutes, with no
            impact on your credit score.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:gap-6 max-lg:sm:justify-center"
          >
            {/* Phones: the quote button first. Larger screens: Trustpilot first, so the button sits nearer the centre of the page, by the phone. */}
            <a href={trustpilot.url} className="group flex flex-col gap-1.5 text-[14px] max-sm:order-2 max-sm:items-center">
              <span className="flex items-center gap-2">
                <TrustpilotStars tone="light" boxClassName="size-[20px]" />
                <strong className="font-display">Excellent</strong>
              </span>
              <span className="flex items-center gap-1.5 text-white/75 transition-colors group-hover:text-white">
                {trustpilot.reviews} reviews on <TrustpilotLogo tone="light" className="text-[15px]" />
              </span>
            </a>
            <Button href={quoteUrl} variant="reverse" size="2xl" className="max-sm:order-1 max-sm:w-full max-sm:justify-center">
              Get my quote
            </Button>
          </motion.div>

          <p className="mt-8 max-w-xl text-xs leading-relaxed text-white/65 max-lg:mx-auto sm:text-[13px]">
            Rates from 8.9% APR. Representative 19.5% APR. Car Finance 247 Limited is a credit broker, not a lender.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          className="relative lg:col-span-5 xl:col-span-6"
        >
          {/* The brand mark, oversized and faint behind the phone. */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-[min(120vw,600px)] leading-none opacity-[0.09]"
          >
            <SmileMark tone="white" size={1} delay={0.5} className="ml-0 block" />
          </div>

          {/* The whole phone is a quote link: on hover or focus it tips upright, the screen dims and a "Get my quote" button grows in the middle. */}
          <a
            href={quoteUrl}
            aria-label="Get my quote"
            className="group/phone relative block rounded-[46px] transition-transform duration-500 ease-[var(--ease-brand)] focus-visible:outline-offset-8 lg:rotate-[-3deg] lg:hover:rotate-0 lg:focus-visible:rotate-0 hover:scale-[1.02]"
          >
            <PhoneDemo />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 m-auto grid w-[min(78vw,320px)] place-items-center rounded-[46px] bg-[radial-gradient(closest-side,rgba(22,1,50,0.5),rgba(22,1,50,0.15))] p-6 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/phone:opacity-100 group-focus-visible/phone:opacity-100 sm:w-[340px]"
            >
              <span className="flex w-full scale-90 items-center justify-center gap-3 rounded-brand bg-lime px-6 py-4 font-display text-lg font-semibold text-blackcurrant shadow-[0_20px_40px_-16px_rgba(22,1,50,0.8)] transition-transform duration-500 ease-[var(--ease-brand)] group-hover/phone:scale-100 group-focus-visible/phone:scale-100">
                Get my quote
                <Icon name="arrow" className="size-5" />
              </span>
            </span>
          </a>

          <Chip delay={1.1} icon="shield" side="left" className="top-[30%]">
            No impact on your credit score
          </Chip>
          <Chip delay={1.2} icon="people" side="right" className="top-[22%]">
            <span className="text-lime">500,000+</span> drivers helped into a car they love
          </Chip>
          <Chip delay={1.3} icon="heart" side="right" className="bottom-[24%]">
            A decision in minutes
          </Chip>
          <Chip delay={1.5} icon="car" side="left" className="bottom-[16%]">
            Buy from any UK dealer
          </Chip>
        </motion.div>
      </div>

      {/* Sits 2px past the edge so sub-pixel rounding never shows a purple hairline under the band. */}
      <SmileBand className="absolute inset-x-0 -bottom-[2px]" />
    </section>
  )
}
