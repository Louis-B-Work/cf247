import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/**
 * Shared pieces for the modern design, so every section reads the same:
 * - page background is lilac (purple-10); content sits on large white or purple "panels" with 28px corners
 * - no small labels above headlines; headlines are big, tight and purple; body copy is blackcurrant/70
 */

export const panel = 'rounded-brand'

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
        'text-[clamp(2.4rem,6vw,4.75rem)] leading-[1] font-medium tracking-[-0.04em]',
        tone === 'light' ? 'text-purple' : 'text-white',
        className,
      )}
    >
      {children}
    </h2>
  )
}
