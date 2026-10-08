import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useState } from 'react'
import { faqCategories, type Faq as FaqItemData } from '../../data/faqs'
import { images } from '../../data/images'
import { cn, siteUrl } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { Accent } from '../ui/Smile'

const ease = [0.22, 1, 0.36, 1] as const

function FaqItem({ item, open, onToggle }: { item: FaqItemData; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <div
      className={cn(
        // Phones: flat rows inside one shared card. Tablet and up: individual cards in a two-column grid.
        'transition-shadow duration-300 md:rounded-brand md:bg-white md:ring-1 md:ring-purple-30',
        open && 'md:shadow-[0_20px_40px_-24px_rgba(105,5,242,0.5)] md:ring-2 md:ring-purple',
      )}
    >
      <h3 className="text-[15px] leading-snug font-semibold tracking-normal md:text-[17px]">
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
              'grid size-7 shrink-0 place-items-center rounded-[8px] transition-colors duration-300 md:size-8 md:rounded-[9px]',
              open ? 'bg-purple text-white' : 'bg-purple-10 text-purple group-hover:bg-lime group-hover:text-blackcurrant',
            )}
          >
            <Icon name="plus" className={cn('size-4 transition-transform duration-300', open && 'rotate-45')} />
          </span>
        </button>
      </h3>
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
            <div className="space-y-3 px-4 pb-5 text-[15px] leading-relaxed text-blackcurrant/75 md:px-5 md:pb-6">
              {item.a.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {item.list && (
                <ul className="space-y-1.5">
                  {item.list.map((li) => (
                    <li key={li} className="flex gap-2.5">
                      <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-purple" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [activeId, setActiveId] = useState(faqCategories[0].id)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const active = faqCategories.find((c) => c.id === activeId) ?? faqCategories[0]
  const img = images.faqAside

  useEffect(() => {
    const syncFromHash = () => {
      const match = faqCategories.find((c) => window.location.hash === `#faq-${c.id}`)
      if (match) {
        setActiveId(match.id)
        setOpenIndex(null)
      }
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const selectCategory = (id: string) => {
    setActiveId(id)
    setOpenIndex(null)
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-purple-10 py-14 md:py-20">
      <div className="container-cf">
        <div className="flex flex-col gap-7 md:gap-10">
          <Reveal>
            <h2 id="faq-title" className="text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[var(--leading-title)] font-medium">
              Frequently asked <Accent>questions</Accent>
            </h2>
          </Reveal>

          <div
            role="tablist"
            aria-label="Question topics"
            className="-mx-[var(--wide-left)] flex gap-2 self-stretch overflow-x-auto px-[var(--wide-left)] [scrollbar-width:none] md:mx-[-4px] md:max-w-full md:gap-1 md:self-start md:rounded-brand md:bg-white md:px-1 md:py-1 md:ring-1 md:ring-purple-10"
          >
            {faqCategories.map((cat) => {
              const selected = cat.id === active.id
              return (
                <button
                  key={cat.id}
                  id={`faq-${cat.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="faq-panel"
                  onClick={() => selectCategory(cat.id)}
                  className={cn(
                    'relative flex shrink-0 items-center gap-2.5 min-h-11 rounded-full px-4 py-2 font-display text-sm font-semibold whitespace-nowrap transition-colors md:rounded-[12px] md:px-4 md:py-3 md:text-[15px]',
                    selected ? 'text-white' : 'bg-white text-blackcurrant ring-1 ring-purple-10 hover:text-purple md:bg-transparent md:ring-0',
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="faq-tab"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-purple md:rounded-[12px]"
                    />
                  )}
                  <span className="relative">{cat.label}</span>
                  <span
                    className={cn(
                      'relative hidden size-6 place-items-center rounded-full text-[11px] md:grid',
                      selected ? 'bg-lime text-blackcurrant' : 'bg-purple-10 text-purple',
                    )}
                  >
                    {cat.items.length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3 md:mt-6 lg:grid-cols-12">
          <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-${active.id}`} className="lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease }}
                className="grid grid-cols-1 items-start divide-y divide-purple-10 rounded-brand bg-white ring-1 ring-purple-10 md:grid-cols-2 md:gap-3 md:divide-y-0 md:rounded-none md:bg-transparent md:ring-0"
              >
                {active.items.map((item, i) => (
                  <FaqItem
                    key={item.q}
                    item={item}
                    open={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 lg:hidden">
            <p className="font-display text-[17px] font-semibold">Still got a question?</p>
            <Button href={siteUrl('/contact-us')} size="md">
              Contact us
            </Button>
          </div>

          <aside className="on-dark relative hidden min-h-[360px] flex-col justify-end overflow-hidden rounded-brand lg:col-span-4 lg:flex xl:col-span-3">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              style={{ objectPosition: img.objectPosition }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,1,50,0.95)_0%,rgba(22,1,50,0.8)_35%,rgba(22,1,50,0.25)_65%,rgba(22,1,50,0)_85%)]" />
            <div className="relative p-6">
              <p className="font-display text-2xl leading-tight font-semibold">Still got a question?</p>
              <p className="mt-1.5 text-sm text-white/80">Your account manager is on hand by phone, email or WhatsApp.</p>
              <div className="mt-4">
                <Button href={siteUrl('/contact-us')} variant="reverse" size="md">
                  Contact us
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
