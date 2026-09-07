import { SERVICES, PROCESS } from "@/lib/data";
import ClassesScripts from "@/components/ClassesScripts";

export const metadata = {
  title: "Services: Gele Glamzzz | Bridal, Ceremony & Private Gele Styling in London",
  description: "Bridal gele, traditional ceremonies, special occasions, photoshoots and private bookings. Explore the full Gele Glamzzz experience in London.",
  keywords: ["bridal gele London", "traditional gele styling", "gele for special occasions", "editorial gele photoshoot", "private gele booking"],
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-opener">
        <div className="container container--narrow">
          <span className="eyebrow" data-reveal>What We Offer</span>
          <h1 className="h2" data-reveal style={{ marginTop: ".8rem" }}>The experience,<br />in full.</h1>
          <p className="lede page-opener__lede" data-reveal>Five ways to work together, each one bespoke from the first message.</p>
        </div>
      </section>

      <section style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
        {SERVICES.map((s, i) => (
          <div className="service-feature__block" key={i}>
            <div className="service-feature__media media-frame" data-reveal-scale>
              <div className="media-frame__art"><img src={s.img} alt={s.title} loading="lazy" /></div>
            </div>
            <div className="service-feature__body">
              <span className="service-feature__num" data-reveal>{String(i + 1).padStart(2, "0")}</span>
              <span className="service-feature__tag" data-reveal>{s.tag}</span>
              <h2 className="service-feature__title" data-reveal>{s.title}</h2>
              <p className="body-copy service-feature__desc" data-reveal>{s.desc}</p>
              <a href="/booking" className="btn btn--primary service-feature__cta" data-reveal>Book this service <span className="btn__arrow">→</span></a>
            </div>
          </div>
        ))}
      </section>

      <section className="process section-pad">
        <div className="container">
          <h2 className="h2" data-reveal style={{ marginBottom: "clamp(2rem,4vw,3.5rem)" }}>The Gele Glamzzz<br />experience.</h2>
          <div className="process__grid">
            {PROCESS.map((p, i) => (
              <div key={i} className="process__step">
                <span className="process__num" data-reveal-scale>{p.num}</span>
                <div className="process__body" data-reveal>
                  <h3 className="h3">{p.title}</h3>
                  <p className="body-copy" style={{ marginTop: ".6rem" }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClassesScripts />
    </>
  );
}
