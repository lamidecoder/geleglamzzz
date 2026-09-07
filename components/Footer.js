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
            <a href="https://www.instagram.com/geleglamzzz/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" data-placeholder-link>TikTok</a>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <a href="mailto:hello@geleglamzzz.com" data-placeholder-link>hello@geleglamzzz.com</a>
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
