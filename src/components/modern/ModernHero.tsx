import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { carSrc } from '../../data/cars'
import { quoteUrl } from '../../data/nav'
import { trustpilot } from '../../data/reviews'
import { cn } from '../../lib/utils'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { Icon, type IconName } from '../ui/Icon'
import { Accent, EndSmile, SmileMark } from '../ui/Smile'
import { TrustpilotLogo, TrustpilotStars } from '../ui/Trustpilot'

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
 * The phone shows the Car Finance 247 members area (new-ma.carfinance247.co.uk), recreated from screenshots of the
 * real app: home (approved in principle, browse in your budget), vehicle search and a vehicle page. The listings and
 * prices are taken from those screenshots; the customer name is illustrative.
 */
type Screen = { tab: 'home' | 'browse'; render: (picked: boolean) => ReactNode }

/**
 * The members area's accent (buttons, badges, the days-left ring). The app uses the old teal green (#27d3ad), which
 * may change, so the demo shows a muted neutral for now. Swap this back once the green is decided.
 */
const MA_TEAL = '#d8d2e2'

/** Studio render at a given angle (23 is the standard three-quarter view). */
const angleSrc = (src: string, angle: string) => src.replace('angle=23', `angle=${angle}`)

const tourneo = {
  name: 'FORD GRAND TOURNEO CONNECT',
  spec: '1.5 TDCi 120 Titanium 5dr',
  chips: ['2015 · 65 plate', '91,000 miles'],
  monthly: '£310',
  price: '£10,994',
  src: carSrc('ford', 'tourneo-connect', 2015, 600) + '&paintId=pspc0004',
}
const transit = {
  name: 'FORD TRANSIT CUSTOM',
  spec: '2.0 320 EcoBlue Limited Crew Van Auto L2 H1 Euro 6',
  chips: ['2020 · 70 plate', '38,000 miles'],
  monthly: '£678',
  price: '£27,994',
  src: carSrc('ford', 'transit-custom', 2020, 600),
}

function Price({ monthly, size = 'md' }: { monthly: string; size?: 'md' | 'lg' }) {
  return (
    <span className="block leading-none">
      <span className="block text-[10px] text-blackcurrant/70">from</span>
      <span className="mt-0.5 inline-flex items-baseline gap-1">
        <strong className={cn('font-display font-bold tracking-[-0.02em] text-purple', size === 'lg' ? 'text-[30px]' : 'text-[22px]')}>
          {monthly}
          <span className={size === 'lg' ? 'text-[16px]' : 'text-[13px]'}>.00</span>
        </strong>
        <span className="text-[10px] text-blackcurrant/80">per month</span>
      </span>
    </span>
  )
}

function ListingCard({ car, picked }: { car: typeof tourneo; picked?: boolean }) {
  return (
    <span className={cn('block overflow-hidden rounded-[12px] border bg-white transition-colors duration-300', picked ? 'border-purple' : 'border-blackcurrant/10')}>
      <span className="relative grid h-[118px] place-items-center bg-[linear-gradient(180deg,#e9eef5,#f6f3ee)]">
        <img src={car.src} alt="" className="w-[78%]" />
        <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-white shadow-sm">
          <Icon name="heart" className={cn('size-3.5 transition-colors duration-300', picked ? 'text-[#e11d48]' : 'text-blackcurrant/20')} />
        </span>
      </span>
      <span className="block p-3">
        <span className="block font-display text-[12px] leading-tight font-bold text-blackcurrant">{car.name}</span>
        <span className="mt-0.5 block truncate text-[10px] text-blackcurrant/60">{car.spec}</span>
        <span className="mt-1.5 flex gap-1">
          {car.chips.map((c) => (
            <span key={c} className="rounded-full bg-blackcurrant/5 px-2 py-0.5 text-[9px] font-semibold text-blackcurrant/80">{c}</span>
          ))}
        </span>
        <span className="mt-2 flex items-end justify-between border-t border-blackcurrant/10 pt-2">
          <Price monthly={car.monthly} />
          <strong className="font-display text-[12px] text-blackcurrant">{car.price}</strong>
        </span>
      </span>
    </span>
  )
}

const screens: Screen[] = [
  {
    tab: 'home',
    render: (picked) => (
      <>
        <span className="block bg-[linear-gradient(120deg,#6905f2,#4a03a8)] px-4 pt-3.5 pb-6 text-white">
          <span className="flex items-center justify-between gap-3">
            <span>
              <span className="block text-[11px] font-semibold text-white/80">Welcome Sam</span>
              <span className="mt-0.5 block font-display text-[15px] leading-tight font-bold">Great news, you're approved in principle! 🎉</span>
            </span>
            <span className="flex shrink-0 flex-col items-center gap-0.5 text-[8px] text-white/80">
              <span className="grid size-9 place-items-center rounded-full border-2 font-display text-[12px] font-bold text-white" style={{ borderColor: MA_TEAL }}>
                18
              </span>
              days left
            </span>
          </span>
        </span>
        <span className="-mt-3 block rounded-t-[14px] bg-white">
          <span className="grid grid-cols-2 border-b border-blackcurrant/10 text-center text-[11px] font-semibold">
            <span className="border-b-2 border-purple pt-2.5 pb-2 text-purple">Finance a new vehicle</span>
            <span className="pt-2.5 pb-2 text-blackcurrant/60">Refinance</span>
          </span>
          <span className="mx-3 mt-3 block rounded-[12px] bg-purple-10 px-3 py-3.5 text-center">
            <span className="block font-display text-[13px] font-bold text-blackcurrant">Browse vehicles in your budget</span>
            <span className="mt-1 block text-[9px] leading-snug text-blackcurrant/65">Tell us how much you'd like to spend each month to see vehicles in your budget.</span>
            <span className="mt-2 block text-[10px] font-semibold text-blackcurrant">Monthly Budget</span>
            <span className="mt-1.5 flex items-center gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-blackcurrant/20 bg-white text-[14px] text-blackcurrant">−</span>
              <span className="flex h-8 flex-1 items-center rounded-[8px] border border-blackcurrant/15 bg-white px-2.5 text-[12px]">
                <strong className="text-blackcurrant">£</strong>
                <span className="flex-1 text-center font-semibold text-blackcurrant/60">300</span>
              </span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-blackcurrant/20 bg-white text-[14px] text-blackcurrant">+</span>
            </span>
            <span
              className={cn('mt-2.5 flex h-9 items-center justify-center rounded-full font-display text-[12px] font-bold text-blackcurrant transition-transform duration-200', picked && 'scale-95')}
              style={{ backgroundColor: MA_TEAL }}
            >
              Get started
            </span>
          </span>
          <span className="mx-3 mt-2.5 flex items-center gap-2.5 rounded-[12px] bg-purple-10 px-3 py-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-purple/15 text-purple">
              <Icon name="car" className="size-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[11px] font-bold text-blackcurrant">Already found a car?</span>
              <span className="block text-[9px] text-blackcurrant/65">Enter the details to get a quote</span>
            </span>
            <Icon name="chevron" className="size-3.5 -rotate-90 text-blackcurrant/60" />
          </span>
        </span>
      </>
    ),
  },
  {
    tab: 'browse',
    render: (picked) => (
      <>
        <span className="flex items-center gap-2 border-b border-blackcurrant/10 px-3 py-2.5">
          <span className="relative flex h-8 items-center gap-1.5 rounded-full px-3.5 font-display text-[11px] font-bold text-blackcurrant" style={{ backgroundColor: MA_TEAL }}>
            Filters
            <span className="absolute -top-1 -right-1 grid size-3.5 place-items-center rounded-full border border-white text-[7px]" style={{ backgroundColor: MA_TEAL }}>1</span>
          </span>
          <span className="flex h-8 flex-1 items-center justify-between rounded-full border border-blackcurrant/15 px-3 text-[10px] text-blackcurrant">
            Sort by distance
            <Icon name="chevron" className="size-3 text-blackcurrant/60" />
          </span>
        </span>
        <span className="block bg-[linear-gradient(180deg,#f6f0ff,#fff)] px-3 pt-3">
          <span className="block font-display text-[16px] font-bold text-blackcurrant">Browse vehicles</span>
          <span className="mt-2 grid grid-cols-2 divide-x divide-blackcurrant/10 rounded-[10px] border border-blackcurrant/10 bg-white text-center text-[10px] font-semibold">
            <span className="py-1.5">Monthly budget<span className="block font-bold text-purple underline">£300</span></span>
            <span className="py-1.5">Deposit & Part Ex<span className="block font-bold text-purple underline">Add</span></span>
          </span>
          <span className="mt-2.5 flex justify-between text-[10px]">
            <span className="text-blackcurrant/60">100,808 vehicles found</span>
            <span className="font-semibold text-purple">Save search</span>
          </span>
        </span>
        {/* The list scrolls up to the Transit Custom, which then gets saved. */}
        <span className={cn('mt-2 grid gap-2.5 px-3 transition-transform duration-700 ease-[var(--ease-brand)]', picked && '-translate-y-[214px]')}>
          <ListingCard car={tourneo} />
          <ListingCard car={transit} picked={picked} />
        </span>
      </>
    ),
  },
  {
    tab: 'browse',
    render: (picked) => (
      <span className="relative flex h-full flex-col">
        <span className="flex items-center justify-between border-b border-blackcurrant/10 px-3 py-2 text-[11px] font-semibold text-blackcurrant">
          <span className="flex items-center gap-1.5">
            <Icon name="arrow" className="size-3 rotate-180" />
            Back to home
          </span>
          <Icon name="heart" className="size-3.5 text-[#e11d48]" />
        </span>
        <span className="relative grid h-[150px] place-items-center bg-[linear-gradient(180deg,#dde8f3,#eef0ea)]">
          <img src={transit.src} alt="" className="w-[80%]" />
          <span className="absolute right-2 bottom-2 rounded-[4px] bg-blackcurrant/70 px-1.5 py-0.5 text-[8px] text-white">1/51</span>
        </span>
        <span className="flex gap-1 overflow-hidden px-3 pt-2">
          {['23', '01', '09', '21', '13'].map((a, i) => (
            <span key={a} className={cn('grid h-9 w-12 shrink-0 place-items-center overflow-hidden rounded-[5px] bg-[#eef0f4]', i === 0 && 'ring-2 ring-purple')}>
              <img src={angleSrc(transit.src, a)} alt="" className="w-[120%] max-w-none" />
            </span>
          ))}
        </span>
        <span className="block px-3 pt-3">
          <span className="block font-display text-[15px] leading-tight font-bold text-blackcurrant">{transit.name}</span>
          <span className="mt-1 block text-[10px] leading-snug text-blackcurrant/65">{transit.spec}</span>
          <span className="mt-2 flex items-end justify-between">
            <Price monthly={transit.monthly} size="lg" />
            <strong className="font-display text-[12px] text-blackcurrant">{transit.price}</strong>
          </span>
        </span>
        {/* Sticky bar at the foot of the vehicle page. */}
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-blackcurrant/10 bg-white px-3 py-2.5">
          <Price monthly={transit.monthly} />
          <span
            className={cn('flex h-9 items-center rounded-full px-4 font-display text-[11px] font-bold text-blackcurrant transition-transform duration-200', picked && 'scale-95')}
            style={{ backgroundColor: MA_TEAL }}
          >
            View quotes
          </span>
        </span>
      </span>
    ),
  },
]

const SCREEN_MS = 3200
const PICK_MS = 1500

/** Steps through the screens: each one appears, its button is "tapped" after a beat, then it moves on. */
function useDemo() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(false)

  useEffect(() => {
    if (reduce) return
    const pick = window.setTimeout(() => setPicked(true), PICK_MS)
    const next = window.setTimeout(() => {
      setPicked(false)
      setIndex((i) => (i + 1) % screens.length)
    }, SCREEN_MS)
    return () => {
      window.clearTimeout(pick)
      window.clearTimeout(next)
    }
  }, [index, reduce])

  return reduce ? { index: 0, picked: false } : { index, picked }
}

function NavItem({ label, on, children, badge }: { label: string; on?: boolean; children: ReactNode; badge?: string }) {
  return (
    <span className={cn('relative flex flex-col items-center gap-0.5 text-[8px] font-semibold', on ? 'text-purple' : 'text-blackcurrant/60')}>
      <span className="grid size-5 place-items-center">{children}</span>
      {label}
      {badge && (
        <span className="absolute -top-1 left-1/2 ml-1 grid h-3.5 min-w-3.5 place-items-center rounded-full px-0.5 text-[7px] text-blackcurrant" style={{ backgroundColor: MA_TEAL }}>
          {badge}
        </span>
      )}
      {on && <span className="absolute -bottom-1.5 h-0.5 w-6 rounded-full bg-purple" />}
    </span>
  )
}

/** A phone running the CF247 members area. */
function PhoneDemo() {
  const { index, picked } = useDemo()
  const screen = screens[index]

  return (
    <div className="relative mx-auto w-[min(78vw,320px)] rounded-[46px] bg-blackcurrant p-[9px] shadow-[0_60px_120px_-40px_rgba(22,1,50,0.85),inset_0_0_0_2px_rgba(255,255,255,0.12)] sm:w-[340px]">
      <div aria-hidden className="relative flex h-[min(150vw,600px)] flex-col overflow-hidden rounded-[38px] bg-white text-blackcurrant sm:h-[640px]">
        <div className="absolute top-2.5 left-1/2 z-10 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-blackcurrant" />

        {/* The members area header: stacked logo, WhatsApp and Book a call. */}
        <div className="flex items-end justify-between border-b border-blackcurrant/10 pt-10 pl-4">
          <Logo className="mb-2 h-8 w-auto text-purple" />
          <span className="flex divide-x divide-blackcurrant/10 text-[9px] font-semibold text-purple">
            <span className="flex flex-col items-center gap-0.5 px-3 py-2">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z" strokeLinejoin="round" />
              </svg>
              WhatsApp
            </span>
            <span className="flex flex-col items-center gap-0.5 px-3 py-2">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" strokeLinejoin="round" />
              </svg>
              Book a call
            </span>
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
              className="flex h-full flex-col"
            >
              {screen.render(picked)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation, with the Ask Carla assistant in the middle. */}
        <div className="relative z-10 grid grid-cols-5 items-end border-t border-blackcurrant/10 bg-white px-2 pt-1.5 pb-4">
          <NavItem label="Home" on={screen.tab === 'home'}>
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round">
              <path d="M4 10.5L12 4l8 6.5V20h-5v-6H9v6H4z" />
            </svg>
          </NavItem>
          <NavItem label="Browse" on={screen.tab === 'browse'}>
            <Icon name="search" className="size-4" />
          </NavItem>
          <span className="flex flex-col items-center gap-0.5 text-[8px] font-semibold text-blackcurrant/60">
            <span className="-mt-5 grid size-9 place-items-center rounded-full bg-purple text-white">
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                <path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6zM17.5 13l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
              </svg>
            </span>
            Ask Carla
          </span>
          <NavItem label="Saved" badge="25">
            <Icon name="heart" className="size-4" />
          </NavItem>
          <NavItem label="More">
            <Icon name="menu" className="size-4" />
          </NavItem>
        </div>
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
        'absolute z-20 hidden w-[140px] flex-col gap-2 font-display text-[14px] leading-snug 2xl:w-[160px] 2xl:text-[15px] font-semibold text-white md:flex lg:hidden xl:flex',
        // Clears the phone (half of its 340px width, scaled by 0.84, or 0.96 on 2xl) with a small gap.
        side === 'left' ? 'right-[calc(50%+166px)] items-end text-right 2xl:right-[calc(50%+190px)]' : 'left-[calc(50%+166px)] items-start text-left 2xl:left-[calc(50%+190px)]',
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
 * with a phone demo of the CF247 journey on the right. Ends in a straight edge.
 */
export function ModernHero() {
  return (
    <section id="top" className="on-dark relative isolate overflow-hidden bg-purple pt-[var(--nav-height)]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-[5%] right-[-10%] aspect-square w-[min(90vw,900px)] rounded-full bg-[radial-gradient(closest-side,rgba(165,105,247,0.55),rgba(105,5,242,0))]" />
        <div className="absolute bottom-[-25%] left-[-15%] aspect-square w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(22,1,50,0.35),rgba(22,1,50,0))]" />
      </div>

      <div className="container-xl grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-10 lg:pb-20">
        <div className="max-lg:text-center lg:col-span-7 xl:col-span-6">
          <h1 className="text-[clamp(3.25rem,13vw,4.75rem)] leading-[0.98] font-medium tracking-[-0.045em] text-purple-10 sm:text-[clamp(3.5rem,5.8vw,5.25rem)] 2xl:text-[6.25rem]">
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
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 max-lg:mx-auto md:text-[17px] 2xl:max-w-2xl 2xl:text-lg"
          >
            Tell us your budget and we’ll search our panel of lenders for a deal that fits. A decision in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="mt-7 flex flex-col items-center gap-5 sm:flex-row sm:gap-6 max-lg:sm:justify-center"
          >
            {/* Phones: the quote button first. Larger screens: Trustpilot first, so the button sits nearer the centre of the page, by the phone. */}
            <a href={trustpilot.url} className="group flex flex-col gap-1.5 text-[14px] max-sm:order-2 max-sm:items-center">
              <span className="flex items-center gap-2">
                <TrustpilotStars boxClassName="size-[20px]" />
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

          <p className="mt-7 max-w-xl text-xs leading-relaxed text-white/65 max-lg:mx-auto sm:text-[13px]">
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
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-[min(110vw,500px)] leading-none opacity-[0.09]"
          >
            <SmileMark tone="white" size={1} delay={0.5} className="ml-0 block" />
          </div>

          {/* The whole phone is a quote link: on hover or focus it tips upright, the screen dims and a "Get my quote" button grows in the middle.
              On touch screens the same overlay shows later, once the phone has scrolled up into the top third and the demo has had a moment (useScrollHover). */}
          <a
            href={quoteUrl}
            aria-label="Get my quote"
            data-scroll-hover="-22% 0px -70% 0px"
            data-scroll-hover-delay="900"
            className="group/phone relative block rounded-[46px] [zoom:0.84] 2xl:[zoom:0.96] transition-transform duration-500 ease-[var(--ease-brand)] focus-visible:outline-offset-8 lg:rotate-[-3deg] lg:hover:rotate-0 lg:focus-visible:rotate-0 hover:scale-[1.02] data-[scroll-active]:scale-[1.02]"
          >
            <PhoneDemo />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 m-auto grid w-[min(78vw,320px)] place-items-center rounded-[46px] bg-[radial-gradient(closest-side,rgba(22,1,50,0.5),rgba(22,1,50,0.15))] p-6 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/phone:opacity-100 group-focus-visible/phone:opacity-100 group-data-[scroll-active]/phone:opacity-100 sm:w-[340px]"
            >
              <span className="flex w-full scale-90 items-center justify-center gap-3 rounded-brand bg-lime px-6 py-4 font-display text-lg font-semibold text-blackcurrant shadow-[0_20px_40px_-16px_rgba(22,1,50,0.8)] transition-transform duration-500 ease-[var(--ease-brand)] group-hover/phone:scale-100 group-focus-visible/phone:scale-100 group-data-[scroll-active]/phone:scale-100">
                Get my quote
                <Icon name="arrow" className="size-5" />
              </span>
            </span>
          </a>

          <Chip delay={1.1} icon="people" side="left" className="top-[28%]">
            <span className="text-lime">500,000+</span> drivers helped into a car they love
          </Chip>
          <Chip delay={1.3} icon="heart" side="right" className="bottom-[28%]">
            A decision in minutes
          </Chip>
        </motion.div>
      </div>

    </section>
  )
}
