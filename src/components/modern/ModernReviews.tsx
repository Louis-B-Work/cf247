import { motion } from 'motion/react'
import { useLayoutEffect, useRef } from 'react'
import { reviews, trustpilot, videoReviews, type Review, type VideoReview } from '../../data/reviews'
import { useDragScroll } from '../../lib/useDragScroll'
import { cn, siteUrl } from '../../lib/utils'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { Accent } from '../ui/Smile'
import { TrustpilotLogo, TrustpilotStars } from '../ui/Trustpilot'
import { ModernHeading, panel, swipeItem, SwipeRow } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

type Tone = 'white' | 'mint' | 'purple'
type Tile = { kind: 'video'; video: VideoReview } | { kind: 'review'; review: Review; tone: Tone }

const findReview = (name: string) => reviews.find((review) => review.name === name)!
const findVideo = (name: string) => videoReviews.find((video) => video.name === name)!

/** Mirrors the current homepage mosaic: outer columns lead with a video, the middle column with a review. */
const columns: Tile[][] = [
  [
    { kind: 'video', video: findVideo('Craig') },
    { kind: 'review', review: findReview('Molly'), tone: 'white' },
  ],
  [
    { kind: 'review', review: findReview('Jack'), tone: 'mint' },
    { kind: 'video', video: findVideo('Aimee') },
  ],
  [
    { kind: 'video', video: findVideo('Terri') },
    { kind: 'review', review: findReview('Harjinder'), tone: 'white' },
  ],
]

const gridReviewNames = new Set(columns.flat().flatMap((tile) => (tile.kind === 'review' ? [tile.review.name] : [])))

const mobileVideos = columns.flat().filter((tile) => tile.kind === 'video')
const mobileReviews = columns.flat().filter((tile) => tile.kind === 'review').sort((a, b) => Number(b.tone === 'mint') - Number(a.tone === 'mint'))
const mobileTiles: Tile[] = mobileVideos.flatMap((video, index) => [video, mobileReviews[index]])

function RatingPanel() {
  return (
    <a
      href={trustpilot.url}
      className={cn(
        'group flex items-center gap-5 bg-white px-5 py-4 shadow-[0_28px_70px_-48px_rgba(22,1,50,0.55)] ring-1 ring-purple/10 transition-shadow duration-500 ease-[var(--ease-brand)] hover:ring-2 hover:ring-purple/35 hover:shadow-[0_36px_85px_-50px_rgba(105,5,242,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple motion-reduce:transition-none sm:gap-6 sm:px-6',
        panel,
      )}
    >
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

function ReviewTile({ review, tone, size = 'sm', className }: { review: Review; tone: Tone; size?: 'sm' | 'lg'; className?: string }) {
  const dark = tone === 'purple'
  return (
    <figure
      className={cn(
        'flex flex-col p-5 sm:p-6',
        panel,
        dark ? 'on-dark bg-purple' : tone === 'mint' ? 'bg-[#dcf8ef]' : 'bg-white ring-1 ring-purple/10',
        className,
      )}
    >
      <TrustpilotStars boxClassName="size-[18px]" />
      <blockquote
        className={cn(
          'mt-3 font-display leading-snug font-semibold tracking-[-0.01em]',
          size === 'lg' ? 'text-[clamp(1.05rem,1.45vw,1.3rem)]' : 'text-[15px] font-medium',
          dark ? 'text-white' : 'text-blackcurrant',
        )}
      >
        {`\u201c${review.quote}\u201d`}
      </blockquote>
      <figcaption className="mt-auto flex items-end justify-between gap-4 pt-4 text-sm">
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
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(22,1,50,0)_45%,rgba(22,1,50,0.8))]" />
      <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blackcurrant/75 text-white transition-[background-color,color,transform] duration-300 ease-[var(--ease-brand)] group-hover:scale-110 group-hover:bg-lime group-hover:text-blackcurrant">
        <Icon name="play" className="ml-1 size-7" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="font-display text-[clamp(1.05rem,1.45vw,1.3rem)] leading-snug font-semibold">{`\u201c${video.quote}\u201d`}</p>
        <p className="mt-4 text-sm leading-snug">
          <strong className="block font-display text-white">{video.name}</strong>
          <span className="text-white/80">{video.detail}</span>
        </p>
      </div>
      <span className="sr-only">{`Watch ${video.name}\u2019s story`}</span>
    </a>
  )
}

const moreReviews = reviews.filter((review) => !gridReviewNames.has(review.name))

export function ModernReviews() {
  const moreRef = useRef<HTMLUListElement>(null)
  useDragScroll(moreRef)

  useLayoutEffect(() => {
    const row = moreRef.current
    if (!row) return
    row.scrollLeft = (row.scrollWidth - row.clientWidth) / 2
  }, [])

  return (
    <section aria-labelledby="reviews-title" className="bg-purple-10 pt-12 pb-14 md:pt-16 md:pb-20">
      <div className="container-xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
          <Reveal>
            <ModernHeading id="reviews-title">Making car finance <span className="whitespace-nowrap"><Accent>si</Accent>mple</span> for 500,000+ customers</ModernHeading>
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

        <Reveal y={28} className="mt-8 md:mt-12">
          {/* Phones: one swipeable row, alternating video and review. */}
          <SwipeRow as="ul" label="Customer video stories and reviews" className="md:hidden">
            {mobileTiles.map((tile) => (
              <li key={tile.kind === 'video' ? tile.video.name : tile.review.name} className={cn('h-[400px]', swipeItem)}>
                {tile.kind === 'video' ? (
                  <VideoTile video={tile.video} className="h-full" />
                ) : (
                  <ReviewTile review={tile.review} tone={tile.tone} size="lg" className="h-full" />
                )}
              </li>
            ))}
          </SwipeRow>

          <ul aria-label="Customer video stories and reviews" className="grid gap-4 max-md:hidden md:grid-cols-3 lg:gap-5">
            {columns.map((column, columnIndex) => (
              <li key={columnIndex} className="flex flex-col gap-4 lg:gap-5">
                {column.map((tile) =>
                  tile.kind === 'video' ? (
                    <VideoTile key={tile.video.name} video={tile.video} className="h-[380px] md:h-auto md:min-h-[340px] md:flex-1 lg:min-h-[400px]" />
                  ) : (
                    <ReviewTile
                      key={tile.review.name}
                      review={tile.review}
                      tone={tile.tone}
                      size="lg"
                      className="min-h-[240px] md:min-h-[265px]"
                    />
                  ),
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10 md:mt-12">
          <Reveal>
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-purple sm:text-2xl">More from our <span className="whitespace-nowrap"><Accent>cu</Accent>stomers</span></h3>
          </Reveal>
          <ul
            ref={moreRef}
            aria-label="More customer reviews"
            tabIndex={0}
            className="-mx-[var(--pad-wide)] mt-5 flex cursor-grab snap-x snap-mandatory scroll-px-[var(--pad-wide)] gap-3 overflow-x-auto overscroll-x-contain px-[var(--pad-wide)] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {moreReviews.map((review, index) => (
              <li key={review.name} className="h-[250px] w-[min(84vw,340px)] shrink-0 snap-start">
                <ReviewTile review={review} tone={index % 3 === 1 ? 'purple' : 'white'} className="h-full" />
              </li>
            ))}
          </ul>
        </div>

        <a
          href={trustpilot.url}
          className="group mt-4 ml-auto flex min-h-11 w-fit items-center gap-2 py-2 font-display text-base font-semibold text-purple max-sm:mr-auto"
        >
          <span>
            Read all <span className="max-sm:hidden">{trustpilot.reviews} </span>reviews on Trustpilot
          </span>
          <Icon name="arrow" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
