import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { quoteResult, searchIdeas, searchSite } from '../../data/search'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/Icon'

const ROTATE_MS = 2600

export function HeroSearch() {
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

  useEffect(() => {
    if (query || reduce) return
    const t = window.setInterval(() => setIdeaIndex((i) => (i + 1) % searchIdeas.length), ROTATE_MS)
    return () => window.clearInterval(t)
  }, [query, reduce])

  const go = (href: string) => {
    window.location.assign(href)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
    } else if (e.key === 'Escape') {
      setQuery('')
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const pick = results[active] ?? results[0]
    if (pick) go(pick.href)
    else if (!query) setQuery(idea)
  }

  return (
    <form role="search" onSubmit={onSubmit} className="relative w-full">
      <div
        className={cn(
          // Frosted glass over the purple hero: translucent tint, blur, a hairline highlight and soft depth.
          'relative flex h-[52px] items-center rounded-brand sm:h-14 bg-white/[0.07] pr-2 pl-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_20px_50px_-20px_rgba(22,1,50,0.55)] ring-1 ring-white/25 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ring-inset hover:bg-white/[0.11]',
          focused && 'bg-white/[0.11] ring-2 ring-lime/80',
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
            className="peer h-full w-full bg-transparent font-display text-[17px] font-medium text-white caret-lime outline-none placeholder:text-white/60 [&:focus-visible]:outline-none"
            autoComplete="off"
          />
          {!query && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center overflow-hidden font-display text-[17px] font-medium text-white/60"
            >
              <span className="relative block h-[1.5em] flex-1 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={idea}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 truncate leading-[1.5em] text-white/70"
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
            'grid size-10 shrink-0 place-items-center rounded-[10px] sm:size-11 sm:rounded-[12px] transition-[background-color,color,transform] duration-300 ease-[var(--ease-brand)]',
            // Empty: a quiet icon on the glass. Typed: fills in as a solid button ready to submit.
            query.trim()
              ? 'scale-100 bg-white text-purple hover:bg-lime hover:text-blackcurrant active:bg-lime active:text-blackcurrant'
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
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-brand bg-white p-2 text-blackcurrant shadow-[0_30px_60px_-20px_rgba(22,1,50,0.5)]"
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
                    'flex cursor-pointer items-center justify-between gap-4 rounded-[12px] bg-purple px-4 py-3 font-display text-[15px] font-semibold text-white transition-colors',
                    i === active && 'bg-purple-80',
                  )}
                >
                  <span>
                    {r.label}
                    <span className="ml-2 hidden font-sans text-sm font-normal text-white/75 sm:inline">No impact on your credit score</span>
                  </span>
                  <span
                    className={cn(
                      'grid size-8 shrink-0 place-items-center rounded-[9px] bg-white text-purple transition-colors duration-300',
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
                    'flex cursor-pointer items-center justify-between gap-4 rounded-[12px] px-4 py-3 text-[15px]',
                    i === active && 'bg-purple-10',
                  )}
                >
                  <span className={cn(i === active && 'text-purple')}>{r.label}</span>
                  <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 ring-1 ring-purple-30 text-xs font-semibold text-purple">
                    {r.kind}
                  </span>
                </li>
              ),
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </form>
  )
}
