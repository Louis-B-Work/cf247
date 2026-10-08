import { cn } from '../../lib/utils'

const TP_GREEN = '#00B67A'

/** Test: brand lime instead of Trustpilot green. Set to false to restore the official colours. */
const USE_BRAND_LIME = true
const BOX_FILL = USE_BRAND_LIME ? 'var(--color-lime)' : TP_GREEN
// White stars disappear on lime, so the lime version uses blackcurrant stars.
const BOX_STAR = USE_BRAND_LIME ? 'var(--color-blackcurrant)' : '#fff'
const STAR = 'M24 5l5.6 12 13.1 1.5-9.7 8.9 2.7 13L24 33.9l-11.7 6.5 2.7-13-9.7-8.9 13.1-1.5z'

/** Trustpilot's five green star boxes. Size each box with `boxClassName`. */
export function TrustpilotStars({ className, boxClassName = 'size-5' }: { className?: string; boxClassName?: string }) {
  return (
    <span className={cn('inline-flex gap-[2px]', className)} role="img" aria-label="Rated 5 out of 5 on Trustpilot">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={cn('grid place-items-center', boxClassName)} style={{ backgroundColor: BOX_FILL }}>
          <svg viewBox="0 0 48 48" aria-hidden className="size-[78%]" style={{ fill: BOX_STAR }}>
            <path d={STAR} />
          </svg>
        </span>
      ))}
    </span>
  )
}

/** Trustpilot star and wordmark. `tone` sets the wordmark colour for light or dark backgrounds. */
export function TrustpilotLogo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[0.2em] font-sans font-bold tracking-[-0.02em] whitespace-nowrap',
        tone === 'dark' ? 'text-[#191919]' : 'text-white',
        className,
      )}
    >
      <svg viewBox="0 0 48 48" aria-hidden className="size-[1.15em] -translate-y-[0.06em]" style={{ fill: BOX_FILL }}>
        <path d={STAR} />
      </svg>
      Trustpilot
    </span>
  )
}
