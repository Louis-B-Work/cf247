import { faqCategories } from './faqs'
import { guides } from './assets'
import { navItems, quoteUrl } from './nav'

export type SearchResult = {
  label: string
  href: string
  kind: 'Quote' | 'Page' | 'Guide' | 'Question'
}

/** The quote form, offered first whenever a search suggests the user is ready to apply. */
export const quoteResult: SearchResult = { label: 'Get my quote', href: quoteUrl, kind: 'Quote' }

/**
 * Word stems that signal intent to apply, matched against the start of each search term.
 * Strong intent puts the quote first; broad terms (which appear in most page titles) add it after the best match.
 */
const strongIntent = ['quote', 'apply', 'applic', 'started', 'eligib', 'approv', 'decision']
const broadIntent = ['finance', 'borrow', 'loan', 'afford', 'deal']

const stopWords = new Set(['how', 'much', 'can', 'i', 'a', 'an', 'the', 'my', 'do', 'does', 'is', 'it', 'to', 'for', 'of', 'what', 'will', 'me', 'get', 'on', 'with'])

const synonyms: Record<string, string[]> = {
  borrow: ['calculator'],
  afford: ['calculator'],
  repayments: ['calculator'],
  monthly: ['calculator'],
  hp: ['hire purchase'],
}

const pages: SearchResult[] = navItems.flatMap((item) =>
  item.columns.flatMap((col) =>
    col.links.map((link) => ({
      label: link.label,
      href: link.href,
      kind: link.href.includes('/guide/') ? ('Guide' as const) : ('Page' as const),
    })),
  ),
)

const guideResults: SearchResult[] = guides.map((g) => ({ label: g.title, href: g.href, kind: 'Guide' }))

const questions: SearchResult[] = faqCategories.flatMap((cat) =>
  cat.items.map((item) => ({ label: item.q, href: `#faq-${cat.id}`, kind: 'Question' as const })),
)

const index: SearchResult[] = Array.from(
  new Map([...pages, ...guideResults, ...questions].map((r) => [r.label.toLowerCase(), r])).values(),
)

/** Rolling ghost-text ideas shown in the empty hero search field. */
export const searchIdeas = [
  'Bad credit car finance',
  'How much can I borrow?',
  'PCP or HP?',
  'Refinance my car',
  'Electric car finance',
  'Will it affect my credit score?',
  'Van finance',
  'No deposit car finance',
]

export function searchSite(query: string, limit = 6): SearchResult[] {
  const q = query.toLowerCase().trim()
  const terms = q.split(/\s+/).filter(Boolean)
  if (!terms.length) return []

  const has = (stems: string[]) => stems.some((stem) => terms.some((t) => t.startsWith(stem)))

  // Ignore filler words when scoring, and let common phrasings reach the pages that answer them.
  const scoring = terms.filter((t) => !stopWords.has(t)).flatMap((t) => [t, ...(synonyms[t] ?? [])])
  if (!scoring.length) return has(strongIntent) || has(broadIntent) ? [quoteResult] : []

  const matches = index
    .map((r) => {
      const label = r.label.toLowerCase()
      const hits = scoring.filter((t) => label.includes(t)).length
      const starts = label.startsWith(scoring[0]) ? 1 : 0
      return { r, score: hits * 2 + starts }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.r)

  if (has(strongIntent)) return [quoteResult, ...matches].slice(0, limit)
  if (has(broadIntent)) return [...matches.slice(0, 1), quoteResult, ...matches.slice(1)].slice(0, limit)
  return matches.slice(0, limit)
}
