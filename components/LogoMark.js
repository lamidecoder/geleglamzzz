"use client";
import { useEffect, useRef } from "react";

export default function LogoMark({ className, drawOnScroll }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!drawOnScroll || window.__prefersReducedMotion) return;
    const svg = svgRef.current;
    if (!svg) return;
    // only the 3 arcs are stroke-drawn — the small dot is filled, so it's
    // handled separately with a plain delayed fade-in (see CSS)
    const arcs = svg.querySelectorAll("path");

    arcs.forEach((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        svg.classList.add("is-drawn");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    io.observe(svg);

    return () => io.disconnect();
  }, [drawOnScroll]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className || ""}${drawOnScroll ? " logo-mark--draw" : ""}`}
      aria-hidden="true"
    >
      <path d="M4 33 A22 22 0 0 1 35 9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9.5 33 A16 16 0 0 1 32 13.5" stroke="currentColor" strokeWidth="1.4" opacity=".65" />
      <path d="M15 33 A10 10 0 0 1 29 18.5" stroke="currentColor" strokeWidth="1.4" opacity=".4" />
      <circle cx="35" cy="8" r="1.8" fill="currentColor" />
    </svg>
  );
}
