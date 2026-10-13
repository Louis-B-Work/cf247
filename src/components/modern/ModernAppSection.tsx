import { appLinks } from '../../data/appLinks'
import { BrandIcon } from '../ui/BrandIcon'
import { Reveal } from '../ui/Reveal'
import { MembersPhoneDemo } from './MembersPhoneDemo'
import { ModernHeading, panel } from './ui'

export function ModernAppSection() {
  return (
    <section aria-labelledby="members-app-title" className="bg-white py-0 sm:py-20">
      <div className="container-xl">
        <div className={`on-dark relative isolate overflow-hidden bg-purple px-6 pt-10 max-sm:-mx-[var(--pad-wide)] max-sm:rounded-none sm:px-8 sm:pt-8 lg:px-12 ${panel}`}>
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_25%,rgba(165,105,247,0.52),transparent_42%),linear-gradient(140deg,#6905f2,#4a03a8)]" />
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)] md:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <Reveal className="sm:py-8 md:py-12">
              <ModernHeading id="members-app-title" tone="dark" className="max-w-xl">
                Your car journey, in your pocket
              </ModernHeading>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Keep your finance journey close at hand and explore cars that fit your budget in the CF247 members area.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
                Already bought with CF247? Download the app to keep your finance details close at hand. We’re working to open up the members area to people still looking for their next car.
              </p>

              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-white">Get the app</p>
                <ul className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                  {appLinks.map((app) => (
                    <li key={app.store}>
                      <a
                        href={app.href}
                        aria-label={`${app.lead} ${app.store}`}
                        className="flex h-12 items-center justify-center gap-2.5 rounded-inner bg-black px-4 text-white ring-1 ring-white/25 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:ring-2 hover:ring-lime"
                      >
                        <BrandIcon name={app.icon} className="size-6 shrink-0" />
                        <span className="font-display text-[16px] leading-none font-semibold whitespace-nowrap">{app.store}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="relative flex justify-center overflow-hidden px-3 pt-2 max-md:h-[420px] max-md:items-start md:justify-end md:overflow-visible md:pt-8 md:pb-0">
              <div className="transition-transform duration-500 ease-[var(--ease-brand)] max-md:[zoom:0.9] md:rotate-[-5deg] md:hover:rotate-[-2deg]">
                <MembersPhoneDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
