"use client";
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
        if (prefersReducedMotion) console.info("[page transition] skipped: your system's reduce-motion setting is on.");
        else if (!window.gsap) console.warn("[page transition] skipped: GSAP hasn't loaded. Navigation still works, just without the sweep.");
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
