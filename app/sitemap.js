export default function sitemap() {
  const base = "https://jaygele.com";
  const routes = [
    "",
    "/services",
    "/classes",
    "/about",
    "/journal",
    "/achievements",
    "/contact",
    "/booking",
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
