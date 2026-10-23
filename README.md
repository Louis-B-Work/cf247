# Car Finance 247 homepage mockup

An interactive mockup of the carfinance247.co.uk homepage, rebuilt to the 2026 brand guidelines (CF247 Guidelines_DRAFT2).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and production build
npm run lint
```

## Share it on GitHub Pages

The `main` branch is deployed automatically by GitHub Actions to
<https://louis-b-work.github.io/cf247/> after each push. To enable the first deployment,
open the repository's **Settings → Pages** and set the build and deployment source to
**GitHub Actions**. The homepage is at `/cf247/`, and the refinance page is at
`/cf247/landing-page/`.

## Brand fonts

Neulis Neue is an Adobe Font used for headings and accent words. The Adobe Fonts web-project ID is configured in `src/lib/fonts.ts` (`kvt3yqx`); `VITE_TYPEKIT_ID` can override it. The CSS family must be `neulis-neue` (the Adobe default). Body copy uses Aeonik (see the Settings cog section) with Helvetica Neue and Arial as fallbacks.

### Settings cog

The always-visible cog in the bottom-left opens a menu to jump between the **Homepage** and the **Refinance landing** page, switch the homepage between the **Redesign** and **Exact replica** (the live site's own layout, copy and behaviour with only the fonts and colours swapped; see below), and choose the **Heading weight** (300, 400, 500, 600, 700 or 900, the Aeonik weights that suit headings; there is no 800; paragraph weights are not affected) and **Heading letter-spacing** (-0.03em to +0.02em in 0.01em steps; 0 is the font's natural spacing and the default). Headings and body text are always set in **Aeonik** (CoType Foundry trial fonts in `public/fonts/aeonik`. The trial licence is for evaluation only and does not allow transferring the font files without CoType's written consent; they are committed to this public repo and deployed at the owner's request and risk, and should be replaced by licensed web fonts, or removed, before any real launch; the headings' built-in Neulis-tuned tracking is replaced by the cog's letter-spacing option, as it squashes Aeonik). The other heading fonts (Neulis, Inter Display, Neue Haas) and the Neulis Cursive accents have been removed from the cog, and cursive accents are always off. CTA buttons are always green (`html[data-cta-color='green']`, set in the startup scripts). The site opens on the **homepage, Redesign content, Aeonik 700 headings**; a one-off `cf247-preset` flag in the startup scripts (`index.html` and `landing-page/index.html`) applies the Redesign content even for visitors who saved other choices earlier. Later choices are saved in the browser. The overrides live in `src/index.css` under `html[data-heading-font=...]`, `html[data-weight=...]`, `html[data-tracking=...]` and `html[data-cta-color=...]`.

On the first load of each browser session, a welcome overlay (`src/components/layout/CogIntro.tsx`) dims the page and points at the cog, explaining each option (the Homepage content option only on the homepage). **Show me the cog** opens it, and **Got it**, Escape or clicking the backdrop close it. It stays closed on reloads until the browser session ends.

The homepage defaults to the **Modern** design. The earlier Classic design and other test options remain in the source for future use, but are not currently shown in the cog. The Modern homepage includes a members-area app promotion and phone preview; its store links are shared with the footer via `src/data/appLinks.ts`.

**Homepage content: Exact replica** is for the first A/B test, where fonts and colours are the only things swapped on the live carfinance247.co.uk homepage. It is a snapshot of the live page itself, not a rebuild, so layout, spacing, copy, images, links and behaviour (header menus and mobile drawer, hero budget box, FAQ accordion, video lightbox, review swipe row) are the live page's own, at every screen size:

- `npm run live:snapshot` (`scripts/snapshot-live-home.mjs`) fetches the live page and writes `src/components/live/live-home.html` (header, content and footer, cleaned of scripts and tracking), `live-replica.css` (the live CSS for the classes used, scoped under `.live-replica`) and `live-behaviour.js` (the live page's own menu, budget, FAQ and video scripts). Re-run it when the live page changes; nothing in those three files is edited by hand. The Trustpilot review slider is Trustpilot's own embedded widget, as on the live page, so it keeps Trustpilot's fonts and colours.
- `src/components/live/live-overrides.css` is the whole list of differences: Aeonik for text (headings follow the cog's weight and letter-spacing), the live teal (buttons, the open mobile menu, the pale teal review card) becomes the cog's green, and the live near-black becomes blackcurrant. It also switches off the new site's smooth scrolling and heading text balancing, which the live page doesn't have. Edit this file to change the A/B variant's palette.
- `src/components/live/LiveSite.tsx` renders it (replacing the app's own nav and footer in this mode) and starts the behaviour scripts. The page title and meta description match the live page (`src/data/liveHome.ts`).

The cursive toggle also previews two-letter accents in the Modern situations, reviews and members-app headings, allowing comparisons across different sizes and backgrounds without setting entire headings in cursive.

Most customers visit on mobile, so the Modern homepage is tuned for phones first. Below the `md` breakpoint, the Quote / Buy / Drive away steps stack as full-width image cards (a shorter version of the desktop cards), Situations use a stacked grid, customer stories use a single swipeable row of three videos starting on the middle video (without the desktop mosaic's written cards), and the FAQ shows one topic at a time behind tabs (`<Faq mobileTabs />`). Both the videos and "More from our customers" review row support swiping, dragging and keyboard scrolling without a visible scrollbar. Mobile tweaks to sections shared with Classic (FAQ and footer) use the `design-modern:` variant, and Steps reads the design option directly, so Classic is unchanged.

On touch devices there is no scroll-triggered hover. Instead, a tap shows the full hover change (lime flood, arrow slide, colours) almost instantly and holds it for a moment after release, so it is visible before the next page loads. Each standalone **Get my quote** button also plays its hover animation once, the first time it is fully on screen (`attention` prop on `Button`, see `src/lib/buttonFeedback.ts`); nav, mobile-menu and whole-card CTAs are excluded. Both are skipped with reduced motion, and desktop hover is unchanged. In the Modern hero, the Get my quote button switches to its hover state once a monthly budget is typed, and reverts if the box is cleared.

## Design tokens

All tokens live in [`src/index.css`](src/index.css):

| Token | Value | Use |
| --- | --- | --- |
| `--color-purple` | `#6905F2` | Lead colour, primary CTAs on white |
| `--color-purple-80/60/40/30/10` | tints | Used as solid colours only (no gradients): tint 10 for card surfaces and the reviews and FAQ bands, tint 30 for card borders and image placeholders, tint 80 for the Personal value card |
| `--color-blackcurrant` | `#160132` | Text, dark bands, footer |
| `--color-lime` | `#8EF205` | Accent only: hover fills, smile arc, progress bar, stars |
| `--color-progress` | lime | Scroll progress bar; set to `white` for the white variant |
| `--radius-brand` | `16px` | Every card, panel, button, input and image |
| `--radius-inner` | `10px` | Small icon tiles, chips and arrow boxes nested inside a card or button |

Lime is still being decided, so every use reads from `--color-lime` and can be retuned in one place. The cog's **Green** option switches it between the three candidates for testing: *Original* `#8EF205`, *Option 1* `#CCFF4A` and *Option 2* `#00EB52` (set by `html[data-green]` in `src/index.css`, on both the homepage and the landing page). Lime is never used as body text on white.

## Where things are

- `src/components/brand/Logo.tsx`: brand logo built from the official glyphs, with a `stacked` (three line) and `inline` (one line, used in the nav from tablet up) variant
- `src/components/layout`: sticky nav with hover mega menus, scroll progress bar, branching mobile menu, footer (with app badges and social links). The redesign's menus are the live site's Car Finance, Bad Credit, Car Finance Calculator and Help & Guides menus (shared with the Exact replica option in `src/data/liveHome.ts`), each with a promo card, plus the redesign's own Team247 menu. The full bar shows from 1160px (the `nav` breakpoint in `src/index.css`); below that the menu button is used.
- `src/components/sections`: one file per homepage section
- `src/components/ui`: `Button` (a solid rounded-square button with a medium-weight left label and a square arrow chip on the right; the whole button floods lime on hover or press; nav items use a lime underline instead), `Accent` (cursive word) and `EndSmile` (the logo smiley mark at the end of headings, with a `tone` and `size` per heading), `MagicText` (scroll-linked word reveal), `PullOut` (smile hooked under key words, per guidelines p.24), `Reveal`, brand `Icon` set (traced from the brand icon sheet into `src/components/ui/iconPaths.ts`, so shapes and highlight cut-outs match the designs; chevron, close, menu, plus, star, play and the diagonal arrow are interface glyphs drawn to match), `TrustpilotStars` / `TrustpilotLogo` (official green star boxes and wordmark), `BrandIcon` (social and app store marks from Simple Icons)
- `src/data`: nav, FAQs, Trustpilot reviews, search index, image choices and credits

## Content and imagery notes

- Reviews are taken from the public Trustpilot page and the current homepage, lightly trimmed.
- Lifestyle photos are free Unsplash images chosen against the imagery guidance (pages 27 to 32): candid, warm, no eye contact, with a quiet zone for text. Photographer details are kept in `src/data/images.ts`. Alternates are listed for each slot.
- Step images, guide images, partner logos, the founders photo and the hero car are loaded from the live site for the mockup.
- Search is switched off for now: `StickySearch` is no longer mounted in `src/App.tsx`, but the component is kept so it can come back. It uses a static index of nav pages, guides and FAQs, with no backend. When on, it lives behind a bare lime magnifier in the bottom-right corner (no box, on every screen size) that shows from page load and hides near the final CTA and footer. Hovering it (or focusing, or tapping on touch screens) slides a frosted-glass search bar out to the left from the icon, which stays at the bar's right end. Searches that suggest intent to apply (quote, apply, eligible, borrow, finance and similar) offer "Get my quote", and a search with no matches falls back to it, so search never ends in a dead end.
- Guide read times are estimates for the mockup.
- There is no direct link to the members area: search and quote calls to action go to the quote form.
- Copy avoids taglines and em dashes.

## Refinance landing page

A second page, `landing-page/`, redesigns the paid landing page at [carfinance247.co.uk/refinance](https://www.carfinance247.co.uk/refinance) with the same design system. With the dev server running, open `/landing-page/` (for example `http://localhost:5173/landing-page/`). `npm run build` outputs both pages (`dist/index.html` and `dist/landing-page/index.html`).

- One goal and, like the live page, no nav: just the logo (not a link) at the top of the hero.
- **SEO parity with the live page.** The page title, every heading (with the same levels and order), body copy, FAQ questions and answers, calculator wording and help text, and footer legal text match carfinance247.co.uk/refinance word for word, in the same order in the page structure (including smaller details such as the mobile TrustScore link beside the logo, the hero disclaimer before the Trustpilot rating, the calculator help pop-ups after the calculator, and the footer TrustScore before the address). Layout can differ visually, but keep the source order. Two lines that aren't headings on the live page ("Why choose Car Finance 247?" and "Ready to go?") are paragraphs here too, and nothing is added that the live page lacks. Change copy only in `src/data/refinance.ts`, and only if the live page changes.
- Hero with a plain reg box and the Get my quote button directly beneath it at the same size; the reg is passed to the quote journey as `?reg=`. Every quote button on the page uses the same `xl` size.
- Refinance calculator with the live fields (current monthly payment, early settlement figure, term, credit profile, PCP or HP), help pop-ups and maths (`refinanceQuote` in `src/lib/finance.ts`), reproducing the live figures to the penny.
- Then, in the live order: explainer, pros and cons, how it works, testimonial with why Car Finance 247, Trustpilot band, "Ready to go?" with the commission disclosure, FAQs (`<Faq flat contact={false} />`, questions as h3) and `Footer variant="compact"` with the live legal links.
- The cog here offers the heading font, green and button style (the design and hero options are homepage only).
