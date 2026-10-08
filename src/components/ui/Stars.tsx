import { cn } from '../../lib/utils'
import { Icon } from './Icon'

type StarsProps = {
  className?: string
  starClassName?: string
}

export function Stars({ className, starClassName = 'size-5 text-lime' }: StarsProps) {
  return (
    <span className={cn('inline-flex gap-0.5', className)} role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className={starClassName} />
      ))}
    </span>
  )
}
