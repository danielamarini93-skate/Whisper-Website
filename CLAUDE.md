# Whisper website — project memory

How Dani works (process, principles, GitHub routine) lives in the `dani-studio` repo. This file holds **Whisper facts only**. Anything worth remembering about this project goes here or in `docs/`, and is committed.

## The client

- **JustListen Technology Ltd**, brand **Whisper**: wireless radio guide systems for tour guides, museums, events, education and sport (Whisper Active). "We invented the radio guide in 1999."
- **Where they're based:** TBC. The brief says Malta (JustListen Technology Ltd, Malta), but site copy says "engineered in Italy". Confirm with the client.
- **Live site:** [whisper-system.net](https://whisper-system.net/), on WordPress + **BeTheme** (BeBuilder, header, mega menu and side menu templates), WPML (EN/IT), Contact Form 7, the Readabler accessibility plugin and WooCommerce.
- **What Dani does:** redesigns the website. Pages are designed as Claude artifacts, then built in BeTheme.

## Design system

**Whisper UI Kit:** https://claude.ai/artifact/9Qg4axyQyZoYDvsheAM6wE

It holds the tokens, the brand book, 23 components and all assets. Its **WordPress + BeTheme** section explains how to build each component on the site.

## Brand decisions (final)

- **Type:** Geist, weights 300–600.
- **Colour:** teal is the main colour, used as a gradient on highlight words and icons: #1F5256 → #35949A on white, #2A9A9F → #8AF3F4 on black.
- **Depth:** grey-black gradients (dark surfaces #2E2E2E → #050505; primary buttons #454545 → #1A1A1A).
- **Red #E52226:** one small touch per view only (the mark on the i).
- **Buttons:** pill shape, 13px uppercase label, trailing arrow. Every CTA on a dark card is an outline; a teal fill is for the hero CTA only.
- **Icons:** Lucide line icons in the teal gradient, on a grey #F4F4F4 square or circle.
- **Accessibility:** 16px body text, a teal focus ring, 44px tap targets, pinch-zoom allowed, 4.5:1 text contrast.

Full detail: [`docs/PROJECT-BRIEF.md`](docs/PROJECT-BRIEF.md) and the UI Kit's brand book.

## Where things are

| What | Where |
|---|---|
| Project brief: navigation, homepage structure, open items | [`docs/PROJECT-BRIEF.md`](docs/PROJECT-BRIEF.md) |
| Every design, study and audit (artifact links) | [`docs/artifacts.md`](docs/artifacts.md) |
| Website copy, EN and IT (source) | [`docs/copy/`](docs/copy/) |
| BeTheme child theme, snippets, demo | [`wordpress/betheme-child-whisper/`](wordpress/betheme-child-whisper/README.md) |
| Process outputs | `docs/design-thinking/`, `docs/design-build/`, `docs/design-review/` (none yet) |

## Status (8 Nov 2026)

- **Moved to a new Claude account:**
  - all 36 pages and the homepage audit, republished with links between pages repointed;
  - the UI Kit, rebuilt with its images re-uploaded.
- **Website copy (EN and IT):** read-only pages, built from `docs/copy/*.md`. The Markdown is the version to edit; republish the pages after changes.
- **Child theme:** written, but not yet installed or tested in WordPress. Use staging first.
- **Open items** (copy to check, quote attribution, live-site fixes): see the brief.

## Repository

- **Default branch:** `main`. The older branch `claude/whisper-website-redesign-oftg6o` holds the same commit and can be deleted once `main` is the default.
