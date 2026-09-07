"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function BackToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible((window.scrollY || window.pageYOffset) > 700);
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (pathname === "/booking") return null; // that page has its own fixed bottom bar

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={handleClick}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M12 5L6 11M12 5l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
