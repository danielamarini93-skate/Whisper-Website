# Project brief — Whisper website redesign

Read this first in any new chat about the project. The visual and code rules are in the [Whisper UI Kit](https://claude.ai/artifact/9Qg4axyQyZoYDvsheAM6wE)'s brand book; every artifact link is in [`artifacts.md`](artifacts.md).

## Who and what

- **Client:** JustListen Technology Ltd, Malta. Brand **Whisper**: wireless radio-guide systems (tour guides, museums, events, education, Whisper Active for sport). "We invented the radio guide in 1999."
- **Site:** whisper-system.net, WordPress + **BeTheme** (BeBuilder, header, mega menu and sidemenu templates), WPML (EN/IT), Contact Form 7, Readabler accessibility plugin, WooCommerce.
- **Me:** UX/UI designer redesigning the site. Pages are designed as claude.ai artifacts, then built in BeTheme.

## Brand decisions (final)

- **Typeface:** Geist (Google Fonts), weights 300–600.
- **Colour:** teal is the main colour, used as a dark-to-light **gradient** on highlight words and icons:
  - on white: #1F5256 → #35949A;
  - on black: #2A9A9F → #8AF3F4;
  - the lighter #5BBEC4 from the reference artwork fails contrast on white.
- **Depth:**
  - Black, white and grey gradients carry everything else.
  - Dark surfaces use a grey-to-black gradient (#2E2E2E → #050505).
  - Primary buttons use a dark grey gradient (#454545 → #1A1A1A) that slides to black on hover.
- **Red:** #E52226, only as one small touch per view (the mark on the i).
- **Buttons:**
  - Pill shape, 13px uppercase label, trailing arrow.
  - Every CTA on a dark card is an outline.
  - Teal fill is for the hero CTA only.
- **Icons:** Lucide line icons in the teal gradient on a grey (#F4F4F4) square or circle. No hover change on icons.
- **Accessibility:** body text 16px (13px is the minimum), a teal focus ring everywhere, 44px tap targets, pinch-zoom allowed, text contrast 4.5:1 (3:1 for 24px+).
- **Logos:**
  - Grey-gradient wordmark with the red i-mark on light grounds.
  - The same wordmark in white, red mark kept, on dark grounds and photos.

## Navigation (UI kit Header)

- **Desktop:**
  - Technology, Solutions and About open dropdown panels: intro + "See all", link rows, optional story card.
  - Whisper Active is a plain link.
  - The CTA is **"Get your Whisper"**, which opens a small card on click: Rent, Buy, Request a quote, Book a demo, then "Talk to us".
- **Mobile:**
  - A drawer with accordion submenus.
  - Only Technology shows product pictures; the other submenus are text only.
  - It ends with a full-width "Get your Whisper".

## Homepage structure (agreed)

1. Hero with H1.
2. Stats: 4.5M+ / 315K / 130 / 1999.
3. Product tiles:
   - One-way: X, Y and the black transmitter;
   - AI translation: Whisper T, on the light tile, big;
   - Two-way: WS2;
   - Audio guides & My Muse.
4. Partner logos.
5. Why Whisper.
6. Global band.
7. "Find the right solution": 4 cards (Tourism, Museums, Business & events, Education), each with **one line of subcopy and an "Explore" CTA**.
8. R&D.
9. Quote ("4.5 million visitors a year…").
10. Footer.

Business & Events is one card, Sport is removed and Whisper Active sits higher on the page.

## Deliverables

| What | Link |
|---|---|
| Whisper UI Kit (design system) | https://claude.ai/artifact/9Qg4axyQyZoYDvsheAM6wE |
| Homepage audit, desktop + mobile (68 findings, mapped to the kit) | https://claude.ai/artifact/5MbA8CxCd2PcHFcnHgie8A |
| Homepage design, light / dark | https://claude.ai/artifact/7a67tqf1ihP93G8KxRJSih / https://claude.ai/artifact/1F5A4etBJdm5YqwTtWP5M5 |
| Product, solution and other page designs (EN/IT toggle) | [`artifacts.md`](artifacts.md) |
| BeTheme child theme + snippets | this repo, [`wordpress/betheme-child-whisper/`](../wordpress/betheme-child-whisper/README.md) |

## How the kit reaches WordPress

- The child theme `betheme-child-whisper` loads three files:
  - `whisper-kit.css`: tokens and components, plain CSS;
  - `betheme-adapter.css`: styles BeBuilder elements;
  - `whisper-kit.js`: a small script for the menus and accordion.
- **Two class families:**
  - `wb-` classes go in BeBuilder's "Custom CSS class" field (`wb-btn-primary`, `wb-h2`, `wb-stat`, `wb-feature`, `wb-solution`, `wb-tile-dark`, `wb-menu-cta` and so on).
  - `wh-` classes belong to the kit's own HTML snippets. Never mix the two.
- No React on the site. React only powers the kit's previews.
- When the kit changes, run `wordpress/tools/build_kit_css.py` to regenerate `whisper-kit.css`.

## Open items

- **Copy written as placeholder that needs checking:**
  - menu link descriptions;
  - solution card subcopy;
  - "Green Whisper: Repair, reuse, recycle";
  - "Offices in 17 countries";
  - "2-year warranty";
  - "delivered and collected".
- **Quote attribution:** the real name and organisation still need confirming. The figures don't agree either (5 million vs 4.5M+).
- **Italy vs Malta:** the wording conflicts ("engineered in Italy" against "Headquartered in Malta").
- **Live-site fixes:**
  - remove the expired Halloween promo;
  - turn off flags in WPML;
  - set the Readabler button colours in the plugin;
  - allow pinch-zoom (the child theme fixes it; confirm on staging).
- **Child theme:** not yet installed or tested inside WordPress. Install it on staging first.
- **Not started yet:** the One-way product carousel component, cart/checkout and page templates.
