/**
 * fix-hero-nav-contrast.js
 * Run from your project root:   node fix-hero-nav-contrast.js
 *
 * The dark overlay over the hero was strongest near the bottom (for the
 * headline) but noticeably weaker right at the top, exactly where the
 * nav logo sits — so bright video content there wasn't getting darkened
 * enough. This does two things:
 *  1. Strengthens the overlay at the top of the hero specifically.
 *  2. Adds a soft text-shadow to the nav logo/links while they're sitting
 *     over the hero (not on other pages), so they stay readable no matter
 *     what's playing behind them at any given moment, not just on average.
 */
const fs = require("fs");
const path = require("path");
const root = process.cwd();
const cssPath = path.join(root, "app", "globals.css");

if (!fs.existsSync(cssPath)) {
  console.error("✖ Can't find app/globals.css — run this from your project root.");
  process.exit(1);
}

let css = fs.readFileSync(cssPath, "utf8");
const before = css;

/* 1) strengthen the scrim, specifically the top-of-hero opacity */
const oldScrim = `.hero__scrim { background:
    linear-gradient(0deg, rgba(13,10,7,.97) 0%, rgba(13,10,7,.68) 34%, rgba(13,10,7,.28) 58%, rgba(13,10,7,.48) 100%),
    linear-gradient(100deg, rgba(13,10,7,.6) 0%, rgba(13,10,7,0) 42%); }`;

const newScrim = `.hero__scrim { background:
    linear-gradient(0deg, rgba(13,10,7,.97) 0%, rgba(13,10,7,.7) 34%, rgba(13,10,7,.45) 58%, rgba(13,10,7,.65) 100%),
    linear-gradient(100deg, rgba(13,10,7,.6) 0%, rgba(13,10,7,0) 42%); }`;

if (css.includes(newScrim)) {
  console.log("• scrim already strengthened, left as is");
} else if (css.includes(oldScrim)) {
  css = css.replace(oldScrim, newScrim);
  console.log("✓ strengthened the hero overlay near the top (where the nav sits)");
} else {
  console.log("• could not find the exact scrim rule to update automatically — the text-shadow fix below will still help, but check .hero__scrim by hand too");
}

/* 2) text-shadow insurance on the nav while it's over the hero (not scrolled, not on other pages) */
const marker = "keeps the nav readable over the hero";
if (!css.includes(marker)) {
  css = css.trimEnd() + `

/* ${marker} regardless of what the video is showing at any moment */
.nav:not(.is-scrolled) .nav__logo,
.nav:not(.is-scrolled) .nav__link {
  text-shadow: 0 1px 12px rgba(0,0,0,.55), 0 1px 2px rgba(0,0,0,.5);
}
`;
  console.log("✓ added text-shadow insurance to the nav for while it's over the hero");
} else {
  console.log("• nav text-shadow already present, left as is");
}

fs.writeFileSync(cssPath, css, "utf8");

if (css === before) {
  console.log("\nNo changes were needed — everything already matches the latest version.");
} else {
  console.log("\nSave, and your dev server should pick this up automatically (it's just CSS, no restart needed). Reload the page.");
}
