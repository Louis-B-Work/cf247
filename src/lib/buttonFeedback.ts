import { useEffect, type RefObject } from 'react'

const PRESS_HOLD_MS = 250
const ATTENTION_MS = 1000

const isTouchScreen = () => window.matchMedia('(hover: none)').matches
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Touch screens: sets `data-pressed` on press and keeps it briefly after release, so even a quick tap
 * shows the full hover state. Navigation is not delayed. A pointercancel (the touch became a scroll) clears it at once.
 */
export function usePressHold(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timer: number | undefined

    const clear = () => {
      window.clearTimeout(timer)
      delete el.dataset.pressed
    }
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return
      window.clearTimeout(timer)
      el.dataset.pressed = ''
    }
    const onUp = () => {
      if (!('pressed' in el.dataset)) return
      window.clearTimeout(timer)
      timer = window.setTimeout(clear, PRESS_HOLD_MS)
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', clear)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', clear)
      clear()
    }
  }, [ref])
}

/**
 * Touch screens: plays the hover state once (via `data-attention`) the first time the button is fully on screen,
 * then never again for that page load. Skipped on hover-capable devices and with reduced motion.
 */
export function useAttentionOnce(ref: RefObject<HTMLElement | null>, enabled: boolean, delay: number) {
  useEffect(() => {
    const el = ref.current
    if (!enabled || !el || !isTouchScreen() || prefersReducedMotion()) return
    let startTimer: number | undefined
    let endTimer: number | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        startTimer = window.setTimeout(() => {
          el.dataset.attention = ''
          endTimer = window.setTimeout(() => delete el.dataset.attention, ATTENTION_MS)
        }, delay)
      },
      // Fully visible and clear of the bottom fifth, so it plays where the eye already is.
      { threshold: 1, rootMargin: '0px 0px -20% 0px' },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      window.clearTimeout(startTimer)
      window.clearTimeout(endTimer)
      delete el.dataset.attention
    }
  }, [ref, enabled, delay])
}
