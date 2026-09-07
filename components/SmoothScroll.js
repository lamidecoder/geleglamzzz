"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth, eased scrolling site-wide. Lenis is bundled directly into the JS
 * (npm install, not a CDN <Script>), so unlike GSAP it has no separate
 * network fetch to race against — it's ready the instant the page's own
 * JS runs, no timing window where it could silently fail to engage.
 *
 * Ties into GSAP's ScrollTrigger (used for the hero parallax) so that
 * effect keeps tracking the eased scroll position correctly instead of
 * the raw native one.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.__prefersReducedMotion) return; // respect it — no smoothing imposed

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    let rafId = requestAnimationFrame(raf);

    // if/when GSAP + ScrollTrigger are available, keep them in sync with
    // Lenis's eased position rather than the raw native scroll
    let tickerFn = null;
    function wireGsap() {
      if (!window.gsap || !window.ScrollTrigger) return false;
      lenis.on("scroll", window.ScrollTrigger.update);
      tickerFn = (time) => lenis.raf(time * 1000);
      window.gsap.ticker.add(tickerFn);
      window.gsap.ticker.lagSmoothing(0);
      return true;
    }
    if (!wireGsap()) {
      const start = Date.now();
      const poll = setInterval(() => {
        if (wireGsap() || Date.now() - start > 3000) clearInterval(poll);
      }, 100);
      var pollId = poll;
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (pollId) clearInterval(pollId);
      if (tickerFn && window.gsap) window.gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return null;
}
