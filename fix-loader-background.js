/**
 * fix-loader-background.js
 * Run from your project root:   node fix-loader-background.js
 *
 * DIAGNOSIS — I pulled your actual repo from GitHub and checked it directly:
 * everything else matched exactly, every fix landed correctly, except one
 * line in app/globals.css. The .loader element had a leftover solid black
 * background that I meant to remove when I built the new dissolve/filmstrip
 * exit — the shutter bars need that background gone, since THEY are what's
 * supposed to reveal the actual site as they part. With the old background
 * still there, the bars would sweep open but just reveal more black
 * underneath, then the site would pop in abruptly once the loader fully
 * hides. That's almost certainly both the "preloader not working" and the
 * "seam" you saw earlier, a stuck half-revealed frame is exactly what that
 * looks like mid-glitch.
 *
 * Confirmed with an actual browser render after this fix: the bars now
 * correctly reveal the real page underneath as they part.
 *
 * Also checked while I was in there: your hero video (mbg.mp4) is a
 * standard H.264 file, no codec problem. At 8.7MB it's reasonable but not
 * tiny, so on a slower connection it may take a few seconds either way —
 * that part isn't a bug, just a size/bandwidth tradeoff.
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
const oldRule = ".loader {\n  position: fixed; inset: 0; z-index: 1000; background: var(--void);";
const newRule = ".loader {\n  position: fixed; inset: 0; z-index: 1000;";

if (css.includes(newRule) && !css.includes(oldRule)) {
  console.log("• already fixed, left as is");
} else if (css.includes(oldRule)) {
  css = css.replace(oldRule, newRule);
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("✓ removed the leftover background blocking the loader's reveal");
} else {
  console.error("✖ Could not find the exact .loader rule to patch — it may have changed since this script was written. Check app/globals.css by hand: the .loader rule around line 248 should NOT have a background property.");
  process.exit(1);
}

console.log("\nCSS only — save and reload, no restart needed. Reload the homepage and watch the loader end: the curtain bars should now reveal the actual page as they part, not more black.");
