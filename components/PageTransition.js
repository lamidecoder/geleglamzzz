"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * The shutter/curtain sweep played between page navigations. Pure CSS
 * transitions underneath (see .page-transition rules in globals.css) — no
 * external library to wait for, so it's exact and consistent regardless of
 * connection speed. Rendered once in the root layout. Exposes
 * window.__navigateWithTransition so any part of the app (a plain <a>, or a
 * JS-driven navigation like a clicked service row) can trigger it.
 */
const CLOSE_MS = 450; // .28s transition + .15s stagger on the last bar, plus a small buffer

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
      const prefersReducedMotion = window.__prefersReducedMotion;
      if (!overlay || prefersReducedMotion) {
        routerRef.current.push(href);
        return;
      }
      overlay.classList.add("is-active", "is-closing");
      setTimeout(() => routerRef.current.push(href), CLOSE_MS);
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
    const prefersReducedMotion = window.__prefersReducedMotion;

    if (prefersReducedMotion) {
      overlay.classList.remove("is-active", "is-closing");
      return;
    }
    // one frame so the browser registers is-closing before we remove it —
    // otherwise the transition has nothing to animate from
    requestAnimationFrame(() => {
      overlay.classList.remove("is-closing");
      setTimeout(() => overlay.classList.remove("is-active"), CLOSE_MS);
    });
  }, [pathname]);

  return (
    <div className="page-transition" id="pageTransition" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
  );
}
