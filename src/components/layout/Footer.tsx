import { useEffect, useState } from 'react'
import { navItems } from '../../data/nav'
import { trustpilot } from '../../data/reviews'
import { siteUrl } from '../../lib/utils'
import { Logo } from '../brand/Logo'
import { BrandIcon, type BrandMark } from '../ui/BrandIcon'
import { Icon } from '../ui/Icon'
import { TrustpilotLogo, TrustpilotStars } from '../ui/Trustpilot'

/** True from the sm breakpoint up, where footer link groups are always open. */
function useWide() {
  const query = '(min-width: 640px)'
  const [wide, setWide] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setWide(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return wide
}

const legal = [
  ['Sitemap', '/sitemap'],
  ['Terms & conditions', '/terms-and-conditions'],
  ['Privacy policy', '/privacy-policy'],
  ['Cookie policy', '/cookie-policy'],
  ['Complaints procedure', '/complaints-procedure'],
] as const

const socials: Array<{ name: string; icon: BrandMark; href: string }> = [
  { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/carfinance247' },
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/carfinance247' },
  { name: 'X', icon: 'x', href: 'https://twitter.com/CarFinance247' },
  { name: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@carfinance_247' },
  { name: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/channel/UCREA9FCb-iWyR88aiIxVHkQ' },
  { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/car-finance-247' },
]

const apps = [
  {
    store: 'App Store',
    lead: 'Download on the',
    icon: 'apple' as const,
    href: 'https://apps.apple.com/gb/app/carfinance-247/id1161743286',
  },
  {
    store: 'Google Play',
    lead: 'Get it on',
    icon: 'googleplay' as const,
    href: 'https://play.google.com/store/apps/details?id=uk.co.carfinance247.customerapp&hl=en_GB',
  },
]

function AppAndSocial() {
  return (
    <div className="border-t border-white/10">
      <div className="container-cf flex flex-col gap-8 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <p className="font-display text-base font-semibold">Get the app</p>
          <ul className="flex flex-wrap gap-3">
            {apps.map((app) => (
              <li key={app.store}>
                <a
                  href={app.href}
                  aria-label={`${app.lead} ${app.store}`}
                  className="group flex h-12 items-center gap-2.5 rounded-[12px] bg-black px-4 ring-1 ring-white/25 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:ring-2 hover:ring-lime"
                >
                  <BrandIcon name={app.icon} className="size-6 shrink-0" />
                  <span className="leading-none">
                    <span className="block text-[10px] tracking-wide text-white/80 uppercase">{app.lead}</span>
                    <span className="mt-0.5 block font-display text-[17px] font-semibold">{app.store}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <p className="font-display text-base font-semibold">Follow us</p>
          <ul className="flex flex-wrap gap-2.5">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={`Car Finance 247 on ${s.name}`}
                  className="grid size-11 place-items-center rounded-[12px] bg-white/10 text-white transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-lime hover:text-blackcurrant active:bg-lime active:text-blackcurrant"
                >
                  <BrandIcon name={s.icon} className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  const wide = useWide()
  const columns = navItems.map((item) => ({
    title: item.label,
    links: item.columns.flatMap((c) => c.links).slice(0, 7),
  }))

  return (
    <footer className="on-dark bg-blackcurrant">
      <div className="container-cf grid grid-cols-1 gap-8 pt-12 pb-8 sm:gap-10 sm:py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="h-14 w-auto text-white sm:h-16" />
          <address className="mt-6 text-[15px] sm:mt-8 leading-relaxed text-white/70 not-italic">
            Car Finance 247 Limited
            <br />
            Universal Square, Devonshire Street North
            <br />
            Manchester, M12 6JH
          </address>
          <a href={trustpilot.url} className="mt-6 block w-fit text-sm text-white/75 transition-colors hover:text-white">
            <span className="flex items-center gap-3">
              <TrustpilotLogo tone="light" className="text-[15px]" />
              <TrustpilotStars boxClassName="size-[18px]" />
            </span>
            <span className="mt-2 block">
              TrustScore {trustpilot.score} from {trustpilot.reviews} reviews
            </span>
          </a>
        </div>

        {/* Phones: collapsible link groups (native details/summary). Tablet and up: always-open columns. */}
        <nav aria-label="Footer" className="divide-y divide-white/10 border-y border-white/10 sm:grid sm:grid-cols-4 sm:gap-10 sm:divide-y-0 sm:border-0 lg:col-span-8">
          {columns.map((col) => (
            <details key={col.title} className="group/f" open={wide || undefined}>
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-base font-semibold [-webkit-tap-highlight-color:transparent] sm:pointer-events-none sm:py-0 [&::-webkit-details-marker]:hidden">
                {col.title}
                <Icon name="chevron" className="size-5 text-white/60 transition-transform duration-300 group-open/f:rotate-180 sm:hidden" />
              </summary>
              <ul className="space-y-3 pb-5 sm:mt-5 sm:pb-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[15px] text-white/70 transition-colors hover:text-lime">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
      </div>

      <AppAndSocial />

      <div className="border-t border-white/10">
        <div className="container-cf space-y-4 py-8 text-xs sm:py-10 leading-relaxed text-white/55">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/75">
            {legal.map(([label, path]) => (
              <li key={label}>
                <a href={siteUrl(path)} className="hover:text-lime">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            Registered office: Universal Square, Devonshire Street North, Manchester, M12 6JH. Registered in England
            (Registration Number 06035525).
          </p>
          <p>
            Car Finance 247 Limited is authorised and regulated by the Financial Conduct Authority for insurance
            distribution and credit broking (Firm Reference Number: 653019). Car Finance 247 Limited is registered
            with the ICO (Registration Number Z1897658).
          </p>
          <p>
            Finance is subject to status and is only available to UK residents aged 18 and over. Written quotations
            are available on request. Car Finance 247 Limited is a credit broker, not a lender.
          </p>
        </div>
      </div>
    </footer>
  )
}
