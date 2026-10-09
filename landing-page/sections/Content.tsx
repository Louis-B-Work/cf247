import { motion } from 'motion/react'
import { cons, guideLinks, pros, reasons, refinanceImages, refinanceQuoteUrl, testimonial, whyPoints } from '../../src/data/refinance'
import { Button } from '../../src/components/ui/Button'
import { Icon } from '../../src/components/ui/Icon'
import { Reveal } from '../../src/components/ui/Reveal'
import { SectionHeading } from '../../src/components/ui/SectionHeading'
import { Accent } from '../../src/components/ui/Smile'

const ease = [0.22, 1, 0.36, 1] as const

const link = 'font-semibold text-purple underline decoration-purple-30 decoration-2 underline-offset-4 transition-colors hover:decoration-lime'

/** What refinancing is, with the four common reasons as icon cards. */
export function Explainer() {
  return (
    <section aria-labelledby="explainer-title" className="bg-purple-10 py-14 md:py-20">
      <div className="container-cf grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-6">
          <h2 id="explainer-title" className="text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[var(--leading-title)] font-medium">
            How car <Accent>refinancing</Accent> works
          </h2>
          <div className="mt-4 max-w-2xl space-y-4 text-[17px] leading-relaxed text-blackcurrant/80">
            <p>
              Refinancing your car means taking out a new finance agreement to pay off your existing loan and keep your
              current car. You might do this if a new deal could save you money, or if your needs have changed.
            </p>
            <p>
              Coming to the end of a{' '}
              <a href={guideLinks.pcp} className={link}>
                PCP agreement
              </a>{' '}
              and want to keep your car? Refinancing could turn the final{' '}
              <a href={guideLinks.balloon} className={link}>
                balloon payment
              </a>{' '}
              into more affordable monthly payments.
            </p>
            <p>
              If your{' '}
              <a href={guideLinks.creditScore} className={link}>
                credit score
              </a>{' '}
              has improved, or you didn’t shop around for your original deal, you may be eligible for a more competitive
              option. Always check the total amount payable before you switch.
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <p className="font-display text-lg font-semibold">Why people refinance</p>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-brand bg-white p-5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-inner bg-purple text-white">
                  <Icon name={r.icon} className="size-6" />
                </span>
                <span className="font-display text-[17px] leading-snug font-semibold">{r.title}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Tick({ tone }: { tone: 'pro' | 'con' }) {
  return (
    <span
      className={
        tone === 'pro'
          ? 'grid size-8 shrink-0 place-items-center rounded-inner bg-lime text-blackcurrant'
          : 'grid size-8 shrink-0 place-items-center rounded-inner bg-purple-10 text-purple'
      }
    >
      <svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        {tone === 'pro' ? <path d="M3.5 8.5l3 3 6-7" /> : <path d="M4 8h8" />}
      </svg>
    </span>
  )
}

/** Honest pros and cons, as two matching cards. */
export function ProsCons() {
  const card = (tone: 'pro' | 'con', title: string, items: typeof pros) => (
    <Reveal
      className={
        tone === 'pro'
          ? 'on-dark rounded-brand bg-purple p-6 md:p-8'
          : 'rounded-brand bg-white p-6 ring-1 ring-purple-30 md:p-8'
      }
    >
      <h3 className="text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[var(--leading-title)] font-medium">{title}</h3>
      <ul className="mt-6 space-y-5">
        {items.map((it) => (
          <li key={it.title} className="flex gap-4">
            <Tick tone={tone} />
            <div>
              <p className="font-display text-[17px] font-semibold">{it.title}</p>
              <p className={tone === 'pro' ? 'mt-1 text-[15px] leading-relaxed text-white/80' : 'mt-1 text-[15px] leading-relaxed text-blackcurrant/70'}>
                {it.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  )

  return (
    <section aria-labelledby="proscons-title" className="bg-white py-14 md:py-20">
      <div className="container-cf">
        <SectionHeading
          id="proscons-title"
          title={
            <>
              Is refinancing <Accent>right</Accent> for you?
            </>
          }
          intro="Refinancing isn’t the right choice for everyone. Here’s what to weigh up."
        />
        <div className="mt-7 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
          {card('pro', 'Pros', pros)}
          {card('con', 'Things to consider', cons)}
        </div>
      </div>
    </section>
  )
}

/** Why Car Finance 247: five points, the customer testimonial and a quote button. */
export function WhyUs() {
  const img = refinanceImages.why
  return (
    <section aria-labelledby="why-title" className="bg-white pb-14 md:pb-20">
      <div className="container-cf grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-6">
        <div className="relative isolate min-h-[420px] overflow-hidden rounded-brand bg-blackcurrant lg:col-span-5">
          <img src={img.src} alt={img.alt} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-top" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(22,1,50,0.92)_0%,rgba(22,1,50,0.5)_35%,rgba(22,1,50,0)_60%)]" />
          <figure className="on-dark absolute inset-x-0 bottom-0 p-6 md:p-8">
            <blockquote className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight font-medium">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-white/80">
              <strong className="text-white">{testimonial.name}</strong> · {testimonial.detail}
            </figcaption>
          </figure>
        </div>

        <div className="rounded-brand bg-purple-10 p-6 md:p-8 lg:col-span-7">
          <h2 id="why-title" className="text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[var(--leading-title)] font-medium">
            Why Car Finance <Accent>247</Accent>?
          </h2>
          <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {whyPoints.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-inner bg-white text-purple">
                  <Icon name={p.icon} className="size-6" />
                </span>
                <div>
                  <p className="font-display text-[17px] font-semibold">{p.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-blackcurrant/70">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={refinanceQuoteUrl} variant="light" size="xl">
              Get my quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
