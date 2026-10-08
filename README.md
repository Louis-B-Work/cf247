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
