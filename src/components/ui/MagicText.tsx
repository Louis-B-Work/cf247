import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Accent, SmileMark } from './Smile'

type Token = {
  text: string
  accent: boolean
  /** Punctuation shown after the word, outside any highlight. */
  trail?: string
  /** Part of a [[highlighted phrase]]. */
  hl: boolean
  /** First word of a highlighted phrase. */
  hlStart: boolean
  /** Last word of a highlighted phrase (the highlight stops here instead of bridging to the next word). */
  hlEnd: boolean
}

/**
 * Splits copy into words. Wrap a word in *asterisks* to set it in the cursive accent,
 * and wrap a phrase in [[double brackets]] to sweep a lime highlighter behind it.
 */
function tokenise(copy: string): Token[] {
  let inHl = false
  return copy
    .split(/\s+/)
    .filter(Boolean)
    .map((raw) => {
      let word = raw
      let hlStart = false
      if (word.startsWith('[[')) {
        inHl = true
        hlStart = true
        word = word.slice(2)
      }
      const hl = inHl
      let hlEnd = false
      let trail = ''
      const close = word.match(/^(.*)\]\]([.,!?]?)$/)
      if (close) {
        word = close[1]
        trail = close[2]
        hlEnd = true
        inHl = false
      }
      const accent = word.match(/^\*(.+)\*([.,!?]?)$/)
      if (accent) return { text: accent[1], accent: true, trail: accent[2] + trail, hl, hlStart, hlEnd }
      return { text: word, accent: false, trail, hl, hlStart, hlEnd }
    })
}

/** The word itself, with the lime highlighter behind it when it belongs to a highlighted phrase. */
function WordText({ token, sweep }: { token: Token; sweep?: MotionValue<number> }) {
  const text = token.accent ? <Accent>{token.text}</Accent> : token.text
  if (!token.hl) return <>{text}</>
  return (
    <span className="relative isolate text-blackcurrant">
      <motion.span
        aria-hidden
        style={sweep ? { scaleX: sweep } : undefined}
        className={cn(
          'absolute top-[0.1em] bottom-[0.02em] -z-10 origin-left bg-lime',
          // Only the outer ends of a phrase are rounded, and each word bridges the gap to the next,
          // so a phrase reads as one continuous highlight with no notches between words.
          token.hlStart ? '-left-[0.12em] rounded-l-[0.14em]' : '-left-[0.02em]',
          // When punctuation follows the phrase, the highlight stops at the word so the comma or full stop sits on white.
          token.hlEnd ? (token.trail ? '-right-[0.02em] rounded-r-[0.14em]' : '-right-[0.12em] rounded-r-[0.14em]') : '-right-[0.27em]',
        )}
      />
      {text}
    </span>
  )
}

type WordProps = {
  token: Token
  progress: MotionValue<number>
  range: [number, number]
  smile?: ReactNode
}

function Word({ token, progress, range, smile }: WordProps) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const sweep = useTransform(progress, range, [0, 1])

  return (
    <span className="mr-[0.25em] inline-block whitespace-nowrap">
      <motion.span style={{ opacity }} className="inline-block">
        <WordText token={token} sweep={sweep} />
        {/* Positioned so punctuation paints above the highlight that runs just past the word. */}
        {token.trail && <span className="relative">{token.trail}</span>}
      </motion.span>
      {smile}
    </span>
  )
}
const MARK_TONE = 'purple' as const
const MARK_SIZE = 0.6

/** Logo mark whose circle scales in and whose smile draws, both driven by scroll. */
function ScrollSmile({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const [start, end] = range
  const split = start + (end - start) * 0.45
  const scale = useTransform(progress, [start, split], [0, 1])
  const draw = useTransform(progress, [split, end], [0, 1])
  return <SmileMark tone={MARK_TONE} size={MARK_SIZE} scroll={{ scale, draw }} />
}

function StaticSmile() {
  return <SmileMark tone={MARK_TONE} size={MARK_SIZE} />
}

/** Share of the scroll used by the words; the rest brings in the closing mark. */
const WORDS_END = 0.85

type MagicTextProps = {
  copy: string
  className?: string
}

/**
 * Scroll-linked text reveal modelled on the 21st.dev Magic Text component:
 * each word brightens from a faint ghost as the paragraph moves up the viewport.
 * It only plays once per page load: scrolling back up never dims the words again, and a refresh starts it afresh.
 */
export function MagicText({ copy, className }: MagicTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const tokens = tokenise(copy)
  // Reveal runs from the paragraph's top entering low in the viewport until its bottom reaches the upper third.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'end 0.3'] })
  // High-water mark of the scroll progress, so the reveal moves forwards only.
  const revealed = useMotionValue(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > revealed.get()) revealed.set(v)
  })

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {tokens.map((t, i) => (
          <span key={i} className="relative mr-[0.25em] inline-block">
            <WordText token={t} />
            {t.trail}
            {i === tokens.length - 1 && <StaticSmile />}
          </span>
        ))}
      </p>
    )
  }

  const step = WORDS_END / tokens.length

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{copy.replace(/\*|\[\[|\]\]/g, '')}</span>
      <span aria-hidden>
        {tokens.map((token, i) => (
          <Word
            key={i}
            token={token}
            progress={revealed}
            range={[i * step, (i + 1) * step]}
            smile={
              i === tokens.length - 1 ? <ScrollSmile progress={revealed} range={[WORDS_END, 1]} /> : undefined
            }
          />
        ))}
      </span>
    </p>
  )
}
