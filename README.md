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

Neulis Neue (display) and Neulis Cursive (accent words) are Adobe Fonts. To load them:

1. Create a web project in Adobe Fonts containing **Neulis Neue** and **Neulis Cursive**.
2. Copy `.env.example` to `.env` and set `VITE_TYPEKIT_ID` to the project ID.
3. Restart the dev server.

The CSS families must be `neulis-neue` and `neulis-cursive` (the Adobe defaults). Without a kit ID the mockup falls back to Urbanist, with Urbanist italic standing in for the cursive accent. Body copy uses Helvetica Neue with an Arial fallback.

### Settings cog

The always-visible cog in the bottom-left opens a menu to switch headings between **General Sans** and **Satoshi** (both free from [Fontshare](https://www.fontshare.com/), loaded in `index.html`), and to preview the CTA buttons in their standard or green colour. The site opens on **Satoshi with green CTAs**; a one-off `cf247-preset` flag in the `index.html` startup script applies this even for visitors who saved other choices earlier. Later choices are saved in the browser. The overrides live in `src/index.css` under `html[data-heading-font=...]` and `html[data-cta-color=...]`.

The homepage defaults to the **Modern** design. The earlier Classic design and other test options remain in the source for future use, but are not currently shown in the cog. The Modern homepage includes a members-area app promotion and phone preview; its store links are shared with the footer via `src/data/appLinks.ts`.

Most customers visit on mobile, so the Modern homepage is tuned for phones first. Below the `md` breakpoint, Situations and the review mosaic become swipeable rows (the `SwipeRow` and `swipeItem` helpers in `src/components/modern/ui.tsx`), and the FAQ shows one topic at a time behind tabs (`<Faq mobileTabs />`). Mobile tweaks to sections shared with Classic (Steps, FAQ and footer) use the `design-modern:` variant, so Classic is unchanged.

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
- `src/components/layout`: sticky nav with hover mega menus, scroll progress bar, branching mobile menu, footer (with app badges and social links)
- `src/components/sections`: one file per homepage section
- `src/components/ui`: `Button` (a solid rounded-square button with a medium-weight left label and a square arrow chip on the right; the whole button floods lime on hover or press; nav items use a lime underline instead), `Accent` (cursive word) and `EndSmile` (the logo smiley mark at the end of headings, with a `tone` and `size` per heading), `MagicText` (scroll-linked word reveal), `PullOut` (smile hooked under key words, per guidelines p.24), `Reveal`, brand `Icon` set, `TrustpilotStars` / `TrustpilotLogo` (official green star boxes and wordmark), `BrandIcon` (social and app store marks from Simple Icons)
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
- Hero with a plain reg box and the Get my quote button directly beneath it at the same size; the reg is passed to the quote journey as `?reg=`. Every quote button on the page uses the same `xl` size.
- Illustrative refinance calculator (`src/lib/finance.ts`) at the representative 15.5% APR, with clear warnings.
- Explainer, pros and cons, why Car Finance 247, reviews (`showVideos={false}`), partners, refinance FAQs (`Faq categories=...`, tabs hide with one set), final call to action and `Footer variant="compact"`.
- Copy and links live in `src/data/refinance.ts`. The cog here offers the heading font, green and button style (the design and hero options are homepage only).
