// MAINTENANCE_PAGE - managed by maintenance-mode.js. Please don't edit this file.
//
// The error screen shown while the site is paused. The wording and contact
// details come from the MAINTENANCE settings in lib/maintenance.js, so change
// them there. Anything missing from those settings falls back to the values below.

const DEFAULTS = {
  headline: "Service Suspended",
  siteName: "This website",
  domain: "",
  contactName: "the website administrator",
  contactEmail: "",
  contactUrl: "",
  retryAfterSeconds: 86400,
  message:
    "Service on this website is currently paused while its maintenance plan is renewed. It will come back online as soon as that is complete.",
  ownerNote: "Contact the website administrator to renew the maintenance plan and restore service.",
};

const FAVICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#c8102e"/>' +
  '<path d="M16 7v12" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/><circle cx="16" cy="24.5" r="2.1" fill="#fff"/></svg>';

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function withDefaults(info) {
  const out = {};
  Object.keys(DEFAULTS).forEach((key) => {
    const value = info ? info[key] : undefined;
    const empty = value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
    out[key] = empty ? DEFAULTS[key] : value;
  });
  return out;
}

export function maintenanceJson(info) {
  const m = withDefaults(info);
  return {
    error: "Service temporarily unavailable.",
    code: "SERVICE_SUSPENDED",
    status: 503,
    message: m.message,
  };
}

// context = { path, now }  (both optional)
export function maintenanceHtml(info, context) {
  const m = withDefaults(info);
  const ctx = context || {};

  const rawPath = typeof ctx.path === "string" && ctx.path ? ctx.path : "/";
  const shownPath = rawPath.length > 80 ? rawPath.slice(0, 77) + "..." : rawPath;
  const now = ctx.now instanceof Date ? ctx.now : new Date();
  const stamp = now.toISOString().slice(0, 19).replace("T", " ") + " UTC";
  const seconds = Math.max(1, Math.round(Number(m.retryAfterSeconds) || 86400));
  const heading = Array.isArray(m.headline) ? m.headline.join(" ") : String(m.headline);

  const subject = encodeURIComponent(m.siteName + " website - maintenance plan renewal");
  const mailto = m.contactEmail ? "mailto:" + m.contactEmail + "?subject=" + subject : "";
  const prettyUrl = String(m.contactUrl).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const favicon = "data:image/svg+xml," + encodeURIComponent(FAVICON_SVG);

  const hostBar = m.domain ? "<span>" + esc(m.domain) + "</span>" : "";
  const hostRow = m.domain ? "<dt>Host</dt><dd>" + esc(m.domain) + "</dd>" : "";
  const emailButton = mailto ? '<a class="btn" href="' + esc(mailto) + '">Email ' + esc(m.contactName) + "</a>" : "";
  const siteLink = m.contactUrl
    ? '<a class="alt" href="' + esc(m.contactUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(prettyUrl) + "</a>"
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="robots" content="noindex">
<title>503 Service Unavailable</title>
<link rel="icon" href="${favicon}">
<style>
:root{color-scheme:light dark;--bg:#f2f2ef;--box:#ffffff;--line:#d8d8d3;--text:#232323;--muted:#5d5d5d;--soft:#74746f;--code:#f4f4f1;--red:#c8102e;--bar:#c8102e}
@media (prefers-color-scheme:dark){:root{--bg:#0d0d0e;--box:#151516;--line:#2b2b2e;--text:#e9e9ea;--muted:#a3a3a9;--soft:#8a8a91;--code:#0e0e0f;--red:#ec4a52}}
*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:24px 16px;background:var(--bg);color:var(--text);font-family:ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono","Courier New",monospace;-webkit-font-smoothing:antialiased}
.box{width:100%;max-width:580px;overflow:hidden;background:var(--box);border:1px solid var(--line);border-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,.06),0 14px 34px rgba(0,0,0,.09)}
.bar{display:flex;justify-content:space-between;gap:16px;padding:10px 18px;background:var(--bar);color:#fff;font-size:12px;font-weight:700;letter-spacing:.03em}
.bar span:last-child{font-weight:400;opacity:.92;text-align:right;overflow-wrap:anywhere}
.body{padding:26px 22px 4px}
h1{display:flex;align-items:center;gap:10px;font-size:19px;line-height:1.3;color:var(--red)}
h1 svg{flex:none}
.lead{margin-top:14px;font-size:13.5px;line-height:1.75;color:var(--muted)}
dl{display:grid;grid-template-columns:max-content minmax(0,1fr);column-gap:18px;row-gap:6px;margin:22px 0 0;padding:15px 16px;background:var(--code);border:1px solid var(--line);border-radius:3px;font-size:12.5px;line-height:1.6}
dt{color:var(--red);font-weight:700}
dd{overflow-wrap:anywhere}
.owner{margin-top:24px;padding:18px 0 22px;border-top:1px dashed var(--line)}
.owner h2{margin-bottom:8px;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--red)}
.owner p{font-size:13.5px;line-height:1.7}
.actions{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;margin-top:14px}
.btn{display:inline-block;padding:9px 16px;border-radius:3px;background:var(--bar);color:#fff;font-size:12.5px;font-weight:700;text-decoration:none}
.btn:hover{filter:brightness(1.1)}
.alt{font-size:12.5px;color:var(--muted);text-decoration:underline;text-underline-offset:3px}
.foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 16px;padding:12px 18px;border-top:1px solid var(--line);font-size:11.5px;color:var(--soft)}
a:focus-visible{outline:2px solid var(--red);outline-offset:3px}
@media (max-width:420px){.body{padding:22px 16px 2px}.bar{padding:10px 14px}dl{padding:13px 14px}.foot{padding:12px 14px}}
</style>
</head>
<body>
<main class="box">
  <div class="bar"><span>HTTP 503 &mdash; Service Unavailable</span>${hostBar}</div>
  <div class="body">
    <h1><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v5"/><path d="M12 17.6v.01"/></svg>${esc(heading)}</h1>
    <p class="lead">${esc(m.message)}</p>
    <dl>
      <dt>Status</dt><dd>503 Service Unavailable</dd>
      <dt>Code</dt><dd>SERVICE_SUSPENDED</dd>
      <dt>Reason</dt><dd>MAINTENANCE_<wbr>PLAN_<wbr>RENEWAL_<wbr>REQUIRED</dd>
      ${hostRow}
      <dt>Path</dt><dd>${esc(shownPath)}</dd>
    </dl>
    <section class="owner" aria-label="For the website owner">
      <h2>Website owner</h2>
      <p>${esc(m.ownerNote)}</p>
      <div class="actions">${emailButton}${siteLink}</div>
    </section>
  </div>
  <div class="foot"><span>${esc(stamp)}</span><span>Retry after: ${seconds}s</span></div>
</main>
</body>
</html>`;
}
