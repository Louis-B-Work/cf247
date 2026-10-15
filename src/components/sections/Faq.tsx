import { AnimatePresence, motion } from 'motion/react'
import { useId, useState, type ReactNode } from 'react'
import { faqCategories as defaultCategories, type Faq as FaqItemData, type FaqCategory } from '../../data/faqs'
import { cn, siteUrl } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { RichText } from '../ui/RichText'
import { Accent } from '../ui/Smile'

const ease = [0.22, 1, 0.36, 1] as const

function FaqItem({
  item,
  open,
  onToggle,
  showMobileDivider,
  level = 'h4',
}: {
  item: FaqItemData
  open: boolean
  onToggle: () => void
  showMobileDivider?: boolean
  level?: 'h3' | 'h4'
}) {
  const id = useId()
  const Heading = level
  const answer = (
    <div className="space-y-3 px-4 pb-5 text-[15px] leading-relaxed text-blackcurrant/75 md:px-5 md:pb-6">
      {item.a.map((p) => (
        <p key={p}>
          <RichText text={p} />
        </p>
      ))}
      {item.list && (
        <ul className="space-y-1.5">
          {item.list.map((li) => (
            <li key={li} className="flex gap-2.5">
              <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-purple" />
              <span>
                <RichText text={li} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {item.after?.map((p) => (
        <p key={p}>
          <RichText text={p} />
        </p>
      ))}
    </div>
  )
  return (
    <div
      className={cn(
        showMobileDivider && 'border-b border-purple-10 md:border-b-0',
        'transition-shadow duration-300 md:rounded-brand md:bg-white md:ring-1 md:ring-purple-30',
        open && 'md:shadow-[0_20px_40px_-24px_rgba(105,5,242,0.5)] md:ring-2 md:ring-purple',
      )}
    >
      <Heading className="text-[15px] leading-snug font-semibold tracking-normal md:text-[17px]">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group flex w-full touch-manipulation items-center justify-between gap-4 px-4 py-4 text-left [-webkit-tap-highlight-color:transparent] md:items-start md:p-5"
        >
          <span className={cn('transition-colors', open ? 'text-purple' : 'group-hover:text-purple')}>{item.q}</span>
          <span
            className={cn(
              'grid size-7 shrink-0 place-items-center rounded-inner transition-colors duration-300 md:size-8',
              open ? 'bg-purple text-white' : 'bg-purple-10 text-purple group-hover:bg-lime group-hover:text-blackcurrant',
            )}
          >
            <Icon name="plus" className={cn('size-4 transition-transform duration-300', open && 'rotate-45')} />
          </span>
        </button>
      </Heading>
      {/* Closed answers stay in the page (hidden), so search engines can read them, as on the live site. */}
      {!open && (
        <div id={id} hidden>
          {answer}
        </div>
      )}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type FaqProps = {
  /** Question sets to render as grouped FAQ sections. */
  categories?: FaqCategory[]
  /** Phones only: show one category at a time behind tabs instead of every group stacked. */
  mobileTabs?: boolean
  /** Replaces the default section heading. */
  title?: ReactNode
  /**
   * Single question set only: render questions as h3 with no (visually hidden) category heading,
   * so the heading outline can match an existing page.
   */
  flat?: boolean
  /** Show the "Still got a question?" contact box. */
  contact?: boolean
}

function questionKey(categoryId: string, index: number) {
  return `${categoryId}:${index}`
}

function splitQuestions(items: FaqItemData[]) {
  const midpoint = Math.ceil(items.length / 2)
  return [items.slice(0, midpoint), items.slice(midpoint)]
}

function splitCategoriesByQuestionCount(categories: FaqCategory[]) {
  if (categories.length < 2) {
    return [categories, []] as const
  }

  const totalQuestions = categories.reduce((total, category) => total + category.items.length, 0)
  let leftQuestions = 0
  let bestSplit = 1
  let bestDifference = Number.POSITIVE_INFINITY

  for (let splitAfter = 1; splitAfter < categories.length; splitAfter += 1) {
    leftQuestions += categories[splitAfter - 1].items.length
    const difference = Math.abs(totalQuestions - leftQuestions * 2)

    if (difference < bestDifference) {
      bestDifference = difference
      bestSplit = splitAfter
    }
  }

  return [categories.slice(0, bestSplit), categories.slice(bestSplit)] as const
}

function FaqCategoryBlock({
  category,
  openKey,
  onToggle,
}: {
  category: FaqCategory
  openKey: string | null
  onToggle: (key: string) => void
}) {
  return (
    <Reveal>
      <section aria-labelledby={`faq-${category.id}`} className="space-y-3 md:space-y-4">
        <h3
          id={`faq-${category.id}`}
          className="font-display text-2xl leading-tight font-semibold text-blackcurrant md:text-3xl"
        >
          {category.label}
        </h3>
        <div className="overflow-hidden rounded-brand bg-white ring-1 ring-purple-10 md:space-y-3 md:overflow-visible md:bg-transparent md:ring-0">
          {category.items.map((item, index) => {
            const key = questionKey(category.id, index)
            return (
              <FaqItem
                key={item.q}
                item={item}
                open={openKey === key}
                onToggle={() => onToggle(key)}
                showMobileDivider={index < category.items.length - 1}
              />
            )
          })}
        </div>
      </section>
    </Reveal>
  )
}

function SingleCategoryQuestions({
  category,
  openKey,
  onToggle,
  flat = false,
}: {
  category: FaqCategory
  openKey: string | null
  onToggle: (key: string) => void
  flat?: boolean
}) {
  const [leftQuestions, rightQuestions] = splitQuestions(category.items)

  return (
    <Reveal>
      <section aria-labelledby={flat ? 'faq-title' : `faq-${category.id}`}>
        {!flat && (
          <h3 id={`faq-${category.id}`} className="sr-only">
            {category.label}
          </h3>
        )}
        <div className="grid grid-cols-1 overflow-hidden rounded-brand bg-white ring-1 ring-purple-10 md:overflow-visible md:bg-transparent md:ring-0 lg:grid-cols-2 lg:items-start lg:gap-3">
          {[leftQuestions, rightQuestions].map((items, columnIndex) => {
            const offset = columnIndex === 0 ? 0 : leftQuestions.length
            return (
              <div key={columnIndex} className="contents lg:flex lg:flex-col lg:gap-3">
                {items.map((item, index) => {
                  const itemIndex = offset + index
                  const key = questionKey(category.id, itemIndex)
                  return (
                    <FaqItem
                      key={item.q}
                      item={item}
                      open={openKey === key}
                      onToggle={() => onToggle(key)}
                      showMobileDivider={itemIndex < category.items.length - 1}
                      level={flat ? 'h3' : 'h4'}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </section>
    </Reveal>
  )
}

function MobileFaqTabs({
  categories,
  openKey,
  onToggle,
}: {
  categories: FaqCategory[]
  openKey: string | null
  onToggle: (key: string) => void
}) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const category = categories[active]

  const focusTab = (index: number) => {
    const next = (index + categories.length) % categories.length
    setActive(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  return (
    <div className="md:hidden">
      <div
        role="tablist"
        aria-label="FAQ topics"
        className="-mx-[var(--pad-wide)] flex gap-2 overflow-x-auto px-[var(--pad-wide)] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((item, index) => (
          <button
            key={item.id}
            id={`${baseId}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') focusTab(index + 1)
              if (event.key === 'ArrowLeft') focusTab(index - 1)
            }}
            className={cn(
              'min-h-11 shrink-0 rounded-full px-4 font-display text-sm font-semibold whitespace-nowrap transition-colors duration-200',
              index === active ? 'bg-purple text-white' : 'bg-white text-blackcurrant ring-1 ring-purple-30',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-4 overflow-hidden rounded-brand bg-white ring-1 ring-purple-10"
      >
        {category.items.map((item, index) => {
          const key = questionKey(category.id, index)
          return (
            <FaqItem
              key={item.q}
              item={item}
              open={openKey === key}
              onToggle={() => onToggle(key)}
              showMobileDivider={index < category.items.length - 1}
            />
          )
        })}
      </div>
    </div>
  )
}

export function Faq({
  categories: faqCategories = defaultCategories,
  mobileTabs = false,
  title,
  flat = false,
  contact = true,
}: FaqProps = {}) {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [leftCategories, rightCategories] = splitCategoriesByQuestionCount(faqCategories)
  const singleCategory = faqCategories.length === 1 ? faqCategories[0] : null
  const tabs = mobileTabs && !singleCategory

  const toggleItem = (key: string) => {
    setOpenKey((current) => (current === key ? null : key))
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-purple-10 py-14 md:py-20 design-modern:py-14 design-modern:md:py-20">
      <div className="container-cf">
        <div className="flex flex-col gap-7 md:gap-10">
          <Reveal>
            <h2 id="faq-title" className="text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[var(--leading-title)] font-medium">
              {title ?? (
                <>
                  Frequently asked <Accent>questions</Accent>
                </>
              )}
            </h2>
          </Reveal>
        </div>

        <div className="mt-7 md:mt-8">
          {tabs && <MobileFaqTabs categories={faqCategories} openKey={openKey} onToggle={toggleItem} />}
          {singleCategory ? (
            <SingleCategoryQuestions category={singleCategory} openKey={openKey} onToggle={toggleItem} flat={flat} />
          ) : (
            <div className={cn('grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-8', tabs && 'max-md:hidden')}>
              {[leftCategories, rightCategories].map((column, columnIndex) => (
                <div key={columnIndex} className="contents lg:flex lg:flex-col lg:gap-8">
                  {column.map((category) => (
                    <FaqCategoryBlock key={category.id} category={category} openKey={openKey} onToggle={toggleItem} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {contact && (
        <Reveal>
          <div className="mt-6 flex flex-col gap-4 rounded-brand bg-white p-5 ring-1 ring-purple-10 sm:flex-row sm:items-center sm:justify-between md:p-6 lg:mt-8">
            <div>
              <p className="font-display text-xl leading-tight font-semibold text-blackcurrant md:text-2xl">Still got a question?</p>
              <p className="mt-1.5 text-base leading-relaxed text-blackcurrant/70">
                Get in touch and our team will be happy to help.
              </p>
            </div>
            <Button href={siteUrl('/contact-us')} variant="light" size="md">
              Contact us
            </Button>
          </div>
        </Reveal>
        )}
      </div>
    </section>
  )
}
