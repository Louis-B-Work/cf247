import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { images } from '../../data/images'
import { quoteUrl } from '../../data/nav'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Accent, EndSmile } from '../ui/Smile'

/** Full-bleed photo band with short copy sitting in the image's quiet zone. */
export function LifestyleBand() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const img = images.lifestyleBand

  return (
    <section
      ref={ref}
      aria-labelledby="band-title"
      className="on-dark relative isolate flex min-h-[min(78vh,680px)] overflow-hidden bg-blackcurrant"
    >
      <motion.img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        style={{ y, objectPosition: img.objectPosition }}
        className="absolute inset-x-0 top-[-8%] -z-20 h-[116%] w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(22,1,50,0.65)_0%,rgba(22,1,50,0.2)_28%,rgba(22,1,50,0)_40%,rgba(22,1,50,0.5)_62%,rgba(22,1,50,0.92)_100%)] md:bg-[linear-gradient(to_bottom,rgba(22,1,50,0.65)_0%,rgba(22,1,50,0.2)_28%,rgba(22,1,50,0)_40%,rgba(22,1,50,0.5)_62%,rgba(22,1,50,0.92)_100%),linear-gradient(to_left,rgba(22,1,50,0.6)_0%,rgba(22,1,50,0.3)_35%,rgba(22,1,50,0)_60%)]"
      />

      {/* Poster layout: heading in the sky at the top, subtext and call to action in the bottom-right corner of the image. */}
      <div className="container-cf flex flex-col justify-between gap-10 pt-[clamp(48px,8vh,96px)] pb-[clamp(36px,6vh,64px)]">
        <Reveal>
          <h2 id="band-title" className="text-[clamp(2.6rem,5vw,4.75rem)] leading-[var(--leading-title)] font-medium">
            Find your <EndSmile tone="white" size={0.66}><Accent>match</Accent></EndSmile>
          </h2>
        </Reveal>
        <Reveal className="max-w-xl self-end text-right" delay={0.1}>
          <p className="text-lg leading-relaxed text-white/90 md:text-xl">
            Get a personalised quote in minutes, then find the right car from any dealer with your budget in hand.
          </p>
          <div className="mt-7 flex justify-end">
            <Button href={quoteUrl} variant="reverse" size="lg">
              Get my quote
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
