import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { navItems, quoteUrl, signInUrl } from '../../data/nav'
import { cn } from '../../lib/utils'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

/** A tree level: a vertical trunk line runs down the left, stopping at the last child's elbow. */
function Branch({ children, className }: { children: ReactNode; className?: string }) {
  return <ul className={cn('relative', className)}>{children}</ul>
}

/**
 * One branch: a curved elbow leaves the trunk and ends in an arrowhead pointing at the item.
 * The trunk segment is drawn per item (and stops at the elbow on the last item), so it never overshoots.
 */
function BranchItem({ children, small }: { children: ReactNode; small?: boolean }) {
  const elbowTop = small ? '1.1rem' : '1.4rem'
  return (
    <li className="group/branch relative pl-7" style={{ ['--elbow' as string]: elbowTop }}>
      <span aria-hidden className="absolute top-0 left-0 h-full w-px bg-purple-60 group-last/branch:h-[calc(var(--elbow)-0.5rem)]" />
      <svg
        aria-hidden
        viewBox="0 0 24 16"
        className="absolute left-0 h-4 w-6 text-purple-60"
        style={{ top: 'calc(var(--elbow) - 0.75rem)' }}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0.5 0v4a8 8 0 0 0 8 8H21" vectorEffect="non-scaling-stroke" />
        <path d="M17.5 8.5L21 12l-3.5 3.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {children}
    </li>
  )
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(navItems[0].id)
  const [group, setGroup] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.dataset.menuOpen = ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      delete document.documentElement.dataset.menuOpen
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          className="on-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-purple lg:hidden"
        >
          <div className="flex h-[var(--nav-height)] shrink-0 items-center justify-between px-5">
            <Logo className="h-[46px] w-auto text-white" />
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-12 place-items-center rounded-brand"
            >
              <Icon name="close" className="size-7" />
            </button>
          </div>

          <ul className="flex-1 px-5 pb-6">
            {navItems.map((item) => {
              const isOpen = expanded === item.id
              return (
                <li key={item.id} className="border-b border-white/15 py-1.5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => {
                      setExpanded(isOpen ? null : item.id)
                      setGroup(null)
                    }}
                    className="flex w-full items-center justify-between rounded-inner px-2 py-3.5 text-left font-display text-2xl font-semibold [--focus-ring:var(--color-lime)] focus-visible:outline-offset-[-3px]"
                  >
                    <span className={cn('transition-colors', isOpen && 'text-lime')}>{item.label}</span>
                    <Icon name="chevron" className={cn('size-6 transition-transform duration-300', isOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <Branch className="ml-4 pt-1 pb-4">
                          {item.columns.map((col) => {
                            const key = `${item.id}:${col.title}`
                            const groupOpen = group === key
                            return (
                              <BranchItem key={col.title}>
                                <button
                                  type="button"
                                  aria-expanded={groupOpen}
                                  onClick={() => setGroup(groupOpen ? null : key)}
                                  className="flex w-full items-center justify-between rounded-inner py-2.5 pr-2 pl-1 text-left font-display text-lg font-semibold [--focus-ring:var(--color-lime)] focus-visible:outline-offset-[-2px]"
                                >
                                  <span className={cn('transition-colors', groupOpen ? 'text-lime' : 'text-white')}>{col.title}</span>
                                  <Icon
                                    name="chevron"
                                    className={cn('size-5 text-white/55 transition-transform duration-300', groupOpen && 'rotate-180')}
                                  />
                                </button>
                                <AnimatePresence initial={false}>
                                  {groupOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                      className="overflow-hidden"
                                    >
                                      <Branch className="ml-3 pb-2">
                                        {col.links.map((link) => (
                                          <BranchItem key={link.label} small>
                                            <a
                                              href={link.href}
                                              className="block rounded-inner py-2 pr-2 pl-1 text-[15px] text-white/85 transition-colors [--focus-ring:var(--color-lime)] hover:text-lime active:text-lime focus-visible:outline-offset-[-2px]"
                                            >
                                              {link.label}
                                            </a>
                                          </BranchItem>
                                        ))}
                                      </Branch>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </BranchItem>
                            )
                          })}
                        </Branch>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
          <div className="sticky bottom-0 grid gap-3 bg-purple px-5 pt-4 pb-8 before:pointer-events-none before:absolute before:inset-x-0 before:-top-10 before:h-10 before:bg-gradient-to-t before:from-purple before:to-purple/0">
            <Button href={quoteUrl} variant="reverse" fullWidth>
              Get my quote
            </Button>
            <a
              href={signInUrl}
              className="flex h-12 items-center justify-center gap-2 rounded-brand font-display font-semibold ring-2 ring-white/40 ring-inset"
            >
              <Icon name="user" className="size-5" />
              Sign in
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
