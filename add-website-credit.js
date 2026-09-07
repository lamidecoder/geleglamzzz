/**
 * add-website-credit.js
 * Run from your project root:   node add-website-credit.js
 *
 * Adds "Website by NexusHouseUK" to the footer, next to Privacy/Terms.
 * It's plain text for now since I don't have a URL to link it to — if
 * you want it clickable, send me the link and I'll wire it in.
 */
const fs = require("fs");
const path = require("path");
const root = process.cwd();

function fail(msg) { console.error("✖ " + msg); process.exit(1); }
if (!fs.existsSync(path.join(root, "package.json"))) fail("Run this from your project root.");

fs.writeFileSync(path.join(root, "components", "Footer.js"), 'import LogoMark from "./LogoMark";\n\nexport default function Footer() {\n  return (\n    <footer className="footer">\n      <div className="container">\n        <div className="footer__mark-lockup">\n          <LogoMark drawOnScroll />\n          <p className="footer__mark" style={{ marginBottom: 0 }}>GELE<br />GLAMZZZ</p>\n        </div>\n        <div className="footer__grid">\n          <div className="footer__col">\n            <h4>Studio</h4>\n            <p>London, UK</p>\n            <p>Bookings by appointment</p>\n          </div>\n          <div className="footer__col">\n            <h4>Connect</h4>\n            <a href="https://www.instagram.com/geleglamzzz/" target="_blank" rel="noopener noreferrer">Instagram</a>\n            <a href="#" data-placeholder-link>TikTok</a>\n          </div>\n          <div className="footer__col">\n            <h4>Contact</h4>\n            <a href="mailto:hello@geleglamzzz.com" data-placeholder-link>hello@geleglamzzz.com</a>\n          </div>\n          <div className="footer__col">\n            <h4>Explore</h4>\n            <a href="/about">About</a>\n            <a href="/services">Services</a>\n            <a href="/classes">Classes</a>\n            <a href="/journal">Journal</a>\n            <a href="/achievements">Achievements</a>\n            <a href="/contact">Contact</a>\n            <a href="/booking">Book</a>\n          </div>\n        </div>\n        <div className="footer__bottom">\n          <span>&copy; <span id="yearNow">{new Date().getFullYear()}</span> Gele Glamzzz. All rights reserved.</span>\n          <div className="footer__legal">\n            <a href="#" data-placeholder-link>Privacy</a>\n            <a href="#" data-placeholder-link>Terms</a>\n            <span>Website by NexusHouseUK</span>\n          </div>\n        </div>\n      </div>\n    </footer>\n  );\n}\n', "utf8");
console.log("✓ wrote components/Footer.js");
console.log("\nCSS/component only — save and reload, no restart needed.");
