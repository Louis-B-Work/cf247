import { motion } from 'motion/react'
import { founders } from '../../data/assets'
import { trustpilot } from '../../data/reviews'
import { siteUrl } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { Accent } from '../ui/Smile'

const stats = [
  { value: '500,000+', label: 'customers helped' },
  { value: '100,000+', label: 'cars to browse' },
]

export function Founders() {
  return (
    // Inset within the page container so the founders photo sits as a framed image rather than a full-bleed half.
    <section aria-labelledby="founders-title" className="bg-blackcurrant py-14 md:py-20 design-modern:py-16 design-modern:md:py-24 design-modern:lg:py-28">
      <div className="container-cf grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:items-stretch lg:gap-12 xl:gap-16">
        <div className="relative aspect-[16/10] overflow-hidden rounded-brand lg:col-span-6 lg:aspect-auto lg:min-h-[440px]">
          <motion.img
            src={founders.image}
            alt={founders.alt}
            loading="lazy"
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
          />
        </div>

        <div className="on-dark lg:col-span-6 lg:self-center">
          <Reveal className="max-w-2xl">
          <h2 id="founders-title" className="text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[var(--leading-title)] font-medium">
            Proudly founded in <Accent>Manchester</Accent> by Reg and Louis Rix
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-white/80">
            The motor trade has been part of their lives for as long as they can remember. From working in their
            dad’s dealership as kids to striking out as entrepreneurs, it’s always been the industry for them. Still
            is. They’re passionate about what we do and proud to be the UK’s leading digital car finance platform.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none font-medium">{s.value}</dd>
                <dd className="mt-2 text-sm text-white/65">{s.label}</dd>
              </div>
            ))}
            <div className="col-span-2 border-t border-white/15 pt-6">
              <dt className="sr-only">Trustpilot score</dt>
              <dd>
                <a href={trustpilot.url} className="group inline-flex items-center gap-3">
                  <Icon name="star" className="size-[clamp(1.6rem,2.4vw,2.2rem)] text-lime" />
                  <span className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none font-medium">
                    {trustpilot.score}
                  </span>
                  <span className="text-sm text-white/65 transition-colors group-hover:text-white">
                    Excellent on Trustpilot from {trustpilot.reviews} reviews
                  </span>
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-7">
            <Button href={siteUrl('/about')} variant="outline-light" size="md">
              Read our story
            </Button>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  )
}
