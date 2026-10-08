import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react'
import { useEffect, useRef, useState, type FocusEvent } from 'react'
import { navItems, quoteUrl, signInUrl, type NavItem } from '../../data/nav'
import { cn } from '../../lib/utils'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { MobileMenu } from './MobileMenu'

const CLOSE_DELAY = 140

export function Nav() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 })
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 8))


  const open = (id: string) => {
    window.clearTimeout(closeTimer.current)
    setOpenId(id)
  }
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenId(null), CLOSE_DELAY)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="on-dark fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'relative bg-purple transition-shadow duration-300',
          scrolled && 'shadow-[0_10px_40px_-12px_rgba(22,1,50,0.55)]',
        )}
      >
        <nav
          aria-label="Main"
          className="flex h-[var(--nav-height)] items-center gap-6 px-[var(--nav-pad)] lg:max-xl:gap-4"
        >
          <a href="#top" className="shrink-0 rounded-md" aria-label="Car Finance 247 home">
            <Logo className="h-[46px] w-auto text-white sm:hidden" />
            <Logo variant="inline" className="hidden h-[26px] w-auto text-white sm:block lg:max-xl:h-[22px] xl:h-[28px]" />
          </a>

          <ul className="hidden h-full items-stretch lg:flex xl:ml-4">
            {navItems.map((item) => (
              <DesktopItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onOpen={() => open(item.id)}
                onClose={scheduleClose}
                onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
              />
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1 sm:gap-4">
            <SignInLink />
            <Button href={quoteUrl} variant="outline-light" size="md">
              Get my quote
            </Button>
            <button
              type="button"
              className="grid size-12 place-items-center rounded-brand lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Icon name="menu" className="size-7" />
            </button>
          </div>
        </nav>

        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-progress"
        />
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}

/** Lime underline that draws in from the left on hover, focus or while a menu is open. */
function NavUnderline({ active }: { active?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute inset-x-0 -bottom-1.5 h-[3px] origin-left scale-x-0 rounded-full bg-lime transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none',
        active && 'scale-x-100',
      )}
    />
  )
}

function SignInLink() {
  return (
    <a
      href={signInUrl}
      className="group hidden h-11 items-center gap-2 px-3 font-display text-[16px] font-semibold whitespace-nowrap sm:flex"
    >
      <Icon name="user" className="size-5" />
      <span className="relative lg:max-xl:sr-only">
        Sign in
        <NavUnderline />
      </span>
    </a>
  )
}

type DesktopItemProps = {
  item: NavItem
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

function DesktopItem({ item, isOpen, onOpen, onClose, onToggle }: DesktopItemProps) {
  const panelId = `nav-panel-${item.id}`

  const handleBlur = (e: FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose()
  }

  return (
    <li className="flex items-center px-0.5" onMouseEnter={onOpen} onMouseLeave={onClose} onBlur={handleBlur}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex h-11 items-center gap-1.5 px-3 lg:max-xl:px-2 font-display text-[16px] font-semibold whitespace-nowrap xl:px-4 xl:text-[17px]"
      >
        <span className="relative">
          {item.label}
          <NavUnderline active={isOpen} />
        </span>
        <Icon
          name="chevron"
          className={cn('size-4 transition-transform duration-300', isOpen && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full border-t border-white/10 bg-white text-blackcurrant shadow-[0_30px_60px_-20px_rgba(22,1,50,0.35)] [--focus-ring:var(--color-purple)]"
          >
            <MegaPanel item={item} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function MegaPanel({ item }: { item: NavItem }) {
  const cols = item.columns.length
  return (
    <div className="container-cf">
      <div className="grid grid-cols-12 gap-10 pt-9 pb-8">
        <div
          className={cn(
            'col-span-9 grid divide-x divide-purple-10',
            cols >= 4 ? 'grid-cols-4' : cols === 3 ? 'grid-cols-3' : 'grid-cols-2',
          )}
        >
          {item.columns.map((col) => (
            <div key={col.title} className="px-7 first:pl-0">
              <p className="font-display text-[1.6rem] leading-[var(--leading-title)] font-medium tracking-[-0.02em] text-blackcurrant">
                {col.title}
              </p>
              <ul className="mt-5 space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group/link -mx-2 flex items-center rounded-[10px] px-2 py-1.5 text-[15px] text-blackcurrant/75 transition-colors duration-200 hover:bg-purple-10 hover:text-purple"
                    >
                      <span className="h-[3px] w-0 shrink-0 rounded-full bg-lime transition-all duration-300 ease-[var(--ease-brand)] group-hover/link:mr-2 group-hover/link:w-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <a
          href={item.feature.href}
          className="group relative col-span-3 flex flex-col justify-between gap-8 overflow-hidden rounded-brand bg-purple p-7 text-white [--focus-ring:var(--color-lime)]"
        >
          <span
            aria-hidden
            className="absolute -top-16 -right-16 size-48 rounded-full bg-[radial-gradient(closest-side,rgba(165,105,247,0.6),rgba(105,5,242,0))] transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-125"
          />
          <span className="relative grid size-14 place-items-center rounded-brand bg-white/10 ring-1 ring-white/15">
            <Icon name={item.feature.icon} className="size-8" />
          </span>
          <div className="relative">
            <p className="font-display text-[1.6rem] leading-[var(--leading-title)] font-medium tracking-[-0.02em]">
              {item.feature.title}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/80">{item.feature.body}</p>
            <span className="mt-6 inline-flex items-center gap-3 font-display font-semibold">
              {item.feature.cta}
              <span className="grid size-9 place-items-center rounded-[10px] bg-white text-purple transition-colors duration-300 group-hover:bg-lime group-hover:text-blackcurrant">
                <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </span>
          </div>
        </a>
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-purple-10 py-4 text-sm">
        <a
          href={item.all.href}
          className="group/all inline-flex items-center gap-2 font-display font-semibold text-purple"
        >
          <span className="relative">
            {item.all.label}
            <span className="absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-lime transition-transform duration-300 ease-[var(--ease-brand)] group-hover/all:scale-x-100" />
          </span>
          <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover/all:translate-x-1" />
        </a>
        <span className="inline-flex items-center gap-2 text-blackcurrant/60">
          <Icon name="shield" className="size-4 text-purple" />
          Getting a quote won’t affect your credit score
        </span>
      </div>
    </div>
  )
}