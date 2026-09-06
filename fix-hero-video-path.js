/**
 * fix-hero-video-path.js
 * Run from your project root:   node fix-hero-video-path.js
 *
 * TROUBLESHOOTING RESULT:
 * Your terminal log showed "GET /videos/mbg.mp4 404" — a 404 means the
 * server looked for the file and it wasn't there. Your file tree shows
 * mbg.mp4 is actually inside public/images/videos/, not public/videos/,
 * so the path in the code (/videos/mbg.mp4) and the file's real location
 * didn't match. Nothing wrong with the video file or the browser.
 *
 * This script moves mbg.mp4 to the location the code already expects
 * (public/videos/mbg.mp4), creating that folder if needed. It does not
 * touch app/page.js — that file was already correct.
 */
const fs = require("fs");
const path = require("path");
const root = process.cwd();

const wrongPath = path.join(root, "public", "images", "videos", "mbg.mp4");
const rightDir = path.join(root, "public", "videos");
const rightPath = path.join(rightDir, "mbg.mp4");

if (fs.existsSync(rightPath)) {
  console.log("✓ public/videos/mbg.mp4 already exists — nothing to move.");
  process.exit(0);
}

if (!fs.existsSync(wrongPath)) {
  console.error("✖ Couldn't find the file at public/images/videos/mbg.mp4 or public/videos/mbg.mp4.");
  console.error("  Check where mbg.mp4 actually sits in your public folder and let me know the real path.");
  process.exit(1);
}

fs.mkdirSync(rightDir, { recursive: true });
fs.renameSync(wrongPath, rightPath);
console.log("✓ moved mbg.mp4 from public/images/videos/ to public/videos/");

// clean up the now-empty public/images/videos folder, but only if it's actually empty
const oldDir = path.join(root, "public", "images", "videos");
try {
  if (fs.existsSync(oldDir) && fs.readdirSync(oldDir).length === 0) {
    fs.rmdirSync(oldDir);
    console.log("✓ removed the now-empty public/images/videos folder");
  }
} catch {
  // non-critical, leave it if it can't be removed for any reason
}

console.log("\nDone. Restart the dev server (Ctrl+C, then npm run dev) and reload the home page — the video should now load.");
