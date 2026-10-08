import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'motion/react'
import { useRef, useState, type KeyboardEvent, type PointerEvent, type WheelEvent } from 'react'
import { reviews, trustpilot, videoReviews, type Review } from '../../data/reviews'
import { quoteUrl } from '../../data/nav'
import { cn, siteUrl } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { Accent } from '../ui/Smile'
import { TrustpilotLogo, TrustpilotStars } from '../ui/Trustpilot'
import { useVerticalWheelPassthrough } from '../../lib/useVerticalWheelPassthrough'

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full w-[min(80vw,340px)] shrink-0 flex-col justify-between rounded-brand bg-white p-6 ring-1 ring-purple-10 transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(105,5,242,0.45)]">
      <div>
        <TrustpilotStars boxClassName="size-[18px]" />
        <blockquote className="mt-4 text-[15px] leading-relaxed text-blackcurrant">“{review.quote}”</blockquote>
      </div>
      <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-purple-10 pt-4 text-sm">
        <span>
          <span className="block font-display font-semibold">{review.name}</span>
          <span className="text-blackcurrant/60">{review.detail}</span>
        </span>
        <TrustpilotLogo className="text-xs opacity-80" />
      </figcaption>
    </figure>
  )
}

/** Auto-scrolling row of reviews that can also be grabbed and dragged, flicked, or moved with a trackpad or arrow keys. */
function MarqueeRow({ items, reverse, speed }: { items: Review[]; reverse?: boolean; speed: number }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const reduce = useReducedMotion()
  const [dragging, setDragging] = useState(false)
  const s = useRef({ dragging: false, paused: false, focused: false, lastX: 0, lastT: 0, velocity: 0 })

  const wrap = (v: number) => {
    const half = (trackRef.current?.scrollWidth ?? 0) / 2
    if (!half) return v
    return (((v % half) + half) % half) - half
  }

  useAnimationFrame((_, delta) => {
    const st = s.current
    if (st.dragging) return
    const dt = Math.min(delta, 50) / 1000
    if (Math.abs(st.velocity) > 8) {
      x.set(wrap(x.get() + st.velocity * dt))
      st.velocity *= Math.pow(0.04, dt)
      return
    }
    st.velocity = 0
    if (reduce || st.paused || st.focused) return
    x.set(wrap(x.get() + (reverse ? speed : -speed) * dt))
  })

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const st = s.current
    st.dragging = true
    st.lastX = e.clientX
    st.lastT = performance.now()
    st.velocity = 0
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const st = s.current
    if (!st.dragging) return
    const now = performance.now()
    const dx = e.clientX - st.lastX
    const dt = Math.max(now - st.lastT, 1) / 1000
    st.velocity = st.velocity * 0.6 + (dx / dt) * 0.4
    st.lastX = e.clientX
    st.lastT = now
    x.set(wrap(x.get() + dx))
  }

  const endDrag = () => {
    const st = s.current
    if (!st.dragging) return
    st.dragging = false
    if (performance.now() - st.lastT > 80) st.velocity = 0
    setDragging(false)
  }

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    s.current.velocity = 0
    x.set(wrap(x.get() - e.deltaX))
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const step = e.key === 'ArrowRight' ? -396 : 396
    animate(x, x.get() + step, {
      duration: reduce ? 0 : 0.5,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => x.set(wrap(x.get())),
    })
  }

  return (
    <div
      role="region"
      aria-label="Customer reviews. Drag, or use the left and right arrow keys, to scroll."
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={(e) => e.pointerType === 'mouse' && (s.current.paused = true)}
      onPointerLeave={() => (s.current.paused = false)}
      onFocus={() => (s.current.focused = true)}
      onBlur={() => (s.current.focused = false)}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      className={cn(
        'touch-pan-y overflow-hidden select-none [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] focus-visible:outline-offset-[-3px]',
        dragging ? 'cursor-grabbing' : 'cursor-grab',
      )}
    >
      <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch py-2">
        {[...items, ...items].map((review, i) => (
          <div key={i} aria-hidden={i >= items.length} className="flex pr-4">
            <ReviewCard review={review} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function Reviews() {
  const rowRef = useRef<HTMLDivElement>(null)
  useVerticalWheelPassthrough(rowRef)

  return (
    <section aria-labelledby="reviews-title" className="overflow-hidden bg-purple-10 py-14 md:py-20">
      <div className="container-cf">
        <SectionHeading
          id="reviews-title"
          title={
            <>
              Making car finance simple for <Accent>500,000+</Accent> customers
            </>
          }
          action={
            <a
              href={trustpilot.url}
              className="group flex items-center gap-4 rounded-brand bg-white p-4 pr-6 ring-1 ring-purple-10 transition-colors hover:ring-purple sm:gap-5 sm:p-5 sm:pr-7"
            >
              <span className="font-display text-3xl leading-none font-medium text-purple sm:text-4xl">{trustpilot.score}</span>
              <span>
                <TrustpilotStars boxClassName="size-5" />
                <span className="mt-2 flex flex-wrap items-center gap-x-1.5 text-sm text-blackcurrant/70">
                  Excellent from {trustpilot.reviews} reviews on
                  <TrustpilotLogo className="text-sm" />
                </span>
              </span>
            </a>
          }
        />

        {/* Phones: a swipeable row that peeks the next story. Larger screens: a three-up grid. */}
        <div ref={rowRef}
        className="-mx-[clamp(20px,4vw,48px)] mt-7 flex snap-x snap-mandatory scroll-px-[clamp(20px,4vw,48px)] gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x touch-pan-y px-[clamp(20px,4vw,48px)] pb-1 [scrollbar-width:none] sm:mx-0 md:mt-10 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
          {videoReviews.map((video, i) => (
            <motion.a
              key={video.name}
              href={siteUrl('/customer-stories')}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="on-dark group relative isolate block aspect-[4/5] w-[84vw] max-w-[360px] shrink-0 snap-start sm:max-w-none overflow-hidden rounded-brand bg-blackcurrant sm:aspect-[3/4] sm:w-auto lg:aspect-[4/4.4]"
            >
              <img
                src={video.poster}
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blackcurrant/85 via-blackcurrant/10 to-transparent" />
              {/* Faint frosted play button centred on the poster, like a video thumbnail; firms up to lime on hover. */}
              <span className="absolute top-[42%] left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[16px] bg-white/20 text-white ring-1 ring-white/35 backdrop-blur-md transition-[background-color,color,transform,box-shadow] duration-300 ease-[var(--ease-brand)] group-hover:scale-110 group-hover:bg-lime group-hover:text-blackcurrant group-hover:ring-lime group-active:bg-lime group-active:text-blackcurrant sm:size-[72px] sm:rounded-[18px]">
                <Icon name="play" className="ml-1 size-7" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="font-display text-xl leading-tight font-medium sm:text-2xl">“{video.quote}”</p>
                <p className="mt-3 text-sm text-white/75">
                  <strong className="text-white">{video.name}</strong> · {video.detail}
                </p>
              </div>
              <span className="sr-only">Watch {video.name}’s story</span>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="mt-5 sm:mt-5">
        <MarqueeRow items={reviews} speed={32} />
      </div>

      <div className="container-cf mt-5 flex flex-wrap items-center justify-end gap-x-5 gap-y-3 text-right md:mt-8">
        <p className="font-display text-lg font-semibold md:text-xl">Join them with a quote in minutes</p>
        <Button href={quoteUrl} size="lg">
          Get my quote
        </Button>
      </div>

    </section>
  )
}
