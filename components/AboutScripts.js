"use client";
import { useEffect } from "react";
import useReveal from "@/lib/useReveal";

export default function AboutScripts() {
  useReveal();

  useEffect(() => {
    // featured work hover
    const items = document.querySelectorAll("[data-feat-item]");
    const medias = document.querySelectorAll("[data-feat-media]");
    function setActive(idx) {
      items.forEach((el, i) => el.classList.toggle("is-active", i === idx));
      medias.forEach((el, i) => el.classList.toggle("is-active", i === idx));
    }
    const handlers = [];
    items.forEach((el, i) => {
      const fn = () => setActive(i);
      el.addEventListener("mouseenter", fn);
      el.addEventListener("focus", fn);
      el.addEventListener("click", fn);
      handlers.push([el, fn]);
    });

    // gallery lightbox
    const galleryItems = Array.from(document.querySelectorAll(".gallery__item"));
    let lb, media, meta, current = 0;
    if (galleryItems.length) {
      lb = document.createElement("div");
      lb.className = "lightbox";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.innerHTML =
        '<div class="lightbox__frame">' +
        '  <div class="media-frame" style="width:100%;height:100%;"><img id="lbImg" style="width:100%;height:100%;object-fit:cover;" alt="" /></div>' +
        '  <button class="lightbox__close" id="lbClose">Close ✕</button>' +
        '  <button class="lightbox__prev" id="lbPrev">← Prev</button>' +
        '  <button class="lightbox__next" id="lbNext">Next →</button>' +
        '  <span class="lightbox__meta" id="lbMeta"></span>' +
        "</div>";
      document.body.appendChild(lb);
      const img = lb.querySelector("#lbImg");
      meta = lb.querySelector("#lbMeta");

      function open(idx) {
        current = idx;
        const it = galleryItems[idx];
        img.src = it.getAttribute("href");
        img.alt = it.dataset.cat || "";
        meta.textContent = [it.dataset.cat, it.dataset.loc].filter(Boolean).join(", ");
        lb.classList.add("is-open");
        document.body.classList.add("modal-open");
      }
      function close() { lb.classList.remove("is-open"); document.body.classList.remove("modal-open"); }
      function step(dir) { open((current + dir + galleryItems.length) % galleryItems.length); }

      galleryItems.forEach((el, i) => el.addEventListener("click", (e) => { e.preventDefault(); open(i); }));
      lb.querySelector("#lbClose").addEventListener("click", close);
      lb.querySelector("#lbPrev").addEventListener("click", () => step(-1));
      lb.querySelector("#lbNext").addEventListener("click", () => step(1));
      lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
      function onKey(e) {
        if (!lb.classList.contains("is-open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }
      document.addEventListener("keydown", onKey);

      return () => {
        handlers.forEach(([el, fn]) => { el.removeEventListener("mouseenter", fn); el.removeEventListener("focus", fn); el.removeEventListener("click", fn); });
        document.removeEventListener("keydown", onKey);
        lb.remove();
      };
    }

    return () => {
      handlers.forEach(([el, fn]) => { el.removeEventListener("mouseenter", fn); el.removeEventListener("focus", fn); el.removeEventListener("click", fn); });
    };
  }, []);

  return null;
}
