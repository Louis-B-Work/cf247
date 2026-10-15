import { appLinks } from '../../data/appLinks'
import { liveFooter } from '../../data/liveHome'
import { trustpilot } from '../../data/reviews'
import { siteUrl } from '../../lib/utils'
import { Logo } from '../brand/Logo'
import { BrandIcon } from '../ui/BrandIcon'
import { TrustpilotStars } from '../ui/Trustpilot'

const legal = [
  ['Sitemap', '/sitemap'],
  ['Terms & Conditions', '/terms-and-conditions'],
  ['Privacy Policy', '/privacy-policy'],
  ['Cookie Policy', '/cookie-policy'],
  ['Acceptable Use Policy', '/website-terms-of-use'],
  ['Complaints Procedure', '/complaints-procedure'],
  ['Anti-Slavery and Human Trafficking', '/modern-slavery-act'],
  ['247 Money', 'https://www.247money.com/'],
] as const

/** App badges as on the live footer: link label and the badge's alt text. */
const apps = [
  { ...appLinks[0], label: 'Download on the App Store', text: 'App Store' },
  { ...appLinks[1], label: 'Get it on Google Play', text: 'Play Store' },
]

/** Settings cog "Homepage content: Exact replica": the live homepage footer's content and order in the new design. */
export function LiveFooter() {
  return (
    <footer className="on-dark bg-blackcurrant">
      <div className="container-xl grid grid-cols-1 gap-8 pt-12 pb-8 sm:gap-10 sm:py-14 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <a href={trustpilot.url} className="block w-fit text-sm text-white/75 transition-colors hover:text-white">
            <TrustpilotStars boxClassName="size-[18px]" />
            <span className="mt-2 block">
              TrustScore {trustpilot.score}|{trustpilot.reviews} reviews
            </span>
          </a>
          <div>
            <Logo className="h-14 w-auto text-white sm:h-16" />
            <address className="mt-6 text-[15px] leading-relaxed text-white/70 not-italic">
              Car Finance 247 Limited
              <br />
              Universal Square, Devonshire Street North, Manchester, M12 6JH
            </address>
          </div>
        </div>

        <nav aria-label="Footer" className="lg:col-span-8">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:gap-y-3 md:grid-cols-4">
            {liveFooter.links.map((link) => (
              <li key={link.href + link.label}>
                <a href={link.href} className="text-[15px] text-white/70 transition-colors hover:text-lime max-sm:flex max-sm:min-h-11 max-sm:items-center">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-xl flex flex-col gap-8 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <h3 className="font-display text-base font-semibold">{liveFooter.appTitle}</h3>
            <ul className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
              {apps.map((app) => (
                <li key={app.store}>
                  <a
                    href={app.href}
                    aria-label={app.label}
                    className="flex h-12 items-center justify-center gap-2.5 rounded-inner bg-black px-4 ring-1 ring-white/25 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:ring-2 hover:ring-lime"
                  >
                    <BrandIcon name={app.icon} className="size-6 shrink-0" />
                    <span className="font-display text-[16px] leading-none font-semibold whitespace-nowrap">{app.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <h3 className="font-display text-base font-semibold">{liveFooter.followTitle}</h3>
            <ul className="grid grid-cols-6 gap-2 sm:flex sm:gap-2.5">
              {liveFooter.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={s.name}
                    className="grid size-11 place-items-center rounded-inner bg-white/10 text-white transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-lime hover:text-blackcurrant max-sm:w-full"
                  >
                    <BrandIcon name={s.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-xl space-y-4 py-8 text-xs leading-relaxed text-white/55 sm:py-10">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/75 max-sm:gap-x-5 max-sm:gap-y-0">
            {legal.map(([label, path]) => (
              <li key={label}>
                <a href={path.startsWith('http') ? path : siteUrl(path)} className="hover:text-lime max-sm:inline-flex max-sm:min-h-11 max-sm:items-center">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {liveFooter.notes.map((n) => (
            <p key={n}>{n}</p>
          ))}
          <p>
            Registered office: Universal Square, Devonshire Street North, Manchester, M12 6JH. Registered in England. (Registration Number 06035525).
          </p>
          <p>
            Car Finance 247 Limited is authorised and regulated by the Financial Conduct Authority for insurance distribution and credit broking
            (Firm Reference Number: 653019). Car Finance 247 Limited is registered with the ICO (Registration Number Z1897658).
          </p>
          <p>Finance is subject to status and is only available to UK residents aged 18 and over. Written quotations are available on request.</p>
          <p>
            This site uses cookies so that we can provide you with the best user experience. By continuing to use the site you are consenting for
            cookies to be used. Further information on cookies and how you can disable them is available on our{' '}
            <a href={siteUrl('/cookie-policy')} className="underline underline-offset-2 hover:text-lime">
              cookie policy
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
