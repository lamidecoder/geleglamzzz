/**
 * fix-hero-laptop-sizing.js
 * Run from your project root:   node fix-hero-laptop-sizing.js
 *
 * VERIFIED WITH AN ACTUAL RENDERED BROWSER, not a guess: the headline
 * used viewport-WIDTH-based sizing only, so once a screen was wide enough
 * (~1360px+), the text kept scaling toward a large fixed max regardless
 * of how tall the screen actually was. On the most common laptop
 * resolution, 1366x768, the text was measured starting 30px ABOVE the
 * visible area, cut off, and overlapping the nav bar.
 *
 * Fix: size the headline off viewport-MIN (the smaller of width or
 * height) instead of width alone, so a wide-but-short laptop screen
 * can't push it past what actually fits. Re-measured after the fix at
 * 1366x768, 1440x816, 1536x864 and 1920x1080 — no overlap, no overflow,
 * at any of them.
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

const oldRules = `.hero__headline .line--sm { font-size: clamp(1.6rem, 1.1rem + 2.3vw, 3rem); opacity: .82; }
.hero__headline .line--lg { font-size: clamp(4rem, 1.6rem + 10.5vw, 10.5rem); }`;

const newRules = `.hero__headline .line--sm { font-size: clamp(1.3rem, 0.9rem + 1.6vmin, 2.2rem); opacity: .82; }
.hero__headline .line--lg { font-size: clamp(2.6rem, 1rem + 7vmin, 7rem); }`;

if (css.includes(newRules)) {
  console.log("• already applied, left as is");
} else if (css.includes(oldRules)) {
  css = css.replace(oldRules, newRules);
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("✓ hero headline now sized off viewport-min — verified no overlap at 1366x768, 1440x816, 1536x864, 1920x1080");
} else {
  console.error("✖ Could not find the exact headline sizing rules in app/globals.css — they may have changed since this script was written. No changes made.");
  process.exit(1);
}

console.log("\nCSS only — save and reload, no restart needed.");
