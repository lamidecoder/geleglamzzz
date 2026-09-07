import fs from "fs";
import path from "path";
import HomeScripts from "@/components/HomeScripts";
import { TESTIMONIALS, INSTAGRAM, JOURNAL_MEDIA } from "@/lib/data";

export const metadata = {
  title: "Gele Glamzzz: Luxury Gele Artistry in London | The Art of the Crown",
  description: "Gele Glamzzz is a London based luxury gele artist crafting bridal, ceremonial and editorial headwraps with precision and presence. Discover the artistry and book your experience.",
};

// Looks for an actual video file instead of requiring an exact hardcoded
// path. Checks these folders, in order, for the first video file it finds.
// Called fresh on every page load (see inside HomePage below), never cached.
function findHeroVideo() {
  const searchDirs = [
    path.join(process.cwd(), "public", "videos"),
    path.join(process.cwd(), "public", "images", "videos"),
    path.join(process.cwd(), "public"),
  ];
  const extToType = { ".mp4": "video/mp4", ".webm": "video/webm", ".mov": "video/quicktime" };
  try {
    for (const dir of searchDirs) {
      if (!fs.existsSync(dir)) continue;
      const match = fs.readdirSync(dir).find((f) => extToType[path.extname(f).toLowerCase()]);
      if (match) {
        const relDir = path.relative(path.join(process.cwd(), "public"), dir).split(path.sep).filter(Boolean).join("/");
        return {
          src: "/" + (relDir ? relDir + "/" : "") + match,
          type: extToType[path.extname(match).toLowerCase()],
        };
      }
    }
  } catch {
    // if anything goes wrong reading the filesystem, just fall back to no video
  }
  return null;
}

// Same idea as findHeroVideo, but for the small vertical video on the "Ready
// to be crowned" section. Drop a portrait/vertical .mp4 into
// public/videos/cta/ and it's picked up automatically, no code to touch.
function findCtaVideo() {
  const dir = path.join(process.cwd(), "public", "videos", "cta");
  const extToType = { ".mp4": "video/mp4", ".webm": "video/webm", ".mov": "video/quicktime" };
  try {
    if (!fs.existsSync(dir)) return null;
    const match = fs.readdirSync(dir).find((f) => extToType[path.extname(f).toLowerCase()]);
    if (!match) return null;
    return { src: "/videos/cta/" + match, type: extToType[path.extname(match).toLowerCase()] };
  } catch {
    return null;
  }
}

export default function HomePage() {
  const heroVideo = findHeroVideo(); // checked fresh on every request, not cached
  const ctaVideo = findCtaVideo();
  return (
    <>
      {/* ============ Hero ============ */}
      <section className="hero" id="home">
        <div className="hero__media">
          <div className="media-frame__art">
            <img src="/images/hero-main.jpg" alt="Gele Glamzzz client in an emerald green and gold aso-oke gele and matching wrapper, London" loading="eager" />
          </div>
          {/* Drop an .mp4 into /public/videos/ and set the src below — it plays automatically, no other changes needed. */}
          <video className="hero__video" id="heroVideo" muted loop playsInline preload="metadata" aria-hidden="true">
            {heroVideo && <source src={heroVideo.src} type={heroVideo.type} />}
          </video>
        </div>
        <div className="hero__scrim" aria-hidden="true"></div>
        <div className="hero__shutter" id="heroShutter" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <div className="hero__marks" id="heroMarks" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div className="hero__issue" id="heroIssue"><span>Vol. I, London</span><span>The Art of the Crown</span></div>

        <div className="hero__content">
          <h1 className="hero__headline reveal-mask">
            <span className="line line--sm"><span>The</span></span>
            <span className="line line--lg"><span>Art</span></span>
            <span className="line line--sm"><span>of the</span></span>
            <span className="line line--lg"><span>Crown<span className="accent-dot">.</span></span></span>
          </h1>
          <div className="hero__foot">
            <p className="hero__sub">Luxury gele artistry for weddings, ceremonies and unforgettable moments.</p>
            <div className="hero__ctas">
              <a href="/booking" className="btn btn--primary" data-cursor="book">Book your experience <span className="btn__arrow">→</span></a>
              <a href="/about#artistry" className="btn btn--ghost">Discover the artistry <span className="btn__arrow">→</span></a>
            </div>
          </div>
        </div>
        <div className="hero__scroll"><span>Scroll</span><span className="hero__scroll-line"><span></span></span></div>
      </section>

      {/* ============ Notable Work: Ayra Starr ============ */}
      <section className="section-pad" style={{ background: "var(--void)", color: "var(--ivory)" }}>
        <div className="container">
          <div className="story__block">
            <div className="story__media media-frame" data-reveal-scale>
              <div className="dissolve">
                <img src="/images/ayra-starr-stage.jpg" alt="Ayra Starr performing on stage wearing a coral headwrap styled by Gele Glamzzz" loading="lazy" />
                <img src="/images/final-cta-look.jpg" alt="Ayra Starr in a pink gele styled by Gele Glamzzz" loading="lazy" />
              </div>
              <span className="dissolve__credit">Ayra Starr<span>On stage &amp; off, styled by Gele Glamzzz</span></span>
            </div>
            <div>
              <span className="eyebrow" data-reveal>Notable Work</span>
              <h2 className="h3" data-reveal style={{ marginTop: ".8rem" }}>Styled for<br />the stage.</h2>
              <p className="body-copy" data-reveal style={{ marginTop: "1.2rem" }}>Ayra Starr doesn&apos;t do quiet entrances. When she needed a headwrap built to hold its shape under stage lights, through a set that never let up, Gele Glamzzz was the call.</p>
              <p className="pull-quote" data-reveal style={{ marginTop: "1.4rem", fontSize: "var(--fs-md)" }}>&ldquo;Built for the moment. Made to outlast it.&rdquo;</p>
              <a href="/achievements" className="text-link" data-reveal style={{ marginTop: "1.2rem", display: "inline-block" }}>The full story →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured guest — Fisayo Alonge */}
      <section className="section-pad on-dark" style={{ background: "var(--void)", color: "var(--ivory)" }}>
        <div className="container">
          <div className="guest-feature">
            <div className="guest-feature__media media-frame" data-reveal-scale>
              <div className="dissolve">
                <img src="/images/fisayo-alonge-1.jpg" alt="Fisayo Alonge in a burgundy satin gele and beaded gown" loading="lazy" />
                <img src="/images/fisayo-alonge-2.jpg" alt="Fisayo Alonge in a burgundy satin gele, standing portrait" loading="lazy" />
              </div>
            </div>
            <div data-reveal>
              <span className="eyebrow" style={{ color: "var(--gold-soft)" }}>Notable Work</span>
              <h2 className="h3" style={{ marginTop: ".8rem" }}>Styled for<br />the moment.</h2>
              <p className="body-copy" style={{ marginTop: "1.2rem" }}>Fisayo Alonge, styled by Gele Glamzzz, wearing a crown built for exactly that kind of presence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Intro / Philosophy ============ */}
      <section className="intro section-pad" id="philosophy">
        <div className="container intro__grid intro--media-right">
          <div className="intro__media media-frame" data-reveal-scale>
            <div className="media-frame__art">
              <img src="/images/intro-detail-fan.jpg" alt="Close-up detail of a hand-finished emerald green and gold gele fan fold" loading="lazy" />
            </div>
          </div>
          <div className="intro__text">
            <div className="intro__rule" data-reveal></div>
            <h2 className="h2" data-reveal>Every fold<br />has intention.</h2>
            <p className="body-copy" data-reveal style={{ marginTop: "1.6rem" }}>From traditional ceremonies to modern bridal moments, Gele Glamzzz transforms fabric into a statement of identity, elegance and presence. Nothing is arranged by accident. Every pleat is placed with purpose.</p>
          </div>
        </div>
      </section>

      {/* ============ Testimonials ============ */}
      <section className="testimonials section-pad">
        <div className="container container--narrow">
          <span className="eyebrow" data-reveal style={{ color: "var(--gold-soft)" }}>Client Stories</span>
          <span className="testimonials__mark" aria-hidden="true">&rdquo;</span>
          <div className="testimonials__grid" style={{ marginTop: "2rem" }}>
            <div className="testimonials__portrait media-frame media-frame--ripple" data-reveal-scale>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`media-frame__art${i === 0 ? " is-active" : ""}`} data-test-media={i}>
                  <img src={t.img} alt={t.alt} loading="lazy" />
                </div>
              ))}
            </div>
            <div>
              <div className="testimonial-track">
                {TESTIMONIALS.map((t, i) => (
                  <figure key={i} className={`testimonial${i === 0 ? " is-active" : ""}`}>
                    <span className="testimonials__quote-mark" aria-hidden="true">&ldquo;</span>
                    <blockquote>{t.quote}</blockquote>
                    <div className="testimonial__meta"><span className="testimonial__meta-line"></span><cite>{t.who}</cite></div>
                  </figure>
                ))}
              </div>
              <div className="testimonials__nav">
                <button className="testimonials__arrow" id="testimonialPrev" aria-label="Previous testimonial">←</button>
                <span className="testimonials__count" id="testimonialCount">01 / 0{TESTIMONIALS.length}</span>
                <button className="testimonials__arrow" id="testimonialNext" aria-label="Next testimonial">→</button>
              </div>
              <p className="testimonials__note">Sample content shown. Replace with real client testimonials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Social Proof ============ */}
      <section className="proof">
        <div className="container" style={{ paddingBlock: "1.6rem 0", textAlign: "center" }}>
          <span className="eyebrow">Trusted For</span>
        </div>
        <div className="proof__row">
          <div className="proof__item"><span>Bridal</span><p className="proof__sub">Aisle to reception</p></div>
          <div className="proof__item"><span>Occasions</span><p className="proof__sub">Birthdays &amp; milestones</p></div>
          <div className="proof__item"><span>Editorial</span><p className="proof__sub">Campaigns &amp; shoots</p></div>
          <div className="proof__item"><span>Private Events</span><p className="proof__sub">By invitation</p></div>
        </div>
      </section>

      {/* ============ Journal preview ============ */}
      <section className="journal section-pad">
        <div className="container container--narrow">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.2rem", marginBottom: "clamp(2rem,4vw,3rem)" }}>
            <h2 className="h2" data-reveal>From the<br />Glamzzz feed.</h2>
            <a className="btn btn--ghost" href="/journal">See the journal <span className="btn__arrow">→</span></a>
          </div>
          <div className="media-gallery" data-reveal-scale>
            {JOURNAL_MEDIA.slice(1, 4).map((m, i) => (
              <div key={i} className="media-gallery__item">
                <img src={m.type === "video" ? m.poster : m.src} alt={m.caption} loading="lazy" />
                <span className="media-gallery__caption"><p>{m.sub}</p><p>{m.caption}</p></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Instagram ============ */}
      <section className="instagram section-pad">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.2rem", marginBottom: "clamp(1.6rem,3vw,2.5rem)" }}>
            <h2 className="h2" data-reveal>Follow the<br />artistry.</h2>
            <a className="btn btn--ghost" href="https://www.instagram.com/geleglamzzz/" target="_blank" rel="noopener noreferrer">Follow @geleglamzzz <span className="btn__arrow">→</span></a>
          </div>
          <div className="instagram__grid">
            {INSTAGRAM.map((ig, i) => (
              <a key={i} className="instagram__item" href="https://www.instagram.com/geleglamzzz/" target="_blank" rel="noopener noreferrer" data-cursor="view">
                <div className="media-frame__art" style={{ background: ig.grad, color: ig.line }}>
                  <svg viewBox="0 0 300 375" preserveAspectRatio="xMidYMid slice"><use href={`#${ig.sym}`} /></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="final-cta" id="finalCta">
        <div className="final-cta__media media-frame">
          <div className="media-frame__art"><img src="/images/story-heritage.jpg" alt="Client in a silver holographic gele and beaded pale blue gown" loading="lazy" /></div>
        </div>
        <div className="final-cta__scrim"></div>
        {/* TODO(video): drop a portrait/vertical .mp4 into /public/videos/cta/ —
            it's picked up automatically and will autoplay muted and looped here. */}
        <div className="final-cta__reel">
          <video muted loop autoPlay playsInline preload="metadata" aria-hidden="true">
            {ctaVideo && <source src={ctaVideo.src} type={ctaVideo.type} />}
          </video>
        </div>
        <div className="final-cta__content">
          <h2 className="final-cta__headline reveal-mask">
            <span className="line"><span>Ready</span></span>
            <span className="line"><span>to be</span></span>
            <span className="line"><span>crowned<span className="accent-dot">?</span></span></span>
          </h2>
          <a href="/booking" className="btn btn--primary" data-cursor="book">Book your experience <span className="btn__arrow">→</span></a>
        </div>
      </section>

      <HomeScripts />
    </>
  );
}
