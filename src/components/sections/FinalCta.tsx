import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { images } from '../../data/images'
import { quoteUrl } from '../../data/nav'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Accent, EndSmile } from '../ui/Smile'

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const img = images.finalCta

  return (
    <section
      ref={ref}
      aria-labelledby="final-title"
      className="on-dark relative isolate flex min-h-[min(92vh,820px)] items-start overflow-hidden bg-blackcurrant"
    >
      <motion.img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        style={{ scale, objectPosition: img.objectPosition }}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(22,1,50,0.6)_0%,rgba(22,1,50,0.35)_35%,rgba(22,1,50,0)_55%)]"
      />
      {/* Fades the photo into the footer's blackcurrant so there's no hard edge between them. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[24%] bg-gradient-to-b from-transparent via-blackcurrant/70 to-blackcurrant"
      />

      {/* Copy sits centred in the sky; the car and road sit clear below it before fading into the footer. */}
      <div className="container-cf flex justify-center pt-[clamp(36px,6vh,72px)] pb-16 text-center">
        <Reveal className="max-w-3xl">
          <h2 id="final-title" className="text-[clamp(2.6rem,5vw,4.75rem)] leading-[var(--leading-title)] font-medium">
            Let’s get you <EndSmile tone="white" size={0.72}><Accent>started</Accent></EndSmile>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-white/90 md:text-xl">
            Applying only takes a couple of minutes.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href={quoteUrl} variant="reverse" size="lg">
              Get my quote
            </Button>
          </div>
          <p className="mt-4 text-[13px] text-white/80">
            Representative 19.5% APR. Car Finance 247 Limited is a credit broker, not a lender.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
