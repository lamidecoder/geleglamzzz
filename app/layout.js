import "./globals.css";
import Script from "next/script";
import Nav from "@/components/Nav";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import GlobalScripts from "@/components/GlobalScripts";
import SvgDefs from "@/components/SvgDefs";

export const metadata = {
  metadataBase: new URL("https://www.geleglamzzz.com"),
  title: "Gele Glamzzz: Luxury Gele Artistry in London | The Art of the Crown",
  description:
    "Gele Glamzzz is a London based luxury gele artist crafting bridal, ceremonial and editorial headwraps with precision and presence. Discover the artistry and book your experience.",
  openGraph: {
    title: "Gele Glamzzz: The Art of the Crown",
    description: "Luxury gele artistry for weddings, traditional ceremonies and editorial moments. Based in London.",
    url: "https://www.geleglamzzz.com/",
    siteName: "Gele Glamzzz",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gele Glamzzz: The Art of the Crown",
    description: "Luxury gele artistry for weddings, traditional ceremonies and editorial moments. Based in London.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Gele Glamzzz",
  description: "Luxury gele artistry for weddings, traditional ceremonies, editorial and private bookings.",
  areaServed: "London, United Kingdom",
  priceRange: "Price on request",
  sameAs: ["https://www.instagram.com/geleglamzzz/"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SvgDefs />
        <svg className="grain-overlay" aria-hidden="true"><rect width="100%" height="100%" filter="url(#grainy)" /></svg>

        <div className="loader" id="loader" aria-hidden="true">
          <div className="loader__mark" id="loaderMark"></div>
          <div className="loader__bar"><span id="loaderBarFill"></span></div>
          <div className="loader__shutter" id="loaderShutter">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>

        <div className="cursor" id="cursor" aria-hidden="true"><span className="cursor__label" id="cursorLabel"></span></div>
        <div className="scroll-progress" id="scrollProgress" aria-hidden="true"></div>

        <Nav />
        <MobileMenu />
        <main id="main">{children}</main>
        <Footer />

        <GlobalScripts />

        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.2/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
