#!/usr/bin/env node
"use strict";

/**
 * Adds private Vercel Web Analytics to the Gele Glamzzz site.
 *
 * What this gives you: a private "Analytics" tab in your Vercel dashboard
 * showing visits, unique visitors, top countries, top pages, devices and
 * referrers — visible only to you when logged into your Vercel account.
 * Nothing is shown on the public website itself.
 *
 * Run this from the root of your project (the folder with package.json,
 * app/, components/, etc.):
 *
 *     node add-vercel-analytics.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();

function fail(msg) {
  console.error("\n❌ " + msg + "\n");
  process.exit(1);
}

const pkgPath = path.join(root, "package.json");
if (!fs.existsSync(pkgPath)) {
  fail(
    "Couldn't find package.json in this folder.\n" +
      "Run this script from the root of your gele-glamzzz-nextjs/nextapp project\n" +
      "(the same folder that has package.json, app/, components/, etc.)."
  );
}

console.log("Setting up private website analytics (Vercel Web Analytics)...\n");

// ---------------------------------------------------------------------
// 1. package.json — add @vercel/analytics as a dependency (kept
//    alphabetised, matching how the other dependencies are already sorted).
// ---------------------------------------------------------------------
const ANALYTICS_VERSION = "^2.0.1";
const pkgRaw = fs.readFileSync(pkgPath, "utf8");
let pkg;
try {
  pkg = JSON.parse(pkgRaw);
} catch (e) {
  fail("package.json could not be read as valid JSON — nothing was changed. (" + e.message + ")");
}

let pkgChanged = false;
if (!pkg.dependencies) pkg.dependencies = {};
if (pkg.dependencies["@vercel/analytics"]) {
  console.log("- package.json already lists @vercel/analytics — leaving it as is.");
} else {
  pkg.dependencies["@vercel/analytics"] = ANALYTICS_VERSION;
  const sorted = {};
  Object.keys(pkg.dependencies)
    .sort()
    .forEach((k) => {
      sorted[k] = pkg.dependencies[k];
    });
  pkg.dependencies = sorted;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
  pkgChanged = true;
  console.log("done - Added @vercel/analytics to package.json");
}

// ---------------------------------------------------------------------
// 2. app/layout.js — import Analytics and render <Analytics /> in <body>.
// ---------------------------------------------------------------------
const layoutPath = path.join(root, "app", "layout.js");
if (!fs.existsSync(layoutPath)) {
  fail(
    "Couldn't find app/layout.js — nothing else was changed. Your project structure may have changed since this script was written."
  );
}

let layout = fs.readFileSync(layoutPath, "utf8");

if (layout.includes("@vercel/analytics")) {
  console.log("- app/layout.js already wired up for analytics — leaving it as is.");
} else {
  const importAnchor = 'import Script from "next/script";\n';
  const bodyAnchor = "</body>";

  if (!layout.includes(importAnchor)) {
    fail(
      "app/layout.js doesn't look like what this script expects (couldn't find the " +
        "'next/script' import line). To be safe, nothing was changed. Send this file back " +
        "and it can be fixed by hand instead."
    );
  }
  if (!layout.includes(bodyAnchor)) {
    fail(
      "app/layout.js doesn't have a closing </body> tag where expected. To be safe, " +
        "nothing was changed. Send this file back and it can be fixed by hand instead."
    );
  }

  layout = layout.replace(importAnchor, importAnchor + 'import { Analytics } from "@vercel/analytics/next";\n');
  layout = layout.replace(/([ \t]*)<\/body>/, "$1  <Analytics />\n$1</body>");

  fs.writeFileSync(layoutPath, layout, "utf8");
  console.log("done - Added <Analytics /> to app/layout.js");
}

// ---------------------------------------------------------------------
// 3. Install the package so it actually exists in node_modules.
// ---------------------------------------------------------------------
if (pkgChanged) {
  console.log("\nInstalling @vercel/analytics (running npm install)...\n");
  try {
    execSync("npm install", { cwd: root, stdio: "inherit" });
    console.log("\ndone - npm install finished.");
  } catch (e) {
    console.log("\nwarning - Couldn't run npm install automatically. Please run it yourself:\n\n    npm install\n");
  }
} else {
  console.log("\n(Skipping npm install — @vercel/analytics was already in package.json.)");
}

console.log(
  "\nDone! Private website analytics is wired up.\n\n" +
    "Next steps:\n" +
    "  1. Commit and push as usual:\n" +
    "       git add -A\n" +
    '       git commit -m "Add private Vercel Web Analytics"\n' +
    "       git push\n" +
    "  2. Vercel will redeploy automatically.\n" +
    '  3. Once it\'s live, go to vercel.com -> your geleglamzzz project -> the "Analytics" tab.\n' +
    "     That's where you'll see visits, unique visitors, top countries, top pages,\n" +
    "     devices and referrers - only visible to you when logged into your Vercel account.\n" +
    "  4. It can take a little while after your first visit for numbers to appear, so don't\n" +
    "     worry if it looks empty right after deploying.\n"
);
