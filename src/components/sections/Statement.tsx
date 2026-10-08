import { MagicText } from '../ui/MagicText'

const copy =
  'We’ve helped over 500,000 people drive away in a car they *love.* [[One quick application]], a decision in minutes, a [[panel of trusted lenders]] and a dedicated account manager who sorts the paperwork for you.'

export function Statement() {
  return (
    <section aria-label="About Car Finance 247" className="bg-white py-20 md:py-[clamp(72px,14vh,140px)]">
      <div className="container-cf flex justify-center">
        <MagicText
          copy={copy}
          className="max-w-[24ch] font-display text-[clamp(1.9rem,3.8vw,3.6rem)] leading-[var(--leading-title)] font-medium tracking-[-0.03em] text-purple md:max-w-[28ch]"
        />
      </div>
    </section>
  )
}
