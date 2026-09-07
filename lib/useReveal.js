"use client";
import { useEffect } from "react";

/**
 * Wires up the [data-reveal] / [data-reveal-scale] / .reveal-mask fade-in
 * system for whatever is currently mounted. Call once per page component.
 */
export default function useReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.__prefersReducedMotion ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal], [data-reveal-scale]").forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const basicIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        basicIo.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal], [data-reveal-scale]").forEach((el) => basicIo.observe(el));

    const maskIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        maskIo.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal-mask:not(.hero__headline)").forEach((block) => maskIo.observe(block));

    return () => { basicIo.disconnect(); maskIo.disconnect(); };
  }, []);
}
