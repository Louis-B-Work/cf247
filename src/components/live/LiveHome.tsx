import { motion } from 'motion/react'
import { heroCar } from '../../data/assets'
import {
  liveCommission,
  liveFaqs,
  liveFinalCta,
  liveFounders,
  liveGuides,
  liveHero,
  livePartners,
  liveQuickLinks,
  liveQuoteUrl,
  liveRepExample,
  liveReviews,
  liveSituations,
  liveSteps,
  type LiveTile,
} from '../../data/liveHome'
import { trustpilot } from '../../data/reviews'
import { cn } from '../../lib/utils'
import { Faq } from '../sections/Faq'
import { BudgetForm } from '../modern/ModernHero'
import { ModernHeading, panel } from '../modern/ui'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { Accent } from '../ui/Smile'
import { TrustpilotStars } from '../ui/Trustpilot'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Settings cog "Homepage content: Exact replica". The live homepage's sections, headings, copy and links, word for
 * word and in the same order (desktop and mobile), styled with the Modern design. Copy lives in src/data/liveHome.ts.
 */
export function LiveHome() {
  return (
    <div className="bg-purple-10">
      <LiveHero />
      <section aria-label="Representative example" className="bg-white py-5 sm:py-6">
        <p className="container-cf text-center text-xs leading-relaxed text-blackcurrant/60 sm:text-[13px]">
          <span className="mx-auto block max-w-4xl">{liveRepExample}</span>
        </p>
      </section>
      <QuickLinks />
      <Steps />
      <Reviews />
      <Partners />
      <Situations />
      <Founders />
      <Guides />
      <Faq
        categories={liveFaqs}
        flat
        contact={false}
        title={
          <>
            Frequently Asked <Accent>Questions</Accent>
          </>
        }
      />
      <section aria-label="Commission disclosure" className="bg-purple-10 pb-10">
        <p className="container-cf text-sm leading-relaxed text-blackcurrant/65">{liveCommission}</p>
      </section>
      <FinalCta />
    </div>
  )
}

function LiveHero() {
  return (
    <section id="top" className="on-dark relative isolate flex min-h-[min(820px,100svh)] flex-col overflow-hidden bg-purple pt-[var(--nav-height)]">
      <div className="container-xl relative z-10 mx-auto flex w-full flex-1 flex-col items-center justify-center px-5 pt-10 pb-[150px] text-center sm:translate-y-8 sm:pt-[clamp(4rem,10vh,8rem)] sm:pb-[clamp(190px,32vh,310px)]">
        <h1 className="max-w-5xl text-[clamp(2.5rem,13vw,3.75rem)] leading-[0.98] font-medium tracking-[-0.045em] text-white sm:text-[clamp(1.5rem,7.2vw,6.25rem)] sm:whitespace-nowrap">
          Car Finance Made <Accent className="text-white">Easy</Accent>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="mt-8 w-full max-w-[360px]"
        >
          <BudgetForm hint={false} />
        </motion.div>

        <p className="mt-4 max-w-xl text-[11px] leading-relaxed text-white/70 sm:text-xs">{liveHero.rates}</p>

        <a
          href={trustpilot.url}
          className="group mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full border border-white/15 bg-black/10 px-4 py-2 text-xs backdrop-blur-sm sm:text-[13px]"
        >
          <TrustpilotStars boxClassName="size-[17px]" />
          <span className="text-white/80 transition-colors group-hover:text-white">
            TrustScore <strong className="text-white">{trustpilot.score}</strong>| <strong className="text-white">{trustpilot.reviews}</strong> reviews
          </span>
        </a>
      </div>

      <motion.img
        src={heroCar.src}
        alt={liveHero.carAlt}
        fetchPriority="high"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.25 }}
        className="pointer-events-none absolute right-[-8%] bottom-0 z-0 h-[140px] w-[min(112vw,920px)] object-contain object-right-bottom sm:right-[-4%] sm:h-[clamp(170px,32vh,310px)] md:right-0"
      />
    </section>
  )
}

function QuickLinks() {
  return (
    <section aria-labelledby="quick-links-title" className="bg-purple-10 py-12 md:py-16">
      <div className="container-cf">
        <Reveal>
          <ModernHeading id="quick-links-title">{liveQuickLinks.title}</ModernHeading>
        </Reveal>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-8">
          {liveQuickLinks.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'group flex h-full items-center gap-4 bg-white p-5 ring-1 ring-purple/10 transition-shadow duration-500 hover:shadow-[0_28px_60px_-34px_rgba(105,5,242,0.55)] hover:ring-purple/40',
                  panel,
                )}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-inner bg-purple text-white transition-colors group-hover:bg-lime group-hover:text-blackcurrant">
                  <Icon name={link.icon} className="size-6" />
                </span>
                <span className="flex-1 font-display text-lg font-semibold text-blackcurrant">{link.label}</span>
                <Icon name="arrow" className="size-5 text-purple transition-transform group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <section aria-labelledby="steps-title" className="bg-white py-12 md:py-20">
      <div className="container-cf">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <ModernHeading id="steps-title">
              Three steps to <Accent>feel-good</Accent> car finance
            </ModernHeading>
          </Reveal>
          <Button href={liveQuoteUrl} variant="light" size="lg" attention className="max-sm:w-full max-sm:justify-center">
            {liveSteps.cta}
          </Button>
        </div>
        <ol className="mt-7 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 lg:gap-5">
          {liveSteps.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease, delay: i * 0.12 }}
              className="flex flex-col rounded-brand bg-white p-3 ring-1 ring-purple/10"
            >
              <div className="overflow-hidden rounded-inner bg-purple-30">
                <img src={step.image} alt={step.title} loading="lazy" className="aspect-[16/10] w-full object-cover lg:aspect-[4/3.6]" />
              </div>
              <p className="px-2 pt-4 pb-2 lg:px-3 lg:pt-5 lg:pb-3">
                <span className="inline-block rounded-inner bg-purple px-2.5 py-1 font-display text-sm font-semibold text-white">Step {i + 1}</span>{' '}
                <span className="mt-3 block font-display text-2xl leading-tight font-semibold lg:text-[1.75rem]">{step.title}</span>{' '}
                <span className="mt-1 block text-base leading-relaxed text-blackcurrant/75">{step.body}</span>
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Tile({ tile }: { tile: LiveTile }) {
  if (tile.kind === 'video') {
    return (
      <a href={tile.href} className={cn('group on-dark relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden bg-blackcurrant p-5 md:min-h-[380px]', panel)}>
        <img src={tile.image} alt="Video thumbnail" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(22,1,50,0.9),rgba(22,1,50,0.1)_60%)]" />
        <span aria-hidden className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime text-blackcurrant transition-transform group-hover:scale-110">
          <Icon name="play" className="size-6" />
        </span>
        <p className="font-display text-lg leading-snug font-semibold">{tile.quote}</p>
        <p className="mt-2 text-sm text-white/80">
          <strong className="text-white">{tile.name}</strong> {tile.detail}
        </p>
      </a>
    )
  }
  return (
    <a href={tile.href} className={cn('flex flex-col bg-white p-5 ring-1 ring-purple/10 transition-shadow hover:shadow-[0_28px_60px_-34px_rgba(105,5,242,0.55)]', panel)}>
      <TrustpilotStars boxClassName="size-4" />
      <p className="mt-3 text-base leading-relaxed text-blackcurrant">{tile.quote}</p>
      <p className="mt-auto pt-4 text-sm text-blackcurrant/70">
        <strong className="block text-blackcurrant">{tile.name}</strong>
        {tile.detail}
      </p>
    </a>
  )
}

function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="bg-purple-10 pt-12 pb-14 md:pt-16 md:pb-20">
      <div className="container-xl">
        <Reveal>
          <ModernHeading id="reviews-title">
            Making car finance <span className="whitespace-nowrap"><Accent>si</Accent>mple</span> for 500,000+ customers
          </ModernHeading>
        </Reveal>
        {/* Phones: one swipeable row in the live order. Tablet and up: three columns. */}
        <div className="-mx-[var(--pad-wide)] mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--pad-wide)] px-[var(--pad-wide)] pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:gap-5 [&::-webkit-scrollbar]:hidden">
          {liveReviews.columns.map((column, i) => (
            <div key={i} className="contents md:flex md:flex-col md:gap-4 lg:gap-5">
              {column.map((tile) => (
                <div key={tile.name} className="flex w-[min(78vw,320px)] shrink-0 snap-start flex-col md:w-auto md:flex-1 [&>*]:flex-1">
                  <Tile tile={tile} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <a href={trustpilot.url} className={cn('mt-8 flex flex-col items-center gap-3 bg-white px-6 py-6 text-center ring-1 ring-purple/10 md:flex-row md:justify-center md:gap-5', panel)}>
          <TrustpilotStars boxClassName="size-6" />
          <h3 className="font-display text-lg leading-snug font-semibold text-blackcurrant md:text-xl">{liveReviews.trustpilotHeading}</h3>
        </a>
      </div>
    </section>
  )
}

function Partners() {
  return (
    <section aria-labelledby="partners-title" className="bg-white pt-12 pb-8 lg:pt-16">
      <div className="container-cf">
        <div className={cn('flex flex-col items-center gap-6 bg-purple-10 p-6 ring-1 ring-purple/10 md:flex-row md:justify-between md:gap-8', panel)}>
          <h2 id="partners-title" className="text-center font-display text-lg font-semibold text-blackcurrant md:text-left lg:shrink-0">
            {livePartners.title}
          </h2>
          <ul className="grid w-full grid-cols-2 items-center justify-items-center gap-x-6 gap-y-5 md:flex md:w-auto md:gap-x-8">
            {livePartners.logos.map((p) => (
              <li key={p.name} className="flex h-8 w-full max-w-[140px] items-center justify-center md:w-[132px]">
                <img src={p.logo} alt={p.name} loading="lazy" className="h-full w-full object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Situations() {
  return (
    <section aria-labelledby="situations-title" className="bg-white pt-8 pb-14 md:pb-20">
      <div className="container-xl">
        <Reveal>
          <ModernHeading id="situations-title">
            Car finance for every <span className="whitespace-nowrap"><Accent>si</Accent>tuation</span>
          </ModernHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 lg:gap-5">
          {liveSituations.cards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.75, ease, delay: i * 0.08 }}
              className={cn('group flex flex-col overflow-hidden p-3 ring-1', i === 1 ? 'on-dark bg-purple ring-white/15' : 'bg-purple-10 ring-purple/10', panel)}
            >
              <div className="overflow-hidden rounded-inner bg-white/60">
                <img src={card.image} alt={card.alt} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
                <p className={cn('text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.02] font-medium tracking-[-0.03em]', i === 1 ? 'text-white' : 'text-purple')}>{card.title}</p>
                <p className={cn('mt-2.5 text-base leading-relaxed', i === 1 ? 'text-white/80' : 'text-blackcurrant/70')}>{card.body}</p>
                <div className="mt-auto pt-5">
                  <Button asSpan variant={i === 1 ? 'reverse' : 'light'} size="md">
                    {card.cta}
                  </Button>
                </div>
                {card.note && <p className="mt-3 text-xs leading-relaxed text-blackcurrant/60">{card.note}</p>}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Founders() {
  return (
    <section aria-labelledby="founders-title" className="on-dark bg-blackcurrant py-14 md:py-20">
      <div className="container-cf grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-12">
        <div className="overflow-hidden rounded-brand lg:col-span-6">
          <img src={liveFounders.image} alt={liveFounders.alt} loading="lazy" className="aspect-[16/10] w-full object-cover" />
        </div>
        <Reveal className="lg:col-span-6">
          <h2 id="founders-title" className="text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[var(--leading-title)] font-medium">
            Proudly founded in <Accent>Manchester</Accent> by Reg and Louis Rix.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 md:text-[17px]">{liveFounders.body}</p>
          <div className="mt-7">
            <Button href={liveFounders.href} variant="reverse" size="lg">
              {liveFounders.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Guides() {
  return (
    <section aria-labelledby="guides-title" className="bg-white py-14 md:py-20">
      <div className="container-cf">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <ModernHeading id="guides-title">
              Featured <Accent>guides</Accent>
            </ModernHeading>
          </Reveal>
          <a href={liveGuides.all.href} className="group inline-flex items-center gap-2 font-display font-semibold text-purple">
            {liveGuides.all.label}
            <Icon name="arrow" className="size-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <ul className="mt-7 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 lg:gap-5">
          {liveGuides.guides.map((g) => (
            <li key={g.href}>
              <a href={g.href} className={cn('group flex h-full flex-col bg-purple-10 p-3 ring-1 ring-purple/10 transition-shadow hover:shadow-[0_28px_60px_-34px_rgba(105,5,242,0.55)]', panel)}>
                <div className="overflow-hidden rounded-inner">
                  <img src={g.image} alt={g.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="px-2 pt-4 font-display text-xl leading-snug font-semibold text-blackcurrant">{g.title}</p>
                <span className="mt-auto inline-flex items-center gap-2 px-2 pt-4 pb-2 font-display font-semibold text-purple">
                  {liveGuides.cta}
                  <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="bg-white py-14 md:py-20">
      <div className="container-xl">
        <div className={cn('on-dark flex flex-col items-start gap-6 bg-purple p-7 md:flex-row md:items-end md:justify-between md:p-10', panel)}>
          <div>
            <h3 id="final-title" className="text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[0.98] font-medium tracking-[-0.05em] text-white">
              Let's get you <Accent>started</Accent>
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/84 md:text-[17px]">{liveFinalCta.body}</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Button href={liveFinalCta.href} variant="reverse" size="2xl" attention className="max-sm:w-full max-sm:justify-center">
              {liveFinalCta.cta}
            </Button>
            <p className="max-w-sm text-xs leading-relaxed text-white/66">{liveFinalCta.legal}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
