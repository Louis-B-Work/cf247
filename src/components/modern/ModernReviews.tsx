import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'
import { reviews, trustpilot, videoReviews, type Review, type VideoReview } from '../../data/reviews'
import { cn, siteUrl } from '../../lib/utils'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { TrustpilotLogo, TrustpilotStars } from '../ui/Trustpilot'
import { ModernHeading, panel } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

function RatingPanel() {
  return (
    <a
      href={trustpilot.url}
      className={cn(
        // Hover keeps the card still: the outline and shadow deepen and a lime underline sweeps under "Excellent".
        'group flex items-center gap-5 bg-white px-5 py-4 shadow-[0_28px_70px_-48px_rgba(22,1,50,0.55)] ring-1 ring-purple/10 transition-shadow duration-500 ease-[var(--ease-brand)] hover:ring-2 hover:ring-purple/35 hover:shadow-[0_36px_85px_-50px_rgba(105,5,242,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple motion-reduce:transition-none sm:gap-6 sm:px-6',
        panel,
      )}
    >
      {/* A short horizontal strip: the score on the left, the rating details beside it, so the header row stays low. */}
      <p className="font-display text-[clamp(2.75rem,4vw,3.5rem)] leading-none font-medium tracking-[-0.06em] text-purple">
        {trustpilot.score}
      </p>
      <div className="min-w-0 border-l border-purple/10 pl-5 sm:pl-6">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-display text-lg font-semibold text-blackcurrant">
        <span className="bg-[linear-gradient(var(--color-lime),var(--color-lime))] bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-brand)] group-hover:bg-[length:100%_3px] group-focus-visible:bg-[length:100%_3px]">
          Excellent
        </span>
        <TrustpilotStars boxClassName="size-5" />
      </p>
      <p className="mt-1.5 text-sm text-blackcurrant/65">
        {trustpilot.reviews} reviews on <TrustpilotLogo className="text-sm" />
      </p>
      </div>
    </a>
  )
}

type ReviewItem = { review: Review; tone: 'white' | 'purple' }
type Column = { video: VideoReview; videoAt: 'top' | 'bottom'; reviews: ReviewItem[] }

/**
 * Each column pairs one video story, which stays still, with a stream of written reviews that scrolls beside it.
 * The middle column puts its video at the bottom so the three videos stagger across the wall.
 */
function buildColumns(): Column[] {
  const r = (name: string, tone: 'white' | 'purple' = 'white'): ReviewItem => ({
    review: reviews.find((x) => x.name === name) ?? reviews[0],
    tone,
  })
  const [craig, aimee, terri] = videoReviews
  return [
    { video: craig, videoAt: 'top', reviews: [r('Molly'), r('Rich Mills', 'purple'), r('GF'), r('MI')] },
    { video: aimee, videoAt: 'bottom', reviews: [r('Jack'), r('GM'), r('MM', 'purple'), r('DM'), r('SA')] },
    { video: terri, videoAt: 'top', reviews: [r('Harjinder', 'purple'), r('DA'), r('Sal Munir'), r('RB'), r('andy')] },
  ]
}

/**
 * A stream of reviews scrolling upwards (or downwards) on a loop. The reviews are rendered twice so the loop is
 * seamless; the copy is inert so it isn't read or tabbed to twice.
 */
function ReviewStream({
  items,
  duration,
  reverse,
  className,
  reducedPad,
}: {
  items: ReviewItem[]
  duration: number
  reverse?: boolean
  className?: string
  /** With reduced motion the stream is scrolled by hand, so the part hidden under the video gets padding instead. */
  reducedPad?: string
}) {
  const reduce = useReducedMotion()
  const set = (copy: boolean) => (
    <ul className="flex flex-col gap-4 pb-4 lg:gap-5 lg:pb-5" {...(copy ? { inert: true, 'aria-hidden': true } : {})}>
      {items.map((item) => (
        <li key={item.review.name}>
          <ReviewTile review={item.review} tone={item.tone} />
        </li>
      ))}
    </ul>
  )

  return (
    <div className={cn('overflow-hidden', reduce && 'overflow-y-auto [scrollbar-width:none]', className)}>
      <div
        className={cn(
          'review-column__track',
          !reduce && (reverse ? 'review-column__track--down' : 'review-column__track--up'),
          reduce && reducedPad,
        )}
        style={{ '--column-duration': `${duration}s` } as CSSProperties}
      >
        {set(false)}
        {!reduce && set(true)}
      </div>
    </div>
  )
}

/**
 * The video sits on top of the column and the review stream runs underneath it, starting from the video's midline,
 * so reviews slide in and out from behind the video with no gap.
 */
function WallColumn({ column, duration, reverse, className }: { column: Column; duration: number; reverse?: boolean; className?: string }) {
  const top = column.videoAt === 'top'
  return (
    <div className={cn('relative h-full min-h-0 [--video-h:280px] sm:[--video-h:340px] lg:[--video-h:440px]', className)}>
      <ReviewStream
        items={column.reviews}
        duration={duration}
        reverse={reverse}
        className={cn(
          'absolute inset-x-0',
          top ? 'top-[calc(var(--video-h)/2)] bottom-0' : 'top-0 bottom-[calc(var(--video-h)/2)]',
        )}
        reducedPad={top ? 'pt-[calc(var(--video-h)/2+1rem)]' : 'pb-[calc(var(--video-h)/2)]'}
      />
      <div className={cn('absolute inset-x-0 z-10 h-[var(--video-h)]', top ? 'top-0' : 'bottom-0')}>
        <VideoTile video={column.video} className="h-full shadow-[0_24px_50px_-28px_rgba(22,1,50,0.7)]" />
      </div>
    </div>
  )
}

/** `compact` tightens the padding and spacing for the fixed-height phone carousel. */
function ReviewTile({ review, tone, className, compact }: { review: Review; tone: 'white' | 'purple'; className?: string; compact?: boolean }) {
  const dark = tone === 'purple'
  return (
    <figure
      className={cn(
        'flex flex-col',
        compact ? 'p-4' : 'p-5 sm:p-6',
        panel,
        dark ? 'on-dark bg-purple' : 'bg-white ring-1 ring-purple/10',
        className,
      )}
    >
      <TrustpilotStars boxClassName={compact ? 'size-[18px]' : 'size-[20px]'} />
      <blockquote
        className={cn(
          'font-display text-[clamp(1.05rem,1.2vw,1.2rem)] leading-snug font-medium tracking-[-0.01em]',
          compact ? 'mt-3' : 'mt-4',
          dark ? 'text-white' : 'text-blackcurrant',
        )}
      >
        {`\u201c${review.quote}\u201d`}
      </blockquote>
      <figcaption className={cn('mt-auto flex items-end justify-between gap-4 text-sm', compact ? 'pt-3' : 'pt-5')}>
        <span>
          <span className={cn('block font-display font-semibold', dark ? 'text-white' : 'text-blackcurrant')}>{review.name}</span>
          <span className={dark ? 'text-white/70' : 'text-blackcurrant/60'}>{review.detail}</span>
        </span>
        <TrustpilotLogo tone={dark ? 'light' : undefined} className="text-xs" />
      </figcaption>
    </figure>
  )
}

function VideoTile({ video, className }: { video: VideoReview; className?: string }) {
  return (
    <a
      href={siteUrl('/customer-stories')}
      className={cn('on-dark group relative isolate block overflow-hidden bg-blackcurrant', panel, className)}
    >
      <img
        src={video.poster}
        alt=""
        loading="lazy"
        style={{ objectPosition: video.objectPosition ?? '50% 0%' }}
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.05]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(22,1,50,0)_40%,rgba(22,1,50,0.88))]" />
      <span className="absolute top-[42%] left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-brand bg-white/20 text-white ring-1 ring-white/35 backdrop-blur-md transition-[background-color,color,transform] duration-300 ease-[var(--ease-brand)] group-hover:scale-110 group-hover:bg-lime group-hover:text-blackcurrant">
        <Icon name="play" className="ml-1 size-7" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="font-display text-[clamp(1.15rem,1.4vw,1.35rem)] leading-tight font-medium">{`\u201c${video.quote}\u201d`}</p>
        <p className="mt-3 text-sm text-white/75">
          <strong className="font-display text-white">{video.name}</strong> {`\u00b7 ${video.detail}`}
        </p>
      </div>
      <span className="sr-only">{`Watch ${video.name}\u2019s story`}</span>
    </a>
  )
}

/** Shared classes for the phone rows: a native horizontal scroller that runs to the screen edges. */
const phoneRow =
  '-mx-[var(--pad-wide)] flex gap-3 overflow-x-auto overscroll-x-contain px-[var(--pad-wide)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

/** Phone row cards share one width; videos are 350px tall and reviews a shorter fixed 256px. */
const phoneCard = 'flex w-[78vw] max-w-[320px] shrink-0 snap-start'

/**
 * Reviews short enough for the 256px phone card at the narrowest screen (320px). Longer ones stay on the
 * tablet and desktop wall only.
 */
const PHONE_REVIEWS = ['Molly', 'GF', 'MI', 'GM', 'SA', 'DA', 'RB']

/** Phones: the three video stories in a swipeable row, snapping card to card. */
function VideoRow({ videos }: { videos: VideoReview[] }) {
  return (
    <ul aria-label="Video stories" className={cn(phoneRow, 'snap-x snap-mandatory scroll-px-[var(--pad-wide)]')}>
      {videos.map((video) => (
        <li key={video.name} className={cn(phoneCard, 'h-[350px]')}>
          <VideoTile video={video} className="h-full w-full" />
        </li>
      ))}
    </ul>
  )
}

/** Phones: every written review in one swipeable row, snapping card to card. */
function ReviewRow({ items }: { items: ReviewItem[] }) {
  return (
    <ul aria-label="Customer reviews" className={cn(phoneRow, 'snap-x snap-mandatory scroll-px-[var(--pad-wide)]')}>
      {items
        .filter((item) => PHONE_REVIEWS.includes(item.review.name))
        .map((item) => (
        <li key={item.review.name} className={cn(phoneCard, 'h-[256px]')}>
          <ReviewTile review={item.review} tone={item.tone} className="h-full w-full" compact />
        </li>
      ))}
    </ul>
  )
}

export function ModernReviews() {
  const columns = buildColumns()

  return (
    <section aria-labelledby="reviews-title" className="bg-purple-10 pt-12 pb-14 md:pt-16 md:pb-20">
      <div className="container-xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
          <Reveal>
            <ModernHeading id="reviews-title">Making car finance simple for 500,000+ customers</ModernHeading>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            <RatingPanel />
          </motion.div>
        </div>

        {/*
          Three columns, each with a still video story and a stream of written reviews scrolling beside it
          (the middle stream runs downwards). A stream pauses while hovered so it can be read, and has hard edges.
          Tablets show two columns; phones get two horizontal rows instead (videos, then reviews).
        */}
        <style>
          {`
            @keyframes review-column-up { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(0, -50%, 0); } }
            @keyframes review-column-down { from { transform: translate3d(0, -50%, 0); } to { transform: translate3d(0, 0, 0); } }
            .review-column__track--up { animation: review-column-up var(--column-duration) linear infinite; }
            .review-column__track--down { animation: review-column-down var(--column-duration) linear infinite; }
            .review-wall > div:hover .review-column__track { animation-play-state: paused; }
          `}
        </style>
        <Reveal y={28} className="mt-10 md:mt-12">
          <div
            role="region"
            aria-label="Customer reviews and video stories"
            className="review-wall grid h-[720px] grid-cols-2 gap-4 max-sm:hidden lg:h-[820px] lg:grid-cols-3 lg:gap-5"
          >
            <WallColumn column={columns[0]} duration={40} />
            <WallColumn column={columns[1]} duration={48} reverse />
            <WallColumn column={columns[2]} duration={44} className="max-lg:hidden" />
          </div>

          <div role="region" aria-label="Customer reviews and video stories" className="space-y-4 sm:hidden">
            <VideoRow videos={columns.map((c) => c.video)} />
            <ReviewRow items={columns.flatMap((c) => c.reviews)} />
          </div>
        </Reveal>

        <a
          href={trustpilot.url}
          className="group mt-6 ml-auto flex w-fit items-center gap-2 font-display text-base font-semibold text-purple"
        >
          Read all {trustpilot.reviews} reviews on Trustpilot
          <Icon name="arrow" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
