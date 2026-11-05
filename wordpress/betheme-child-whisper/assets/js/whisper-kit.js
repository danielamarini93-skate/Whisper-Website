/*! Whisper UI Kit — behaviour for WordPress / BeTheme. Plain JavaScript, no dependencies, no React.
 * 1. BeTheme header: "Get your Whisper" (menu item class wb-menu-cta) opens on click, closes on Escape / outside click.
 * 2. BeTheme side menu: keeps aria-expanded in sync on submenu toggles; names the burger button.
 * 3. Kit snippets (HTML elements): header dropdowns + mobile drawer, CTA menu, accordion, radio cards.
 */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  root.classList.add("wh-js");

  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function closest(el, sel) { return el && el.closest ? el.closest(sel) : null; }

  /* ---------- 1. BeTheme header CTA dropdown ---------- */
  function initBeThemeCta() {
    $all(".mfn-header-menu > li.wb-menu-cta").forEach(function (li) {
      var a = li.querySelector(":scope > a");
      var panel = li.querySelector(":scope > .mfn-menu-item-megamenu, :scope > .sub-menu");
      if (!a || !panel) return;
      if (!panel.id) panel.id = "wh-cta-" + Math.random().toString(36).slice(2, 8);
      a.setAttribute("aria-expanded", "false");
      a.setAttribute("aria-controls", panel.id);
      a.setAttribute("role", "button");
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var open = !li.classList.contains("wh-open");
        closeAllCta();
        li.classList.toggle("wh-open", open);
        a.setAttribute("aria-expanded", String(open));
      });
    });
  }
  function closeAllCta(except) {
    $all(".mfn-header-menu > li.wb-menu-cta.wh-open").forEach(function (li) {
      if (li === except) return;
      li.classList.remove("wh-open");
      var a = li.querySelector(":scope > a"); if (a) a.setAttribute("aria-expanded", "false");
    });
  }

  /* ---------- 2. BeTheme side menu and burger ---------- */
  function initBeThemeSidemenu() {
    $all(".mfn-header-menu-burger").forEach(function (b) {
      if (!b.getAttribute("aria-label")) b.setAttribute("aria-label", "Open menu");
      b.setAttribute("aria-expanded", "false");
      b.addEventListener("click", function () { b.setAttribute("aria-expanded", "true"); });
    });
    $all(".mfn-sidemenu-closebutton").forEach(function (c) {
      if (!c.getAttribute("aria-label")) c.setAttribute("aria-label", "Close menu");
      c.addEventListener("click", function () { $all(".mfn-header-menu-burger").forEach(function (b) { b.setAttribute("aria-expanded", "false"); }); });
    });
    $all(".mfn-sidemenu-menu .outer-menu-sub").forEach(function (t) {
      var li = closest(t, "li");
      t.setAttribute("role", "button");
      t.setAttribute("aria-expanded", "false");
      t.addEventListener("click", function () {
        // BeTheme opens the submenu itself; mirror its state one frame later
        requestAnimationFrame(function () {
          var sub = li && li.querySelector(":scope > .sub-menu");
          var open = !!sub && getComputedStyle(sub).display !== "none";
          li.classList.toggle("wh-open", open);
          t.setAttribute("aria-expanded", String(open));
        });
      });
    });
  }

  /* ---------- 3a. Kit header snippet (.wh-header) ---------- */
  function initKitHeader(header) {
    var timer = null, scrim = null;
    var triggers = $all(".wh-navlink--menu, .wh-ctamenu__btn", header);
    function panelOf(btn) { return doc.getElementById(btn.getAttribute("aria-controls")); }
    function setOpen(btn, open) {
      var p = panelOf(btn); if (!p) return;
      btn.setAttribute("aria-expanded", String(open));
      btn.classList.toggle("is-open", open);
      p.hidden = !open;
    }
    function closeAll(except) { triggers.forEach(function (b) { if (b !== except) setOpen(b, false); }); syncScrim(); }
    function anyOpen() { return triggers.some(function (b) { return b.getAttribute("aria-expanded") === "true"; }); }
    function syncScrim() {
      var open = anyOpen();
      header.classList.toggle("has-mega", open);
      if (open && !scrim) {
        scrim = doc.createElement("div"); scrim.className = "wh-mega-scrim"; scrim.setAttribute("aria-hidden", "true");
        scrim.addEventListener("click", function () { closeAll(); });
        header.insertBefore(scrim, header.querySelector(".wh-header__drawer"));
      } else if (!open && scrim) { scrim.remove(); scrim = null; }
    }
    triggers.forEach(function (btn) {
      var isCta = btn.classList.contains("wh-ctamenu__btn");
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        closeAll(btn); setOpen(btn, open); syncScrim();
      });
      if (!isCta) {
        var li = closest(btn, "li");
        li.addEventListener("mouseenter", function () { clearTimeout(timer); closeAll(btn); setOpen(btn, true); syncScrim(); });
      }
    });
    $all(".wh-header__navlist > li > a.wh-navlink", header).forEach(function (a) {
      a.parentNode.addEventListener("mouseenter", function () { clearTimeout(timer); timer = setTimeout(function () { closeAll(); }, 160); });
    });
    var main = header.querySelector(".wh-header__main");
    if (main) {
      main.addEventListener("mouseleave", function () {
        clearTimeout(timer);
        timer = setTimeout(function () { triggers.forEach(function (b) { if (!b.classList.contains("wh-ctamenu__btn")) setOpen(b, false); }); syncScrim(); }, 160);
      });
      main.addEventListener("mouseenter", function () { clearTimeout(timer); });
    }
    header.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var openBtn = triggers.filter(function (b) { return b.getAttribute("aria-expanded") === "true"; })[0];
      if (openBtn) { closeAll(); openBtn.focus(); }
    });
    doc.addEventListener("click", function (e) { if (!header.contains(e.target)) closeAll(); });

    // Mobile drawer
    var burger = header.querySelector(".wh-header__mob [aria-expanded]");
    var drawer = header.querySelector(".wh-header__drawer");
    if (burger && drawer) {
      burger.addEventListener("click", function () {
        var open = burger.getAttribute("aria-expanded") !== "true";
        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        drawer.hidden = !open;
        header.classList.toggle("is-open", open);
        var icon = burger.querySelector("svg");
        if (icon) icon.innerHTML = open ? '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>' : '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>';
      });
    }
    $all(".wh-drawer__toggle", header).forEach(function (t) {
      t.addEventListener("click", function () {
        var open = t.getAttribute("aria-expanded") !== "true";
        $all(".wh-drawer__toggle", header).forEach(function (o) {
          if (o === t) return;
          o.setAttribute("aria-expanded", "false");
          var g = closest(o, ".wh-drawer__group"); if (g) g.classList.remove("is-open");
          var s = doc.getElementById(o.getAttribute("aria-controls")); if (s) s.hidden = true;
        });
        t.setAttribute("aria-expanded", String(open));
        var g = closest(t, ".wh-drawer__group"); if (g) g.classList.toggle("is-open", open);
        var s = doc.getElementById(t.getAttribute("aria-controls")); if (s) s.hidden = !open;
      });
    });
  }

  /* ---------- 3b. Accordion ---------- */
  function initAccordion(acc) {
    $all(".wh-acc__btn", acc).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        $all(".wh-acc__btn", acc).forEach(function (o) {
          o.setAttribute("aria-expanded", "false");
          var it = closest(o, ".wh-acc__item"); if (it) it.classList.remove("is-open");
          var p = doc.getElementById(o.getAttribute("aria-controls")); if (p) p.hidden = true;
        });
        if (open) {
          btn.setAttribute("aria-expanded", "true");
          var it = closest(btn, ".wh-acc__item"); if (it) it.classList.add("is-open");
          var p = doc.getElementById(btn.getAttribute("aria-controls")); if (p) p.hidden = false;
        }
      });
    });
  }

  /* ---------- 3c. Radio cards ---------- */
  function initRadioCards(set) {
    function sync() { $all(".wh-radiocard", set).forEach(function (c) { var i = c.querySelector("input"); c.classList.toggle("is-checked", !!(i && i.checked)); }); }
    set.addEventListener("change", sync); sync();
  }

  /* ---------- Global: Escape and outside click for the BeTheme CTA ---------- */
  doc.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var li = doc.querySelector(".mfn-header-menu > li.wb-menu-cta.wh-open");
    if (li) { closeAllCta(); var a = li.querySelector(":scope > a"); if (a) a.focus(); }
  });
  doc.addEventListener("click", function (e) { if (!closest(e.target, ".wb-menu-cta")) closeAllCta(); });

  function init() {
    initBeThemeCta();
    initBeThemeSidemenu();
    $all(".wh-header").forEach(initKitHeader);
    $all(".wh-acc").forEach(initAccordion);
    $all(".wh-radiocards").forEach(initRadioCards);
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init); else init();
})();
