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

A settings cog in the bottom-left corner opens a menu that switches headings between **General Sans**, **Manrope** and **Satoshi** (all free from [Fontshare](https://www.fontshare.com/), loaded in `index.html`). The choice is saved in the browser. The overrides live in `src/index.css` under `html[data-heading-font=...]`; remove `<FontSwitcher />` from `App.tsx` once a font is chosen.

The same cog has test options, saved in the browser. Each page's cog only lists the options that apply to it:

- **Hero layout** (homepage only): *Cycling cars* (default, the car rotates every 4 seconds through the Fiesta, Volvo XC40, Kia Sportage and MINI), *Centred, no car* (hides the car and centres the headline, actions and trust line) or *Photo* (a full-bleed lifestyle photo under a purple wash, darkest behind the copy, with the nav clear until you scroll).
- **Trustpilot stars**: *Brand purple* (default) or *Trustpilot green*, which restores Trustpilot's green boxes with white stars and the green logo star.
- **Button styles**: *All white* (default) or *Mixed (original)*, which restores the earlier mix: solid purple buttons on white and tint sections and an outlined nav button. Buttons on purple and photos stay white in both.

They work by setting data-hero and data-tp on <html>, read by the hero-centered: and 	p-brand: Tailwind variants in src/index.css.

## Design tokens

All tokens live in [`src/index.css`](src/index.css):

| Token | Value | Use |
| --- | --- | --- |
| `--color-purple` | `#6905F2` | Lead colour, primary CTAs on white |
| `--color-purple-80/60/40/30/10` | tints | Used as solid colours only (no gradients): tint 10 for card surfaces and the reviews and FAQ bands, tint 30 for card borders and image placeholders, tint 80 for the Personal value card |
| `--color-blackcurrant` | `#160132` | Text, dark bands, footer |
| `--color-lime` | `#8EF205` | Accent only: hover fills, smile arc, progress bar, stars |
| `--color-progress` | lime | Scroll progress bar; set to `white` for the white variant |
| `--radius-brand` | `16px` | Every card, button, input and image |

Lime is still being decided, so every use reads from `--color-lime` and can be retuned in one place. Lime is never used as body text on white.

## Where things are

- `src/components/brand/Logo.tsx`: brand logo built from the official glyphs, with a `stacked` (three line) and `inline` (one line, used in the nav from tablet up) variant
- `src/components/layout`: sticky nav with hover mega menus, scroll progress bar, branching mobile menu, footer (with app badges and social links)
- `src/components/sections`: one file per homepage section
- `src/components/ui`: `Button` (a lime knob holding an arrow stretches across the button on hover, modelled on the 21st.dev Motion Button; nav items use a lime underline instead), `Accent` (cursive word) and `EndSmile` (the logo smiley mark at the end of headings, with a `tone` and `size` per heading), `MagicText` (scroll-linked word reveal), `PullOut` (smile hooked under key words, per guidelines p.24), `Reveal`, brand `Icon` set, `TrustpilotStars` / `TrustpilotLogo` (official green star boxes and wordmark), `BrandIcon` (social and app store marks from Simple Icons)
- `src/data`: nav, FAQs, Trustpilot reviews, search index, image choices and credits

## Content and imagery notes

- Reviews are taken from the public Trustpilot page and the current homepage, lightly trimmed.
- Lifestyle photos are free Unsplash images chosen against the imagery guidance (pages 27 to 32): candid, warm, no eye contact, with a quiet zone for text. Photographer details are kept in `src/data/images.ts`. Alternates are listed for each slot.
- Step images, guide images, partner logos, the founders photo and the hero car are loaded from the live site for the mockup.
- Search uses a static index of nav pages, guides and FAQs, with no backend. Searches that suggest intent to apply (quote, apply, eligible, borrow, finance and similar) offer "Get my quote", and a search with no matches falls back to it, so search never ends in a dead end.
- Guide read times are estimates for the mockup.
- There is no direct link to the members area: search and quote calls to action go to the quote form.
- Copy avoids taglines and em dashes.

## Refinance landing page

A second page, `landing-page/`, redesigns the paid landing page at [carfinance247.co.uk/refinance](https://www.carfinance247.co.uk/refinance) with the same design system. With the dev server running, open `/landing-page/` (for example `http://localhost:5173/landing-page/`). `npm run build` outputs both pages (`dist/index.html` and `dist/landing-page/index.html`).

- One goal and, like the live page, no nav: just the logo (not a link) at the top of the hero.
- Hero with a plain reg box and the Get my quote button directly beneath it at the same size; the reg is passed to the quote journey as `?reg=`. Every quote button on the page uses the same `xl` size.
- Illustrative refinance calculator (`src/lib/finance.ts`) at the representative 15.5% APR, with clear warnings.
- Explainer, pros and cons, why Car Finance 247, reviews (`showVideos={false}`), partners, refinance FAQs (`Faq categories=...`, tabs hide with one set), final call to action and `Footer variant="compact"`.
- Copy and links live in `src/data/refinance.ts`. The cog here offers the heading font, Trustpilot stars and button styles (the hero layout options are homepage only).
