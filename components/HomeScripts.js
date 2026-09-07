"use client";
import { useEffect } from "react";
import useReveal from "@/lib/useReveal";

export default function HomeScripts() {
  useReveal();

  useEffect(() => {
    const prefersReducedMotion = window.__prefersReducedMotion;

    function playHeroIntro(skip) {
      const heroLines = document.querySelectorAll(".hero__headline .line span");
      const heroFoot = document.querySelector(".hero__foot");
      const shutterBars = document.querySelectorAll("#heroShutter span");
      const marks = document.getElementById("heroMarks");
      const issue = document.getElementById("heroIssue");
      const video = document.getElementById("heroVideo");

      if (video && !prefersReducedMotion) {
        const showVideo = () => video.classList.add("is-ready");
        if (video.readyState >= 3) {
          // preload="auto" can finish loading before this code even runs,
          // especially on a fast connection — if so, canplay/loadeddata
          // already fired and this listener would never see them.
          showVideo();
        } else {
          video.addEventListener("canplay", showVideo);
          video.addEventListener("loadeddata", showVideo);
        }
        video.addEventListener("error", () => {
          const err = video.error;
          console.error(
            "[hero video] failed to load. Check the file path and that it's a standard H.264 .mp4 — most phone HEVC exports won't play in Chrome/Firefox.",
            err ? { code: err.code, message: err.message } : ""
          );
        });
        const p = video.play();
        if (p && p.catch) p.catch((err) => console.warn("[hero video] play() was blocked:", err));
      }
      if (marks) marks.classList.add("is-in");
      if (issue) issue.classList.add("is-in");

      if (skip || !window.gsap) {
        heroLines.forEach((s) => { s.style.transform = "none"; });
        shutterBars.forEach((s) => { s.style.transform = "scaleY(0)"; });
        return;
      }
      gsap.timeline({ defaults: { ease: "power4.inOut" } })
        .to(shutterBars, { scaleY: 0, duration: 0.95, stagger: 0.07 }, 0)
        .to(heroLines, { y: "0%", duration: 0.95, stagger: 0.09, ease: "power4.out" }, 0.45)
        .fromTo(heroFoot, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.85);
    }

    function onLoaderDone(e) { playHeroIntro(e?.detail?.skip); }
    window.addEventListener("gg:loaderDone", onLoaderDone);
    // if the loader already fired before this page mounted (e.g. client nav back to home), play immediately
    const loaderEl = document.getElementById("loader");
    if (loaderEl && loaderEl.style.display === "none") playHeroIntro(true);

    // hero background parallax
    let st;
    if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
      const media = document.querySelector(".hero__media");
      if (media) {
        st = gsap.to(media, {
          yPercent: 14, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
      }
    }

    // testimonial rotation
    const slides = document.querySelectorAll(".testimonial");
    const dots = document.querySelectorAll("[data-testimonial-dot]");
    const prevBtn = document.getElementById("testimonialPrev");
    const nextBtn = document.getElementById("testimonialNext");
    const countEl = document.getElementById("testimonialCount");
    let idx = 0, timer;
    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, j) => s.classList.toggle("is-active", j === idx));
      dots.forEach((d, j) => d.classList.toggle("is-active", j === idx));
      document.querySelectorAll("[data-test-media]").forEach((m, j) => m.classList.toggle("is-active", j === idx));
      if (countEl) countEl.textContent = `0${idx + 1} / 0${slides.length}`;
    }
    function next() { show(idx + 1); }
    function startAuto() { if (prefersReducedMotion) return; clearInterval(timer); timer = setInterval(next, 6000); }
    dots.forEach((d, i) => d.addEventListener("click", () => { show(i); startAuto(); }));
    if (prevBtn) prevBtn.addEventListener("click", () => { show(idx - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { show(idx + 1); startAuto(); });
    if (slides.length) startAuto();

    return () => {
      window.removeEventListener("gg:loaderDone", onLoaderDone);
      if (st && st.scrollTrigger) st.scrollTrigger.kill();
      clearInterval(timer);
    };
  }, []);

  return null;
}
