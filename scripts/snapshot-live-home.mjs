/**
 * Snapshots the live homepage (www.carfinance247.co.uk) for the settings cog's "Homepage content: Exact replica".
 *
 * The A/B test swaps fonts and colours only, so the replica is the live page's own markup, CSS and behaviour scripts,
 * re-skinned in src/components/live/live-overrides.css. Run `npm run live:snapshot` to refresh it when the live page changes.
 *
 * Writes into src/components/live/:
 *   live-home.html       header, main content and footer, cleaned of scripts, styles and tracking
 *   live-replica.css     the live CSS (stylesheets + inline <style> blocks) for classes the markup uses, scoped under .live-replica
 *   live-behaviour.js    the live page's own menu, hero budget, FAQ and video scripts
 */
import { mkdir, writeFile } from 'node:fs/promises'
import postcss from 'postcss'

const ORIGIN = 'https://www.carfinance247.co.uk'
const OUT = new URL('../src/components/live/', import.meta.url)

const get = async (url) => {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } })
  if (!res.ok) throw new Error(`${url}: ${res.status}`)
  return res.text()
}

const html = await get(`${ORIGIN}/`)

// ---------- Markup ----------
const mainStart = html.indexOf('<main id="main-content"')
const footerStart = html.indexOf('<footer')
const footerEnd = html.indexOf('</footer>') + '</footer>'.length
const mainEnd = html.lastIndexOf('</main>', footerStart)
if ([mainStart, footerStart, footerEnd, mainEnd].some((i) => i < 0)) throw new Error('Live page structure changed')

let inner = html.slice(html.indexOf('>', mainStart) + 1, mainEnd)
// The hero text block is a second <main>; make it a div so the page has one landmark.
inner = inner.replace(/<main class="header-text-content/, '<div class="header-text-content').replace('</main>', '</div>')

// SVG sprite the markup's <use href="#..."> icons point at.
const spriteStart = html.indexOf('<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">')
const spriteEnd = html.indexOf('</svg>', html.lastIndexOf('</symbol>', mainStart)) + '</svg>'.length
const sprite = html.slice(spriteStart, spriteEnd)

const reviews = html.match(/id="tp-total">(\d+)</)?.[1]
const score = html.match(/<\/strong> customers [^<]*<strong>([\d.]+)<\/strong>/)?.[1]
if (!reviews || !score) throw new Error('Trustpilot numbers not found')
const reviewCount = Number(reviews).toLocaleString('en-GB')
const tpProfile = 'https://uk.trustpilot.com/review/carfinance247.co.uk'
const tpStars = (id) =>
  `<div class="tp-widget-stars" id="tp-widget-stars"><div class="tp-stars tp-stars--5"><div style="position: relative; height: 0px; width: 100%; padding: 0px 0px 18.3267%;"><svg width="106" height="20" aria-hidden="true" focusable="false" id="${id}" style="fill: rgb(105, 5, 242); position: absolute; height: 100%; width: 100%; left: 0px; top: 0px;"><use href="#trustpilot-stars"></use></svg></div></div></div>`
const tpLogo = (svgSize) =>
  `<div class="tp-widget-logo" id="tp-widget-logo"><div style="position: relative; height: 0px; width: 100%; padding: 0px 0px 24.6032%;"><svg ${svgSize} aria-hidden="true" focusable="false" id="trustpilot-light" style="fill: rgb(255, 255, 255); position: absolute; height: 100%; width: 100%; left: 0px; top: 0px;"><use href="#trustpilot-logo"></use></svg></div></div>`
// The Trustpilot widgets render client-side; these are their rendered output.
const tpHero = `<div class="w-full mt-4"><div class="trustpilot-widget-carousel"><a id="profile-link" target="_blank" href="${tpProfile}" rel="noopener noreferrer">${tpLogo('width="110" height="27.06"')}${tpStars('stars-1')}<div class="tp-widget-businessinfo text-white" id="tp-widget-businessinfo"><div class="tp-widget-businessinfo__trustscore"><span>TrustScore </span><strong>${score}</strong><span class="divider">|</span></div><div class="tp-widget-businessinfo__total"><span class="bold-underline"><strong>${reviewCount} reviews</strong></span></div></div></a></div></div>`
const tpFooter = `<div class="w-full" id="footer"><div class="trustpilot-widget-mini"><div class="tp-widget-wrapper visible" id="tp-widget-wrapper"><a class="tp-widget-profile-link" id="profile-link" target="_blank" href="${tpProfile}" rel="noopener noreferrer"><span class="tp-widget-logo" id="tp-widget-logo" style="margin: 0px 0px 8px;"><div><div style="position: relative; height: 0px; width: 100%; padding: 0px 0px 24.6032%;"><svg width="100%" height="100%" aria-hidden="true" focusable="false" id="trustpilot-light" style="fill: rgb(255, 255, 255); position: absolute; left: 0px; top: 0px;"><use href="#trustpilot-logo"></use></svg></div></div></span>${tpStars('stars-3')}<div class="tp-widget-businessinfo text-white" id="tp-widget-businessinfo"><span class="tp-widget-businessinfo__trustscore"><span>TrustScore </span><strong>${score}</strong><span class="divider">|</span></span><span class="tp-widget-businessinfo__total"><span class="bold-underline"><strong>${reviewCount}</strong><span> reviews</span></span></span></div></a></div></div></div>`

let markup = `${sprite}\n${inner}\n${html.slice(footerStart, footerEnd)}`
markup = markup
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<noscript[\s\S]*?<\/noscript>/g, '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/ sg_el_i="[^"]*"/g, '')
  .replace(/<trustpilot-component widget="mini-carousel"[^>]*><\/trustpilot-component>/, tpHero)
  .replace(/<trustpilot-component widget="mini"[^>]*><\/trustpilot-component>/, tpFooter)
// The Trustpilot review slider is a TrustBox iframe, embedded the way the live page's widget script does.
markup = markup.replace(/<div class="trustpilot-widget"([^>]*)>[\s\S]*?<\/div>/, (_, attrs) => {
  const a = (name) => attrs.match(new RegExp(`data-${name}="([^"]*)"`))?.[1] ?? ''
  const src = `https://widget.trustpilot.com/trustboxes/${a('template-id')}/index.html?templateId=${a('template-id')}&businessunitId=${a('businessunit-id')}#locale=${a('locale')}&styleHeight=${a('style-height')}&styleWidth=100%25&token=${a('token')}&stars=${encodeURIComponent(a('stars'))}&reviewLanguages=${a('review-languages')}`
  return `<div class="trustpilot-widget" style="width: 100%; position: relative;"><iframe title="Customer reviews powered by Trustpilot" loading="lazy" src="${src}" style="position: relative; height: ${a('style-height')}; width: 100%; border-style: none; display: block; overflow: hidden;"></iframe></div>`
})
// Keep only the sprite icons the markup (or the menu script's cfIconSvg / #menu / #close swaps) references.
const iconIds = new Set([...markup.matchAll(/<use href="#([^"]+)"/g)].map((m) => m[1]))
for (const m of html.matchAll(/cfIconSvg\('([^']+)'|'#([a-z-]+)'/g)) iconIds.add(m[1] ?? m[2])
markup = markup.replace(/<symbol id="([^"]*)"[\s\S]*?<\/symbol>/g, (symbol, id) => (iconIds.has(id) ? symbol : ''))
// Relative links and images point at the live site.
markup = markup.replace(/(href|src|srcset)="\/(?!\/)/g, `$1="${ORIGIN}/`)
if (/<script|trustpilot-component/.test(markup)) throw new Error('Unexpected leftover in markup')

// ---------- Behaviour ----------
// The page's own first-party scripts for the menus, hero budget, video lightbox, review swipe row and FAQ accordion.
const scripts = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1])
const pick = (needle) => {
  const s = scripts.find((t) => t.includes(needle))
  if (!s) throw new Error(`Live script not found: ${needle}`)
  return s
}
const behaviour = [
  pick('CF247_MENU'),
  pick("getElementById('hero-budget-btn')"),
  pick("getElementById('youtube-lightbox')"),
  pick("querySelectorAll('.faq-btn')"),
]
  // Menu links are built from window.location.origin; they should point at the live site.
  .map((s) => s.replaceAll('window.location.origin', JSON.stringify(ORIGIN)))

// ---------- CSS ----------
// Keep the rules for classes the markup uses, including ones the scripts add (the mobile menu) and the Trustpilot widgets
// (rendered client-side on the live page, so written out above).
const used = new Set()
for (const m of markup.matchAll(/class="([^"]*)"/g)) for (const t of m[1].split(/\s+/)) if (t) used.add(t)
for (const s of behaviour) for (const m of s.matchAll(/'([^'\n]*)'/g)) for (const t of m[1].split(/\s+/)) if (t) used.add(t)
const unesc = (s) => s.replace(/\\(.)/g, '$1')
const classRe = /\.((?:\\.|[\w-])+)/g
const TRUSTPILOT_SCOPE = '[data-v-75488265]'
const keepSel = (sel) => {
  if (/\[data-v-/.test(sel) && !sel.includes(TRUSTPILOT_SCOPE)) return false
  if (/::backdrop|\[data-theme=/.test(sel)) return false
  for (const m of sel.replaceAll(TRUSTPILOT_SCOPE, '').matchAll(classRe)) if (!used.has(unesc(m[1]))) return false
  return true
}
const scope = (sel) => {
  sel = sel.replaceAll(TRUSTPILOT_SCOPE, '').trim()
  if (/^(html|body|:root|:host)\b/.test(sel)) return sel.replace(/^(html|body|:root|:host)\b/, '.live-replica')
  return `.live-replica ${sel}`
}
const sheets = [...html.matchAll(/<link rel="stylesheet" href="([^"]+\.css)"/g)].map((m) => new URL(m[1], ORIGIN).href)
let css = ''
for (const href of sheets) {
  const root = postcss.parse(await get(href))
  // The live fonts (Helvetica Neue files, an Inter webfont import) are swapped for Aeonik, so neither is wanted.
  root.walkAtRules(/^(font-face|import)$/, (a) => a.remove())
  root.walkRules((r) => {
    if (r.parent?.type === 'atrule' && /keyframes/.test(r.parent.name)) return
    const keep = r.selectors.filter(keepSel)
    if (!keep.length) return r.remove()
    r.selectors = keep.map(scope)
  })
  root.walkAtRules((a) => {
    if (a.nodes && !a.nodes.length) a.remove()
  })
  css += `/* ---- ${href.split('/').pop()} ---- */\n${root}\n`
}
// The page's own inline <style> blocks (header, hero circles, quick links, testimonials, cards, guides, FAQ, footer, final CTA).
// The block with the live font-face rules (body font fallback) and the video wrapper block are not needed.
for (const [i, m] of [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].entries()) {
  const text = m[1]
  if (text.includes('@font-face')) continue
  if (!/#cf247-header|\.background|\.apr-component|#quick-links|\.tm-|#card-trio|\.featured-guides|\.faq-|\.qf-|footer a/.test(text)) continue
  const root = postcss.parse(text)
  root.walkRules((r) => {
    if (r.parent?.type === 'atrule' && /keyframes/.test(r.parent.name)) return
    r.selectors = r.selectors.map(scope)
  })
  css += `/* ---- inline style ${i} ---- */\n${root}\n`
}
// Fonts follow the cog (Aeonik): the live Helvetica Neue stack becomes our body font stack.
css = css.replace(/Helvetica Neue,\s*Helvetica Neue Custom,\s*Arial,\s*sans-serif/g, 'var(--font-body)')

const behaviourJs = `// Generated by scripts/snapshot-live-home.mjs. First-party scripts from ${ORIGIN}; each is wrapped in its own function.\nexport default [\n${behaviour.map((s) => `  function () {\n${s}\n  },`).join('\n')}\n]\n`

await mkdir(OUT, { recursive: true })
await writeFile(new URL('live-home.html', OUT), markup)
await writeFile(new URL('live-replica.css', OUT), css)
await writeFile(new URL('live-behaviour.js', OUT), behaviourJs)
console.log(`live-home.html ${markup.length}B, live-replica.css ${css.length}B, live-behaviour.js ${behaviourJs.length}B`)
