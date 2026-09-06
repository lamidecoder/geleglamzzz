/**
 * fix-hero-ghost-button.js
 * Run from your project root:   node fix-hero-ghost-button.js
 *
 * The "Discover the artistry" button uses the .btn--ghost style, which
 * defaults to dark text for use on light backgrounds. It was never given
 * the light-text version it needs for sitting on the dark hero, so it was
 * rendering dark text on a dark background, only barely visible where the
 * video happened to be light behind it. This gives it its own light-text
 * rule scoped just to the hero, without touching the other button (Book
 * your experience), which is already correct as is.
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
const marker = "hero ghost button — light text, this section is always dark";

if (css.includes(marker)) {
  console.log("• already applied, left as is");
} else {
  css = css.trimEnd() + `

/* ${marker} */
.hero .btn--ghost { color: var(--ivory); }
.hero .btn--ghost:hover { background: var(--ivory); color: var(--void); }
`;
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("✓ fixed the hero's ghost button (Discover the artistry) to use light text");
}

console.log("\nCSS only — save and reload, no restart needed.");
