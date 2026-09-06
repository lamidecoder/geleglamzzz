/**
 * fix-fisayo-and-diagnostics.js
 * Run from your project root:   node fix-fisayo-and-diagnostics.js
 *
 * 1. Fixes the Fisayo section: it had "background" set but not the
 *    matching "color", so the heading had nothing correct to inherit and
 *    rendered dark text on that same dark background — invisible, same
 *    category of bug as the Ayra Starr one from before, just a spot I
 *    missed when building that section.
 *
 * 2. Adds real console diagnostics to the page transition so we stop
 *    guessing. Two most likely reasons it looks like it's "not working":
 *      - Your system's reduce-motion accessibility setting is on, which
 *        correctly and intentionally skips ALL animation on the site
 *        (the loader too) — this is the same setting I asked about
 *        earlier for the video, worth checking again:
 *        Windows: Settings -> Accessibility -> Visual effects ->
 *        Animation effects -> should be ON.
 *      - GSAP hasn't loaded yet from its CDN when you click.
 *    Both cases still navigate you to the page correctly, just without
 *    the sweep. After this, open the browser console (F12) and click a
 *    nav link — it'll now print exactly which of the two it is, if either.
 *
 * On the hero video: I checked the actual code and the auto-detection
 * logic is intact, nothing regressed there. If it's not showing, it's
 * almost certainly just the dev server needing a full restart (Ctrl+C,
 * then npm run dev) after the last few scripts rewrote app/page.js —
 * Next.js dev mode doesn't always pick up server-side file changes like
 * that on a hot-reload alone.
 */
const fs = require("fs");
const path = require("path");
const root = process.cwd();

function fail(msg) { console.error("✖ " + msg); process.exit(1); }
const pagePath = path.join(root, "app", "page.js");
if (!fs.existsSync(pagePath)) fail("Can't find app/page.js — run this from your project root.");

/* ---------- 1. Fisayo section color fix ---------- */
let page = fs.readFileSync(pagePath, "utf8");
const oldStyle = '<section className="section-pad on-dark" style={{ background: "var(--void)" }}>';
const newStyle = '<section className="section-pad on-dark" style={{ background: "var(--void)", color: "var(--ivory)" }}>';

if (page.includes(newStyle)) {
  console.log("• Fisayo section already fixed, left as is");
} else if (page.includes(oldStyle)) {
  page = page.replace(oldStyle, newStyle);
  fs.writeFileSync(pagePath, page, "utf8");
  console.log("✓ fixed invisible heading in the Fisayo section");
} else {
  console.log("• couldn't find the exact Fisayo section tag to patch automatically — check the section after Ayra Starr by hand, it needs color: \"var(--ivory)\" alongside its background");
}

/* ---------- 2. PageTransition diagnostics ---------- */
fs.writeFileSync(path.join(root, "components", "PageTransition.js"), '"use client";\nimport { useEffect, useRef } from "react";\nimport { usePathname, useRouter } from "next/navigation";\n\n/**\n * The shutter/curtain sweep played between page navigations.\n * Rendered once in the root layout. Exposes window.__navigateWithTransition\n * so ANY part of the app (a plain <a>, or a JS-driven navigation like a\n * clicked service row) can trigger the same animated route change.\n */\nexport default function PageTransition() {\n  const pathname = usePathname();\n  const router = useRouter();\n  const isFirstRender = useRef(true);\n  const routerRef = useRef(router);\n  routerRef.current = router;\n\n  // the one shared way to navigate-with-animation\n  useEffect(() => {\n    function navigate(href) {\n      const overlay = document.getElementById("pageTransition");\n      const bars = overlay ? overlay.querySelectorAll("span") : [];\n      const prefersReducedMotion = window.__prefersReducedMotion;\n      if (!overlay || !bars.length || prefersReducedMotion || !window.gsap) {\n        if (prefersReducedMotion) console.info("[page transition] skipped: your system\'s reduce-motion setting is on.");\n        else if (!window.gsap) console.warn("[page transition] skipped: GSAP hasn\'t loaded. Navigation still works, just without the sweep.");\n        routerRef.current.push(href);\n        return;\n      }\n      overlay.classList.add("is-active");\n      gsap.to(bars, {\n        scaleY: 1,\n        duration: 0.45,\n        stagger: 0.035,\n        ease: "power3.inOut",\n        onComplete: () => routerRef.current.push(href),\n      });\n    }\n    window.__navigateWithTransition = navigate;\n    return () => { delete window.__navigateWithTransition; };\n  }, []);\n\n  // intercept internal link clicks in the CAPTURE phase, ahead of any other\n  // click handling on the link itself, and fully stop the click there\n  useEffect(() => {\n    function handleClick(e) {\n      const a = e.target.closest("a");\n      if (!a) return;\n      if (a.target === "_blank" || a.hasAttribute("data-placeholder-link")) return;\n\n      const href = a.getAttribute("href");\n      if (!href || !href.startsWith("/")) return;\n\n      let url;\n      try {\n        url = new URL(href, window.location.href);\n      } catch {\n        return;\n      }\n      if (url.pathname === window.location.pathname) return; // same page, leave anchors alone\n      if (!window.__navigateWithTransition) return;\n\n      e.preventDefault();\n      e.stopPropagation();\n      window.__navigateWithTransition(href);\n    }\n    document.addEventListener("click", handleClick, true); // capture phase\n    return () => document.removeEventListener("click", handleClick, true);\n  }, []);\n\n  // once the new page has mounted, play the opening sweep\n  useEffect(() => {\n    if (isFirstRender.current) {\n      isFirstRender.current = false;\n      return;\n    }\n    const overlay = document.getElementById("pageTransition");\n    if (!overlay) return;\n    const bars = overlay.querySelectorAll("span");\n    const prefersReducedMotion = window.__prefersReducedMotion;\n\n    if (prefersReducedMotion || !window.gsap) {\n      overlay.classList.remove("is-active");\n      return;\n    }\n    gsap.to(bars, {\n      scaleY: 0,\n      duration: 0.5,\n      stagger: 0.035,\n      ease: "power3.inOut",\n      delay: 0.05,\n      onComplete: () => overlay.classList.remove("is-active"),\n    });\n  }, [pathname]);\n\n  return (\n    <div className="page-transition" id="pageTransition" aria-hidden="true">\n      <span></span><span></span><span></span><span></span><span></span><span></span>\n    </div>\n  );\n}\n', "utf8");
console.log("✓ wrote components/PageTransition.js (added diagnostics)");

console.log("\nRestart the dev server, then open the browser console (F12) before clicking between pages — it'll tell us exactly what's going on if the sweep still doesn't show.");
