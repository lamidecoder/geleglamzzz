/**
 * add-page-transition.js
 * Run from your project root:   node add-page-transition.js
 *
 * Adds back the shutter/curtain page transition between routes:
 *  - creates components/PageTransition.js
 *  - wires it into app/layout.js
 *  - appends its CSS to app/globals.css
 *
 * Safe to run once. If you run it again after already applying it,
 * it detects the existing wiring and skips that step instead of duplicating it.
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const layoutPath = path.join(root, "app", "layout.js");
const cssPath = path.join(root, "app", "globals.css");
const componentPath = path.join(root, "components", "PageTransition.js");

function fail(msg) {
  console.error("✖ " + msg);
  process.exit(1);
}

if (!fs.existsSync(layoutPath)) fail(`Can't find ${layoutPath}. Run this from the project root (the folder with package.json).`);
if (!fs.existsSync(cssPath)) fail(`Can't find ${cssPath}.`);

const COMPONENT_SOURCE = `"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * The shutter/curtain sweep played between page navigations.
 * Rendered once in the root layout — intercepts internal link clicks,
 * plays the "close" sweep, lets Next.js actually route, then plays
 * the "open" sweep once the new page has mounted.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const isFirstRender = useRef(true);

  // intercept internal link clicks and play the closing sweep first
  useEffect(() => {
    const overlay = document.getElementById("pageTransition");
    if (!overlay) return;
    const bars = overlay.querySelectorAll("span");

    function handleClick(e) {
      const a = e.target.closest("a");
      if (!a) return;
      if (a.target === "_blank" || a.hasAttribute("data-placeholder-link")) return;

      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/")) return; // only same-app routes

      let url;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.pathname === window.location.pathname) return; // same page, leave anchors alone

      const prefersReducedMotion = window.__prefersReducedMotion;
      if (prefersReducedMotion || !window.gsap) return; // let Next.js's own Link navigate normally

      e.preventDefault();
      overlay.classList.add("is-active");
      gsap.to(bars, {
        scaleY: 1,
        duration: 0.45,
        stagger: 0.035,
        ease: "power3.inOut",
        onComplete: () => router.push(href),
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  // once the new page has mounted, play the opening sweep
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const overlay = document.getElementById("pageTransition");
    if (!overlay) return;
    const bars = overlay.querySelectorAll("span");
    const prefersReducedMotion = window.__prefersReducedMotion;

    if (prefersReducedMotion || !window.gsap) {
      overlay.classList.remove("is-active");
      return;
    }
    gsap.to(bars, {
      scaleY: 0,
      duration: 0.5,
      stagger: 0.035,
      ease: "power3.inOut",
      delay: 0.05,
      onComplete: () => overlay.classList.remove("is-active"),
    });
  }, [pathname]);

  return (
    <div className="page-transition" id="pageTransition" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
  );
}
`;

const CSS_BLOCK = `
/* ==========================================================================
   PAGE TRANSITION — the shutter/curtain sweep between routes
   ========================================================================== */
.page-transition { position: fixed; inset: 0; z-index: 9000; display: flex; pointer-events: none; }
.page-transition span { flex: 1 1 0; background: var(--void); transform: scaleY(0); transform-origin: bottom; }
.page-transition span + span { border-left: 1px solid rgba(0,0,0,.2); }
.page-transition.is-active { pointer-events: auto; }
`;

// 1) write the component (create or overwrite with the latest version)
fs.mkdirSync(path.dirname(componentPath), { recursive: true });
fs.writeFileSync(componentPath, COMPONENT_SOURCE, "utf8");
console.log("✓ wrote components/PageTransition.js");

// 2) append the CSS, unless it's already there
const css = fs.readFileSync(cssPath, "utf8");
if (css.includes(".page-transition {")) {
  console.log("• globals.css already has .page-transition styles, left as is");
} else {
  fs.writeFileSync(cssPath, css.trimEnd() + "\n" + CSS_BLOCK, "utf8");
  console.log("✓ appended page-transition CSS to app/globals.css");
}

// 3) wire it into the layout
let layout = fs.readFileSync(layoutPath, "utf8");
if (layout.includes("PageTransition")) {
  console.log("• app/layout.js already references PageTransition, left as is");
} else {
  if (!layout.includes('import GlobalScripts from "@/components/GlobalScripts";')) {
    fail('Could not find the expected GlobalScripts import in app/layout.js — the file may have changed since this script was written. Add `import PageTransition from "@/components/PageTransition";` and `<PageTransition />` (next to `<GlobalScripts />`) by hand instead.');
  }
  layout = layout.replace(
    'import GlobalScripts from "@/components/GlobalScripts";',
    'import GlobalScripts from "@/components/GlobalScripts";\nimport PageTransition from "@/components/PageTransition";'
  );
  layout = layout.replace(
    "<GlobalScripts />",
    "<GlobalScripts />\n        <PageTransition />"
  );
  fs.writeFileSync(layoutPath, layout, "utf8");
  console.log("✓ wired PageTransition into app/layout.js");
}

console.log("\nDone. Run `npm run dev` and click between nav items to see the sweep.");
