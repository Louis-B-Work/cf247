import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'

const SEEN_KEY = 'cf247-cog-intro-seen'

type Page = 'home' | 'landing'

const items: Array<{ title: string; body: string; pages: Page[] }> = [
  { title: 'Page', body: 'Jump between the homepage and the refinance landing page.', pages: ['home', 'landing'] },
  {
    title: 'Homepage content',
    body: 'Redesign shows the proposed copy and layout. Exact replica is the live site exactly as it is today, with only the fonts and colours swapped, for the first A/B test.',
    pages: ['home'],
  },
  // The Font choice only exists where the Aeonik trial files do (a local build), so its blurb is left out of the shared site.
  ...(__HAS_AEONIK__
    ? [
        {
          title: 'Font',
          body: 'Compare Aeonik with Overused Grotesk. The chosen font is used for all text on the page, headings and body alike.',
          pages: ['home', 'landing'] as Page[],
        },
      ]
    : []),
  {
    title: 'Heading weight',
    body: 'Compare heading weights from 300 to 900 for how chunky they feel; paragraph text is unaffected.',
    pages: ['home', 'landing'],
  },
  {
    title: 'Heading letter-spacing',
    body: 'Tighten or loosen the gaps between heading letters, from -0.03em to +0.02em. 0 is Aeonik’s natural spacing.',
    pages: ['home', 'landing'],
  },
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
            className="fixed bottom-[88px] left-4 z-[56] max-h-[calc(100svh-7rem)] w-[min(calc(100vw-2rem),380px)] overflow-y-auto overscroll-contain rounded-brand bg-white p-6 text-blackcurrant shadow-[0_30px_80px_-30px_rgba(22,1,50,0.8)] sm:bottom-[104px] sm:left-6"
          >
            {/* Pointer down to the cog. */}
            <span aria-hidden className="absolute -bottom-2 left-[18px] size-4 rotate-45 bg-white" />
            <p id={titleId} className="font-display text-2xl leading-tight font-semibold text-purple">
              Try the options in the cog
            </p>
            <p className="mt-2 text-base leading-relaxed text-blackcurrant/75">
              The cog in the bottom-left corner lets you compare versions of this mockup:
            </p>
            {/* Only where the Aeonik trial files are served (the local build and the /aeonik/ site). The terms are CoType Foundry's trial EULA. */}
            {__HAS_AEONIK__ && (
              <div role="note" className="mt-3 flex gap-3 rounded-inner bg-purple-10 p-3.5 ring-1 ring-purple/25">
                <svg viewBox="0 0 24 24" aria-hidden className="mt-0.5 size-5 shrink-0 text-purple" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3.5l9.5 16.5h-19z" />
                  <path d="M12 10v4.5M12 17.2v.1" />
                </svg>
                <div className="text-[13.5px] leading-snug">
                  <strong className="font-display font-semibold">Aeonik is a trial font</strong>
                  <p className="mt-1 text-blackcurrant/80">
                    CoType Foundry’s trial licence covers internal trial and evaluation only, on at most 5 devices inside our own organisation. Don’t copy the font files, pass them to anyone outside the organisation, or use them in final files for a commercial project. Delete all copies when the trial ends.
                  </p>
                  <p className="mt-1 text-blackcurrant/65">
                    The licence also bars using the fonts on any website accessible via public networks. Keep this page internal and don’t forward the link.
                  </p>
                </div>
              </div>
            )}
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
