import { motion } from 'motion/react'
import { steps } from '../../data/assets'
import { quoteUrl } from '../../data/nav'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { Accent, PullOut } from '../ui/Smile'

export function Steps() {
  return (
    <section aria-labelledby="steps-title" className="bg-white pb-14 md:pb-20">
      <div className="container-cf">
        <SectionHeading
          id="steps-title"
          title={
            <>
              Three steps to <Accent>feel-good</Accent> car finance
            </>
          }
          pullOut={
            <>
              Get your quote in minutes with <PullOut>no impact</PullOut> on your credit score
            </>
          }
          actionOn="desktop"
          action={<Button href={quoteUrl} variant="light" size="lg">Get my quote</Button>}
        />

        {/* Phones: compact rows (thumbnail beside text). Tablet and up: three image cards. Every card links to the quote form. */}
        <ol className="mt-7 grid grid-cols-1 gap-3 md:mt-10 lg:grid-cols-3 lg:gap-5">
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
                className="group flex h-full touch-manipulation items-center gap-4 rounded-brand bg-purple-10 p-5 ring-1 ring-transparent transition-[transform,box-shadow,background-color] duration-500 ease-[var(--ease-brand)] [-webkit-tap-highlight-color:transparent] hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_28px_60px_-28px_rgba(105,5,242,0.55)] hover:ring-purple/40 active:scale-[0.99] active:bg-white lg:flex-col lg:items-stretch lg:gap-0 lg:p-3 lg:pr-3"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-[12px] bg-purple-30 sm:size-28 lg:size-auto">
                  <img
                    src={step.image}
                    alt={step.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.05] lg:aspect-[4/3.6] lg:h-auto"
                  />
                  <span className="absolute top-2 left-2 grid size-8 place-items-center rounded-[10px] bg-purple font-display text-base font-semibold text-white transition-colors duration-300 group-hover:bg-lime group-hover:text-blackcurrant group-active:bg-lime group-active:text-blackcurrant lg:top-4 lg:left-4 lg:size-12 lg:rounded-[12px] lg:text-xl">
                    {i + 1}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-4 lg:items-start lg:px-3 lg:pt-5 lg:pb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl leading-tight font-semibold transition-colors duration-300 group-hover:text-purple lg:text-[1.75rem]">
                      {step.title}
                    </h3>
                    <p className="mt-1 max-w-sm text-[15px] leading-relaxed text-blackcurrant/75 lg:mt-2 lg:text-[16px]">
                      {step.body}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-white text-purple ring-1 ring-purple-10 transition-[background-color,color] duration-300 group-hover:bg-lime group-hover:text-blackcurrant group-hover:ring-lime group-active:bg-lime lg:size-12 lg:self-end lg:rounded-[12px]"
                  >
                    <Icon
                      name="arrow"
                      className="size-5 transition-transform duration-300 ease-[var(--ease-brand)] lg:-rotate-45 lg:group-hover:rotate-0"
                    />
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </ol>
        <div className="mt-7 md:hidden">
          <Button href={quoteUrl} variant="light" size="lg">Get my quote</Button>
        </div>
      </div>
    </section>
  )
}
