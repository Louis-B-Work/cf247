import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { steps } from '../../data/assets'
import { quoteUrl } from '../../data/nav'
import { cn } from '../../lib/utils'
import { useTestOption } from '../../lib/useTestOption'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { Accent, PullOut } from '../ui/Smile'

/** `title` replaces the default heading when a page needs a different section title. */
export function Steps({ title }: { title?: ReactNode } = {}) {
  const modern = useTestOption('design') === 'modern'
  return (
    <section
      aria-labelledby="steps-title"
      className="bg-white pb-14 md:pb-20 design-modern:pt-10 design-modern:pb-12 design-modern:md:pt-20 design-modern:md:pb-20"
    >
      <div className="container-cf">
        <SectionHeading
          id="steps-title"
          title={
            title ?? (
              <>
                Three steps to <Accent>feel-good</Accent> car finance
              </>
            )
          }
          pullOut={
            <>
              Get your quote in <PullOut>minutes</PullOut>
            </>
          }
          actionOn="desktop"
          action={<Button href={quoteUrl} variant="light" size="lg" attention>Get my quote</Button>}
        />

        {/* Classic phones: compact rows (thumbnail beside text). Modern, and Classic from lg: image cards (Modern stacks them on phones with a shorter photo). Every card links to the quote form. */}
        <ol className={cn('mt-7 grid grid-cols-1 md:mt-10 lg:grid-cols-3 lg:gap-5', modern ? 'gap-4 md:grid-cols-3' : 'gap-3')}>
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
            >
              <a
                href={quoteUrl}
                className={cn(
                  'group flex h-full touch-manipulation rounded-brand ring-1 transition-[transform,box-shadow,background-color] duration-500 ease-[var(--ease-brand)] [-webkit-tap-highlight-color:transparent] hover:bg-white hover:shadow-[0_28px_60px_-28px_rgba(105,5,242,0.55)] hover:ring-purple/40 active:scale-[0.99] active:bg-white',
                  modern
                    ? 'flex-col bg-white p-3 ring-purple/10'
                    : 'items-center gap-4 bg-purple-10 p-5 ring-transparent hover:-translate-y-1.5 lg:flex-col lg:items-stretch lg:gap-0 lg:p-3 lg:pr-3',
                )}
              >
                <div className={cn('relative shrink-0 overflow-hidden rounded-inner bg-purple-30', modern ? 'w-full' : 'size-20 sm:size-28 lg:size-auto')}>
                  <img
                    src={step.image}
                    alt={step.alt}
                    loading="lazy"
                    className={cn(
                      'w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.05]',
                      modern ? 'aspect-[16/10] lg:aspect-[4/3.6]' : 'h-full lg:aspect-[4/3.6] lg:h-auto',
                    )}
                  />
                  <span
                    className={cn(
                      'absolute grid place-items-center rounded-inner bg-purple font-display font-semibold text-white transition-colors duration-300 group-hover:bg-lime group-hover:text-blackcurrant group-active:bg-lime group-active:text-blackcurrant',
                      modern ? 'top-3 left-3 size-10 text-lg lg:top-4 lg:left-4 lg:size-12 lg:text-xl' : 'top-2 left-2 size-8 text-base lg:top-4 lg:left-4 lg:size-12 lg:text-xl',
                    )}
                  >
                    {i + 1}
                  </span>
                </div>
                <div className={cn('flex min-w-0 flex-1 gap-4', modern ? 'items-start px-2 pt-4 pb-2 lg:px-3 lg:pt-5 lg:pb-3' : 'items-center lg:items-start lg:px-3 lg:pt-5 lg:pb-3')}>
                  <div className="min-w-0 flex-1">
                    <h3 className={cn('leading-tight font-semibold transition-colors duration-300 group-hover:text-purple lg:text-[1.75rem]', modern ? 'text-2xl' : 'text-xl')}>
                      {step.title}
                    </h3>
                    <p className={cn('mt-1 max-w-sm leading-relaxed text-blackcurrant/75 lg:mt-2', modern ? 'text-base' : 'text-[15px] lg:text-[16px]')}>
                      {step.body}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className={cn(
                      'grid shrink-0 place-items-center rounded-inner text-purple ring-1 ring-purple-10 transition-[background-color,color] duration-300 group-hover:bg-lime group-hover:text-blackcurrant group-hover:ring-lime group-active:bg-lime lg:size-12',
                      modern ? 'size-10 self-end bg-purple-10' : 'size-9 bg-white lg:self-end',
                    )}
                  >
                    <Icon
                      name="arrow"
                      className={cn('size-5 transition-transform duration-300 ease-[var(--ease-brand)]', modern ? '-rotate-45 group-hover:rotate-0' : 'lg:-rotate-45 lg:group-hover:rotate-0')}
                    />
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </ol>
        <div className="mt-7 md:hidden">
          <Button href={quoteUrl} variant="light" size="lg" attention className="design-modern:max-sm:w-full design-modern:max-sm:justify-center">Get my quote</Button>
        </div>
      </div>
    </section>
  )
}
