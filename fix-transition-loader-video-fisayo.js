/**
 * fix-transition-loader-video-fisayo.js
 * Run from your project root:   node fix-transition-loader-video-fisayo.js
 *
 * Pulled your actual repo from GitHub and tested everything directly
 * rather than guessing again. Four real, confirmed issues, three were
 * genuine bugs, not settings or connection issues:
 *
 * 1. PAGE TRANSITION — the real bug. components/PageTransition.js was
 *    never actually wired into app/layout.js. It got dropped when I
 *    rewrote that file for the loader redesign and carried the omission
 *    forward from there — the component existed but was never rendered,
 *    so nothing about clicking a link would ever trigger it. Confirmed
 *    by checking the live DOM: the transition overlay didn't exist on
 *    the page at all. This fully explains "wavy transition not working."
 *
 * 2. PRELOADER — same root cause as last time, sent again in case that
 *    last fix hadn't been applied yet: the loader still had its old
 *    solid background, which blocks the curtain bars from revealing the
 *    actual page as they part.
 *
 * 3. HERO VIDEO — a genuine race condition, confirmed with the video's
 *    own readyState: on a fast connection, the video can finish loading
 *    before the code that listens for "it's ready" even attaches, so the
 *    listener waits for an event that already happened and never shows
 *    the video. Now checks if it's already loaded first.
 *
 * 4. FISAYO ALONGE — rewritten as notable work, not a guest feature,
 *    matching how Ayra Starr is framed.
 */
const fs = require("fs");
const path = require("path");
const root = process.cwd();

function fail(msg) { console.error("✖ " + msg); process.exit(1); }
const layoutPath = path.join(root, "app", "layout.js");
const cssPath = path.join(root, "app", "globals.css");
const pagePath = path.join(root, "app", "page.js");
const homeScriptsPath = path.join(root, "components", "HomeScripts.js");

for (const p of [layoutPath, cssPath, pagePath, homeScriptsPath]) {
  if (!fs.existsSync(p)) fail(`Can't find ${p} — run this from your project root.`);
}

/* ---------- 1. PageTransition actually wired into layout.js ---------- */
let layout = fs.readFileSync(layoutPath, "utf8");
if (layout.includes("<PageTransition />")) {
  console.log("• PageTransition already wired in, left as is");
} else {
  const importAnchor = 'import GlobalScripts from "@/components/GlobalScripts";';
  const renderAnchor = "<GlobalScripts />";
  if (!layout.includes(importAnchor) || !layout.includes(renderAnchor)) {
    fail("Could not find the expected anchors in app/layout.js to wire in PageTransition. Add `import PageTransition from \"@/components/PageTransition\";` near the other imports, and `<PageTransition />` right after `<GlobalScripts />`, by hand.");
  }
  layout = layout.replace(importAnchor, importAnchor + '\nimport PageTransition from "@/components/PageTransition";');
  layout = layout.replace(renderAnchor, renderAnchor + "\n        <PageTransition />");
  fs.writeFileSync(layoutPath, layout, "utf8");
  console.log("✓ wired PageTransition into app/layout.js — this was the actual bug");
}

/* ---------- 2. loader background ---------- */
let css = fs.readFileSync(cssPath, "utf8");
const oldLoader = ".loader {\n  position: fixed; inset: 0; z-index: 1000; background: var(--void);";
const newLoader = ".loader {\n  position: fixed; inset: 0; z-index: 1000;";
if (css.includes(newLoader) && !css.includes(oldLoader)) {
  console.log("• loader background already fixed, left as is");
} else if (css.includes(oldLoader)) {
  css = css.replace(oldLoader, newLoader);
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("✓ fixed the loader background blocking the reveal");
} else {
  console.log("• couldn't find the exact .loader rule to patch automatically — check it by hand, it shouldn't have a background property");
}

/* ---------- 3. hero video race condition ---------- */
const newHomeScripts = '"use client";\nimport { useEffect } from "react";\nimport useReveal from "@/lib/useReveal";\n\nexport default function HomeScripts() {\n  useReveal();\n\n  useEffect(() => {\n    const prefersReducedMotion = window.__prefersReducedMotion;\n\n    function playHeroIntro(skip) {\n      const heroLines = document.querySelectorAll(".hero__headline .line span");\n      const heroFoot = document.querySelector(".hero__foot");\n      const shutterBars = document.querySelectorAll("#heroShutter span");\n      const marks = document.getElementById("heroMarks");\n      const issue = document.getElementById("heroIssue");\n      const video = document.getElementById("heroVideo");\n\n      if (video && !prefersReducedMotion) {\n        const showVideo = () => video.classList.add("is-ready");\n        if (video.readyState >= 3) {\n          // preload="auto" can finish loading before this code even runs,\n          // especially on a fast connection — if so, canplay/loadeddata\n          // already fired and this listener would never see them.\n          showVideo();\n        } else {\n          video.addEventListener("canplay", showVideo);\n          video.addEventListener("loadeddata", showVideo);\n        }\n        video.addEventListener("error", () => {\n          const err = video.error;\n          console.error(\n            "[hero video] failed to load. Check the file path and that it\'s a standard H.264 .mp4 — most phone HEVC exports won\'t play in Chrome/Firefox.",\n            err ? { code: err.code, message: err.message } : ""\n          );\n        });\n        const p = video.play();\n        if (p && p.catch) p.catch((err) => console.warn("[hero video] play() was blocked:", err));\n      }\n      if (marks) marks.classList.add("is-in");\n      if (issue) issue.classList.add("is-in");\n\n      if (skip || !window.gsap) {\n        heroLines.forEach((s) => { s.style.transform = "none"; });\n        shutterBars.forEach((s) => { s.style.transform = "scaleY(0)"; });\n        return;\n      }\n      gsap.timeline({ defaults: { ease: "power4.inOut" } })\n        .to(shutterBars, { scaleY: 0, duration: 0.95, stagger: 0.07 }, 0)\n        .to(heroLines, { y: "0%", duration: 0.95, stagger: 0.09, ease: "power4.out" }, 0.45)\n        .fromTo(heroFoot, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.85);\n    }\n\n    function onLoaderDone(e) { playHeroIntro(e?.detail?.skip); }\n    window.addEventListener("gg:loaderDone", onLoaderDone);\n    // if the loader already fired before this page mounted (e.g. client nav back to home), play immediately\n    const loaderEl = document.getElementById("loader");\n    if (loaderEl && loaderEl.style.display === "none") playHeroIntro(true);\n\n    // hero background parallax\n    let st;\n    if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {\n      const media = document.querySelector(".hero__media");\n      if (media) {\n        st = gsap.to(media, {\n          yPercent: 14, ease: "none",\n          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },\n        });\n      }\n    }\n\n    // testimonial rotation\n    const slides = document.querySelectorAll(".testimonial");\n    const dots = document.querySelectorAll("[data-testimonial-dot]");\n    const prevBtn = document.getElementById("testimonialPrev");\n    const nextBtn = document.getElementById("testimonialNext");\n    const countEl = document.getElementById("testimonialCount");\n    let idx = 0, timer;\n    function show(i) {\n      idx = (i + slides.length) % slides.length;\n      slides.forEach((s, j) => s.classList.toggle("is-active", j === idx));\n      dots.forEach((d, j) => d.classList.toggle("is-active", j === idx));\n      document.querySelectorAll("[data-test-media]").forEach((m, j) => m.classList.toggle("is-active", j === idx));\n      if (countEl) countEl.textContent = `0${idx + 1} / 0${slides.length}`;\n    }\n    function next() { show(idx + 1); }\n    function startAuto() { if (prefersReducedMotion) return; clearInterval(timer); timer = setInterval(next, 6000); }\n    dots.forEach((d, i) => d.addEventListener("click", () => { show(i); startAuto(); }));\n    if (prevBtn) prevBtn.addEventListener("click", () => { show(idx - 1); startAuto(); });\n    if (nextBtn) nextBtn.addEventListener("click", () => { show(idx + 1); startAuto(); });\n    if (slides.length) startAuto();\n\n    return () => {\n      window.removeEventListener("gg:loaderDone", onLoaderDone);\n      if (st && st.scrollTrigger) st.scrollTrigger.kill();\n      clearInterval(timer);\n    };\n  }, []);\n\n  return null;\n}\n';
const currentHomeScripts = fs.readFileSync(homeScriptsPath, "utf8");
if (currentHomeScripts === newHomeScripts) {
  console.log("• hero video race condition already fixed, left as is");
} else {
  fs.writeFileSync(homeScriptsPath, newHomeScripts, "utf8");
  console.log("✓ fixed the hero video race condition in components/HomeScripts.js");
}

/* ---------- 4. Fisayo copy ---------- */
let page = fs.readFileSync(pagePath, "utf8");
const oldEyebrow = '<span className="eyebrow" style={{ color: "var(--gold-soft)" }}>Special Guest</span>\n              <h2 className="h3" style={{ marginTop: ".8rem" }}>Styled alongside<br />Fisayo Alonge.</h2>';
const newEyebrow = '<span className="eyebrow" style={{ color: "var(--gold-soft)" }}>Notable Work</span>\n              <h2 className="h3" style={{ marginTop: ".8rem" }}>Styled for<br />the moment.</h2>';
const oldBody = '<p className="body-copy" style={{ marginTop: "1.2rem" }}>Another notable name in the Gele Glamzzz story, details to follow shortly.</p>';
const newBody = '<p className="body-copy" style={{ marginTop: "1.2rem" }}>Fisayo Alonge, styled by Gele Glamzzz, wearing a crown built for exactly that kind of presence.</p>';

let fisayoChanged = false;
if (page.includes(oldEyebrow)) { page = page.replace(oldEyebrow, newEyebrow); fisayoChanged = true; }
if (page.includes(oldBody)) { page = page.replace(oldBody, newBody); fisayoChanged = true; }
if (fisayoChanged) {
  fs.writeFileSync(pagePath, page, "utf8");
  console.log("✓ reframed Fisayo Alonge as notable work, matching Ayra Starr");
} else if (page.includes("Notable Work") && page.includes("Styled for") && page.includes("the moment")) {
  console.log("• Fisayo copy already updated, left as is");
} else {
  console.log("• couldn't find the exact Fisayo section text to patch automatically — check the section after Ayra Starr by hand");
}

console.log("\nDone. Restart the dev server (Ctrl+C, then npm run dev) since layout.js and page.js both changed.");
