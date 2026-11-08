# Whisper UI Kit for WordPress + BeTheme

A BeTheme child theme that puts the [Whisper UI Kit](https://claude.ai/artifact/9Qg4axyQyZoYDvsheAM6wE) on whisper-system.net. It uses plain CSS and about 9 KB of plain JavaScript (uncompressed, with comments). React is only used for the kit's previews, and you don't need it here.

```
betheme-child-whisper/
├── style.css, functions.php     child theme: loads everything below, fixes pinch-zoom
├── assets/css/whisper-kit.css   kit tokens (colours, gradients, type, spacing) + kit components (wh-* classes)
├── assets/css/betheme-adapter.css  kit styling for BeTheme / BeBuilder markup (opt-in wb-* classes)
├── assets/js/whisper-kit.js     "Get your Whisper" click-to-open, menu a11y, snippet dropdowns, accordion
├── assets/img/                  logos, product cut-outs, photography, partners/ (from the kit)
├── snippets/*.html              copy-paste kit components for BeBuilder's HTML element
└── demo/index.html              every snippet on one page, open it in a browser to check
```

There are two ways to get the kit's look. Most of the site should use the first.

| | How | Use it for |
|---|---|---|
| **1. BeBuilder elements + `wb-` classes** | Build with normal BeBuilder elements, then type a class in the element's **Advanced › Custom CSS class** field. | Buttons, headings, text, counters, icon boxes, banner boxes, sections, product tiles, header, menus, footer, Contact Form 7 |
| **2. HTML snippets (`wh-` classes)** | Paste a file from `snippets/` into an **HTML** element (or save it as a template). | Blocks BeTheme can't build exactly: the hero, the kit header if you replace BeTheme's, FAQ accordion, radio-card forms |

`wb-` classes go on BeBuilder elements, and `wh-` classes belong to the kit's own HTML. Don't mix them: a `wh-` class on a BeBuilder element pulls in the kit component's layout.

---

## 1. Install

1. **Back up the site** and test on a staging copy first.
2. Zip the `betheme-child-whisper` folder. Then go to **Appearance › Themes › Add New › Upload** and activate it. BeTheme must stay installed.
   - **Already using a BeTheme child theme?** Don't switch. Copy `assets/` into it and merge `functions.php` into its own.
3. **Check BeTheme's options after switching.** BeTheme keeps most settings in its own option, so they normally carry over. Check **Betheme › Theme Options** and your header, footer and mega menu templates.
4. **Clear caches:** any caching or optimisation plugin, and BeTheme's own (**Betheme › Tools › Regenerate CSS** if you use its CSS file cache).
5. **Open the demo:** `demo/index.html` shows every snippet working, with no WordPress.

**What `functions.php` does**
- Loads Geist (300–600), `whisper-kit.css`, `betheme-adapter.css` and `whisper-kit.js` (deferred), after BeTheme's styles.
- Rewrites the viewport tag to `width=device-width, initial-scale=1`, so people can pinch-zoom again. The live site blocks zoom, which the audit flagged as high severity. Once that's fixed in BeTheme's own settings, set `WHISPER_KIT_FIX_VIEWPORT` to `false`.
- If Theme Options already loads Geist 300–600, set `WHISPER_KIT_LOAD_GEIST` to `false`.

## 2. BeTheme Theme Options to set once

Option names move between BeTheme versions. Look for these under **Betheme › Theme Options**.

| Area | Set to | Kit token |
|---|---|---|
| Fonts › Family (content, menu, headings, buttons) | Geist | `--font-sans` |
| Fonts › Content size / line height | 16px / 24px | `body` |
| Colors › Theme color / accent | `#0A6E71` | `teal-text` (links, focus) |
| Colors › Text, headings | `#3A3A3A` text, `#1B1B1B` headings | `body`, `ink` |
| Colors › Links / hover | `#0A6E71` / `#1B1B1B` | `teal-text`, `ink` |
| Colors › Background | `#FFFFFF`, alternate sections `#F4F4F4` | `bg`, `bg-alt` |
| Buttons › style / radius | Pill (999px), no shadow | `radius-pill` |
| Responsive › zoom / "maximum-scale" (if present) | Allow zoom | — |
| Global › Layout width | 1256px content + 92px side margin (1440 design) | `container`, `margin-desktop` |

In BeBuilder, remove hand-set colours, sizes and fonts from elements that get a `wb-` class. The class sets them.

## 3. BeBuilder class reference (`wb-`)

Type the class in **Element › Advanced › Custom CSS class**. Several classes can go in one field, separated by spaces.

**Buttons (Button element).** Every BeTheme button gets the kit shape (48px pill, 13px uppercase label, arrow that slides on hover). Add one class for the colour:

| Class | Look | Use on |
|---|---|---|
| `wb-btn-primary` | Dark grey gradient, slides to black on hover | The one main action per view |
| `wb-btn-secondary` | Dark outline, fills on hover | Second action; light product tiles |
| `wb-btn-accent` | Teal fill | Hero CTA only |
| `wb-btn-on-dark` | White fill | Main action on black |
| `wb-btn-outline-on-dark` | White outline, fills white on hover | Every CTA on dark tiles and photos |
| `wb-btn-ghost` | Text only | Tertiary actions |
| `wb-btn-sm` / `wb-btn-full` | 40px tall / full width | Tiles, header / mobile forms |
| `wb-link` | Uppercase underlined link with arrow | "Inside Whisper Lab", "See all" |

**Headings and text**

| Class | Element | Result (desktop / mobile) |
|---|---|---|
| `wb-display` | Heading (H1) | 60 / 34px, the one hero title |
| `wb-h2` | Heading (H2) | 32 / 26px, weight 300. Bold words: `<b>` |
| `wb-h3` | Heading | 28 / 24px, product tile titles |
| `wb-h4` | Heading | 22 / 20px, card and menu titles |
| `wb-eyebrow` | Heading / text | 12px uppercase kicker |
| `wb-ink` | Heading (with one of the above) | Grey-black gradient text |
| `wb-lead`, `wb-body`, `wb-small`, `wb-caption`, `wb-muted` | Column text / Plain text | 19 · 16 · 14 · 13px, muted grey |

**Teal gradient words:** inside any heading, wrap the words in `<span class="wh-hl">…</span>`. For example: `Radio guide systems <span class="wh-hl">for every format</span>`. Only use it on text 24px and up.

**Sections, wraps and tiles**

| Class | Put on | Result |
|---|---|---|
| `wb-section` | Section | 96 / 64 / 48px top and bottom padding |
| `wb-bg-alt` | Section | `#F4F4F4` band |
| `wb-dark` | Section or wrap | Grey-black gradient, white text, teal gradient highlights |
| `wb-tile-dark` | Wrap | Product tile: grey-to-black gradient, 14px corners, 32px padding |
| `wb-tile-light` | Wrap | Light product tile (Whisper T), drop shadow under the product image |
| `wb-card` | Wrap | White card, hairline border, 12px corners |
| `wb-hover` | Wrap (with a tile or card class) | Lifts 2px with a shadow, product image zooms 4% |

**Content elements**

| Class | Element | Result |
|---|---|---|
| `wb-stat` (each) or `wb-stats` (on the wrap) | Counter | Stat: 46 / 32px number in the ink gradient, caption label, left rule. Set columns to 1/4 desktop, 1/2 mobile. |
| `wb-feature` | Icon Box 2 | Feature card: grey round icon well, teal gradient icon, title, text, light hover lift |
| `wb-solution` | Banner Box | Solution card: greyscale photo, scrim, title, one line of description, outline "Explore" button |
| `wb-menu-link` | Icon Box 2 (in a mega menu template) | Menu row: 56px grey square with gradient icon (or product image), title, one line |
| `wb-menu-option` | Icon Box 2 (in the CTA template) | "Get your Whisper" option row with a 44px icon square |

## 4. Header, menus and footer (BeTheme templates)

**Header template**
- **Top bar:** give its section `wb-utilbar`. Make the promo a Heading or Plain text with `wb-promo` (red dot + 13px text). Delete the promo the day an offer ends.
- **Main bar:** give its section `wb-mainbar`. Menu links get the kit's pill hover, a 2px underline on the current page, and a kit chevron in place of BeTheme's arrow.
- **Language:** WPML's horizontal list becomes the EN / IT text switch automatically. Turn flags off in WPML too.
- **Header icons and burger:** these get 44px targets. `whisper-kit.js` names the burger for screen readers.

**Mega menus (Technology, Solutions, About):** build each in **Betheme › Templates › Mega Menu**, laid out like the kit's dropdown panel.
- **Left column:** Heading `wb-eyebrow` (e.g. "Technology"), Heading `wb-h4` (one-line title), Plain text `wb-small`, Button `wb-link` ("All products").
- **Middle:** Icon Box 2 elements with `wb-menu-link`, two per row. Use the product cut-out from `assets/img` as the image for Technology, and an icon for Solutions and About.
- **Right (optional):** a Wrap with `wb-tile-dark`, holding a Heading `wb-h4`, an image and a Button `wb-btn-outline-on-dark wb-btn-sm`.

**"Get your Whisper" (click to open)**
1. In **Appearance › Menus**, add a custom link "Get your Whisper". Under Screen Options, enable CSS Classes and set its class to `wb-menu-cta`.
2. Give it a small Mega Menu template:
   - a Heading `wb-eyebrow`: "How do you want it?";
   - four Icon Box 2 elements with `wb-menu-option` (Rent, Buy, Request a quote, Book a demo), each with one line of text;
   - a Plain text "Not sure what you need?" and a Button `wb-link`: "Talk to us".
3. The item becomes a dark pill with a chevron. `whisper-kit.js` makes it open on click (not hover), and close on Escape or a click outside. The panel is a 380px card, right-aligned under the button.

**Mobile side menu** (BeTheme sidemenu template)
- Rows become 56px with 20px labels and kit chevrons. Sub-items are 52px text rows.
- **Technology sub-items only:** add one of `wb-thumb-oneway`, `wb-thumb-t`, `wb-thumb-ws2`, `wb-thumb-app` to each menu item (CSS Classes field) to show its product picture. Solutions and About stay text only.
- Put a Button `wb-btn-primary wb-btn-full` ("Get your Whisper") at the bottom.

**Footer template:** give its section `wb-footer` (grey-black gradient).
- Footer menus get 14px links in 32px rows, with a teal hover.
- Column titles: `wb-eyebrow`. The legal line: Plain text `wb-legal` (email links are underlined automatically).
- BeTheme's back-to-top button becomes a 44px outline circle.

**Contact Form 7:** no classes needed. Fields, selects, checkboxes, the submit button, error tips and the response box all take the kit's form styles.

**Readabler (accessibility button):** the adapter makes it 44px and moves it 16px from the corner. Set its colours in the plugin (**Readabler › Open Button**: background `#2B2B2B`, icon white), because the plugin controls them.

## 5. HTML snippets (`snippets/`)

Each file starts with a comment saying where it goes. Paste it into an **HTML** element in a full-width section (or save it as a BeBuilder template). Images point to `wp-content/themes/betheme-child-whisper/assets/img/`; replace the `href="#"` links.

| Snippet | Notes |
|---|---|
| `hero.html` | Full-width section, no padding. H1 with a gradient highlight, accent CTA + outline CTA |
| `header.html`, `footer.html` | Only if you replace BeTheme's header/footer templates with HTML. The header needs `whisper-kit.js` |
| `stat-row.html`, `section-header.html`, `quote.html` | Static |
| `product-tile-dark.html`, `product-tile-light.html`, `product-tiles-half.html` | Wide and half product tiles |
| `solution-cards.html` | Four cards with one line of subcopy and "Explore" (4 → 2 → 1 across) |
| `feature-cards.html`, `logo-strip.html` | Feature cards with gradient icons, six partner logos |
| `accordion.html` | FAQ; needs `whisper-kit.js`. Use a different id prefix if there are two on a page |
| `buttons*.html`, `badges.html`, `alerts.html`, `form-fields.html` | Reference markup; live forms should use Contact Form 7 |

Snippets respond to their own width (container queries), so they work inside any BeBuilder column.

## 6. Check before going live

- [ ] Every page has one H1: the hero `wb-display` or `hero.html`.
- [ ] You can pinch-zoom on a phone. View source: `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- [ ] Tab through the header: every link shows the teal focus ring. Escape closes an open mega menu or the "Get your Whisper" card.
- [ ] At 390px: no sideways scrolling, the side menu rows are 56px, and stats sit 2 × 2.
- [ ] No expired promo in the top bar.
- [ ] Teal gradient text only on 24px+ headings. Body text and links stay solid.

## 7. Updating

`whisper-kit.css` is generated from the kit's `tokens.json` and `components/bundle.css`. Don't edit it by hand. Change the kit, download those two files from its Files view, and run `python3 wordpress/tools/build_kit_css.py tokens.json bundle.css wordpress/betheme-child-whisper/assets/css/whisper-kit.css`. Then bump `WHISPER_KIT_VERSION` in `functions.php` so browsers fetch the new file. `betheme-adapter.css` and `whisper-kit.js` are hand-written and safe to edit.

**Tested:** I injected the adapter and script into the live homepage, with the classes added as an editor would. Buttons, headings, counters, banner boxes, the mega menus, the click-to-open CTA, Escape and the mobile side menu all behaved as described. I haven't run it inside WordPress itself: check it on staging before going live.
