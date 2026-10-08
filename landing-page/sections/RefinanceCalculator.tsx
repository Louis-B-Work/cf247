import { useId, useMemo, useState, type ChangeEvent } from 'react'
import { refinanceApr, refinanceQuoteUrl } from '../../src/data/refinance'
import { estimateMonthly } from '../../src/lib/finance'
import { Button } from '../../src/components/ui/Button'
import { Icon } from '../../src/components/ui/Icon'
import { Reveal } from '../../src/components/ui/Reveal'
import { SectionHeading } from '../../src/components/ui/SectionHeading'
import { Accent } from '../../src/components/ui/Smile'

const gbp = (n: number, dp = 0) =>
  n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: dp, maximumFractionDigits: dp })

type SliderProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (n: number) => string
  onChange: (n: number) => void
}

function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
  const id = useId()
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-display text-[15px] font-semibold">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-xl font-semibold text-purple tabular-nums">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
        aria-valuetext={format(value)}
        style={{ ['--pct' as string]: `${pct}%` }}
        className="cf-range mt-3 w-full"
      />
      <div className="mt-1.5 flex justify-between text-xs text-blackcurrant/50">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

/**
 * Illustrative refinance calculator. It compares the user's current monthly payment with an estimate for the
 * outstanding balance over a new term at the representative APR. Figures are illustrative only.
 */
export function RefinanceCalculator() {
  const [balance, setBalance] = useState(9000)
  const [current, setCurrent] = useState(320)
  const [term, setTerm] = useState(48)

  const { monthly, total, difference } = useMemo(() => {
    const m = estimateMonthly(balance, refinanceApr, term)
    return { monthly: m, total: m * term, difference: current - m }
  }, [balance, current, term])

  const saving = difference > 0.5

  return (
    <section id="calculator" aria-labelledby="calc-title" className="bg-white py-14 md:py-20">
      <div className="container-cf">
        <SectionHeading
          id="calc-title"
          title={
            <>
              See what you could <Accent>save</Accent>
            </>
          }
          intro="Run an illustrative quote to see how a new deal could change your monthly payments."
        />

        <Reveal className="mt-7 grid grid-cols-1 gap-4 md:mt-10 lg:grid-cols-12 lg:gap-6">
          <div className="space-y-8 rounded-brand bg-purple-10 p-6 md:p-8 lg:col-span-7">
            <Slider label="Amount left to pay" value={balance} min={2000} max={50000} step={250} format={(n) => gbp(n)} onChange={setBalance} />
            <Slider label="Your current monthly payment" value={current} min={50} max={1500} step={5} format={(n) => gbp(n)} onChange={setCurrent} />
            <Slider label="New term" value={term} min={12} max={60} step={6} format={(n) => `${n} months`} onChange={setTerm} />
          </div>

          <div className="on-dark flex flex-col rounded-brand bg-purple p-6 md:p-8 lg:col-span-5">
            <p className="font-display text-[15px] font-semibold text-white/80">Estimated new monthly payment</p>
            <p aria-live="polite" className="mt-2 font-display text-[clamp(2.75rem,6vw,4rem)] leading-none font-medium tabular-nums">
              {gbp(monthly, 2)}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-5 text-sm">
              <div>
                <p className="text-white/70">{saving ? 'Could be lower by' : 'Difference'}</p>
                <p className={saving ? 'mt-1 font-display text-xl font-semibold text-lime' : 'mt-1 font-display text-xl font-semibold'}>
                  {saving ? `${gbp(difference, 2)} a month` : `${gbp(Math.abs(difference), 2)} more a month`}
                </p>
              </div>
              <div>
                <p className="text-white/70">Total repayable</p>
                <p className="mt-1 font-display text-xl font-semibold tabular-nums">{gbp(total)}</p>
              </div>
            </div>

            <p className="mt-5 flex gap-2 text-[13px] leading-relaxed text-white/75">
              <Icon name="shield" className="mt-0.5 size-4 shrink-0 text-lime" />
              Spreading your balance over a longer term can lower your monthly payment but may increase the total
              interest you pay.
            </p>

            <div className="mt-auto pt-6">
              <Button href={refinanceQuoteUrl} variant="reverse" size="lg">
                Get my quote
              </Button>
            </div>
          </div>
        </Reveal>

        <p className="mt-5 text-xs leading-relaxed text-blackcurrant/60">
          Illustrative only, based on a representative {refinanceApr}% APR fixed rate. Your actual rate depends on your
          circumstances and is subject to lender checks. Check your current agreement for any early repayment charges.
        </p>
      </div>
    </section>
  )
}
