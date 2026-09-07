import AboutScripts from "@/components/AboutScripts";

export const metadata = {
  title: "About: Gele Glamzzz | Meet the Founder",
  description: "Meet the founder, stylist and teacher behind Gele Glamzzz, a London based luxury gele artist.",
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

      <AboutScripts />
    </>
  );
}
