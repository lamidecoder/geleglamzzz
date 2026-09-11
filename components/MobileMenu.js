"use client";

export default function MobileMenu() {
  return (
    <div className="mobile-menu" id="mobileMenu">
      <nav className="mobile-menu__links" aria-label="Mobile">
        <a href="/" className="mobile-menu__link" data-nav-link="/">Home</a>
        <a href="/services" className="mobile-menu__link" data-nav-link="/services">Services</a>
        <a href="/classes" className="mobile-menu__link" data-nav-link="/classes">Classes</a>
        <a href="/about" className="mobile-menu__link" data-nav-link="/about">About</a>
        <a href="/journal" className="mobile-menu__link" data-nav-link="/journal">Journal</a>
        <a href="/achievements" className="mobile-menu__link" data-nav-link="/achievements">Achievements</a>
        <a href="/contact" className="mobile-menu__link" data-nav-link="/contact">Contact</a>
        <a href="/booking" className="mobile-menu__link" data-nav-link="/booking">Book</a>
      </nav>
      <div className="mobile-menu__foot">
        <a href="https://www.instagram.com/geleglamzzz/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.tiktok.com/@jaygeleboy6" target="_blank" rel="noopener noreferrer">TikTok</a>
      </div>
    </div>
  );
}
