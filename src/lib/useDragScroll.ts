import { useEffect, type RefObject } from 'react'

/**
 * Lets a mouse click-and-drag a horizontal scroller (touch and trackpads already scroll natively).
 * Snapping pauses while dragging, the row settles on the nearest card on release, and a drag never fires a link click.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const row = ref.current
    if (!row) return
    let startX = 0
    let startLeft = 0
    let pressed = false
    let dragged = false
    let frame = 0
    let fallback = 0

    const settle = () => {
      const edge = row.getBoundingClientRect().left + (parseFloat(getComputedStyle(row).scrollPaddingLeft) || 0)
      let offset = Infinity
      for (const item of row.children) {
        const delta = item.getBoundingClientRect().left - edge
        if (Math.abs(delta) < Math.abs(offset)) offset = delta
      }
      const from = row.scrollLeft
      const to = Math.min(Math.max(from + (Number.isFinite(offset) ? offset : 0), 0), row.scrollWidth - row.clientWidth)
      const finish = () => {
        cancelAnimationFrame(frame)
        window.clearTimeout(fallback)
        row.scrollLeft = to
        row.style.removeProperty('scroll-snap-type')
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return finish()
      // Animated by hand: native smooth scrolling is unreliable while snapping is switched off.
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min((now - start) / 320, 1)
        row.scrollLeft = from + (to - from) * (1 - (1 - t) ** 3)
        if (t < 1) frame = requestAnimationFrame(step)
        else finish()
      }
      frame = requestAnimationFrame(step)
      // Throttled tabs can skip frames, so always land on the card.
      fallback = window.setTimeout(finish, 400)
    }

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0 || row.scrollWidth <= row.clientWidth) return
      pressed = true
      dragged = false
      startX = event.clientX
      startLeft = row.scrollLeft
      cancelAnimationFrame(frame)
      window.clearTimeout(fallback)
    }
    const onMove = (event: PointerEvent) => {
      if (!pressed) return
      const dx = event.clientX - startX
      if (!dragged) {
        if (Math.abs(dx) < 6) return
        dragged = true
        row.setPointerCapture(event.pointerId)
        row.style.scrollSnapType = 'none'
        row.style.cursor = 'grabbing'
        row.style.userSelect = 'none'
      }
      row.scrollLeft = startLeft - dx
    }
    const onUp = () => {
      if (!pressed) return
      pressed = false
      if (!dragged) {
        if (row.style.scrollSnapType === 'none') settle()
        return
      }
      row.style.removeProperty('cursor')
      row.style.removeProperty('user-select')
      settle()
    }
    const onClick = (event: MouseEvent) => {
      if (!dragged) return
      event.preventDefault()
      event.stopPropagation()
      dragged = false
    }
    // Links and images would otherwise start a native drag-and-drop and cancel the scroll.
    const onDragStart = (event: DragEvent) => event.preventDefault()

    row.addEventListener('pointerdown', onDown)
    row.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    row.addEventListener('pointercancel', onUp)
    row.addEventListener('click', onClick, true)
    row.addEventListener('dragstart', onDragStart)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(fallback)
      row.removeEventListener('pointerdown', onDown)
      row.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      row.removeEventListener('pointercancel', onUp)
      row.removeEventListener('click', onClick, true)
      row.removeEventListener('dragstart', onDragStart)
    }
  }, [ref])
}
