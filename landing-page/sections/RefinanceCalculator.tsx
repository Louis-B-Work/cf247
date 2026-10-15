import { useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { calculator as copy, refinanceQuoteUrl } from '../../src/data/refinance'
import { refinanceQuote, type RefinanceProduct } from '../../src/lib/finance'
import { cn } from '../../src/lib/utils'
import { Button } from '../../src/components/ui/Button'
import { Icon } from '../../src/components/ui/Icon'
import { Reveal } from '../../src/components/ui/Reveal'
import { SectionHeading } from '../../src/components/ui/SectionHeading'
import { Accent } from '../../src/components/ui/Smile'

const gbp = (n: number, dp = 2) =>
  n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: dp, maximumFractionDigits: dp })

type Help = { title: string; body: string[]; link?: { label: string; href: string } }
type HelpKey = keyof typeof copy.help

/** Help pop-ups, in the live calculator's order. They render after the calculator, as on the live page. */
const helpOrder: Array<{ key: HelpKey; label: string }> = [
  { key: 'settlement', label: 'Learn more about early settlement figure' },
  { key: 'credit', label: 'Learn more about credit score' },
  { key: 'product', label: 'Learn more about finance options' },
  { key: 'apr', label: 'Learn more about APR' },
]

const dialogId = (key: HelpKey) => `refinance-help-${key}`

/** "Learn more" info button opening the matching help pop-up. */
function HelpButton({ helpKey }: { helpKey: HelpKey }) {
  const label = helpOrder.find((h) => h.key === helpKey)?.label
  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      aria-controls={dialogId(helpKey)}
      onClick={() => (document.getElementById(dialogId(helpKey)) as HTMLDialogElement | null)?.showModal()}
      className="grid size-6 shrink-0 place-items-center rounded-full bg-purple/10 text-purple transition-colors hover:bg-lime hover:text-blackcurrant"
    >
      <svg viewBox="0 0 16 16" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M8 7.5v4" />
        <circle cx="8" cy="4.75" r="0.6" fill="currentColor" />
      </svg>
    </button>
  )
}

function HelpDialog({ id, help }: { id: string; help: Help }) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  return (
    <dialog
      ref={ref}
      id={id}
      aria-labelledby={titleId}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          ref.current?.close()
        }
      }}
      className="m-auto w-[min(92vw,440px)] rounded-brand bg-white p-0 text-blackcurrant shadow-[0_30px_80px_-30px_rgba(22,1,50,0.7)] backdrop:bg-blackcurrant/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 border-b border-purple-10 pb-4">
          <h3 id={titleId} className="font-display text-xl font-semibold">
            {help.title}
          </h3>
          <button type="button" aria-label="Close" onClick={() => ref.current?.close()} className="grid size-8 shrink-0 place-items-center rounded-inner bg-purple-10 text-purple hover:bg-lime hover:text-blackcurrant">
            <Icon name="close" className="size-4" />
          </button>
        </div>
        <div className="mt-4 space-y-3 text-base leading-relaxed text-blackcurrant/80">
          {help.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {help.link && (
          <a href={help.link.href} className="mt-5 inline-flex items-center gap-2 font-display font-semibold text-purple underline decoration-purple-30 decoration-2 underline-offset-4 hover:decoration-lime">
            {help.link.label}
            <Icon name="arrow" className="size-4" />
          </a>
        )}
      </div>
    </dialog>
  )
}

function FieldLabel({ htmlFor, children, help }: { htmlFor?: string; children: ReactNode; help?: ReactNode }) {
  const Tag = htmlFor ? 'label' : 'p'
  return (
    <div className="flex items-center gap-2">
      <Tag htmlFor={htmlFor} className="font-display text-[15px] font-semibold">
        {children}
      </Tag>
      {help}
    </div>
  )
}

function MoneyInput({ id, value, onChange, describedBy }: { id: string; value: number; onChange: (n: number) => void; describedBy?: string }) {
  return (
    <div className="mt-2 flex h-14 items-center rounded-inner bg-white px-4 ring-1 ring-purple/15 focus-within:ring-2 focus-within:ring-purple">
      <span aria-hidden className="font-display text-xl font-semibold text-blackcurrant/60">
        £
      </span>
      <input
        id={id}
        inputMode="numeric"
        autoComplete="off"
        value={value ? value.toLocaleString('en-GB') : ''}
        onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, '').slice(0, 6)) || 0)}
        aria-describedby={describedBy}
        className="h-full min-w-0 flex-1 bg-transparent pl-2 font-display text-xl font-semibold tabular-nums outline-none"
      />
    </div>
  )
}

function Segmented<T extends string | number>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="mt-2 grid auto-cols-fr grid-flow-col gap-1 rounded-inner bg-white p-1 ring-1 ring-purple/15">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={o === value}
          onClick={() => onChange(o)}
          className={cn(
            'h-11 rounded-[calc(var(--radius-inner)-4px)] font-display text-base font-semibold transition-colors',
            o === value ? 'bg-purple text-white' : 'text-blackcurrant/75 hover:bg-purple-10 hover:text-purple',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/**
 * Refinance calculator with the same fields, wording, help text and maths as the live page's calculator.
 * Figures are illustrative only.
 */
export function RefinanceCalculator() {
  const [current, setCurrent] = useState(300)
  const [settlement, setSettlement] = useState(5500)
  const [term, setTerm] = useState(copy.terms[0])
  const [profile, setProfile] = useState(copy.profiles[0].id)
  const [product, setProduct] = useState<RefinanceProduct>('HP')
  const ids = { current: useId(), settlement: useId(), hint: useId(), profile: useId() }

  const apr = copy.profiles.find((p) => p.id === profile)?.apr ?? copy.profiles[0].apr
  const quote = useMemo(
    () =>
      refinanceQuote({
        amount: settlement,
        aprPercent: apr,
        months: term,
        product,
        balloonShare: copy.balloonShare[term],
        optionFee: copy.optionFee,
      }),
    [settlement, apr, term, product],
  )
  const saving = settlement > 0 ? Math.max(0, Math.round(current - quote.monthly)) : 0

  const rows: Array<[ReactNode, string]> = [
    ['Amount to Finance', gbp(settlement)],
    [
      <span key="apr" className="flex items-center gap-2">
        APR <HelpButton helpKey="apr" />
      </span>,
      `${apr}%`,
    ],
    ...(product === 'PCP' ? ([['Optional Final Payment', gbp(quote.finalPayment)]] as Array<[ReactNode, string]>) : []),
    ['Option-to-purchase fee', gbp(copy.optionFee, 0)],
    ['Total Cost of Credit', gbp(settlement > 0 ? quote.costOfCredit : 0)],
    ['Total Repayable', gbp(settlement > 0 ? quote.totalRepayable : 0)],
  ]

  return (
    <section id="calculator" aria-labelledby="calc-title" className="bg-white py-14 md:py-20">
      <div className="container-cf">
        <SectionHeading
          id="calc-title"
          title={
            <>
              Refinance <Accent>Calculator</Accent>
            </>
          }
          intro={copy.intro}
        />

        <Reveal className="mt-7 grid grid-cols-1 gap-4 md:mt-10 lg:grid-cols-12 lg:gap-6">
          <div className="space-y-8 rounded-brand bg-purple-10 p-6 md:p-8 lg:col-span-7">
            <div>
              <h2 className="font-display text-xl font-semibold text-purple md:text-2xl">{copy.existingTitle}</h2>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor={ids.current}>{copy.currentLabel}</FieldLabel>
                  <MoneyInput id={ids.current} value={current} onChange={setCurrent} />
                </div>
                <div>
                  <FieldLabel htmlFor={ids.settlement} help={<HelpButton helpKey="settlement" />}>
                    {copy.settlementLabel}
                  </FieldLabel>
                  <MoneyInput id={ids.settlement} value={settlement} onChange={setSettlement} describedBy={ids.hint} />
                  <p id={ids.hint} className="mt-2 text-sm text-blackcurrant/65">
                    {copy.settlementHint}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-purple md:text-2xl">{copy.newTitle}</h2>
              <div className="mt-5 space-y-5">
                <div>
                  <FieldLabel>{copy.termLabel}</FieldLabel>
                  <Segmented label={copy.termLabel} options={copy.terms} value={term} onChange={setTerm} />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor={ids.profile} help={<HelpButton helpKey="credit" />}>
                      {copy.profileLabel}
                    </FieldLabel>
                    <div className="relative mt-2">
                      <select
                        id={ids.profile}
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                        className="h-14 w-full appearance-none rounded-inner bg-white px-4 font-display text-base font-semibold ring-1 ring-purple/15 outline-none focus:ring-2 focus:ring-purple"
                      >
                        {copy.profiles.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.id}
                          </option>
                        ))}
                      </select>
                      <Icon name="chevron" className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-purple" />
                    </div>
                  </div>
                  <div>
                    <FieldLabel help={<HelpButton helpKey="product" />}>{copy.productLabel}</FieldLabel>
                    <Segmented label={copy.productLabel} options={['PCP', 'HP'] as const} value={product} onChange={setProduct} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="on-dark flex flex-col rounded-brand bg-purple p-6 md:p-8 lg:col-span-5">
            <p aria-live="polite">
              <span className="block font-display text-[15px] font-semibold text-white/80">{quote.payments} monthly payments of</span>
              <span className="mt-2 block font-display text-[clamp(2.75rem,6vw,4rem)] leading-none font-medium tabular-nums">
                {gbp(settlement > 0 ? quote.monthly : 0)}
              </span>
              <span className="mt-2 block text-white/80">at {apr}% APR</span>
            </p>
            <p className="mt-4 font-display text-lg font-semibold">
              You could save <span className="text-lime">{gbp(saving, 0)}</span> per month
            </p>
            <div className="mt-5">
              <Button href={refinanceQuoteUrl} variant="reverse" size="xl" attention>
                {copy.apply}
              </Button>
            </div>

            <h3 className="mt-7 border-t border-white/20 pt-5 font-display text-lg font-semibold">{copy.breakdownTitle}</h3>
            <dl className="mt-3 divide-y divide-white/10 text-[15px]">
              {rows.map(([label, value], i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-white/75">{label}</dt>
                  <dd className="font-display font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>

            {product === 'PCP' && (
              <p className="mt-4 rounded-inner bg-white/10 p-4 text-sm leading-relaxed text-white/80">
                <strong className="block font-display text-white">{copy.mileageTitle}</strong>
                {copy.mileageBody}
              </p>
            )}
          </div>
        </Reveal>

        <div className="mt-5 space-y-2 text-xs leading-relaxed text-blackcurrant/60">
          <p>{copy.repExample}</p>
          <p>{copy.footnote}</p>
          <p>{copy.subjectToStatus}</p>
        </div>

        {helpOrder.map(({ key }) => (
          <HelpDialog key={key} id={dialogId(key)} help={copy.help[key]} />
        ))}
      </div>
    </section>
  )
}
