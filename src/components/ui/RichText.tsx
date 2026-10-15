import { Fragment } from 'react'

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

/** Renders plain text, turning [label](url) into links. Used for copy that must keep the live site's inline links. */
export function RichText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const parts: Array<string | { label: string; href: string }> = []
  let last = 0
  for (const m of text.matchAll(LINK)) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push({ label: m[1], href: m[2] })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))

  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <a key={i} href={p.href} className={linkClassName ?? 'font-semibold text-purple underline decoration-purple-30 decoration-2 underline-offset-4 transition-colors hover:decoration-lime'}>
            {p.label}
          </a>
        ),
      )}
    </>
  )
}
