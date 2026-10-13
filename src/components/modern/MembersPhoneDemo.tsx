import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { carSrc } from '../../data/cars'
import { cn } from '../../lib/utils'
import { Logo } from '../brand/Logo'
import { Icon } from '../ui/Icon'

const ease = [0.22, 1, 0.36, 1] as const
const MA_ACCENT = '#d8d2e2'

const tourneo = {
  name: 'FORD GRAND TOURNEO CONNECT',
  spec: '1.5 TDCi 120 Titanium 5dr',
  age: '2015 · 65 plate',
  mileage: '91,000 miles',
  monthly: '£310',
  price: '£10,994',
  src: `${carSrc('ford', 'tourneo-connect', 2015, 600)}&paintId=pspc0004`,
}

const transit = {
  name: 'FORD TRANSIT CUSTOM',
  spec: '2.0 320 EcoBlue Limited Crew Van Auto L2 H1 Euro 6',
  age: '2020 · 70 plate',
  mileage: '38,000 miles',
  monthly: '£678',
  price: '£27,994',
  src: carSrc('ford', 'transit-custom', 2020, 600),
}

type Vehicle = typeof tourneo
type Screen = { tab: 'home' | 'browse'; render: (picked: boolean) => ReactNode }

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

function ListingCard({ vehicle, picked }: { vehicle: Vehicle; picked?: boolean }) {
  return (
    <span className={cn('block overflow-hidden rounded-[12px] border bg-white transition-colors duration-300', picked ? 'border-purple' : 'border-blackcurrant/10')}>
      <span className="relative grid h-[118px] place-items-center bg-[linear-gradient(180deg,#e9eef5,#f6f3ee)]">
        <img src={vehicle.src} alt="" className="w-[78%]" />
        <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-white shadow-sm">
          <Icon name="heart" className={cn('size-3.5 transition-colors duration-300', picked ? 'text-[#e11d48]' : 'text-blackcurrant/20')} />
        </span>
      </span>
      <span className="block p-3">
        <span className="block font-display text-[12px] leading-tight font-bold text-blackcurrant">{vehicle.name}</span>
        <span className="mt-0.5 block truncate text-[10px] text-blackcurrant/60">{vehicle.spec}</span>
        <span className="mt-1.5 flex gap-1">
          {[vehicle.age, vehicle.mileage].map((detail) => (
            <span key={detail} className="rounded-full bg-blackcurrant/5 px-2 py-0.5 text-[9px] font-semibold text-blackcurrant/80">{detail}</span>
          ))}
        </span>
        <span className="mt-2 flex items-end justify-between border-t border-blackcurrant/10 pt-2">
          <Price monthly={vehicle.monthly} />
          <strong className="font-display text-[12px] text-blackcurrant">{vehicle.price}</strong>
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
              <span className="mt-0.5 block font-display text-[15px] leading-tight font-bold">Great news, you're approved in principle!</span>
            </span>
            <span className="flex shrink-0 flex-col items-center gap-0.5 text-[8px] text-white/80">
              <span className="grid size-9 place-items-center rounded-full border-2 font-display text-[12px] font-bold text-white" style={{ borderColor: MA_ACCENT }}>
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
              style={{ backgroundColor: MA_ACCENT }}
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
          <span className="relative flex h-8 items-center gap-1.5 rounded-full px-3.5 font-display text-[11px] font-bold text-blackcurrant" style={{ backgroundColor: MA_ACCENT }}>
            Filters
            <span className="absolute -top-1 -right-1 grid size-3.5 place-items-center rounded-full border border-white text-[7px]" style={{ backgroundColor: MA_ACCENT }}>1</span>
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
            <span className="py-1.5">Deposit &amp; Part Ex<span className="block font-bold text-purple underline">Add</span></span>
          </span>
          <span className="mt-2.5 flex justify-between text-[10px]">
            <span className="text-blackcurrant/60">100,808 vehicles found</span>
            <span className="font-semibold text-purple">Save search</span>
          </span>
        </span>
        <span className={cn('mt-2 grid gap-2.5 px-3 transition-transform duration-700 ease-[var(--ease-brand)]', picked && '-translate-y-[214px]')}>
          <ListingCard vehicle={tourneo} />
          <ListingCard vehicle={transit} picked={picked} />
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
          {['23', '01', '09', '21', '13'].map((angle, index) => (
            <span key={angle} className={cn('grid h-9 w-12 shrink-0 place-items-center overflow-hidden rounded-[5px] bg-[#eef0f4]', index === 0 && 'ring-2 ring-purple')}>
              <img src={transit.src.replace('angle=23', `angle=${angle}`)} alt="" className="w-[120%] max-w-none" />
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
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-blackcurrant/10 bg-white px-3 py-2.5">
          <Price monthly={transit.monthly} />
          <span
            className={cn('flex h-9 items-center rounded-full px-4 font-display text-[11px] font-bold text-blackcurrant transition-transform duration-200', picked && 'scale-95')}
            style={{ backgroundColor: MA_ACCENT }}
          >
            View quotes
          </span>
        </span>
      </span>
    ),
  },
]

function useDemo() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(false)

  useEffect(() => {
    if (reduceMotion) return
    const pick = window.setTimeout(() => setPicked(true), 1500)
    const next = window.setTimeout(() => {
      setPicked(false)
      setIndex((current) => (current + 1) % screens.length)
    }, 3200)
    return () => {
      window.clearTimeout(pick)
      window.clearTimeout(next)
    }
  }, [index, reduceMotion])

  return { index: reduceMotion ? 0 : index, picked: reduceMotion ? false : picked, reduceMotion }
}

function NavItem({ label, active, children, badge }: { label: string; active?: boolean; children: ReactNode; badge?: string }) {
  return (
    <span className={cn('relative flex flex-col items-center gap-0.5 text-[8px] font-semibold', active ? 'text-purple' : 'text-blackcurrant/60')}>
      <span className="grid size-5 place-items-center">{children}</span>
      {label}
      {badge && <span className="absolute -top-1 left-1/2 ml-1 grid h-3.5 min-w-3.5 place-items-center rounded-full px-0.5 text-[7px] text-blackcurrant" style={{ backgroundColor: MA_ACCENT }}>{badge}</span>}
      {active && <span className="absolute -bottom-1.5 h-0.5 w-6 rounded-full bg-purple" />}
    </span>
  )
}

export function MembersPhoneDemo() {
  const { index, picked, reduceMotion } = useDemo()
  const screen = screens[index]

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-[min(78vw,320px)] rounded-[46px] bg-blackcurrant p-[9px] shadow-[0_60px_120px_-40px_rgba(22,1,50,0.85),inset_0_0_0_2px_rgba(255,255,255,0.12)] sm:w-[340px]"
    >
      <div className="relative flex h-[min(150vw,600px)] flex-col overflow-hidden rounded-[38px] bg-white text-blackcurrant sm:h-[640px]">
        <div className="absolute top-2.5 left-1/2 z-10 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-blackcurrant" />
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
                <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1-2-2" strokeLinejoin="round" />
              </svg>
              Book a call
            </span>
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
              className="flex h-full flex-col"
            >
              {screen.render(picked)}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 grid grid-cols-5 items-end border-t border-blackcurrant/10 bg-white px-2 pt-1.5 pb-4">
          <NavItem label="Home" active={screen.tab === 'home'}>
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round">
              <path d="M4 10.5L12 4l8 6.5V20h-5v-6H9v6H4z" />
            </svg>
          </NavItem>
          <NavItem label="Browse" active={screen.tab === 'browse'}>
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
