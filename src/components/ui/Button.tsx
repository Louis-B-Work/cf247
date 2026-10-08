import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from './Icon'

type Variant = 'primary' | 'reverse' | 'light' | 'outline-light' | 'outline-dark'
type Size = 'md' | 'lg' | 'xl'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  ariaLabel?: string
  /**
   * Render as a non-interactive span, for when the whole surrounding card is the link.
   * The fill still plays when the card is hovered or pressed, because the card also carries the \group\ class.
   */
  asSpan?: boolean
  tabIndex?: number
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-purple text-white',
  reverse: 'bg-white text-purple',
  // The white button for white or tint backgrounds: a fine purple-tint outline and soft shadow keep its edge visible.
  // Test option "Mixed" (settings cog) restores the original solid purple button on light backgrounds.
  light:
    'bg-white text-purple ring-1 ring-inset ring-purple-30 shadow-[0_10px_24px_-14px_rgba(105,5,242,0.45)] btn-mixed:bg-purple btn-mixed:text-white btn-mixed:shadow-none btn-mixed:ring-0',
  'outline-light': 'bg-transparent text-white ring-2 ring-inset ring-white/80',
  'outline-dark': 'bg-transparent text-purple ring-2 ring-inset ring-purple',
}

/** Button height, the knob that sits inside it (height minus the 4px inset), and label spacing. */
const sizeStyles: Record<Size, { button: string; knob: string; label: string }> = {
  // Phones: md and lg drop to a compact 44px rectangle (the minimum comfortable tap height).
  // xl is the hero's primary call to action: 52px on phones (larger than the rest) and 56px with wider padding from sm up.
  md: { button: 'h-11 text-[15px] sm:h-12', knob: 'w-9 sm:w-10', label: 'pr-5 pl-[3.25rem] sm:pr-6 sm:pl-[3.6rem]' },
  lg: { button: 'h-11 text-[15px] sm:h-14 sm:text-base', knob: 'w-9 sm:w-12', label: 'pr-5 pl-[3.25rem] sm:pr-7 sm:pl-[4.1rem]' },
  xl: { button: 'h-[52px] text-base sm:h-14', knob: 'w-11 sm:w-12', label: 'pr-7 pl-[3.9rem] sm:pr-9 sm:pl-[4.4rem]' },
}

const motion = 'duration-500 group-active:duration-150 ease-[var(--ease-brand)] motion-reduce:transition-none'

/**
 * Brand button modelled on the 21st.dev Motion Button: a lime knob holding an arrow
 * stretches across the whole button on hover while the label switches to blackcurrant.
 *
 * Touch screens have no hover, so the same fill plays while the button is pressed (with a slight
 * press-in). On phones most buttons shrink to compact 44px-high rectangles at their natural width.
 */
export function Button({
  children,
  href,
  variant = 'primary',
  size = 'lg',
  fullWidth,
  className,
  type = 'button',
  onClick,
  ariaLabel,
  asSpan,
  tabIndex,
}: ButtonProps) {
  const s = sizeStyles[size]
  const classes = cn(
    'group relative isolate inline-flex touch-manipulation items-center overflow-hidden rounded-brand font-display font-semibold whitespace-nowrap select-none [-webkit-tap-highlight-color:transparent] transition-transform duration-150 active:scale-[0.97] motion-reduce:active:scale-100',
    variantStyles[variant],
    s.button,
    fullWidth && 'w-full justify-center',
    className,
  )

  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          'absolute inset-y-1 left-1 -z-10 rounded-[12px] bg-lime transition-[width] group-hover:w-[calc(100%-0.5rem)] group-focus-visible:w-[calc(100%-0.5rem)] group-active:w-[calc(100%-0.5rem)]',
          s.knob,
          motion,
        )}
      />
      <span
        aria-hidden
        className={cn(
          'absolute inset-y-1 left-1 grid place-items-center text-blackcurrant transition-transform group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 group-active:translate-x-1.5',
          s.knob,
          motion,
        )}
      >
        <Icon name="arrow" className="size-5" />
      </span>
      <span
        className={cn(
          'transition-colors group-hover:text-blackcurrant group-focus-visible:text-blackcurrant group-active:text-blackcurrant',
          s.label,
          motion,
        )}
      >
        {children}
      </span>
    </>
  )

  if (asSpan) return <span className={classes}>{content}</span>

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} tabIndex={tabIndex} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} tabIndex={tabIndex} className={classes}>
      {content}
    </button>
  )
}
