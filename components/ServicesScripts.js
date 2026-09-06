"use client";
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
