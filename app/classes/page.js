import ClassesScripts from "@/components/ClassesScripts";

export const metadata = {
  title: "Classes: Gele Glamzzz | Learn Gele Tying in London",
  description: "Private lessons, small group workshops and bridal party masterclasses. Learn to tie a gele with Gele Glamzzz in London.",
  keywords: ["gele tying classes London", "learn to tie gele", "gele workshop London", "bridal party gele lesson"],
  alternates: { canonical: "/classes" },
};

const CLASSES = [
  { title: "Private 1:1 Lesson", desc: "A personal session built around your own head shape, fabric and the finish you're trying to master. Studio or your own space.", img: "/images/classes-private-lesson.jpg" },
  { title: "Small Group Workshop", desc: "Hands-on tying practice for small groups, friends or colleagues who want to learn together rather than one at a time.", img: "/images/classes-small-group.jpg" },
  { title: "Bridal Party Masterclass", desc: "For the bride who wants her mothers, aunties or bridesmaids tying with confidence well before the big day arrives.", img: "/images/classes-bridal-party.jpg" },
  { title: "Beginner's Foundations", desc: "Fabric, tension and structure from first principles, for anyone who has never wrapped a gele before.", img: "/images/owner-teaching.jpg" },
];

export default function ClassesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__media">
          <img src="/images/classes-small-group.jpg" alt="Gele tying workshop in session" loading="eager" />
        </div>
        <div className="page-hero__scrim" aria-hidden="true"></div>
        <div className="page-hero__content">
          <span className="eyebrow" data-reveal style={{ color: "var(--gold-soft)" }}>Learn The Craft</span>
          <h1 className="display-2" data-reveal style={{ marginTop: ".6rem" }}>Tie it like<br />Gele Glamzzz.</h1>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: "clamp(2.5rem,5vw,4rem)" }}>
        <div className="container container--narrow">
          <p className="lede" data-reveal>Every gele on this site started as a lesson someone was brave enough to ask for. These sessions teach the same tension, folds and finishing used in bridal and editorial work, scaled to whatever you&apos;re learning for.</p>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <div className="classes__list">
            {CLASSES.map((c, i) => (
              <div key={i} className="classes__item">
                <div className="classes__media media-frame" data-reveal-scale>
                  <div className="media-frame__art"><img src={c.img} alt={c.title} loading="lazy" /></div>
                </div>
                <div data-reveal>
                  <div className="classes__head">
                    <h3 className="h3">{c.title}</h3>
                    <span className="classes__price">Price on consultation</span>
                  </div>
                  <p className="body-copy">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="classes__note" data-reveal>Formats, group sizes and locations are flexible and confirmed at booking. Head to the booking page and select &quot;Other&quot; to start a classes enquiry.</p>
        </div>
      </section>

      <ClassesScripts />
    </>
  );
}
