import { motion } from 'motion/react'
import { images, type BrandImage } from '../../data/images'
import { quoteUrl } from '../../data/nav'
import { cn, siteUrl } from '../../lib/utils'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { Accent } from '../ui/Smile'

type Panel = {
  title: string
  cta: string
  href: string
  image: BrandImage
  note?: string
}

const panels: Panel[] = [
  {
    title: 'Still searching for the perfect car?',
    cta: 'See what I can afford',
    href: siteUrl('/car-finance-calculator'),
    image: images.situationSearching,
  },
  {
    title: 'Found a car you love?',
    cta: 'Get my quote',
    href: quoteUrl,
    image: images.situationFound,
  },
  {
    title: 'Thinking of refinancing your car?',
    cta: 'See what I could save',
    href: siteUrl('/refinance-car-finance'),
    image: images.situationRefinance,
    note: 'Extending the term of your loan could increase the interest payable.',
  },
]

export function Situations() {
  return (
    <section aria-labelledby="situations-title" className="bg-white py-14 md:py-20">
      <div className="container-cf">
        <SectionHeading
          id="situations-title"
          title={
            <>
              Car finance for every <Accent>situation</Accent>
            </>
          }
        />
      </div>

      {/*
        Poster layout from the brand campaign: title at the top in the sky, call to action at the bottom.
        On desktop each panel spans four shared rows (subgrid), so every item lines up across all three.
        On phones the panels stack in a grid so every option is visible without swiping.
      */}
      <div className="mt-7 grid grid-cols-1 gap-4 px-[var(--wide-left)] md:mt-10 lg:h-[clamp(420px,58vh,540px)] lg:gap-y-0 lg:grid-cols-3 lg:grid-rows-[auto_minmax(0,1fr)_auto_auto]">
        {panels.map((panel, i) => (
          <motion.article
            key={panel.title}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
            className="on-dark group relative isolate flex h-[360px] w-full flex-col overflow-hidden rounded-brand bg-blackcurrant p-6 lg:h-auto lg:p-7 lg:pt-9 lg:row-span-4 lg:grid lg:min-h-0 lg:grid-rows-subgrid xl:p-9 xl:pt-11"
          >
            <img
              src={panel.image.src}
              alt={panel.image.alt}
              loading="lazy"
              style={{ objectPosition: panel.image.objectPosition }}
              className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover:scale-[1.05]"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(22,1,50,0.72)_0%,rgba(22,1,50,0.2)_38%,rgba(22,1,50,0)_55%,rgba(22,1,50,0.4)_70%,rgba(22,1,50,0.88)_100%)]"
            />
            <h3 className="max-w-[14ch] self-start text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[var(--leading-title)] font-medium">
              {panel.title}
            </h3>
            <div aria-hidden className="min-h-16 flex-1" />
            {/* Small print sits above the button; on desktop the empty placeholder keeps buttons aligned across cards. */}
            <p
              className={cn(
                'max-w-[32ch] self-start text-xs leading-relaxed text-white/85 [text-shadow:0_1px_8px_rgba(22,1,50,0.9)] lg:self-end',
                panel.note ? 'mb-3 lg:mb-4' : 'hidden lg:mb-4 lg:block',
              )}
            >
              {panel.note ?? '\u00a0'}
            </p>
            <div className="self-start lg:self-end lg:justify-self-start">
              <Button href={panel.href} variant="reverse" size="md">
                {panel.cta}
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
