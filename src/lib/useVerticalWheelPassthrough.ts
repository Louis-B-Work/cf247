import { useEffect, type RefObject } from 'react'

/**
 * Keeps vertical wheel and trackpad scrolling moving the page when the pointer is over a
 * horizontally scrolling row. Without this, Chromium can latch a whole trackpad gesture to
 * the row if it starts with any sideways drift, which stalls the page scroll.
 * Touch screens don't send wheel events, so swiping is unaffected.
 */
export function useVerticalWheelPassthrough(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      // Only intervene while the row actually scrolls sideways (phones and narrow screens).
      if (el.scrollWidth <= el.clientWidth) return
      e.preventDefault()
      const scale = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
      window.scrollBy({ top: e.deltaY * scale, behavior: 'instant' })
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [ref])
}
