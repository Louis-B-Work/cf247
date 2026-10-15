import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'

const SEEN_KEY = 'cf247-cog-intro-seen'

type Page = 'home' | 'landing'

const items: Array<{ title: string; body: string; pages: Page[] }> = [
  { title: 'Page', body: 'Jump between the homepage and the refinance landing page.', pages: ['home', 'landing'] },
  {
    title: 'Homepage content',
    body: 'Redesign shows the proposed copy and layout. Exact replica shows the live site’s content, word for word and in the same order, in the new design.',
    pages: ['home'],
  },
  { title: 'Heading font', body: 'Compare Neulis Sans and Neulis Neue.', pages: ['home', 'landing'] },
  { title: 'Neulis Cursive accents', body: 'Trial the cursive letters used for emphasis in some headings.', pages: ['home', 'landing'] },
]

function seen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Welcome overlay explaining the settings cog. Shown once per browser session (so each new visit sees it, but
 * reloads don't). The page dims while the cog stays visible above the backdrop, with this panel pointing at it.
 */
export function CogIntro({ page, onOpenCog }: { page: Page; onOpenCog: () => void }) {
  const [show, setShow] = useState(() => !seen())
  const titleId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const dismiss = () => {
    setShow(false)
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* Private mode: the intro just shows again next time. */
    }
  }

  useEffect(() => {
    if (!show) return
    buttonRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={dismiss}
            className="fixed inset-0 z-[54] bg-blackcurrant/55 backdrop-blur-[2px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ transformOrigin: 'bottom left' }}
            className="fixed bottom-[88px] left-4 z-[56] w-[min(calc(100vw-2rem),380px)] rounded-brand bg-white p-6 text-blackcurrant shadow-[0_30px_80px_-30px_rgba(22,1,50,0.8)] sm:bottom-[104px] sm:left-6"
          >
            {/* Pointer down to the cog. */}
            <span aria-hidden className="absolute -bottom-2 left-[18px] size-4 rotate-45 bg-white" />
            <p id={titleId} className="font-display text-2xl leading-tight font-semibold text-purple">
              Try the options in the cog
            </p>
            <p className="mt-2 text-base leading-relaxed text-blackcurrant/75">
              The cog in the bottom-left corner lets you compare versions of this mockup:
            </p>
            <ul className="mt-4 space-y-3">
              {items
                .filter((item) => item.pages.includes(page))
                .map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-lime ring-2 ring-purple/20" />
                    <span className="text-[15px] leading-relaxed">
                      <strong className="font-display font-semibold">{item.title}:</strong> {item.body}
                    </span>
                  </li>
                ))}
            </ul>
            <p className="mt-4 text-sm text-blackcurrant/60">Your choices are saved in this browser.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                ref={buttonRef}
                type="button"
                onClick={() => {
                  dismiss()
                  onOpenCog()
                }}
                className="h-11 rounded-inner bg-purple px-5 font-display font-semibold text-white transition-colors hover:bg-lime hover:text-blackcurrant"
              >
                Show me the cog
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="h-11 rounded-inner px-4 font-display font-semibold text-purple ring-2 ring-purple/20 ring-inset transition-colors hover:bg-purple-10"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
