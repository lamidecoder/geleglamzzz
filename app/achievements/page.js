import ClassesScripts from "@/components/ClassesScripts";

export const metadata = {
  title: "Achievements: Gele Glamzzz | Recognition & Milestones",
  description: "Styling Grammy-nominated artist Ayra Starr, a Vogue feature, and gele workshops hosted across London and leading UK universities.",
  keywords: ["Ayra Starr gele", "gele Vogue feature", "gele university workshops UK", "notable gele stylist"],
  alternates: { canonical: "/achievements" },
};

export default function AchievementsPage() {
  return (
    <>
      <section className="page-opener">
        <div className="container container--narrow">
          <span className="eyebrow" data-reveal>Recognition</span>
          <h1 className="h2" data-reveal style={{ marginTop: ".8rem" }}>Where the work<br />has travelled.</h1>
          <p className="lede page-opener__lede" data-reveal>A gele is made in one room and, sometimes, it goes on to travel a lot further than that room. A few of the moments Gele Glamzzz is proudest of.</p>
        </div>
      </section>

      <section className="section-pad on-dark" style={{ background: "var(--void)", color: "var(--ivory)", paddingTop: "clamp(1rem,3vw,2rem)" }}>
        <div className="container container--narrow">
          <div className="achievements-list">

            <div className="achievement">
              <span className="achievement__num">01</span>
              <div className="achievement__media media-frame" data-reveal-scale>
                <div className="dissolve">
                  <img src="/images/ayra-starr-stage.jpg" alt="Ayra Starr performing on stage wearing a coral headwrap styled by Gele Glamzzz" loading="lazy" />
                  <img src="/images/final-cta-look.jpg" alt="Ayra Starr in a pink gele styled by Gele Glamzzz" loading="lazy" />
                </div>
              </div>
              <div className="achievement__body" data-reveal>
                <h3 className="h3">A global viral moment.</h3>
                <p className="body-copy">Styling Ayra Starr, a Grammy-nominated global artist, in a Gele Glamzzz headwrap was never going to stay quiet. The look travelled across timelines and comment sections worldwide and helped turn gele styling into a viral moment among audiences who had never worn one before. It was styled here, by Gele Glamzzz.</p>
              </div>
            </div>

            <div className="achievement">
              <span className="achievement__num">02</span>
              <div className="achievement__media media-frame" data-reveal-scale>
                <div className="media-frame__art"><img src="/images/vogue-feature.jpg" alt="Runway model wearing a green and blue gele, Vogue-tagged fashion show feature" loading="lazy" /></div>
              </div>
              <div className="achievement__body" data-reveal>
                <h3 className="h3">Featured in Vogue.</h3>
                <p className="body-copy">The craft behind the crown caught the attention of one of fashion&apos;s most recognised names. Gele Glamzzz has been featured in Vogue, sitting alongside some of the industry&apos;s most established houses.</p>
              </div>
            </div>

            <div className="achievement">
              <span className="achievement__num">03</span>
              <div className="achievement__media media-frame" data-reveal-scale>
                <div className="media-frame__art"><img src="/images/owner-teaching.jpg" alt="Gele tying workshop in progress" loading="lazy" /></div>
              </div>
              <div className="achievement__body" data-reveal>
                <h3 className="h3">Teaching the next generation.</h3>
                <p className="body-copy">Beyond individual bookings, Gele Glamzzz has taken the craft into some of the UK&apos;s leading university campuses, hosting hands-on workshops that introduce a new generation to the art of the gele, alongside a flagship workshop in the heart of London.</p>
                <div className="achievement__venues">
                  <span>London</span>
                  <span>University of Leicester</span>
                  <span>University of Kent</span>
                  <span>University of Warwick</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ClassesScripts />
    </>
  );
}
