import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { CogIntro } from './CogIntro'

/**
 * Extra test options. Each one sets an attribute on <html> (read by the `hero-centered`, `hero-bleed`,
 * and `hero-big` Tailwind variants, and the `html[data-btn]`, `html[data-green]`, `html[data-heading-font]`, `html[data-weight]`, and `html[data-tracking]` rules, in index.css) and is saved, so it survives reloads.
 * `pages` lists where each option applies.
 */
const toggles = [
  {
    key: 'cf247-content',
    attr: 'content',
    label: 'Homepage content',
    pages: ['home'],
    options: [
      { id: 'redesign', label: 'Redesign' },
      { id: 'live', label: 'Exact replica' },
    ],
  },
  {
    key: 'cf247-design',
    attr: 'design',
    label: 'Site design',
    pages: ['home'],
    options: [
      { id: 'modern', label: 'Modern (new)' },
      { id: 'classic', label: 'Classic' },
    ],
  },
  {
    key: 'cf247-hero',
    attr: 'hero',
    label: 'Hero layout',
    pages: ['home'],
    options: [
      { id: 'car', label: 'Cycling cars' },
      { id: 'centered', label: 'Centred, no car' },
      { id: 'bleed', label: 'Photo' },
      { id: 'big', label: 'Big headline' },
    ],
  },
  {
    key: 'cf247-green',
    attr: 'green',
    label: 'Green',
    pages: ['home', 'landing'],
    options: [
      { id: 'original', label: 'Original', swatch: '#8ef205' },
      { id: 'fresh', label: 'Option 1', swatch: '#ccff4a' },
      { id: 'green', label: 'Option 2', swatch: '#00eb52' },
    ],
  },
  {
    key: 'cf247-btn',
    attr: 'btn',
    label: 'Buttons',
    pages: ['home', 'landing'],
    options: [
      { id: 'slide', label: 'Sliding arrow' },
      { id: 'static', label: 'Fixed arrow' },
      { id: 'plain', label: 'No arrow' },
    ],
  },
  {
    // One font for all text (headings, accents and body), so the A/B test compares like with like.
    // The attribute and storage key keep their old "heading font" names.
    key: 'cf247-heading-font',
    attr: 'headingFont',
    label: 'Font',
    pages: ['home', 'landing'],
    defaultId: 'aeonik',
    options: [
      { id: 'aeonik', label: 'Aeonik' },
      { id: 'overused-grotesk', label: 'Overused Grotesk' },
    ],
  },
  {
    key: 'cf247-weight',
    attr: 'weight',
    // Shown as "<font> heading weight" (see labelOf).
    label: 'Heading weight',
    pages: ['home', 'landing'],
    defaultId: '700',
    options: [
      { id: '300', label: '300' },
      { id: '400', label: '400' },
      { id: '500', label: '500' },
      { id: '600', label: '600' },
      { id: '700', label: '700' },
      { id: '900', label: '900' },
    ],
  },
  {
    key: 'cf247-tracking',
    attr: 'tracking',
    label: 'Heading letter-spacing (em)',
    pages: ['home', 'landing'],
    defaultId: '0',
    options: [
      { id: '-0.03', label: '-0.03' },
      { id: '-0.02', label: '-0.02' },
      { id: '-0.01', label: '-0.01' },
      { id: '0', label: '0' },
      { id: '0.01', label: '+0.01' },
      { id: '0.02', label: '+0.02' },
    ],
  },
] as const

const gridCols = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 6: 'grid-cols-3' } as Record<number, string>

type ToggleKey = (typeof toggles)[number]['key']
type Page = 'home' | 'landing'

const pages: { id: Page; label: string; href: string }[] = [
  { id: 'home', label: 'Homepage', href: import.meta.env.BASE_URL },
  { id: 'landing', label: 'Refinance landing', href: `${import.meta.env.BASE_URL}landing-page/` },
]

const togglesFor = (page: Page) => toggles.filter((t) => (t.pages as readonly Page[]).includes(page))

function initialToggles(): Record<ToggleKey, string> {
  return Object.fromEntries(
    toggles.map((t) => {
      const saved = localStorage.getItem(t.key)
      const fallback = 'defaultId' in t ? t.defaultId : t.options[0].id
      const selected = t.attr === 'design' && saved !== 'modern' ? t.options[0].id : saved
      return [t.key, t.options.some((o) => o.id === selected) ? selected : fallback]
    }),
  ) as Record<ToggleKey, string>
}
/** Settings cog in the bottom-left corner for choosing a heading font. Mockup tooling only. */
export function FontSwitcher({ page = 'home' }: { page?: Page }) {
  const [opts, setOpts] = useState(initialToggles)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  useEffect(() => {
    for (const t of togglesFor(page)) {
      document.documentElement.dataset[t.attr] = opts[t.key]
      localStorage.setItem(t.key, opts[t.key])
    }
  }, [opts, page])
  // Fetch every weight of both heading fonts up front so switching is instant.
  useEffect(() => {
    for (const family of ["'Aeonik'", "'Overused Grotesk'"]) {
      for (const weight of ['300', '400', '500', '600', '700', '900']) void document.fonts.load(`${weight} 16px ${family}`)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // The weight group names the heading font it applies to, so it's always clear which one is being adjusted.
  const headingFont = toggles.find((t) => t.attr === 'headingFont')!.options.find((o) => o.id === opts['cf247-heading-font'])!.label
  const labelOf = (t: (typeof toggles)[number]) => (t.attr === 'weight' ? `${headingFont} heading weight` : t.label)

  const toggleGroup = (t: (typeof toggles)[number]) => (
    <div key={t.key} className="mt-2 border-t border-white/10 pt-2">
      <p className="px-3 pt-1.5 pb-2 text-xs font-semibold tracking-wide text-white/60 uppercase">{labelOf(t)}</p>
      <div role="radiogroup" aria-label={labelOf(t)} className={cn('grid gap-1 rounded-inner bg-white/5 p-1', gridCols[t.options.length])}>
        {t.options.map((o) => {
          const selected = opts[t.key] === o.id
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setOpts((cur) => ({ ...cur, [t.key]: o.id }))}
              className={cn(
                'rounded-inner px-2 py-2 text-center text-[13px] leading-tight font-semibold transition-colors',
                selected ? 'bg-lime text-blackcurrant' : 'text-white/80 hover:bg-white/10 hover:text-white',
              )}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <>
    <CogIntro page={page} onOpenCog={() => setOpen(true)} />
    <div
      ref={rootRef}
      className="group/cog fixed bottom-0 left-0 z-[55] p-4 sm:p-6 sm:pt-24 sm:pr-24"
    >
      <div className="relative">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom left' }}
            className="absolute bottom-[calc(100%+10px)] left-0 max-h-[calc(100svh-6rem)] w-64 overflow-y-auto overscroll-contain rounded-brand bg-blackcurrant/95 p-2 text-white shadow-[0_20px_50px_-15px_rgba(22,1,50,0.7)] ring-1 ring-white/10 backdrop-blur-md"
          >
            <p className="px-3 pt-1.5 pb-2 text-xs font-semibold tracking-wide text-white/60 uppercase">Page</p>
            <nav aria-label="Mockup pages" className="mb-2 grid grid-cols-2 gap-1 rounded-inner bg-white/5 p-1">
              {pages.map((p) => {
                const current = p.id === page
                return (
                  <a
                    key={p.id}
                    href={p.href}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'rounded-inner px-2 py-2 text-center text-[13px] leading-tight font-semibold transition-colors',
                      current ? 'bg-lime text-blackcurrant' : 'text-white/80 hover:bg-white/10 hover:text-white',
                    )}
                  >
                    {p.label}
                  </a>
                )
              })}
            </nav>

            {togglesFor(page)
              .filter((t) => t.attr === 'content')
              .map(toggleGroup)}

            {togglesFor(page)
              .filter((t) => t.attr === 'headingFont' || t.attr === 'weight' || t.attr === 'tracking')
              .map(toggleGroup)}

          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label="Choose heading and body type options"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'grid size-12 place-items-center rounded-full bg-blackcurrant/90 text-white shadow-[0_12px_30px_-10px_rgba(22,1,50,0.7)] ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-blackcurrant',
          open && 'text-lime',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className={cn('size-6 transition-transform duration-500 ease-[var(--ease-brand)]', open && 'rotate-90')}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
      </div>
    </div>
    </>
  )
}