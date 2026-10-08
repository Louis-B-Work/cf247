import { useId, type ReactNode } from 'react'

export type IconName =
  | 'user'
  | 'heart'
  | 'pin'
  | 'shield'
  | 'search'
  | 'gem'
  | 'leaf'
  | 'people'
  | 'arrow'
  | 'car'
  | 'chevron'
  | 'close'
  | 'menu'
  | 'plus'
  | 'star'
  | 'play'

type Glyph = {
  /** Solid shapes, filled with the current colour. */
  fill?: ReactNode
  /** Highlight arcs knocked out of the fill so the background shows through. */
  cutouts?: string[]
  /** Stroked shapes drawn on top in the current colour. */
  stroke?: ReactNode
}

const line = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** CF247 brand icon set (solid icons with highlight arcs), plus a few interface glyphs drawn to match. */
const glyphs: Record<IconName, Glyph> = {
  user: {
    fill: (
      <>
        <circle cx={24} cy={14} r={12} />
        <path d="M4 46A20 20 0 0 1 44 46Z" />
      </>
    ),
    cutouts: ['M17.5 14A6.5 6.5 0 0 0 24 20.5'],
  },
  heart: {
    fill: <path d="M24 43.1L6.93 26.07A10 10 0 1 1 24 19A10 10 0 1 1 41.07 26.07Z" />,
    cutouts: ['M8.5 19A5.5 5.5 0 0 1 14 13.5'],
  },
  pin: {
    fill: <path d="M24 42.5L13.32 32.91A16 16 0 1 1 34.68 32.91Z" />,
    cutouts: ['M15.31 18.67A9 9 0 0 1 21.67 12.31'],
  },
  shield: {
    fill: <path d="M24 3L43 9.5V23C43 35 34 43 24 46C14 43 5 35 5 23V9.5Z" />,
    cutouts: ['M15 31A6.5 6.5 0 0 0 21.5 37.5'],
  },
  search: {
    stroke: (
      <>
        <circle cx={19.4} cy={19} r={13.8} fill="none" stroke="currentColor" strokeWidth={5.2} />
        <path d="M30.8 30.4L44 43.6" fill="none" stroke="currentColor" strokeWidth={5.2} />
        <path d="M19.4 11A8 8 0 0 1 27.4 19" fill="none" stroke="currentColor" strokeWidth={3.4} />
      </>
    ),
  },
  gem: {
    fill: <path d="M13.4 6H34.6L45.5 12.8V20.6L24 42.1L2.5 20.6V12.8Z" />,
    cutouts: ['M8.5 17A5 5 0 0 1 13.5 12'],
  },
  leaf: {
    fill: (
      <path d="M36 3C26 3 17 6 11.5 13C7.5 18 6.5 25 8.5 31C10.5 38 16.5 43 23 43C31 43 38.5 37.5 38.5 30C38.5 25.5 34.5 23 32 19.5C30 16.5 30 13 31.5 10C32.8 7.5 34.5 5.2 36 3Z" />
    ),
    cutouts: ['M21.5 46C18 37 21 26 28 18'],
    stroke: <path d="M20.7 42.4L21.9 46.5" fill="none" stroke="currentColor" strokeWidth={3} />,
  },
  people: {
    fill: (
      <>
        <circle cx={15} cy={11} r={8} />
        <circle cx={33} cy={11} r={8} />
        <path d="M3 45V27A9 9 0 0 1 12 18H16A9 9 0 0 1 25 27V45Z" />
        <path d="M23 45V27A9 9 0 0 1 32 18H36A9 9 0 0 1 45 27V45Z" />
      </>
    ),
    cutouts: ['M7 27A5 5 0 0 1 12 22', 'M27 27A5 5 0 0 1 32 22'],
  },
  arrow: {
    stroke: (
      <path
        d="M5 24H40M28.5 12.5L40 24L28.5 35.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="miter"
      />
    ),
  },
  car: {
    fill: (
      <>
        <path d="M14 7H34C36.2 7 37.8 8.2 38.7 10.2L42 18H46V22H43V36C43 37.1 42.1 38 41 38H7C5.9 38 5 37.1 5 36V22H2V18H6L9.3 10.2C10.2 8.2 11.8 7 14 7Z" />
        <rect x={6} y={36} width={9} height={8} rx={2} />
        <rect x={33} y={36} width={9} height={8} rx={2} />
      </>
    ),
    cutouts: ['M8.5 30A4.5 4.5 0 0 1 13 25.5', 'M35 25.5A4.5 4.5 0 0 1 39.5 30'],
  },
  chevron: { stroke: <path d="M14 19l10 10 10-10" {...line} strokeWidth={4.5} /> },
  close: { stroke: <path d="M13 13l22 22M35 13L13 35" {...line} strokeWidth={4.5} /> },
  menu: { stroke: <path d="M8 15h32M8 24h32M8 33h20" {...line} strokeWidth={4.5} /> },
  plus: { stroke: <path d="M24 11v26M11 24h26" {...line} strokeWidth={4.5} /> },
  star: {
    fill: <path d="M24 5l5.6 12 13.1 1.5-9.7 8.9 2.7 13L24 33.9l-11.7 6.5 2.7-13-9.7-8.9 13.1-1.5z" />,
  },
  play: { fill: <path d="M16 9.5L39 24L16 38.5Z" /> },
}

type IconProps = {
  name: IconName
  className?: string
  title?: string
}

export function Icon({ name, className, title }: IconProps) {
  const glyph = glyphs[name]
  const maskId = `icon-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const cutouts = glyph.cutouts ?? []

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {cutouts.length > 0 && (
        <mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={48} height={48}>
          <rect width={48} height={48} fill="white" />
          {cutouts.map((d) => (
            <path key={d} d={d} fill="none" stroke="black" strokeWidth={3} />
          ))}
        </mask>
      )}
      {glyph.fill && <g mask={cutouts.length ? `url(#${maskId})` : undefined}>{glyph.fill}</g>}
      {glyph.stroke}
    </svg>
  )
}
