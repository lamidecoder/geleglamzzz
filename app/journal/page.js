import { JOURNAL_MEDIA } from "@/lib/data";
import ClassesScripts from "@/components/ClassesScripts";

export const metadata = {
  title: "Journal: Gele Glamzzz | Pictures & Video from the Studio",
  description: "A live feed of pictures and video from Gele Glamzzz: finished looks, behind the fold, and moments from the studio.",
  keywords: ["gele styling photos", "gele behind the scenes", "gele video London"],
  alternates: { canonical: "/journal" },
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function JournalPage() {
  return (
    <>
      <section className="page-opener">
        <div className="container container--narrow">
          <span className="eyebrow" data-reveal>The Journal</span>
          <h1 className="h2" data-reveal style={{ marginTop: ".8rem" }}>Notes on the art<br />of the crown.</h1>
          <p className="lede page-opener__lede" data-reveal>A live feed of pictures and video from the studio, no articles to read, just the work itself.</p>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: "clamp(1rem,3vw,2rem)" }}>
        <div className="container">
          <div className="media-gallery" data-reveal-scale>
            {JOURNAL_MEDIA.map((m, i) => (
              <div key={i} className="media-gallery__item">
                {m.type === "video" ? (
                  <>
                    {/* TODO(video): drop an .mp4 at the path in `suggest` (see lib/data.js) and set `src` — it will autoplay muted, looped, with no controls, exactly as is. Until then the poster frame shows. */}
                    <video muted loop autoPlay playsInline preload="metadata" poster={m.poster} aria-label={m.caption}>
                      {m.src && <source src={m.src} type="video/mp4" />}
                    </video>
                    <span className="media-gallery__badge"><PlayIcon /></span>
                  </>
                ) : (
                  <img src={m.src} alt={m.caption} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
                <span className="media-gallery__caption"><p>{m.sub}</p><p>{m.caption}</p></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClassesScripts />
    </>
  );
}
