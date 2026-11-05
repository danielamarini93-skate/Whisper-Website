#!/usr/bin/env python3
"""Rebuild assets/css/whisper-kit.css from the Whisper UI Kit.

Download two files from the kit (Files view): project/tokens.json and project/components/bundle.css, then run:

    python3 wordpress/tools/build_kit_css.py tokens.json bundle.css \
        wordpress/betheme-child-whisper/assets/css/whisper-kit.css

Bump WHISPER_KIT_VERSION in functions.php afterwards so browsers fetch the new file.
"""
import json
import re
import sys

EXTRAS = """
/* ---------- WordPress extras: grids for snippets (inside .wh-page) ---------- */
.wh-page { color: var(--ink); }
.wh-grid { display: grid; gap: var(--space-4); }
.wh-grid > * { min-width: 0; }
.wh-grid--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.wh-grid--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.wh-grid--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
@container (max-width: 1023px) { .wh-grid--3, .wh-grid--4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@container (max-width: 767px) { .wh-grid--2, .wh-grid--3, .wh-grid--4 { grid-template-columns: minmax(0, 1fr); } .wh-grid { gap: var(--space-3); } }
"""


def value(token, theme):
    v = token["value"]
    return v if isinstance(v, str) else v.get(theme, v.get("light"))


def main(tokens_path, bundle_path, out_path):
    tok = json.load(open(tokens_path, encoding="utf-8"))
    lines = [
        "/*! Whisper UI Kit — tokens + components for WordPress (BeTheme child theme).",
        " * Generated from the Whisper UI Kit design system (tokens.json + components/bundle.css). Do not edit by hand:",
        " * change the kit, then regenerate. Plain CSS: no React needed. */",
        "",
        "/* ---------- Tokens ---------- */",
        ":root {",
    ]
    for t in tok["color"]["tokens"] + tok.get("shadow", {}).get("tokens", []):
        lines.append(f'  --{t["name"]}: {value(t, "light")};')
    for fam in ("spacing", "radius", "layout", "breakpoint"):
        for t in tok.get(fam, {}).get("tokens", []):
            lines.append(f'  --{t["name"]}: {t["value"]};')
    lines.append(f'  --font-sans: {tok["type"]["families"]["sans"]};')
    lines.append("}")
    lines.append('/* Dark theme: only applies if the page sets data-theme="dark" on <html>. The live site is light-only. */')
    lines.append('[data-theme="dark"] {')
    for t in tok["color"]["tokens"] + tok.get("shadow", {}).get("tokens", []):
        v = t["value"]
        if not isinstance(v, str) and v.get("dark") and v.get("dark") != v.get("light"):
            lines.append(f'  --{t["name"]}: {v["dark"]};')
    lines.append("}")
    css = open(bundle_path, encoding="utf-8").read()
    css = re.sub(r"^@import url\([^)]*\);\s*", "", css)  # Geist is enqueued by functions.php
    out = "\n".join(lines) + "\n\n/* ---------- Components (wh-*) ---------- */\n" + css + EXTRAS
    open(out_path, "w", encoding="utf-8").write(out)
    print(f"wrote {out_path} ({len(out) // 1024} KB)")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
