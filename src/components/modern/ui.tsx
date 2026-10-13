import { Children, useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

/**
 * Shared pieces for the modern design, so every section reads the same:
 * - page background is lilac (purple-10); content sits on large white or purple "panels" with 28px corners
 * - no small labels above headlines; headlines are big, tight and purple; body copy is blackcurrant/70
 */

export const panel = 'rounded-brand'

/** Width and snapping for each card inside a `SwipeRow` on phones; leaves part of the next card showing. */
export const swipeItem = 'max-md:w-[min(84vw,340px)] max-md:shrink-0 max-md:snap-start'

/**
 * Phones (below md): a full-bleed, swipeable row with the next card peeking in and position dots underneath.
 * From md up it is a plain container, so the caller's grid classes take over.
 */
export function SwipeRow({
  as: Tag = 'div',
  label,
  className,
  children,
}: {
  as?: 'div' | 'ul'
  label: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const count = Children.count(children)

  useEffect(() => {
    const row = ref.current
    if (!row) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const items = [...row.children] as HTMLElement[]
        if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 4) return setActive(items.length - 1)
        const start = row.getBoundingClientRect().left + parseFloat(getComputedStyle(row).paddingLeft)
        let best = 0
        items.forEach((item, index) => {
          if (Math.abs(item.getBoundingClientRect().left - start) < Math.abs(items[best].getBoundingClientRect().left - start)) best = index
        })
        setActive(best)
      })
    }
    row.addEventListener('scroll', update, { passive: true })
    return () => {
      row.removeEventListener('scroll', update)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <Tag
        ref={ref as never}
        aria-label={label}
        className={cn(
          'max-md:-mx-[var(--pad-wide)] max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-x-auto max-md:overscroll-x-contain max-md:scroll-px-[var(--pad-wide)] max-md:px-[var(--pad-wide)] max-md:pb-2 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden',
          className,
        )}
      >
        {children}
      </Tag>
      {count > 1 && (
        <div aria-hidden className="mt-3 flex justify-center gap-1.5 md:hidden">
          {Array.from({ length: count }, (_, index) => (
            <span
              key={index}
              className={cn('h-1.5 rounded-full transition-[width,background-color] duration-300', index === active ? 'w-5 bg-purple' : 'w-1.5 bg-purple/25')}
            />
          ))}
        </div>
      )}
    </>
  )
}

/** Big modern headline. Pass `tone="dark"` on purple panels. */
export function ModernHeading({
  id,
  children,
  tone = 'light',
  className,
}: {
  id?: string
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <h2
      id={id}
      className={cn(
        'text-[clamp(1.85rem,3.8vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.035em] text-balance',
        tone === 'light' ? 'text-purple' : 'text-white',
        className,
      )}
    >
      {children}
    </h2>
  )
}
