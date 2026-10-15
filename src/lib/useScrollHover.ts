import { useEffect } from 'react'

/** Elements that switch to their hover look while they cross a band of the screen on touch devices. */
const SELECTOR = '.cf-pill-button, [data-scroll-hover]'

/**
 * Touch screens have no hover, so on those devices each button shows its lime hover state while it passes through
 * a band of the screen as you scroll. It works by setting `data-scroll-active`, which the styles treat like `:hover`.
 * Mouse and trackpad users are unaffected.
 *
 * An element can choose its own band and a delay before it switches on:
 * `data-scroll-hover="-20% 0px -70% 0px"` and `data-scroll-hover-delay="900"` (ms).
 */
export function useScrollHover() {
  useEffect(() => {
    const touch = window.matchMedia('(hover: none)')
    const observers = new Map<string, IntersectionObserver>()
    const timers = new Map<Element, number>()
    let watched = new WeakSet<Element>()
    let frame = 0

    const onEntries = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        window.clearTimeout(timers.get(el))
        timers.delete(el)
        if (entry.isIntersecting) {
          const delay = Number(el.dataset.scrollHoverDelay) || 0
          if (delay) timers.set(el, window.setTimeout(() => (el.dataset.scrollActive = ''), delay))
          else el.dataset.scrollActive = ''
        } else {
          delete el.dataset.scrollActive
        }
      }
    }

    const observerFor = (margin: string) => {
      let io = observers.get(margin)
      if (!io) {
        io = new IntersectionObserver(onEntries, { rootMargin: margin })
        observers.set(margin, io)
      }
      return io
    }

    const scan = () => {
      if (!touch.matches) return
      // IntersectionObserver percentage margins resolve against width, not height.
      const inset = window.innerHeight * 0.4
      const defaultMargin = `-${inset}px 0px -${inset}px 0px`
      for (const el of document.querySelectorAll<HTMLElement>(SELECTOR)) {
        if (watched.has(el)) continue
        watched.add(el)
        observerFor(el.dataset.scrollHover || defaultMargin).observe(el)
      }
    }
    const reset = () => {
      for (const io of observers.values()) io.disconnect()
      observers.clear()
      for (const timer of timers.values()) window.clearTimeout(timer)
      timers.clear()
      for (const el of document.querySelectorAll<HTMLElement>('[data-scroll-active]')) delete el.dataset.scrollActive
      watched = new WeakSet<Element>()
      scan()
    }
    scan()
    window.addEventListener('resize', reset)
    touch.addEventListener('change', reset)

    // Sections mount and animate in after load (and buttons swap with the design options), so keep watching.
    const mo = new MutationObserver(() => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        scan()
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', reset)
      touch.removeEventListener('change', reset)
      mo.disconnect()
      for (const io of observers.values()) io.disconnect()
      for (const t of timers.values()) window.clearTimeout(t)
      for (const el of document.querySelectorAll<HTMLElement>('[data-scroll-active]')) delete el.dataset.scrollActive
    }
  }, [])
}
