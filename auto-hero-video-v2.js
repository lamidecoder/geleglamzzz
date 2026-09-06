/**
 * auto-hero-video-v2.js
 * Run from your project root:   node auto-hero-video-v2.js
 *
 * Supersedes auto-hero-video.js. That version looked for the video file
 * once, when the server first started — if the dev server was only
 * hot-reloaded rather than fully restarted afterward, it could keep
 * using that first (empty) result. This version checks fresh on every
 * single page load instead, so a restart timing issue can't cause it to
 * miss a video that's actually there.
 *
 * Safe to run whether or not you already ran the previous version —
 * it detects and replaces that older setup automatically.
 */
const fs = require("fs");
const path = require("path");
const root = process.cwd();
const pagePath = path.join(root, "app", "page.js");

if (!fs.existsSync(pagePath)) {
  console.error("✖ Can't find app/page.js — run this from your project root.");
  process.exit(1);
}

let src = fs.readFileSync(pagePath, "utf8");
const before = src;

/* ---- step 1: strip anything the older script may have already added ---- */
src = src.replace(/import fs from "fs";\n/, "");
src = src.replace(/import path from "path";\n/, "");
src = src.replace(/\/\/ Looks for an actual video file[\s\S]*?\nfunction findHeroVideo\(\) \{[\s\S]*?\n\}\n\nconst heroVideo = findHeroVideo\(\);\n\n/, "");
src = src.replace(/\/\/ Looks for an actual video file[\s\S]*?\nfunction findHeroVideo\(\) \{[\s\S]*?\n\}\n\n/, "");
src = src.replace(/\nconst heroVideo = findHeroVideo\(\);\n/, "\n");
src = src.replace(/\n  const heroVideo = findHeroVideo\(\);\n/, "\n");

/* ---- step 2: add the import ---- */
const importLine = 'import HomeScripts from "@/components/HomeScripts";';
if (!src.includes(importLine)) {
  console.error("✖ Could not find the expected import line in app/page.js. No changes made.");
  process.exit(1);
}
src = src.replace(importLine, `import fs from "fs";\nimport path from "path";\n${importLine}`);

/* ---- step 3: add the helper function, at module scope, above the component ---- */
const helperFn = `// Looks for an actual video file instead of requiring an exact hardcoded
// path. Checks these folders, in order, for the first video file it finds.
// Called fresh on every page load (see inside HomePage below), never cached.
function findHeroVideo() {
  const searchDirs = [
    path.join(process.cwd(), "public", "videos"),
    path.join(process.cwd(), "public", "images", "videos"),
    path.join(process.cwd(), "public"),
  ];
  const extToType = { ".mp4": "video/mp4", ".webm": "video/webm", ".mov": "video/quicktime" };
  try {
    for (const dir of searchDirs) {
      if (!fs.existsSync(dir)) continue;
      const match = fs.readdirSync(dir).find((f) => extToType[path.extname(f).toLowerCase()]);
      if (match) {
        const relDir = path.relative(path.join(process.cwd(), "public"), dir).split(path.sep).filter(Boolean).join("/");
        return {
          src: "/" + (relDir ? relDir + "/" : "") + match,
          type: extToType[path.extname(match).toLowerCase()],
        };
      }
    }
  } catch {
    // if anything goes wrong reading the filesystem, just fall back to no video
  }
  return null;
}

`;

const componentDecl = "export default function HomePage() {";
if (!src.includes(componentDecl)) {
  console.error("✖ Could not find 'export default function HomePage() {' in app/page.js. No changes made.");
  process.exit(1);
}
src = src.replace(componentDecl, helperFn + componentDecl);

/* ---- step 4: call it fresh, as the first line INSIDE the component ---- */
src = src.replace(
  componentDecl,
  `${componentDecl}\n  const heroVideo = findHeroVideo(); // checked fresh on every request, not cached`
);

/* ---- step 5: make sure the <video> block actually uses it ---- */
const videoBlockPattern = /<video className="hero__video"[^>]*>[\s\S]*?<\/video>/;
const newVideoBlock = `<video className="hero__video" id="heroVideo" muted loop playsInline preload="metadata" aria-hidden="true">
            {heroVideo && <source src={heroVideo.src} type={heroVideo.type} />}
          </video>`;

if (!videoBlockPattern.test(src)) {
  console.error("✖ Could not find the <video className=\"hero__video\"> block in app/page.js. No changes made.");
  process.exit(1);
}
src = src.replace(videoBlockPattern, newVideoBlock);

if (src === before) {
  console.log("• No changes needed — already up to date.");
} else {
  fs.writeFileSync(pagePath, src, "utf8");
  console.log("✓ updated app/page.js — hero video is now looked up fresh on every page load");
}

console.log("\nFully stop the dev server (Ctrl+C in the terminal, not just save-and-refresh) then run npm run dev again, and reload the page.");
