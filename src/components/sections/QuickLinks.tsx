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
      className="group flex h-full touch-manipulation items-center gap-4 rounded-brand bg-purple-10 p-5 transition-colors duration-300 [-webkit-tap-highlight-color:transparent] hover:bg-purple hover:text-white active:bg-purple active:text-white"
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-brand bg-white text-purple transition-colors duration-300 group-hover:bg-lime group-hover:text-blackcurrant group-active:bg-lime group-active:text-blackcurrant">
        <Icon name={link.icon} className="size-7" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg leading-tight font-semibold">{link.title}</span>
        <span className="mt-1 block text-sm opacity-70">{link.body}</span>
      </span>
      <Icon
        name="arrow"
        className="size-5 shrink-0 text-purple transition-all duration-300 group-hover:translate-x-1 group-hover:text-lime group-active:text-lime"
      />
    </a>
  )
}

export function QuickLinks() {
  return (
    <section aria-label="Quick links" className="relative bg-white pt-[var(--car-overhang)] pb-14 [--car-overhang:calc(33vw+24px)] sm:[--car-overhang:calc(min(48vw,360px)*0.42+28px)] md:pb-20 lg:[--car-overhang:calc(min(6.8vw,128px)+24px)] hero-centered:[--car-overhang:56px] hero-centered:sm:[--car-overhang:56px] hero-centered:md:[--car-overhang:80px] hero-centered:lg:[--car-overhang:calc(min(6.8vw,128px)+24px)] hero-bleed:[--car-overhang:56px] hero-bleed:sm:[--car-overhang:56px] hero-bleed:md:[--car-overhang:80px] hero-bleed:lg:[--car-overhang:calc(min(6.8vw,128px)+24px)]">
      <div className="container-wide">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {links.map((link, i) => (
            <motion.li
              key={link.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
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
