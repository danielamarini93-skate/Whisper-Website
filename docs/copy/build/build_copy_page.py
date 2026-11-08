import re, subprocess, sys, html as H
src, tpl, out, lang, eyebrow, headline, other_url, other_lang, other_label, flaglabel, toclabel, toplabel = sys.argv[1:13]
md = open(src, encoding="utf-8").read().split("\n")
title = md[0].lstrip("# ").strip()
byline = md[2].strip() if "·" in md[2] else ""
body_md = "\n".join(md[3:] if byline else md[1:])
body = subprocess.run(["pandoc","-f","gfm","-t","html5","--wrap=none"], input=body_md, capture_output=True, text=True, check=True).stdout
# tables scroll in their own box
body = re.sub(r"<table>", '<div class="tbl"><table>', body); body = body.replace("</table>", "</table></div>")
# highlight bracketed fact flags in text (not inside tags)
n = 0
def flag(m):
    global n; n += 1; return '<mark class="flag">' + m.group(0) + "</mark>"
parts = re.split(r"(<[^>]+>)", body)
for i, p in enumerate(parts):
    if not p.startswith("<"): parts[i] = re.sub(r"\[[^\[\]]{2,200}\]", flag, p)
body = "".join(parts)
toc = "<ul>" + "".join(f'<li><a href="#{i}">{t}</a></li>' for i, t in re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', body)) + "</ul>"
t = open(tpl, encoding="utf-8").read()
vals = {"pagetitle": H.escape(title), "eyebrow": eyebrow, "headline": headline, "byline": H.escape(byline),
        "flagcount": str(n), "flaglabel": flaglabel, "otherurl": other_url, "otherlang": other_lang,
        "otherlabel": other_label, "toclabel": toclabel, "toc": toc, "toplabel": toplabel, "body": body}
for k, v in vals.items(): t = t.replace("$" + k + "$", v)
open(out, "w", encoding="utf-8").write(t)
print(title, "| flags", n, "| h2", toc.count("<li>"), "| bytes", len(t), "| leftover $", re.findall(r"\$[a-z]+\$", t)[:3])
