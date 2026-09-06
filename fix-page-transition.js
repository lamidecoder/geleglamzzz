/**
 * fix-page-transition.js
 * Run from your project root:   node fix-page-transition.js
 *
 * TROUBLESHOOTING RESULT — root cause of the flaky transition:
 * Next.js's own <Link> component already navigates on click using its own
 * internal handler. The previous PageTransition script was ALSO trying to
 * intercept that same click and navigate a second time after its animation.
 * Two handlers racing on one click is exactly why it worked on some pages
 * and not others — it came down to timing, not a clean on/off bug.
 *
 * This script:
 *  1. Rewrites components/PageTransition.js to expose one shared
 *     window.__navigateWithTransition(href) function, and makes its click
 *     listener capture-phase + stopPropagation, so nothing else can react
 *     to that click first.
 *  2. Converts the internal navigation links in Nav.js, Footer.js and
 *     MobileMenu.js from next/link's <Link> to plain <a> tags, removing
 *     the competing handler at the source.
 *  3. Points ServicesScripts.js and the booking success screen's
 *     "Return home" link at the same shared function, so every path
 *     through the site animates consistently.
 *
 * Safe to run more than once; it always writes the latest correct version.
 */
const fs = require("fs");
const path = require("path");
const root = process.cwd();

function fail(msg) { console.error("✖ " + msg); process.exit(1); }
function write(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
  console.log("✓ wrote " + rel);
}

if (!fs.existsSync(path.join(root, "package.json"))) {
  fail("Can't find package.json here — run this from your project root.");
}

/* ---------------------------------------------------------------- */
/* 1. components/PageTransition.js                                   */
/* ---------------------------------------------------------------- */
write("components/PageTransition.js", `"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * The shutter/curtain sweep played between page navigations.
 * Rendered once in the root layout. Exposes window.__navigateWithTransition
 * so ANY part of the app (a plain <a>, or a JS-driven navigation like a
 * clicked service row) can trigger the same animated route change.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const isFirstRender = useRef(true);
  const routerRef = useRef(router);
  routerRef.current = router;

  // the one shared way to navigate-with-animation
  useEffect(() => {
    function navigate(href) {
      const overlay = document.getElementById("pageTransition");
      const bars = overlay ? overlay.querySelectorAll("span") : [];
      const prefersReducedMotion = window.__prefersReducedMotion;
      if (!overlay || !bars.length || prefersReducedMotion || !window.gsap) {
        routerRef.current.push(href);
        return;
      }
      overlay.classList.add("is-active");
      gsap.to(bars, {
        scaleY: 1,
        duration: 0.45,
        stagger: 0.035,
        ease: "power3.inOut",
        onComplete: () => routerRef.current.push(href),
      });
    }
    window.__navigateWithTransition = navigate;
    return () => { delete window.__navigateWithTransition; };
  }, []);

  // intercept internal link clicks in the CAPTURE phase, ahead of any other
  // click handling on the link itself, and fully stop the click there
  useEffect(() => {
    function handleClick(e) {
      const a = e.target.closest("a");
      if (!a) return;
      if (a.target === "_blank" || a.hasAttribute("data-placeholder-link")) return;

      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      let url;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.pathname === window.location.pathname) return; // same page, leave anchors alone
      if (!window.__navigateWithTransition) return;

      e.preventDefault();
      e.stopPropagation();
      window.__navigateWithTransition(href);
    }
    document.addEventListener("click", handleClick, true); // capture phase
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  // once the new page has mounted, play the opening sweep
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const overlay = document.getElementById("pageTransition");
    if (!overlay) return;
    const bars = overlay.querySelectorAll("span");
    const prefersReducedMotion = window.__prefersReducedMotion;

    if (prefersReducedMotion || !window.gsap) {
      overlay.classList.remove("is-active");
      return;
    }
    gsap.to(bars, {
      scaleY: 0,
      duration: 0.5,
      stagger: 0.035,
      ease: "power3.inOut",
      delay: 0.05,
      onComplete: () => overlay.classList.remove("is-active"),
    });
  }, [pathname]);

  return (
    <div className="page-transition" id="pageTransition" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
  );
}
`);

/* ---------------------------------------------------------------- */
/* 2. Nav.js, Footer.js, MobileMenu.js — Link -> plain <a>            */
/* ---------------------------------------------------------------- */
write("components/Nav.js", `"use client";
import LogoMark from "./LogoMark";

export default function Nav() {
  return (
    <header className="nav" id="siteNav">
      <div className="nav__inner container">
        <a href="/" className="nav__logo" data-nav-link="/">
          <LogoMark />
          <span>GELE GLAMZZZ</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          <a href="/" className="nav__link" data-nav-link="/">Home</a>
          <a href="/services" className="nav__link" data-nav-link="/services">Services</a>
          <a href="/classes" className="nav__link" data-nav-link="/classes">Classes</a>
          <a href="/about" className="nav__link" data-nav-link="/about">About</a>
          <a href="/journal" className="nav__link" data-nav-link="/journal">Journal</a>
          <a href="/achievements" className="nav__link" data-nav-link="/achievements">Achievements</a>
          <a href="/booking" className="nav__link nav__book" data-cursor="book" data-nav-link="/booking">Book</a>
        </nav>
        <button className="nav__burger" id="burgerBtn" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
`);

write("components/MobileMenu.js", `"use client";

export default function MobileMenu() {
  return (
    <div className="mobile-menu" id="mobileMenu">
      <nav className="mobile-menu__links" aria-label="Mobile">
        <a href="/" className="mobile-menu__link" data-nav-link="/">Home</a>
        <a href="/services" className="mobile-menu__link" data-nav-link="/services">Services</a>
        <a href="/classes" className="mobile-menu__link" data-nav-link="/classes">Classes</a>
        <a href="/about" className="mobile-menu__link" data-nav-link="/about">About</a>
        <a href="/journal" className="mobile-menu__link" data-nav-link="/journal">Journal</a>
        <a href="/achievements" className="mobile-menu__link" data-nav-link="/achievements">Achievements</a>
        <a href="/booking" className="mobile-menu__link" data-nav-link="/booking">Book</a>
      </nav>
      <div className="mobile-menu__foot">
        <a href="https://www.instagram.com/geleglamzzz/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="#" data-placeholder-link>TikTok</a>
      </div>
    </div>
  );
}
`);

write("components/Footer.js", `import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__mark-lockup">
          <LogoMark />
          <p className="footer__mark" style={{ marginBottom: 0 }}>GELE<br />GLAMZZZ</p>
        </div>
        <div className="footer__grid">
          <div className="footer__col">
            <h4>Studio</h4>
            <p>London, UK</p>
            <p>Bookings by appointment</p>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <a href="https://www.instagram.com/geleglamzzz/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" data-placeholder-link>TikTok</a>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <a href="mailto:hello@geleglamzzz.com" data-placeholder-link>hello@geleglamzzz.com</a>
          </div>
          <div className="footer__col">
            <h4>Explore</h4>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/classes">Classes</a>
            <a href="/journal">Journal</a>
            <a href="/achievements">Achievements</a>
            <a href="/booking">Book</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>&copy; <span id="yearNow">{new Date().getFullYear()}</span> Gele Glamzzz. All rights reserved.</span>
          <div className="footer__legal">
            <a href="#" data-placeholder-link>Privacy</a>
            <a href="#" data-placeholder-link>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
`);

/* ---------------------------------------------------------------- */
/* 3. ServicesScripts.js — use the shared transition fn, not router.push */
/* ---------------------------------------------------------------- */
const servicesScriptsPath = path.join(root, "components", "ServicesScripts.js");
if (fs.existsSync(servicesScriptsPath)) {
  write("components/ServicesScripts.js", `"use client";
import { useEffect } from "react";
import useReveal from "@/lib/useReveal";
import { SERVICES } from "@/lib/data";

function goToBooking() {
  if (window.__navigateWithTransition) window.__navigateWithTransition("/booking");
  else window.location.href = "/booking";
}

export default function ServicesScripts() {
  useReveal();

  useEffect(() => {
    const hasFinePointer = window.__hasFinePointer;
    const rows = document.querySelectorAll(".services__row");
    const preview = document.getElementById("servicesPreview");
    const cleanups = [];

    rows.forEach((row, i) => {
      const s = SERVICES[i];
      if (hasFinePointer) {
        const onEnter = () => {
          if (preview) { preview.innerHTML = '<div class="media-frame__art"><img src="' + s.img + '" alt="" style="width:100%;height:100%;object-fit:cover;"/></div>'; preview.classList.add("is-visible"); }
        };
        const onMove = (e) => { if (preview) { preview.style.left = e.clientX + "px"; preview.style.top = e.clientY + "px"; } };
        const onLeave = () => { if (preview) preview.classList.remove("is-visible"); };
        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mousemove", onMove);
        row.addEventListener("mouseleave", onLeave);
        row.addEventListener("click", goToBooking);
        cleanups.push(() => { row.removeEventListener("mouseenter", onEnter); row.removeEventListener("mousemove", onMove); row.removeEventListener("mouseleave", onLeave); row.removeEventListener("click", goToBooking); });
      } else {
        const onClick = (e) => {
          if (e.target.closest("[data-accordion-book]")) return;
          const wasOpen = row.classList.contains("is-open");
          rows.forEach((r) => r.classList.remove("is-open"));
          if (!wasOpen) row.classList.add("is-open");
        };
        row.addEventListener("click", onClick);
        cleanups.push(() => row.removeEventListener("click", onClick));
      }
      const bookLink = row.querySelector("[data-accordion-book]");
      if (bookLink) {
        const onBookClick = (e) => { e.stopPropagation(); goToBooking(); };
        bookLink.addEventListener("click", onBookClick);
        cleanups.push(() => bookLink.removeEventListener("click", onBookClick));
      }
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
`);
} else {
  console.log("• components/ServicesScripts.js not found, skipped");
}

/* ---------------------------------------------------------------- */
/* 4. app/page.js — same Link race condition on the hero/CTA buttons  */
/* ---------------------------------------------------------------- */
const homePagePath = path.join(root, "app", "page.js");
if (fs.existsSync(homePagePath)) {
  let hp = fs.readFileSync(homePagePath, "utf8");
  const before = hp;

  // swap every <Link ...>...</Link> for <a ...>...</a> — keeps all existing
  // attributes (href, className, data-*, style) exactly as they are, only
  // the tag name changes, since next/link is what was racing our animation
  hp = hp.replace(/<Link\b/g, "<a");
  hp = hp.replace(/<\/Link>/g, "</a>");
  hp = hp.replace(/import Link from "next\/link";\n?/, "");

  if (hp === before) {
    console.log("• app/page.js had no <Link> usage to change, left as is");
  } else {
    fs.writeFileSync(homePagePath, hp, "utf8");
    console.log("✓ updated app/page.js (Link → plain <a> on every CTA)");
  }
} else {
  console.log("• app/page.js not found, skipped");
}

/* ---------------------------------------------------------------- */
/* 5. BookingClient.js — "Return home" uses the same shared function  */
/* ---------------------------------------------------------------- */
const bookingClientPath = path.join(root, "components", "BookingClient.js");
if (fs.existsSync(bookingClientPath)) {
  let bc = fs.readFileSync(bookingClientPath, "utf8");
  const before = bc;

  bc = bc.replace(
    'import Link from "next/link";\n',
    ""
  );
  bc = bc.replace(
    /<Link href="\/" className="btn btn--ghost" onClick=\{resetAll\}>Return home<\/Link>/,
    `<a href="/" className="btn btn--ghost" onClick={(e) => { e.preventDefault(); resetAll(); if (window.__navigateWithTransition) window.__navigateWithTransition("/"); else window.location.href = "/"; }}>Return home</a>`
  );

  if (bc === before) {
    console.log("• components/BookingClient.js didn't match the expected pattern exactly — leaving it untouched. Change its \"Return home\" link to a plain <a> by hand if it still uses <Link>.");
  } else {
    fs.writeFileSync(bookingClientPath, bc, "utf8");
    console.log("✓ updated components/BookingClient.js (Return home link)");
  }
} else {
  console.log("• components/BookingClient.js not found, skipped");
}

console.log("\nDone. Run npm run dev and click through every nav item, the mobile menu, a service row, and the booking success screen's Return home link — all should now animate the same way, every time.");
