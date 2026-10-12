import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

const fonts = [
  { id: 'general-sans', label: 'General Sans', family: "'General Sans', sans-serif" },
  { id: 'manrope', label: 'Manrope', family: "'Manrope', sans-serif" },
  { id: 'satoshi', label: 'Satoshi', family: "'Satoshi', sans-serif" },
] as const

type FontId = (typeof fonts)[number]['id']

const STORAGE_KEY = 'cf247-heading-font'

function initialFont(): FontId {
  const saved = localStorage.getItem(STORAGE_KEY)
  return fonts.some((f) => f.id === saved) ? (saved as FontId) : fonts[0].id
}

/**
 * Extra test options. Each one sets an attribute on <html> (read by the `hero-centered`, `hero-bleed`,
 * and `hero-big` Tailwind variants, and the `html[data-btn]` and `html[data-green]` rules, in index.css) and is saved, so it survives reloads.
 * `pages` lists where each option applies.
 */
const toggles = [
  {
    key: 'cf247-design',
    attr: 'design',
    label: 'Site design',
    pages: ['home'],
    options: [
      { id: 'classic', label: 'Classic' },
      { id: 'modern', label: 'Modern (new)' },
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
] as const

type ToggleKey = (typeof toggles)[number]['key']
type Page = 'home' | 'landing'

const togglesFor = (page: Page) => toggles.filter((t) => (t.pages as readonly Page[]).includes(page))

function initialToggles(): Record<ToggleKey, string> {
  return Object.fromEntries(
    toggles.map((t) => {
      const saved = localStorage.getItem(t.key)
      return [t.key, t.options.some((o) => o.id === saved) ? saved : t.options[0].id]
    }),
  ) as Record<ToggleKey, string>
}
/** Settings cog in the bottom-left corner for choosing a heading font. Mockup tooling only. */
export function FontSwitcher({ page = 'home' }: { page?: Page }) {
  const [font, setFont] = useState<FontId>(initialFont)
  const [opts] = useState(initialToggles)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  useEffect(() => {
    document.documentElement.dataset.headingFont = font
    localStorage.setItem(STORAGE_KEY, font)
  }, [font])

  useEffect(() => {
    for (const t of togglesFor(page)) {
      document.documentElement.dataset[t.attr] = opts[t.key]
      localStorage.setItem(t.key, opts[t.key])
    }
  }, [opts, page])
  // Fetch every option up front so switching is instant and the labels never show a fallback.
  useEffect(() => {
    for (const f of fonts) {
      for (const style of ['500', '600', 'italic 500', 'italic 600']) void document.fonts.load(`${style} 16px ${f.family}`)
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

  return (
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
            className="absolute bottom-[calc(100%+10px)] left-0 w-64 rounded-brand bg-blackcurrant/95 p-2 text-white shadow-[0_20px_50px_-15px_rgba(22,1,50,0.7)] ring-1 ring-white/10 backdrop-blur-md"
          >
            <p className="px-3 pt-1.5 pb-2 text-xs font-semibold tracking-wide text-white/60 uppercase">Heading font</p>
            <div role="radiogroup" aria-label="Heading font" className="grid gap-1">
              {fonts.map((f) => {
                const selected = f.id === font
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setFont(f.id)}
                    style={{ fontFamily: f.family }}
                    className={cn(
                      'relative flex items-center justify-between rounded-inner px-3 py-2.5 text-left text-[16px] font-semibold transition-colors',
                      selected ? 'text-blackcurrant' : 'text-white/85 hover:bg-white/10 hover:text-white',
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="font-switcher-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-inner bg-lime"
                      />
                    )}
                    <span className="relative">{f.label}</span>
                    <span className="relative text-sm font-medium opacity-70">Aa</span>
                  </button>
                )
              })}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label="Choose heading font"
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
  )
}