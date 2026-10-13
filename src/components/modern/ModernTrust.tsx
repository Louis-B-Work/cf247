import { partners } from '../../data/assets'
import { MagicText } from '../ui/MagicText'
import { Reveal } from '../ui/Reveal'
import { panel } from './ui'

const statementCopy =
  'We’ve helped over 500,000 people drive away in a car they *love.* [[One quick application]], a decision in minutes and a panel of trusted lenders. We sort the paperwork, so you just turn up and drive away.'

export function ModernTrust() {
  return (
    <section aria-labelledby="modern-trust-title" className="bg-purple-10 pt-12 lg:pt-16">
      <div className="container-cf">
        <Reveal
          className={`${panel} bg-white/70 p-5 ring-1 ring-purple/10 backdrop-blur md:p-6`}
          y={18}
          amount={0.35}
        >
          <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-8">
            <p className="text-center text-[13px] font-semibold tracking-[-0.01em] text-blackcurrant/65 md:text-left lg:shrink-0 lg:whitespace-nowrap">
              We only work with trusted partners and lenders
            </p>
            <ul className="grid w-full grid-cols-2 items-center justify-items-center gap-x-6 gap-y-5 md:flex md:w-auto md:flex-wrap md:justify-end md:gap-x-7 lg:gap-x-8">
              {partners.map((partner) => (
                <li key={partner.name} className="flex h-8 w-full max-w-[140px] items-center justify-center last:odd:col-span-2 md:h-8 md:w-[132px] md:max-w-none">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-full object-contain transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-105"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <h2 id="modern-trust-title" className="sr-only">
          Why Car Finance 247
        </h2>
        <div className="mt-10 sm:mt-14 lg:mt-20">
          <Reveal delay={0.06} y={34}>
            <MagicText
              copy={statementCopy}
              // pl offsets the trailing word margin MagicText leaves at each line end, so lines centre truly.
              className="mx-auto max-w-4xl pl-[0.25em] text-center font-display text-[clamp(1.35rem,2.5vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.03em] text-purple sm:text-[clamp(1.6rem,2.5vw,2.25rem)] sm:leading-[1.08] sm:tracking-[-0.035em]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
