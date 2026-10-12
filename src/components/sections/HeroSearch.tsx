import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { quoteResult, searchIdeas, searchSite } from '../../data/search'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/Icon'

const ROTATE_MS = 2600

type HeroSearchProps = {
  dropDirection?: 'up' | 'down'
  autoFocus?: boolean
  onEscape?: () => void
  className?: string
  /** hero: glass on purple. floating: frosted bar. flush: no box of its own, for a container that supplies it. */
  variant?: 'hero' | 'floating' | 'flush'
  /** Flush only: classes for the empty-state icon, so the container can recolour it at rest. */
  iconClassName?: string
}

export function HeroSearch({
  dropDirection = 'down',
  autoFocus,
  onEscape,
  className,
  variant = 'hero',
  iconClassName,
}: HeroSearchProps = {}) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [active, setActive] = useState(-1)
  const [ideaIndex, setIdeaIndex] = useState(0)
  const reduce = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  const matches = useMemo(() => searchSite(query), [query])
  const noMatches = query.trim().length > 0 && matches.length === 0
  // With nothing to show, the quote form is still offered so a search never ends in a dead end.
  const results = noMatches ? [quoteResult] : matches
  const showResults = focused && query.trim().length > 0
  const idea = searchIdeas[ideaIndex]
  const light = variant !== 'hero'

  useEffect(() => {
    if (query || reduce) return
    const t = window.setInterval(() => setIdeaIndex((i) => (i + 1) % searchIdeas.length), ROTATE_MS)
    return () => window.clearInterval(t)
  }, [query, reduce])

  useEffect(() => {
    if (!autoFocus) return
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
    return () => window.cancelAnimationFrame(frame)
  }, [autoFocus])

  const go = (href: string) => {
    window.location.assign(href)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      setQuery('')
      setActive(-1)
      onEscape?.()
      return
    }
    if (!query && e.key === 'ArrowRight') {
      e.preventDefault()
      setQuery(idea)
      return
    }
    if (!showResults || !results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1))
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const pick = results[active] ?? results[0]
    if (pick) go(pick.href)
    // In the sliding search the icon is the way in, so an empty submit opens the field rather than filling it.
    else if (!query && variant === 'flush') inputRef.current?.focus()
    else if (!query) setQuery(idea)
  }

  return (
    <form role="search" onSubmit={onSubmit} className={cn('relative w-full', className)}>
      <div
        className={cn(
          'relative flex h-[52px] items-center rounded-brand pr-2 pl-5 transition-[background-color,box-shadow] duration-300 ring-inset sm:h-14',
          variant === 'flush'
            ? 'bg-transparent'
            : variant === 'floating'
            ? // Frosted glass: mostly see-through with a strong blur, so the page shows through it while dark text stays readable on white, purple and photo sections.
              'bg-purple-10/50 text-blackcurrant shadow-[0_20px_50px_-18px_rgba(22,1,50,0.45),inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-purple/20 backdrop-blur-xl backdrop-saturate-150 hover:bg-purple-10/65'
            : 'bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_20px_50px_-20px_rgba(22,1,50,0.55)] ring-1 ring-white/25 backdrop-blur-md hover:bg-white/[0.11]',
          focused && variant === 'floating' && 'bg-purple-10/70 ring-2 ring-purple/60',
          focused && variant === 'hero' && 'bg-white/[0.11] ring-2 ring-lime/80',
        )}
      >
        <div className="relative h-full flex-1">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(-1)
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => window.setTimeout(() => setFocused(false), 120)}
            onKeyDown={onKeyDown}
            aria-label="Search car finance, guides and questions"
            role="combobox"
            aria-expanded={showResults}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
            className={cn(
              'peer h-full w-full bg-transparent font-display text-[17px] font-medium outline-none [&:focus-visible]:outline-none',
              light ? 'text-blackcurrant caret-purple' : 'text-white caret-lime',
            )}
            autoComplete="off"
          />
          {!query && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center overflow-hidden font-display text-[17px] font-medium"
            >
              <span className="relative block h-[1.5em] flex-1 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={idea}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      'absolute inset-0 truncate leading-[1.5em]',
                      light ? 'text-blackcurrant/60' : 'text-white/70',
                    )}
                  >
                    {idea}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          )}
        </div>
        <button
          type="submit"
          aria-label="Search"
          className={cn(
            'grid size-10 shrink-0 place-items-center rounded-inner sm:size-11 transition-[background-color,color,transform] duration-300 ease-[var(--ease-brand)]',
            // Empty: a quiet icon on the glass. Typed: fills in as a solid button ready to submit.
            query.trim()
              ? cn(
                  'scale-100 hover:bg-lime hover:text-blackcurrant active:bg-lime active:text-blackcurrant',
                  light ? 'bg-purple text-white' : 'bg-white text-purple',
                )
              : variant === 'flush'
                ? cn('bg-transparent', iconClassName ?? 'text-purple')
                : variant === 'floating'
                ? 'scale-95 bg-transparent text-purple hover:text-blackcurrant'
                : 'scale-95 bg-transparent text-white/80 hover:text-white',
          )}
        >
          <Icon name="search" className="size-5 sm:size-6" />
        </button>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: dropDirection === 'up' ? 6 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dropDirection === 'up' ? 6 : -6 }}
            transition={{ duration: 0.18 }}
            className={cn(
              'absolute inset-x-0 z-20 max-h-[min(60svh,420px)] overflow-y-auto rounded-brand bg-white p-2 text-blackcurrant shadow-[0_30px_60px_-20px_rgba(22,1,50,0.5)]',
              dropDirection === 'up' ? 'bottom-[calc(100%+8px)]' : 'top-[calc(100%+8px)]',
            )}
          >
            {noMatches && (
              <li role="presentation" className="px-4 pt-3 pb-2 text-[15px] text-blackcurrant/70">
                No matches for that yet. Try ‘PCP’, ‘bad credit’ or ‘calculator’, or start your quote.
              </li>
            )}
            {results.map((r, i) =>
              r.kind === 'Quote' ? (
                <li
                  key={r.label}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    go(r.href)
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-4 rounded-inner bg-purple px-4 py-3 font-display text-[15px] font-semibold text-white transition-colors',
                    i === active && 'bg-purple-80',
                  )}
                >
                  <span>
                    {r.label}
                  </span>
                  <span
                    className={cn(
                      'grid size-8 shrink-0 place-items-center rounded-inner bg-white text-purple transition-colors duration-300',
                      i === active && 'bg-lime text-blackcurrant',
                    )}
                  >
                    <Icon name="arrow" className="size-4" />
                  </span>
                </li>
              ) : (
                <li
                  key={r.label}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    go(r.href)
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-4 rounded-inner px-4 py-3 text-[15px]',
                    i === active && 'bg-purple-10',
                  )}
                >
                  <span className={cn(i === active && 'text-purple')}>{r.label}</span>
                  <span className="shrink-0 text-xs font-semibold text-purple/70">{r.kind}</span>
                </li>
              ),
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </form>
  )
}
