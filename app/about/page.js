import { FEATURED_WORK } from "@/lib/data";
import AboutScripts from "@/components/AboutScripts";

export const metadata = {
  title: "About: Gele Glamzzz | Meet the Founder",
  description: "Meet the founder, stylist and teacher behind Gele Glamzzz, a London based luxury gele artist. Heritage, craft and the artistry gallery.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-opener">
        <div className="container container--narrow">
          <span className="eyebrow" data-reveal>About Gele Glamzzz</span>
          <h1 className="h2" data-reveal style={{ marginTop: ".8rem" }}>The artist<br />behind the crown.</h1>
          <p className="lede page-opener__lede" data-reveal>One person, one craft, carried from a single fitting room onto stages, into university halls and now here.</p>
        </div>
      </section>

      {/* ============ Founder ============ */}
      <section className="section-pad" style={{ paddingTop: "clamp(1rem,3vw,2rem)" }}>
        <div className="container">
          <div className="founder">
            <div className="founder__portrait media-frame" data-reveal-scale>
              <div className="media-frame__art"><img src="/images/owner-teaching.jpg" alt="Founder of Gele Glamzzz speaking to a room during a gele styling workshop" loading="lazy" /></div>
            </div>
            <div>
              <h2 className="h3" data-reveal>Founder, stylist,<br />teacher.</h2>
              <p className="body-copy" data-reveal style={{ marginTop: "1.2rem" }}>Every look on this site begins with the same person: the founder and hands behind Gele Glamzzz. What started as a personal obsession with getting a single fold exactly right has grown into a practice trusted by brides, performers, and now a new generation learning the craft directly.</p>
              <p className="body-copy" data-reveal style={{ marginTop: "1rem" }}>Teaching sits right alongside styling. The workshops on the Achievements page, from a flagship session in London to university campuses across the country, are led personally, fold by fold, in the room.</p>
              <div className="founder__quote pull-quote" data-reveal>&ldquo;A gele is a conversation between fabric and the person wearing it. My job is to make sure fabric wins that conversation, gently.&rdquo;</div>
            </div>
          </div>

          <div className="founder-strip">
            <div className="founder-strip__item media-frame" data-reveal-scale>
              <div className="media-frame__art"><img src="/images/owner-action-fabric.jpg" alt="Founder of Gele Glamzzz working closely with fabric during a styling session" loading="lazy" /></div>
              <span>Hands on the fold</span>
            </div>
            <div className="founder-strip__item media-frame" data-reveal-scale>
              <div className="media-frame__art"><img src="/images/owner-gallery-talk.jpg" alt="Founder of Gele Glamzzz at a London gallery event" loading="lazy" /></div>
              <span>On site, London</span>
            </div>
            <div className="founder-strip__item media-frame" data-reveal-scale>
              <div className="media-frame__art"><img src="/images/owner-backstage-2.jpg" alt="Founder of Gele Glamzzz backstage with the styling team" loading="lazy" /></div>
              <span>Backstage, with the team</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Story Behind the Fold ============ */}
      <section className="story section-pad on-dark">
        <div className="container">
          <div className="story__head">
            <span className="eyebrow" data-reveal>The Philosophy</span>
            <h2 className="h2" data-reveal style={{ marginTop: "1rem" }}>Fabric, folded<br />into identity.</h2>
          </div>

          <div className="story__grid">
            <div className="story__block">
              <div className="story__media media-frame" data-reveal-scale>
                <div className="media-frame__art"><img src="/images/story-heritage.jpg" alt="Client in a silver holographic gele and beaded pale blue gown" loading="lazy" /></div>
              </div>
              <div>
                <h3 className="h3" data-reveal>A tradition worn forward.</h3>
                <p className="body-copy" data-reveal style={{ marginTop: "1.2rem" }}>The gele carries centuries of West African adornment: a language of fabric spoken long before it reached the runway. Gele Glamzzz honours that lineage while shaping it for a new generation of London weddings, ceremonies and celebrations, wherever in the world they take place.</p>
              </div>
            </div>
          </div>

          <div className="container--text" style={{ textAlign: "center", paddingBlock: "clamp(3rem,7vw,6rem)", marginInline: "auto" }}>
            <p className="pull-quote" data-reveal>&ldquo;A gele does not simply complete the look. It changes the presence of the woman wearing it.&rdquo;</p>
          </div>

          <div className="story__grid">
            <div className="story__block">
              <div className="story__media media-frame" data-reveal-scale>
                <div className="media-frame__art"><img src="/images/story-craft.jpg" alt="Close-up detail of a silver holographic gele fold" loading="lazy" /></div>
              </div>
              <div>
                <h3 className="h3" data-reveal>Precision, not decoration.</h3>
                <p className="body-copy" data-reveal style={{ marginTop: "1.2rem" }}>Every style begins with a conversation: your face shape, your outfit, the mood of your day. From there, fabric is measured, tensioned and sculpted by hand into architecture that holds through hours of celebration.</p>
              </div>
            </div>
            <div className="story__block">
              <div className="story__media media-frame" data-reveal-scale>
                <div className="media-frame__art"><img src="/images/testimonial-portrait.jpg" alt="Client in a beaded pink gown and matching gele" loading="lazy" /></div>
              </div>
              <div>
                <h3 className="h3" data-reveal>Confidence, folded in.</h3>
                <p className="body-copy" data-reveal style={{ marginTop: "1.2rem" }}>A well set gele changes how a woman stands in a room. That is the real work here: not just a finished shape, but the composure that comes with knowing you look exactly as remarkable as the moment deserves.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Artistry Gallery ============ */}
      <section className="gallery section-pad" id="artistry">
        <div className="container">
          <div className="gallery__head">
            <h2 className="h2" data-reveal>The artistry<br />gallery.</h2>
            <p className="body-copy" data-reveal style={{ maxWidth: "34ch" }}>A curated study of folds, textures and finished looks.</p>
          </div>
          <div className="gallery__grid">
            {[
              { cls: "a", img: "/images/hero-main.jpg", cat: "Aso-Oke Edit", loc: "London" },
              { cls: "b", img: "/images/testimonial-portrait.jpg", cat: "The Beaded Fold", loc: "Signature Style" },
              { cls: "c", img: "/images/intro-detail-fan.jpg", cat: "Detail", loc: "Hand Finished" },
              { cls: "d", img: "/images/story-heritage.jpg", cat: "The Silver Fold", loc: "London" },
              { cls: "e", img: "/images/classes-small-group.jpg", cat: "Behind the Fold", loc: "Studio" },
              { cls: "f", img: "/images/story-craft.jpg", cat: "Texture Study", loc: "Detail" },
            ].map((g, i) => (
              <a key={i} className={`gallery__item gallery__item--${g.cls}`} href={g.img} data-lightbox data-cat={g.cat} data-loc={g.loc} aria-label={`View: ${g.cat}`}>
                <div className="media-frame" style={{ width: "100%", height: "100%" }}>
                  <div className="media-frame__art"><img src={g.img} alt={g.cat} loading="lazy" /></div>
                </div>
                <span className="gallery__caption"><p>{g.cat}</p><p>{g.loc}</p></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Featured Work ============ */}
      <section className="featured section-pad">
        <div className="container">
          <h2 className="h2" data-reveal style={{ marginBottom: "clamp(2rem,4vw,3.5rem)" }}>Signature<br />styles.</h2>
          <div className="featured__layout">
            <div className="featured__media" id="featuredMedia">
              {FEATURED_WORK.map((f, i) => (
                <div key={i} className={`media-frame__art${i === 0 ? " is-active" : ""}`} data-feat-media={i} style={{ background: f.grad, color: f.line }}>
                  <svg viewBox="0 0 300 375" preserveAspectRatio="xMidYMid slice"><use href={`#${f.sym}`} /></svg>
                </div>
              ))}
            </div>
            <div className="featured__list" id="featuredList">
              {FEATURED_WORK.map((f, i) => (
                <div key={i} className={`featured__item${i === 0 ? " is-active" : ""}`} data-feat-item={i} tabIndex={0} role="button">
                  <span className="featured__num">{f.num}</span>
                  <span className="featured__title">{f.title}</span>
                  <span className="featured__desc">{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AboutScripts />
    </>
  );
}
