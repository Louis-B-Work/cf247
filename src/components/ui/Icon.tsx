import type { ReactNode } from 'react'
import { brandIconPaths, type BrandIconName } from './iconPaths'

/** Brand icons come from the brand sheet (see iconPaths.ts); the rest are small interface glyphs drawn to match. */
export type IconName = BrandIconName | 'arrow-up-right' | 'chevron' | 'chevron-right' | 'close' | 'menu' | 'plus' | 'star' | 'play'

type Glyph = {
  /** Solid shapes, filled with the current colour. */
  fill?: ReactNode
  /** Stroked shapes drawn on top in the current colour. */
  stroke?: ReactNode
}

const line = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const interfaceGlyphs: Record<Exclude<IconName, BrandIconName>, Glyph> = {
  'arrow-up-right': {
    stroke: <path d="M14 34L34 14M21 14H34V27" {...line} strokeWidth={5.5} />,
  },
  chevron: { stroke: <path d="M14 19l10 10 10-10" {...line} strokeWidth={4.5} /> },
  /** The button's chip glyph: a bold chevron pointing right. */
  'chevron-right': { stroke: <path d="M19 13l11 11-11 11" {...line} strokeWidth={5.5} /> },
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

const isBrand = (name: IconName): name is BrandIconName => name in brandIconPaths

export function Icon({ name, className, title }: IconProps) {
  const svgProps = {
    viewBox: '0 0 48 48',
    className,
    fill: 'currentColor',
    role: title ? 'img' : undefined,
    'aria-hidden': title ? undefined : true,
    'aria-label': title,
  } as const

  if (isBrand(name)) {
    return (
      // The car is wider than the 48-unit box at the shared scale, so let it draw past the edges.
      <svg {...svgProps} overflow="visible">
        <path fillRule="evenodd" d={brandIconPaths[name]} />
      </svg>
    )
  }

  const glyph = interfaceGlyphs[name]
  return (
    <svg {...svgProps}>
      {glyph.fill}
      {glyph.stroke}
    </svg>
  )
}