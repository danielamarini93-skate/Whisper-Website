# Rebuilding the copy pages

The EN and IT copy pages are built from `../website-copy-en.md` and `../website-copy-it.md` with pandoc and `template.html` (Whisper UI Kit look). After editing the Markdown, run from the repo root:

```bash
python3 docs/copy/build/build_copy_page.py docs/copy/website-copy-en.md docs/copy/build/template.html copy-en.html en "Whisper · Website copy" "Full website copy, <b>English</b>" "https://claude.ai/artifact/EgqyEQ51HCaTvnPSdjvLtp" it "Versione italiana" "facts to confirm" "Pages" "Back to top"
```

```bash
python3 docs/copy/build/build_copy_page.py docs/copy/website-copy-it.md docs/copy/build/template.html copy-it.html it "Whisper · Testi del sito" "Copy completo del sito, <b>italiano</b>" "https://claude.ai/artifact/96pzHmjDPrqH3i5eWLPRiX" en "English version" "dati da confermare" "Pagine" "Torna su"
```

Then ask Claude to republish `copy-en.html` and `copy-it.html` to the existing links (see `../../artifacts.md`). Don't commit the generated HTML.
