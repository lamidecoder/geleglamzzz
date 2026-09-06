/**
 * diagnose-hero-video.js
 * Run from your project root:   node diagnose-hero-video.js
 *
 * Doesn't change what the video does, just makes failures visible instead
 * of silent. Right now, if the video can't load for any reason (bad codec,
 * wrong path, corrupted file), it just quietly stays invisible forever with
 * nothing in the console to tell you why. After this:
 *   - a load/format problem prints a clear message + the real MediaError
 *     to the browser console (F12 → Console tab)
 *   - the video also has a second, earlier trigger (loadeddata) alongside
 *     canplay, so it can only get stuck invisible for a genuine load
 *     failure, not a slow-to-fire event
 */
const fs = require("fs");
const path = require("path");
const root = process.cwd();
const file = path.join(root, "components", "HomeScripts.js");

if (!fs.existsSync(file)) {
  console.error("✖ Can't find components/HomeScripts.js — run this from your project root.");
  process.exit(1);
}

let src = fs.readFileSync(file, "utf8");
const before = src;

const OLD = `      if (video && !prefersReducedMotion) {
        video.addEventListener("canplay", () => video.classList.add("is-ready"));
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
      }`;

const NEW = `      if (video && !prefersReducedMotion) {
        const showVideo = () => video.classList.add("is-ready");
        video.addEventListener("canplay", showVideo);
        video.addEventListener("loadeddata", showVideo);
        video.addEventListener("error", () => {
          const err = video.error;
          console.error(
            "[hero video] failed to load. Check the file path and that it's a standard H.264 .mp4 — most phone HEVC exports won't play in Chrome/Firefox.",
            err ? { code: err.code, message: err.message } : ""
          );
        });
        const p = video.play();
        if (p && p.catch) p.catch((err) => console.warn("[hero video] play() was blocked:", err));
      }`;

if (!src.includes(OLD)) {
  console.error("✖ Could not find the expected hero video block in components/HomeScripts.js — it may already be updated, or the file has changed since this script was written.");
  process.exit(1);
}

src = src.replace(OLD, NEW);
fs.writeFileSync(file, src, "utf8");
console.log("✓ updated components/HomeScripts.js with load/error diagnostics for the hero video");
console.log("\nRun npm run dev, open the browser console (F12), and reload the home page.");
console.log("If the video still doesn't show, whatever prints in the console now is the real reason.");
