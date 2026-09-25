#!/usr/bin/env node
"use strict";

/**
 * Makes the "Website by NexusHouseUK" footer credit a clickable link to
 * https://www.nexushousehq.com/
 *
 * Run this from the root of your project (the folder with package.json,
 * app/, components/, etc.):
 *
 *     node link-nexushouse-footer-credit.js
 */

const fs = require("fs");
const path = require("path");

const root = process.cwd();

function fail(msg) {
  console.error("\n❌ " + msg + "\n");
  process.exit(1);
}

if (!fs.existsSync(path.join(root, "package.json"))) {
  fail(
    "Couldn't find package.json in this folder.\n" +
      "Run this script from the root of your gele-glamzzz-nextjs/nextapp project\n" +
      "(the same folder that has package.json, app/, components/, etc.)."
  );
}

const footerPath = path.join(root, "components", "Footer.js");
if (!fs.existsSync(footerPath)) {
  fail("Couldn't find components/Footer.js — nothing was changed.");
}

let footer = fs.readFileSync(footerPath, "utf8");
const NEXUSHOUSE_URL = "https://www.nexushousehq.com/";

if (footer.includes(NEXUSHOUSE_URL)) {
  console.log("- Footer already links NexusHouseUK to nexushousehq.com — leaving it as is.");
} else {
  const oldLine = "<span>Website by NexusHouseUK</span>";
  const newLine =
    '<span>Website by <a href="' +
    NEXUSHOUSE_URL +
    '" target="_blank" rel="noopener noreferrer">NexusHouseUK</a></span>';

  if (!footer.includes(oldLine)) {
    fail(
      "components/Footer.js doesn't look like what this script expects (couldn't find the " +
        '"Website by NexusHouseUK" credit line). To be safe, nothing was changed. Send this ' +
        "file back and it can be fixed by hand instead."
    );
  }

  footer = footer.replace(oldLine, newLine);
  fs.writeFileSync(footerPath, footer, "utf8");
  console.log("done - NexusHouseUK in the footer credit now links to " + NEXUSHOUSE_URL);
}

console.log(
  "\nDone!\n\n" +
    "Next step - commit and push as usual (one line at a time in PowerShell):\n" +
    "  git add -A\n" +
    '  git commit -m "Link NexusHouseUK footer credit"\n' +
    "  git push\n"
);
