import { cn } from '../../lib/utils'

const STAR = 'M24 5l5.6 12 13.1 1.5-9.7 8.9 2.7 13L24 33.9l-11.7 6.5 2.7-13-9.7-8.9 13.1-1.5z'

type Tone = 'dark' | 'light'

/** Brand star colour: purple on light backgrounds, white on purple or blackcurrant ones where purple would vanish. */
const starFill = (tone: Tone) => (tone === 'dark' ? 'fill-purple' : 'fill-white')

/** Five plain stars (no boxes). Size each star with `boxClassName`; `tone="light"` for dark backgrounds. */
export function TrustpilotStars({
  className,
  boxClassName = 'size-5',
  tone = 'dark',
}: {
  className?: string
  boxClassName?: string
  tone?: Tone
}) {
  return (
    <span className={cn('inline-flex gap-[1px] tp-brand:gap-[2px] tp-lime:gap-[2px]', className)} role="img" aria-label="Rated 5 out of 5 on Trustpilot">
      {Array.from({ length: 5 }, (_, i) => (
        // Test options: "Trustpilot green" boxes each star in Trustpilot's green with a white star; "CF247 green"
        // uses the brand lime box with a blackcurrant star, as white on lime would be too faint.
        <span key={i} className={cn('grid place-items-center tp-brand:bg-[#00B67A] tp-lime:bg-lime', boxClassName)}>
          <svg viewBox="0 0 48 48" aria-hidden className={cn('size-full tp-brand:size-[78%] tp-brand:fill-white tp-lime:size-[78%] tp-lime:fill-blackcurrant', starFill(tone))}>
            <path d={STAR} />
          </svg>
        </span>
      ))}
    </span>
  )
}

/** Trustpilot star and wordmark. `tone` sets the wordmark colour for light or dark backgrounds. */
export function TrustpilotLogo({ tone = 'dark', className }: { tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[0.2em] font-sans font-bold tracking-[-0.02em] whitespace-nowrap',
        tone === 'dark' ? 'text-[#191919]' : 'text-white',
        className,
      )}
    >
      {/* "CF247 green" turns the logo star lime on dark backgrounds only; lime on white is too faint. */}
      <svg viewBox="0 0 48 48" aria-hidden className={cn('size-[1.15em] -translate-y-[0.06em] tp-brand:fill-[#00B67A]', starFill(tone), tone === 'light' && 'tp-lime:fill-lime')}>
        <path d={STAR} />
      </svg>
      Trustpilot
    </span>
  )
}