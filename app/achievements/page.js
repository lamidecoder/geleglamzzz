import fs from "fs";
import path from "path";
import ClassesScripts from "@/components/ClassesScripts";

// Same auto-discovery pattern as the homepage videos — drop a file into
// public/videos/podcast/ and it plays automatically, muted and looped.
function findPodcastVideo() {
  const dir = path.join(process.cwd(), "public", "videos", "podcast");
  const extToType = { ".mp4": "video/mp4", ".webm": "video/webm", ".mov": "video/quicktime" };
  try {
    if (!fs.existsSync(dir)) return null;
    const match = fs.readdirSync(dir).find((f) => extToType[path.extname(f).toLowerCase()]);
    if (!match) return null;
    return { src: "/videos/podcast/" + match, type: extToType[path.extname(match).toLowerCase()] };
  } catch {
    return null;
  }
}

export const metadata = {
  title: "Achievements: Gele Glamzzz | Recognition & Milestones",
  description: "Styling Grammy-nominated artist Ayra Starr, a Vogue feature, and gele workshops hosted across London and leading UK universities.",
  keywords: ["Ayra Starr gele", "gele Vogue feature", "gele university workshops UK", "notable gele stylist"],
  alternates: { canonical: "/achievements" },
};

export default function AchievementsPage() {
  const podcastVideo = findPodcastVideo();
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
                <div className="social-buzz">
                  <div className="social-buzz__media"><img src="/images/ayra-starr-x-buzz.jpg" alt="Ayra Starr performing live in the coral headwrap, as shared on X" loading="lazy" /></div>
                  <div className="social-buzz__body">
                    <span className="social-buzz__source">As seen on X</span>
                    <p className="social-buzz__quote">&ldquo;Ayra Starr ate this gele look&rdquo; 🔥</p>
                    <span className="social-buzz__handle">@AlbumTalks</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="achievement">
              <span className="achievement__num">02</span>
              <div className="achievement__media media-frame" data-reveal-scale>
                <div className="media-frame__art"><img src="/images/vogue-feature.jpg" alt="Runway model wearing a green and blue gele, Vogue-tagged fashion show feature" loading="lazy" style={{ objectPosition: "50% 8%" }} /></div>
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

            <div className="achievement">
              <span className="achievement__num">04</span>
              <div className="achievement__media media-frame" data-reveal-scale>
                <div className="media-frame__art">
                  {podcastVideo ? (
                    <video muted loop autoPlay playsInline preload="metadata" poster="/images/insta-podcast.jpg" aria-label="Gele Glamzzz founder on a podcast appearance">
                      <source src={podcastVideo.src} type={podcastVideo.type} />
                    </video>
                  ) : (
                    <img src="/images/insta-podcast.jpg" alt="Gele Glamzzz founder appearing on a podcast" loading="lazy" />
                  )}
                </div>
              </div>
              <div className="achievement__body" data-reveal>
                <h3 className="h3">On the mic, off the runway.</h3>
                <p className="body-copy">The craft doesn&apos;t only show up on stage and in front of the camera. Gele Glamzzz&apos;s founder sat down for a podcast conversation, talking through the story behind the brand, the culture behind the craft, and what it takes to turn a single fold into a career.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ClassesScripts />
    </>
  );
}
