import { useId } from 'react'
import { cn } from '../../lib/utils'

/** The smile from the logo mark, in a 100 x 100 box (see Smile.tsx). */
const SMILE = 'M21.67 57.58A29.32 29.32 0 0 0 79.04 45.98'

type SmileBandProps = {
  className?: string
  /** Colour of the bumps and the section they lead into. */
  fill?: string
  /** Colour showing through the smiles and the gaps (the section above). */
  cut?: string
}

/**
 * A scalloped edge made of the logo mark: a row of circles with the smile knocked out,
 * whose lower halves merge into the next section. Used where a purple section hands over to lilac.
 */
export function SmileBand({ className, fill = 'var(--color-purple-10)', cut = 'var(--color-purple)' }: SmileBandProps) {
  const id = `band-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const d = 64
  const r = d / 2
  const w = d + 10
  const h = d * 0.98
  const x = (w - d) / 2

  return (
    <svg aria-hidden width="100%" height={h} className={cn('block', className)}>
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse" x="50%">
          <rect y={r} width={w} height={h - r + 1} fill={fill} />
          <circle cx={w / 2} cy={r} r={r} fill={fill} />
          <path
            d={SMILE}
            transform={`translate(${x} 0) scale(${d / 100})`}
            fill="none"
            stroke={cut}
            strokeWidth={9.42}
            strokeLinecap="butt"
          />
        </pattern>
      </defs>
      <rect width="100%" height={h} fill={`url(#${id})`} />
    </svg>
  )
}
