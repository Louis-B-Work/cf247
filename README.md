# Car Finance 247 homepage mockup

An interactive mockup of the carfinance247.co.uk homepage, rebuilt to the 2026 brand guidelines (CF247 Guidelines_DRAFT2).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and production build
npm run lint
```

## Brand fonts

Neulis Neue (display) and Neulis Cursive (accent words) are Adobe Fonts. To load them:

1. Create a web project in Adobe Fonts containing **Neulis Neue** and **Neulis Cursive**.
2. Copy `.env.example` to `.env` and set `VITE_TYPEKIT_ID` to the project ID.
3. Restart the dev server.

The CSS families must be `neulis-neue` and `neulis-cursive` (the Adobe defaults). Without a kit ID the mockup falls back to Urbanist, with Urbanist italic standing in for the cursive accent. Body copy uses Helvetica Neue with an Arial fallback.

### Heading font switcher

A settings cog in the bottom-left corner (hidden until you move the pointer near that corner or tab to it) opens a menu that switches headings between **General Sans**, **Manrope** and **Satoshi** (all free from [Fontshare](https://www.fontshare.com/), loaded in `index.html`). The choice is saved in the browser. The overrides live in `src/index.css` under `html[data-heading-font=...]`; remove `<FontSwitcher />` from `App.tsx` once a font is chosen.

The same cog has test options, saved in the browser. Each page's cog only lists the options that apply to it:

- **Site design** (homepage only): *Classic* (default, the page as built so far) or *Modern (new)*, a rebuild of the whole homepage inspired by Weav (godly.design). It has a purple hero with an oversized headline and a phone stepping through the members area (new-ma.carfinance247.co.uk), recreated from screenshots of the real app: home (approved in principle, browse vehicles in your budget), the vehicle search and a vehicle page with View quotes, using the app's own wording and listings (the customer name is illustrative), with a straight edge leading into large white and purple panels on alternating lilac, white and blackcurrant backgrounds: trust, how it works, situations (with the stats in a card), reviews, the founders (Reg and Louis, from the Classic page), guides, the Quote / Buy / Drive away photo cards (from the Classic page), FAQs and a final call to action. It uses three widths (set in `src/index.css`): the nav runs edge to edge with a small margin (`--pad-nav`); visual sections (hero, situations, reviews, Quote / Buy / Drive away, final call to action, footer) use `container-xl`, capped at 1680px (`--pad-wide`); and text-led sections (partners, statement, how it works, founders, guides, FAQ) use `container-cf`, capped at 1320px (`--nav-pad`). In Classic all three equal the single 1680px page edge. It also has a smaller type scale than Classic, stepping the hero and situation cards up a little on very wide screens (Tailwind `2xl`). It lives in `src/components/modern`, and the hero layout option doesn't apply to it.
- **Hero layout** (homepage only): *Cycling cars* (default, the car rotates every 4 seconds through the Fiesta, Volvo XC40, Kia Sportage and MINI), *Centred, no car* (hides the car and centres the headline, actions and trust line), *Photo* (a full-bleed lifestyle photo under a purple wash, darkest behind the copy, with the nav clear until you scroll) or *Big headline* (the Cycling cars layout with a much larger "Car finance made easy" headline, inspired by zilch.com).
- **Buttons**: *Sliding arrow* (default, after the 21st.dev ShadcnSpace "Button with icon": the square → arrow chip slides from the right edge to the left while the label shifts right and the lime fill sweeps in), *Fixed arrow* (the chip stays on the right) or *No arrow* (text only, centred with even padding). All keep the lime fill on hover. Touch screens have no hover, so there each button plays its hover state while it crosses the middle of the screen as you scroll (`src/lib/useScrollHover.ts`).

They work by setting data-design, data-hero, data-green and data-btn on <html>, read by the design-modern:, hero-centered:, hero-bleed: and hero-big: Tailwind variants and the `html[data-btn]` and `html[data-green]` rules in src/index.css.

Trustpilot stars always use Trustpilot's own brand colours (white stars in `#00B67A` green boxes, and a green logo star), as their brand guidelines require, so they have no test option.

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
