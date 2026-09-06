/**
 * auto-hero-video.js
 * Run from your project root:   node auto-hero-video.js
 *
 * Replaces the manual "put the file in exactly this folder" approach with
 * one that finds your video itself. After this, the hero page looks in
 * public/videos/, public/images/videos/, and public/ directly, in that
 * order, for the first .mp4/.webm/.mov file it finds, and uses it, no
 * path to get right, no filename to match in the code.
 *
 * Practically: your current mbg.mp4, wherever it's sitting right now,
 * will just be picked up. Drop in a different video later and it's
 * picked up too, nothing to edit.
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

// 1) add the auto-discovery helper, right after the imports
if (!src.includes("function findHeroVideo")) {
  const importBlock = `import HomeScripts from "@/components/HomeScripts";
import { TESTIMONIALS, INSTAGRAM, JOURNAL_MEDIA } from "@/lib/data";`;

  const withHelper = `import fs from "fs";
import path from "path";
import HomeScripts from "@/components/HomeScripts";
import { TESTIMONIALS, INSTAGRAM, JOURNAL_MEDIA } from "@/lib/data";

// Looks for an actual video file instead of requiring an exact hardcoded
// path. Checks these folders, in order, for the first video file it finds.
// Runs at build time on the server, costs nothing at runtime.
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

const heroVideo = findHeroVideo();`;

  if (!src.includes(importBlock)) {
    console.error("✖ Could not find the expected import block at the top of app/page.js — it may have changed since this script was written. No changes made.");
    process.exit(1);
  }
  src = src.replace(importBlock, withHelper);
}

// 2) replace the whole <video>...</video> block, whatever state it's currently in
const videoBlockPattern = /<video className="hero__video"[^>]*>[\s\S]*?<\/video>/;
const newVideoBlock = `<video className="hero__video" id="heroVideo" muted loop playsInline preload="metadata" aria-hidden="true">
            {heroVideo && <source src={heroVideo.src} type={heroVideo.type} />}
          </video>`;

if (!videoBlockPattern.test(src)) {
  console.error("✖ Could not find the <video className=\"hero__video\"> block in app/page.js. No changes made — the file may have changed since this script was written.");
  process.exit(1);
}
src = src.replace(videoBlockPattern, newVideoBlock);

if (src === before) {
  console.log("• app/page.js already uses the auto-discovering hero video — nothing to change.");
} else {
  fs.writeFileSync(pagePath, src, "utf8");
  console.log("✓ updated app/page.js — the hero video now finds itself automatically");
}

console.log("\nRestart the dev server (Ctrl+C, then npm run dev) and reload. Whatever video file is sitting in public/videos/, public/images/videos/, or public/ will be used, no path to match by hand.");
