"use client";
import LogoMark from "./LogoMark";

export default function Nav() {
  return (
    <header className="nav" id="siteNav">
      <div className="nav__inner container">
        <a href="/" className="nav__logo" data-nav-link="/">
          <LogoMark />
          <span>GELE GLAMZZZ</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          <a href="/" className="nav__link" data-nav-link="/">Home</a>
          <a href="/services" className="nav__link" data-nav-link="/services">Services</a>
          <a href="/classes" className="nav__link" data-nav-link="/classes">Classes</a>
          <a href="/about" className="nav__link" data-nav-link="/about">About</a>
          <a href="/journal" className="nav__link" data-nav-link="/journal">Journal</a>
          <a href="/achievements" className="nav__link" data-nav-link="/achievements">Achievements</a>
          <a href="/contact" className="nav__link" data-nav-link="/contact">Contact</a>
          <a href="/booking" className="nav__link nav__book" data-cursor="book" data-nav-link="/booking">Book</a>
        </nav>
        <button className="nav__burger" id="burgerBtn" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
