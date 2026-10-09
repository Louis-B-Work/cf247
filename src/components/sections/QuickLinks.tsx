import { motion } from 'motion/react'
import { representativeExample } from '../../data/assets'
import { siteUrl } from '../../lib/utils'
import { Icon, type IconName } from '../ui/Icon'

const links: Array<{ title: string; body: string; href: string; icon: IconName }> = [
  {
    title: 'Car finance calculator',
    body: 'Estimate your monthly repayments',
    href: siteUrl('/car-finance-calculator'),
    icon: 'car',
  },
  {
    title: 'Refinance my car',
    body: 'See if you could pay less each month',
    href: siteUrl('/refinance-car-finance'),
    icon: 'heart',
  },
  {
    title: 'Bad credit car finance',
    body: 'Lenders who look beyond your score',
    href: siteUrl('/bad-credit-car-finance'),
    icon: 'shield',
  },
  {
    title: 'Value my car',
    body: 'Use your part exchange as a deposit',
    href: siteUrl('/valuations'),
    icon: 'gem',
  },
]

type QuickLink = (typeof links)[number]

function QuickLinkCard({ link }: { link: QuickLink }) {
  return (
    <a
      href={link.href}
      className="group flex h-full min-h-[132px] touch-manipulation flex-col rounded-brand bg-purple-10 p-3 transition-colors duration-300 [-webkit-tap-highlight-color:transparent] hover:bg-purple hover:text-white active:bg-purple active:text-white sm:min-h-[156px] sm:p-5"
    >
      <span className="flex items-start justify-between gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-brand bg-white text-purple transition-colors duration-300 group-hover:bg-lime group-hover:text-blackcurrant group-active:bg-lime group-active:text-blackcurrant sm:size-14">
          <Icon name={link.icon} className="size-6 sm:size-7" />
        </span>
        <Icon
          name="arrow-up-right"
          className="size-5 shrink-0 text-purple transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime group-active:translate-x-0.5 group-active:-translate-y-0.5 group-active:text-lime"
        />
      </span>
      <span className="mt-4 block min-w-0 sm:mt-5">
        <span className="block font-display text-base leading-tight font-semibold sm:text-lg">{link.title}</span>
        <span className="mt-1 block text-xs leading-snug opacity-70 max-[380px]:hidden sm:text-sm">{link.body}</span>
      </span>
    </a>
  )
}

export function QuickLinks() {
  return (
    <section aria-label="Quick links" className="relative bg-white pt-[var(--car-overhang)] pb-14 [--car-overhang:calc(33vw+24px)] sm:[--car-overhang:calc(min(48vw,360px)*0.42+28px)] md:pb-20 lg:[--car-overhang:calc(min(6.8vw,128px)+24px)] hero-centered:[--car-overhang:32px] hero-centered:md:[--car-overhang:40px] hero-bleed:[--car-overhang:32px] hero-bleed:md:[--car-overhang:40px]">
      <div className="container-wide">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {links.map((link, i) => (
            // Revealed on load, just after the hero headline, as the tops peek above the fold in every hero layout.
            <motion.li
              key={link.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 + i * 0.08 }}
              className="h-full"
            >
              <QuickLinkCard link={link} />
            </motion.li>
          ))}
        </ul>

        <p className="mx-auto mt-8 text-center text-xs leading-relaxed text-blackcurrant/60 sm:mt-10 sm:max-w-4xl sm:text-[13px]">
          {representativeExample}
        </p>
      </div>
    </section>
  )
}
