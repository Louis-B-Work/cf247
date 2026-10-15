import { motion } from 'motion/react'
import { guides, type Guide } from '../../data/assets'
import { cn, siteUrl } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { Accent } from '../ui/Smile'

const ease = [0.22, 1, 0.36, 1] as const

/** Lime underline that draws in under a title when its card is hovered. */
const limeUnderline =
  'bg-[linear-gradient(var(--color-lime),var(--color-lime))] bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-500 ease-[var(--ease-brand)] group-hover:bg-[length:100%_3px] group-focus-visible:bg-[length:100%_3px]'

function ArrowChip({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid shrink-0 place-items-center rounded-inner transition-[background-color,color,transform] duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1 group-hover:bg-lime group-hover:text-blackcurrant group-active:bg-lime group-active:text-blackcurrant',
        light ? 'bg-white text-purple' : 'bg-purple text-white',
        className,
      )}
    >
      <Icon name="arrow" className="size-[45%]" />
    </span>
  )
}

/** Large guide with its copy set on the photo, following the brand guidance for text on imagery. */
function FeaturedGuide({ guide }: { guide: Guide }) {
  return (
    <a
      href={guide.href}
      className="on-dark group relative isolate flex min-h-[360px] h-full flex-col justify-end overflow-hidden rounded-brand bg-blackcurrant p-6 [-webkit-tap-highlight-color:transparent] sm:aspect-[16/11] sm:min-h-0 md:p-9 lg:aspect-auto lg:min-h-[500px] design-modern:lg:min-h-[420px] design-modern:md:p-8"
    >
      <img
        src={guide.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(22,1,50,0.92)_0%,rgba(22,1,50,0.6)_38%,rgba(22,1,50,0)_68%)]"
      />
      <span className="text-xs text-white/75">{guide.readTime} min read</span>
      <h3 className="mt-2 max-w-[22ch] text-[1.7rem] leading-[var(--leading-title)] font-medium tracking-[-0.02em] md:text-[2.4rem] design-modern:md:text-[2rem]">
        <span className={limeUnderline}>{guide.title}</span>
      </h3>
      {guide.excerpt && (
        <p className="mt-3 max-w-lg text-base leading-relaxed text-white/80">{guide.excerpt}</p>
      )}
      <span className="mt-6 flex items-center gap-3 font-display font-semibold">
        <ArrowChip className="size-11" light />
        Read guide
      </span>
    </a>
  )
}
function CompactGuide({ guide }: { guide: Guide }) {
  return (
    <a
      href={guide.href}
      className="group flex items-center gap-4 rounded-brand bg-purple-10 p-5 transition-[background-color,box-shadow] duration-300 [-webkit-tap-highlight-color:transparent] active:bg-purple-30 sm:gap-5 sm:bg-transparent sm:p-3 sm:hover:bg-purple-10"
    >
      <div className="size-20 shrink-0 overflow-hidden rounded-inner bg-purple-30 sm:h-28 sm:w-36">
        <img
          src={guide.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.06]"
        />
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-xs text-blackcurrant/55">{guide.readTime} min read</span>
        <h3 className="mt-1 text-base leading-snug font-semibold sm:text-lg">
          <span className={limeUnderline}>{guide.title}</span>
        </h3>
      </div>
      <ArrowChip className="hidden size-10 sm:grid" />
    </a>
  )
}

export function Guides() {
  const [featured, ...rest] = guides
  return (
    <section aria-labelledby="guides-title" className="bg-white py-14 md:py-20 design-modern:py-14 design-modern:md:py-20">
      <div className="container-cf">
        <SectionHeading
          id="guides-title"
          title={
            <>
              Featured <Accent>guides</Accent>
            </>
          }
          intro="Straightforward answers on credit, finance types and choosing your next car."
        />

        {/* Editorial layout: one large guide, with the rest stacked beside it on desktop and below it on phones. */}
        <div className="mt-7 grid grid-cols-1 gap-4 md:mt-10 lg:grid-cols-12 lg:gap-6">
          <motion.div
            className="lg:col-span-7 lg:h-full"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
          >
            <FeaturedGuide guide={featured} />
          </motion.div>

          <ul className="flex flex-col gap-3 sm:gap-0 sm:divide-y sm:divide-purple-10 lg:col-span-5">
            {rest.map((guide, i) => (
              <motion.li
                key={guide.title}
                className="sm:py-1.5 sm:first:pt-0 lg:flex lg:flex-1 lg:flex-col lg:justify-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.08 }}
              >
                <CompactGuide guide={guide} />
              </motion.li>
            ))}
            <li className="hidden pt-3 lg:block">
              <a
                href={siteUrl('/guides')}
                className="group flex items-center justify-between rounded-brand px-3 py-2 font-display font-semibold text-purple"
              >
                <span className={limeUnderline}>Browse all help & guides</span>
                <Icon name="arrow" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-7 lg:hidden">
          <Button href={siteUrl('/guides')} variant="outline-dark" size="md">
            Explore all guides
          </Button>
        </div>
      </div>
    </section>
  )
}