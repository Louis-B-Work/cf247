import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from './Icon'

type Variant = 'primary' | 'reverse' | 'light' | 'outline-light' | 'outline-dark'
type Size = 'md' | 'lg' | 'xl' | '2xl'

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
   * The lime flood still plays when the card is hovered or pressed, because the card also carries the `group` class.
   */
  asSpan?: boolean
  tabIndex?: number
}

const variantStyles: Record<Variant, string> = {
  primary: 'cf-pill-button--primary',
  reverse: 'cf-pill-button--reverse',
  light: 'cf-pill-button--light',
  'outline-light': 'cf-pill-button--outline-light ring-2 ring-inset ring-white/80',
  'outline-dark': 'cf-pill-button--outline-dark ring-2 ring-inset ring-purple',
}

/**
 * Spacing per size, set as CSS variables read by `.cf-pill-button` in index.css:
 * height, the chip's equal inset from the top, bottom and right, the label's outer padding and its gap to the chip.
 */
const sizeStyles: Record<Size, { button: string; icon: string }> = {
  md: {
    button: 'text-[15px] [--btn-h:44px] [--chip-inset:4px] [--btn-pad:20px] [--btn-gap:12px] sm:[--btn-h:48px] sm:[--btn-pad:22px] sm:[--btn-gap:14px]',
    icon: 'size-[18px] sm:size-5',
  },
  lg: {
    button: 'text-[15px] [--btn-h:44px] [--chip-inset:4px] [--btn-pad:20px] [--btn-gap:12px] sm:text-base sm:[--btn-h:56px] sm:[--chip-inset:6px] sm:[--btn-pad:26px] sm:[--btn-gap:16px]',
    icon: 'size-[18px] sm:size-5',
  },
  xl: {
    button: 'text-base [--btn-h:52px] [--chip-inset:6px] [--btn-pad:24px] [--btn-gap:16px] sm:[--btn-h:56px] sm:[--btn-pad:28px] sm:[--btn-gap:18px]',
    icon: 'size-5',
  },
  '2xl': {
    button: 'text-base [--btn-h:54px] [--chip-inset:5px] [--btn-pad:22px] [--btn-gap:14px] sm:text-lg sm:[--btn-h:58px] sm:[--chip-inset:6px] sm:[--btn-pad:24px] sm:[--btn-gap:16px]',
    icon: 'size-5',
  },
}

const motion = 'duration-500 group-active:duration-150 ease-[var(--ease-brand)] motion-reduce:transition-none'

/**
 * Solid rounded-square CTA with a medium-weight label on the left and a square arrow chip inset evenly on the right.
 * Settings cog "Buttons": Sliding arrow (default, the chip slides to the left on hover, after the 21st.dev
 * ShadcnSpace "Button with icon"), Fixed arrow (the chip stays put) or No arrow (text only with even padding).
 * Hover, focus and press sweep a lime flood across the button, invert the chip and turn the label blackcurrant.
 *
 * Touch screens get the same flood while pressed, plus a slight press-in.
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
    'cf-pill-button group relative isolate inline-flex touch-manipulation items-center overflow-hidden rounded-brand font-display font-medium whitespace-nowrap select-none [-webkit-tap-highlight-color:transparent] transition-[transform,background-color] duration-150 active:scale-[0.97] motion-reduce:active:scale-100',
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
          'cf-pill-button__flood absolute inset-0 z-0 origin-right rounded-brand bg-lime transition-transform',
          motion,
        )}
      />
      <span
        aria-hidden
        className={cn(
          'cf-pill-button__chip absolute z-20 grid aspect-square place-items-center transition-[background-color,color]',
          motion,
        )}
      >
        <Icon name="arrow" className={cn('cf-pill-button__arrow transition-[translate]', s.icon, motion)} />
      </span>
      <span
        className={cn(
          'cf-pill-button__label relative z-10 transition-colors',
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
