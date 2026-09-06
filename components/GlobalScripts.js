"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalScripts() {
  const pathname = usePathname();

  // one-time setup: motion/pointer flags, cursor, mobile menu, loader
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const root = document.documentElement;
    if (!prefersReducedMotion) root.classList.add("has-motion");
    if (hasFinePointer) root.classList.add("has-fine-pointer");
    root.classList.add("js-ready");
    window.__prefersReducedMotion = prefersReducedMotion;
    window.__hasFinePointer = hasFinePointer;

    if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // placeholder-link guard (TikTok, Privacy, Terms)
    function placeholderGuard(e) {
      const a = e.target.closest("[data-placeholder-link]");
      if (a) e.preventDefault();
    }
    document.addEventListener("click", placeholderGuard);

    // custom cursor
    const cursor = document.getElementById("cursor");
    const label = document.getElementById("cursorLabel");
    let cursorCleanup = () => {};
    if (cursor && hasFinePointer) {
      let mx = 0, my = 0, cx = 0, cy = 0, raf;
      function onMove(e) { mx = e.clientX; my = e.clientY; cursor.classList.remove("is-hidden"); }
      function onLeave() { cursor.classList.add("is-hidden"); }
      function loop() {
        cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
        cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
        raf = requestAnimationFrame(loop);
      }
      function onOver(e) {
        const t = e.target.closest("[data-cursor]");
        cursor.classList.remove("is-view", "is-book", "is-link");
        if (t) {
          const kind = t.getAttribute("data-cursor");
          cursor.classList.add("is-" + kind);
          if (label) label.textContent = kind === "view" ? "View" : kind === "book" ? "Book" : "";
        } else if (e.target.closest("a, button")) {
          cursor.classList.add("is-link");
          if (label) label.textContent = "";
        } else if (label) { label.textContent = ""; }
      }
      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("mouseover", onOver);
      loop();
      cursorCleanup = () => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("mouseover", onOver);
        cancelAnimationFrame(raf);
      };
    } else if (cursor) {
      cursor.style.display = "none";
    }

    // mobile menu
    const burger = document.getElementById("burgerBtn");
    const menu = document.getElementById("mobileMenu");
    function closeMenu() {
      if (!menu || !burger) return;
      menu.classList.remove("is-open");
      burger.classList.remove("is-active");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("modal-open");
    }
    function toggleMenu() {
      if (!menu || !burger) return;
      const open = menu.classList.toggle("is-open");
      burger.classList.toggle("is-active", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("modal-open", open);
    }
    if (burger) burger.addEventListener("click", toggleMenu);
    const menuLinks = menu ? Array.from(menu.querySelectorAll("a, button")) : [];
    menuLinks.forEach((el) => el.addEventListener("click", closeMenu));
    window.__closeMobileMenu = closeMenu;

    // nav scroll behaviour (home fades in on scroll, every other route stays solid)
    const nav = document.getElementById("siteNav");
    const progress = document.getElementById("scrollProgress");
    function onScroll() {
      if (!nav) return;
      const y = window.scrollY || window.pageYOffset;
      const onHome = window.location.pathname === "/";
      nav.classList.toggle("is-scrolled", onHome ? y > 40 : true);
      if (progress) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      }
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // loader — plays once for the whole session (this component lives in the root layout)
    const loader = document.getElementById("loader");
    const mark = document.getElementById("loaderMark");
    const bar = document.getElementById("loaderBarFill");
    if (loader && mark && bar) {
      const brand = "GELE GLAMZZZ";
      mark.innerHTML = brand.split("").map((ch) => `<span>${ch === " " ? "&nbsp;" : ch}</span>`).join("");
      document.body.classList.add("modal-open");
      function reveal() {
        loader.classList.add("is-done");
        document.body.classList.remove("modal-open");
        window.dispatchEvent(new CustomEvent("gg:loaderDone"));
        setTimeout(() => { loader.style.display = "none"; }, 900);
      }
      function skipInstantly() {
        loader.style.display = "none";
        document.body.classList.remove("modal-open");
        window.dispatchEvent(new CustomEvent("gg:loaderDone", { detail: { skip: true } }));
      }
      function playAnimated() {
        const shutterBars = loader.querySelectorAll("#loaderShutter span");
        const tl = gsap.timeline({ onComplete: reveal });
        tl.to(mark.querySelectorAll("span"), { y: "0%", duration: 0.7, stagger: 0.035, ease: "power3.out" })
          .to(bar, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, "-=0.2")
          .to([mark, bar], { autoAlpha: 0, scale: 1.06, filter: "blur(6px)", duration: 0.45, ease: "power2.in" }, "+=0.1")
          .to(shutterBars, { scaleY: 0, duration: 0.6, stagger: 0.05, ease: "power4.inOut" }, "-=0.15");
      }
      if (prefersReducedMotion) {
        skipInstantly();
      } else if (window.gsap) {
        playAnimated();
      } else {
        // gsap is loaded via a beforeInteractive <Script>, which usually wins the
        // race against this effect — but on a slower connection it sometimes
        // hasn't actually finished fetching yet. Give it a moment rather than
        // silently skipping the whole loader the instant that happens.
        const start = Date.now();
        (function waitForGsap() {
          if (window.gsap) return playAnimated();
          if (Date.now() - start > 1500) return skipInstantly();
          setTimeout(waitForGsap, 40);
        })();
      }
    } else {
      window.dispatchEvent(new CustomEvent("gg:loaderDone", { detail: { skip: true } }));
    }

    return () => {
      document.removeEventListener("click", placeholderGuard);
      cursorCleanup();
      document.removeEventListener("scroll", onScroll);
      if (burger) burger.removeEventListener("click", toggleMenu);
      menuLinks.forEach((el) => el.removeEventListener("click", closeMenu));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-run on every route change: current-link highlight + force nav solid off-home
  useEffect(() => {
    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("data-nav-link") === pathname);
    });
    const nav = document.getElementById("siteNav");
    if (nav) {
      const onHome = pathname === "/";
      nav.classList.toggle("is-scrolled", onHome ? (window.scrollY || 0) > 40 : true);
    }
    if (window.__closeMobileMenu) window.__closeMobileMenu();
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
