/**
 * update-env-business-email.js
 * Run from your project root:   node update-env-business-email.js
 *
 * Switches CONTACT_TO_EMAIL from tobibamidelejohn98@gmail.com to
 * geleglamzzz@gmail.com, so contact and booking form notifications go
 * to the actual business Gmail. Keeps your Resend API key exactly as
 * it is, only that one line changes.
 *
 * IMPORTANT for jaygele.com to actually work live: this file only
 * affects your local machine. Vercel needs its own copy of both
 * RESEND_API_KEY and CONTACT_TO_EMAIL — go to your Vercel project →
 * Settings → Environment Variables, add both with the same values as
 * in your local .env.local, then redeploy (or it'll pick them up on
 * the next push). This is very likely why anything felt like it "wasn't
 * working" after connecting the domain — the site itself loads fine,
 * but the forms can't send real emails on Vercel until those two
 * variables exist there too.
 */
const fs = require("fs");
const path = require("path");
const root = process.cwd();
function fail(msg) { console.error("Error: " + msg); process.exit(1); }
if (!fs.existsSync(path.join(root, "package.json"))) fail("Run this from your project root.");

const envPath = path.join(root, ".env.local");
if (!fs.existsSync(envPath)) fail(".env.local not found — run the earlier email-setup script first.");

let content = fs.readFileSync(envPath, "utf8");
if (!content.includes("CONTACT_TO_EMAIL=")) fail("CONTACT_TO_EMAIL not found in .env.local — check the file manually.");

content = content.replace(/CONTACT_TO_EMAIL=.*/g, "CONTACT_TO_EMAIL=geleglamzzz@gmail.com");
fs.writeFileSync(envPath, content, "utf8");
console.log("Updated CONTACT_TO_EMAIL to geleglamzzz@gmail.com in .env.local");
console.log("\nRestart the dev server (Ctrl+C, then npm run dev).");
console.log("Then add the same two variables on Vercel (see comment at the top of this script) and redeploy.");
