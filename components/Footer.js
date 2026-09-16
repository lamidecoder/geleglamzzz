import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__mark-lockup">
          <LogoMark drawOnScroll />
          <p className="footer__mark" style={{ marginBottom: 0 }}>GELE<br />GLAMZZZ</p>
        </div>
        <div className="footer__grid">
          <div className="footer__col">
            <h4>Studio</h4>
            <p>London, UK</p>
            <p>Bookings by appointment</p>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <div className="footer__social">
              <a href="https://www.instagram.com/geleglamzzz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-icon">
                <svg width="20" height="20"><use href="#icon-instagram" /></svg>
              </a>
              <a href="https://www.tiktok.com/@jaygeleboy6" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer__social-icon">
                <svg width="20" height="20"><use href="#icon-tiktok" /></svg>
              </a>
            </div>
            <a href="https://jaaythecreator.com" target="_blank" rel="noopener noreferrer" style={{ marginTop: ".6rem", paddingTop: ".6rem", borderTop: "1px solid rgba(242,233,216,.12)" }}>Jaaythecreator<br /><span style={{ fontSize: "11px", opacity: .6, fontWeight: 400 }}>Wedding photo &amp; video</span></a>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <a href="mailto:geleglamzzz@gmail.com">geleglamzzz@gmail.com</a>
          </div>
          <div className="footer__col">
            <h4>Explore</h4>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/classes">Classes</a>
            <a href="/journal">Journal</a>
            <a href="/achievements">Achievements</a>
            <a href="/contact">Contact</a>
            <a href="/booking">Book</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>&copy; <span id="yearNow">{new Date().getFullYear()}</span> Gele Glamzzz. All rights reserved.</span>
          <div className="footer__legal">
            <a href="#" data-placeholder-link>Privacy</a>
            <a href="#" data-placeholder-link>Terms</a>
            <span>Website by NexusHouseUK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
