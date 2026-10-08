import { motion, useReducedMotion, type MotionValue } from 'motion/react'
import { useId, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

/** Smile cut into the logo mark, in a 100 x 100 box. */
const MARK_SMILE = 'M24 54A26 26 0 0 0 76 54'

/** The smile in the official logo is tilted anticlockwise (right end higher) with square-cut ends, measured from the logo artwork. */
const MARK_TILT = 'rotate(-12 50 50)'

/** Official logo colourways: purple or blackcurrant on light backgrounds, white on purple, dark or photos. */
const markTones = {
  purple: 'var(--color-purple)',
  blackcurrant: 'var(--color-blackcurrant)',
  white: 'white',
} as const

export type MarkTone = keyof typeof markTones

type SmileMarkProps = {
  tone?: MarkTone
  /** Diameter in em, relative to the heading's font size. */
  size?: number
  delay?: number
  /** Drive the animation from scroll instead of on enter: [circle scale, smile draw]. */
  scroll?: { scale: MotionValue<number>; draw: MotionValue<number> }
  className?: string
}

/**
 * The brand logo mark: a solid circle with the smile knocked out, so the background shows through.
 * The circle pops in, then the smile cuts through, when it enters view.
 */
export function SmileMark({ tone = 'purple', size = 0.5, delay = 0.2, scroll, className }: SmileMarkProps) {
  const reduce = useReducedMotion()
  const maskId = `mark-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const animate = !reduce && !scroll

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={cn('ml-[0.1em] inline-block shrink-0 overflow-visible align-baseline', className)}
      style={{ width: `${size}em`, height: `${size}em` }}
    >
      <mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={100} height={100}>
        <rect width={100} height={100} fill="white" />
        <motion.path
          d={MARK_SMILE}
          transform={MARK_TILT}
          fill="none"
          stroke="black"
          strokeWidth={12}
          strokeLinecap="butt"
          style={scroll && !reduce ? { pathLength: scroll.draw } : undefined}
          initial={animate ? { pathLength: 0 } : false}
          whileInView={animate ? { pathLength: 1 } : undefined}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease, delay: delay + 0.25 }}
        />
      </mask>
      <motion.circle
        cx={50}
        cy={50}
        r={50}
        fill={markTones[tone]}
        mask={`url(#${maskId})`}
        style={scroll && !reduce ? { scale: scroll.scale, transformOrigin: '50% 50%' } : { transformOrigin: '50% 50%' }}
        initial={animate ? { scale: 0 } : false}
        whileInView={animate ? { scale: 1 } : undefined}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: 'spring', stiffness: 420, damping: 18, delay }}
      />
    </svg>
  )
}

type AccentProps = {
  children: ReactNode
  className?: string
}

/** Neulis Cursive accent word. */
export function Accent({ children, className }: AccentProps) {
  return <span className={cn('font-accent inline-block whitespace-nowrap', className)}>{children}</span>
}

type EndSmileProps = {
  /** The last word of the heading, so the mark can never wrap onto its own line. */
  children: ReactNode
  tone?: MarkTone
  size?: number
  delay?: number
}

/** Finishes a heading with the brand logo mark, popped in when it scrolls into view. */
export function EndSmile({ children, tone, size, delay }: EndSmileProps) {
  return (
    <span className="inline-block whitespace-nowrap">
      {children}
      <SmileMark tone={tone} size={size} delay={delay} />
    </span>
  )
}

type PullOutProps = {
  /** The key words, set in the cursive accent. Use at the end of a paragraph or heading. */
  children: ReactNode
  delay?: number
}

/**
 * Pull-out key information (guidelines p.24): the smile hooks under the start of the
 * highlighted words. Always a smile, never a frown, and drawn in the text colour.
 */
export function PullOut({ children, delay = 0.3 }: PullOutProps) {
  const reduce = useReducedMotion()
  return (
    // The left margin reserves room for the hook so it never runs under the previous word.
    <span className="font-accent relative ml-[0.2em] inline-block whitespace-nowrap">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
        className="pointer-events-none absolute bottom-[-0.2em] left-[-0.18em] h-[0.5em] w-[0.5em] overflow-visible"
      >
        <motion.path
          d="M12 8A80 80 0 0 0 92 88"
          stroke="currentColor"
          strokeWidth={19}
          strokeLinecap="butt"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease, delay }}
        />
      </svg>
      {children}
    </span>
  )
}
