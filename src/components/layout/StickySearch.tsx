import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { HeroSearch } from '../sections/HeroSearch'
import { cn } from '../../lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

/** Shown from page load; hides only while the final call to action or the footer is on screen. */
function useStickySearchVisibility() {
  const [blocked, setBlocked] = useState(false)
  const blockedTargets = useRef(new Set<Element>())

  useEffect(() => {
    const blockedSet = blockedTargets.current

    const blockObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) blockedSet.add(entry.target)
          else blockedSet.delete(entry.target)
        }
        setBlocked(blockedSet.size > 0)
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )

    const blockers = [
      document.querySelector('[aria-labelledby="final-title"]'),
      document.querySelector('footer'),
    ].filter((target): target is Element => Boolean(target))

    for (const target of blockers) blockObserver.observe(target)

    return () => {
      blockObserver.disconnect()
      blockedSet.clear()
    }
  }, [])

  return !blocked
}

export function StickySearch() {
  const visible = useStickySearchVisibility()

  return (
    <AnimatePresence>
      {visible && <StickySearchContent key="sticky-search" />}
    </AnimatePresence>
  )
}

/**
 * A bare magnifier in the bottom-right corner. Hovering it (or focusing, or tapping on touch screens) slides the
 * frosted search bar out to the left from the icon, which stays put at the bar's right end.
 *
 * At rest the icon has no box: a lime magnifier with a soft dark halo, which reads on the purple hero, white and lilac.
 */
function StickySearchContent() {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  // Results drop upwards out of the bar, so the bar only stops clipping once it has finished opening.
  const [settled, setSettled] = useState(false)
  const open = hovered || focused

  const close = () => {
    setHovered(false)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.24, ease }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
      }}
      className={cn(
        'fixed right-3 bottom-3 z-40 sm:right-6 sm:bottom-6 [html[data-menu-open]_&]:hidden',
      )}
    >
      <div
        onTransitionEnd={(e) => e.propertyName === 'width' && setSettled(open)}
        className={cn(
          'relative ml-auto h-[52px] rounded-brand transition-[width,background-color,box-shadow] duration-500 ease-[var(--ease-brand)] sm:h-14 motion-reduce:transition-none',
          open
            ? 'w-[min(520px,calc(100vw-1.5rem))] bg-purple-10/60 shadow-[0_20px_50px_-18px_rgba(22,1,50,0.45),inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-purple/20 backdrop-blur-xl backdrop-saturate-150'
            : 'w-[52px] sm:w-14',
          open && settled ? 'overflow-visible' : 'overflow-hidden',
        )}
      >
        {/* Full-width field pinned to the right, so the bar reveals it from the icon outwards. */}
        <div className="absolute top-0 right-0 w-[min(520px,calc(100vw-1.5rem))]">
          <HeroSearch
            dropDirection="up"
            variant="flush"
            onEscape={close}
            iconClassName={open ? undefined : 'text-lime [filter:drop-shadow(0_0_1px_rgba(22,1,50,0.9))_drop-shadow(0_4px_10px_rgba(22,1,50,0.45))]'}
          />
        </div>
      </div>
    </motion.div>
  )
}
