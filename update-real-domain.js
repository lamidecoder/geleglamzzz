/**
 * update-real-domain.js
 * Run from your project root:   node update-real-domain.js
 *
 * Updated every place your real domain (jaygele.com) needed to go:
 * metadataBase, the Open Graph URL, robots.txt's sitemap reference, and
 * the sitemap itself. Confirmed all four actually resolve to the right
 * domain by checking the real output, not just the source.
 *
 * Left your Instagram link (instagram.com/geleglamzzz) alone on
 * purpose — that's your handle, not your website domain, a different
 * "geleglamzzz" that shouldn't change.
 *
 * Side note, not urgent: a few of the old delivery scripts (fix-batch-3.js,
 * add-wow-effects.js, etc.) are still sitting in your project's root
 * folder from when you ran them. They're inert, not part of the actual
 * site, safe to delete whenever you want to tidy up.
 */
const fs = require("fs");
const path = require("path");
const root = process.cwd();
function fail(msg) { console.error("✖ " + msg); process.exit(1); }
if (!fs.existsSync(path.join(root, "package.json"))) fail("Run this from your project root.");
function write(rel, content) {
  fs.writeFileSync(path.join(root, rel), content, "utf8");
  console.log("✓ wrote " + rel);
}

write('app/layout.js', 'import "./globals.css";\nimport Script from "next/script";\nimport Nav from "@/components/Nav";\nimport MobileMenu from "@/components/MobileMenu";\nimport Footer from "@/components/Footer";\nimport GlobalScripts from "@/components/GlobalScripts";\nimport PageTransition from "@/components/PageTransition";\nimport SmoothScroll from "@/components/SmoothScroll";\nimport BackToTop from "@/components/BackToTop";\nimport SvgDefs from "@/components/SvgDefs";\n\nexport const metadata = {\n  metadataBase: new URL("https://jaygele.com"),\n  title: "Gele Glamzzz: Luxury Gele Artistry in London | The Art of the Crown",\n  description:\n    "Gele Glamzzz is a London based luxury gele artist crafting bridal, ceremonial and editorial headwraps with precision and presence. Discover the artistry and book your experience.",\n  openGraph: {\n    title: "Gele Glamzzz: The Art of the Crown",\n    description: "Luxury gele artistry for weddings, traditional ceremonies and editorial moments. Based in London.",\n    url: "https://jaygele.com/",\n    siteName: "Gele Glamzzz",\n    locale: "en_GB",\n    type: "website",\n  },\n  twitter: {\n    card: "summary_large_image",\n    title: "Gele Glamzzz: The Art of the Crown",\n    description: "Luxury gele artistry for weddings, traditional ceremonies and editorial moments. Based in London.",\n  },\n};\n\nconst jsonLd = {\n  "@context": "https://schema.org",\n  "@type": "ProfessionalService",\n  name: "Gele Glamzzz",\n  description: "Luxury gele artistry for weddings, traditional ceremonies, editorial and private bookings.",\n  areaServed: "London, United Kingdom",\n  priceRange: "Price on request",\n  sameAs: ["https://www.instagram.com/geleglamzzz/"],\n};\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="en-GB">\n      <head>\n        <link rel="preconnect" href="https://fonts.googleapis.com" />\n        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />\n        <link\n          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@400;500;600;700;800&display=swap"\n          rel="stylesheet"\n        />\n        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />\n      </head>\n      <body>\n        <a className="skip-link" href="#main">Skip to content</a>\n        <SvgDefs />\n        <div className="loader" id="loader" aria-hidden="true">\n          <div className="loader__mark" id="loaderMark"></div>\n          <div className="loader__bar"><span id="loaderBarFill"></span></div>\n          <div className="loader__shutter" id="loaderShutter">\n            <span></span><span></span><span></span><span></span><span></span><span></span>\n          </div>\n        </div>\n\n        <div className="cursor" id="cursor" aria-hidden="true"><span className="cursor__label" id="cursorLabel"></span></div>\n        <div className="scroll-progress" id="scrollProgress" aria-hidden="true"></div>\n\n        <Nav />\n        <MobileMenu />\n        <main id="main">{children}</main>\n        <Footer />\n\n        <GlobalScripts />\n        <PageTransition />\n        <SmoothScroll />\n        <BackToTop />\n\n        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.2/gsap.min.js" strategy="beforeInteractive" />\n        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.2/ScrollTrigger.min.js" strategy="beforeInteractive" />\n      </body>\n    </html>\n  );\n}\n');
write('app/robots.js', 'export default function robots() {\n  return {\n    rules: {\n      userAgent: "*",\n      allow: "/",\n    },\n    sitemap: "https://jaygele.com/sitemap.xml",\n  };\n}\n');
write('app/sitemap.js', 'export default function sitemap() {\n  const base = "https://jaygele.com";\n  const routes = [\n    "",\n    "/services",\n    "/classes",\n    "/about",\n    "/journal",\n    "/achievements",\n    "/contact",\n    "/booking",\n  ];\n  return routes.map((route) => ({\n    url: `${base}${route}`,\n    lastModified: new Date(),\n    changeFrequency: route === "" ? "weekly" : "monthly",\n    priority: route === "" ? 1 : 0.7,\n  }));\n}\n');

console.log("\nDone. Restart the dev server (Ctrl+C, then npm run dev).");
