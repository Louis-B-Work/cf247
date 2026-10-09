import { motion } from 'motion/react'
import { trustpilot } from '../../data/reviews'
import { TrustpilotStars } from '../ui/Trustpilot'

const stats = [
  { value: '500,000+', label: 'Customers helped' },
  { value: 'Excellent', label: `${trustpilot.reviews} Trustpilot reviews`, stars: true },
  { value: '100,000+', label: 'Cars in our members area' },
]

/**
 * The founders and Manchester story has its own section further down, so it isn’t repeated here.
 *
 * A quiet supporting strip under How it works: no cards, smaller figures and hairline dividers,
 * so it reads as proof points rather than competing with the interactive tool above.
 */
export function ModernStats() {
  return (
    <section aria-label="Car Finance 247 in numbers" className="bg-purple-10 pb-12 md:pb-16">
      <div className="container-cf">
        <dl className="grid grid-cols-3 border-y border-purple/15 py-6 md:py-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
              className="flex flex-col-reverse justify-end gap-1 border-l border-purple/15 px-3 first:border-l-0 first:pl-0 sm:px-6"
            >
              <dt className="text-[13px] text-blackcurrant/60 sm:text-sm">
                {stat.stars && (
                  <span className="mb-1 block lg:mr-2 lg:mb-0 lg:inline-block lg:align-[-2px]">
                    <TrustpilotStars boxClassName="size-3.5" />
                  </span>
                )}
                {stat.label}
              </dt>
              <dd className="font-display text-xl leading-tight font-semibold tracking-[-0.02em] text-blackcurrant sm:text-2xl">{stat.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
