import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  title: ReactNode
  intro?: ReactNode
  /** Purple display line for key information, typically ending in a PullOut. */
  pullOut?: ReactNode
  action?: ReactNode
  /** 'desktop' hides the action (and its spacing) on phones, where callers show their own button below the content. */
  actionOn?: 'all' | 'desktop'
  align?: 'left' | 'center'
  className?: string
  id?: string
}

export function SectionHeading({ title, intro, pullOut, action, actionOn = 'all', align = 'left', className, id }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-6',
        align === 'center' && 'items-center text-center md:flex-col md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-4xl', align === 'center' && 'mx-auto')}>
        <h2 id={id} className="text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[var(--leading-title)] font-medium">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed md:text-[17px] opacity-80">{intro}</p>}
        {pullOut && (
          <p className="mt-4 max-w-[34ch] pl-[0.2em] font-display text-[clamp(1.2rem,1.7vw,1.5rem)] leading-snug font-medium text-purple">
            {pullOut}
          </p>
        )}
      </div>
      {action && <div className={cn('shrink-0', actionOn === 'desktop' && 'hidden md:block')}>{action}</div>}
    </Reveal>
  )
}
