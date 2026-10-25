// ============================================================================
// SERVICE-PAUSE (HTTP 503) PAGE  -  managed by maintenance-mode.js
//
//   Pause the site now      :  node maintenance-mode.js
//   They paid, restore it   :  node maintenance-mode.js paid
//   Switch everything off   :  node maintenance-mode.js off
//   See the current state   :  node maintenance-mode.js status
//   (then git add / commit / push, or add --push to do that for you)
//
// No laptop? On github.com edit these lines below and commit:
//   MAINTENANCE_ENABLED   true = paused right now, false = not paused
//   AUTO_PAUSE_FROM       the date the next automatic pause starts
// Vercel redeploys on its own in about a minute.
//
// All the wording shown on the page lives in the MAINTENANCE object further down.
// ============================================================================

export const MAINTENANCE_ENABLED = true; // <-- THE SWITCH (true = paused right now, false = not paused)

// >>> AUTO-PAUSE (monthly, like a subscription) --------------------------------
// When armed, the site pauses itself on AUTO_PAUSE_FROM and stays paused until
// you run:  node maintenance-mode.js paid
// That brings the site back and moves the next automatic pause one month later.
export const AUTO_PAUSE_ENABLED = true; // true = the monthly auto-pause is armed
export const AUTO_PAUSE_FROM = "2026-10-26"; // the date the next automatic pause starts (YYYY-MM-DD)
export const AUTO_PAUSE_DAY = 26; // the day of the month the pause starts
export const AUTO_PAUSE_TIMEZONE = "Europe/London"; // whose clock decides when the 26th starts
export const AUTO_PAUSE_LAST_PAID = ""; // the day you last ran "paid" (stops accidental double-runs)
// <<< AUTO-PAUSE ----------------------------------------------------------------

export const MAINTENANCE = {
  siteName: "Gele Glamzzz",
  domain: "jaygele.com",
  contactName: "NexusHouseUK",
  contactEmail: "nexushouseuk@gmail.com",
  contactUrl: "https://www.nexushousehq.com/",
  retryAfterSeconds: 86400,
  headline: ["Temporarily", "unavailable."],
  message:
    "Service on this website is currently paused while its maintenance plan is renewed. It will come back online as soon as that is complete.",
  ownerNote: "Contact NexusHouseUK to renew the maintenance plan and restore service.",
};

const FAVICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#15100c"/>' +
  '<path d="M5 32 A21 21 0 0 1 34 10" stroke="#d7ab6e" stroke-width="2.6" fill="none"/>' +
  '<path d="M10.5 32 A15 15 0 0 1 30 14.5" stroke="#d7ab6e" stroke-width="2.6" fill="none" opacity=".65"/>' +
  '<path d="M16 32 A9.5 9.5 0 0 1 27 18.5" stroke="#d7ab6e" stroke-width="2.6" fill="none" opacity=".4"/>' +
  '<circle cx="34" cy="9" r="2.6" fill="#d7ab6e"/></svg>';

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function maintenanceJson() {
  return {
    error: "Service temporarily unavailable.",
    status: 503,
    message: MAINTENANCE.message,
  };
}

export function maintenanceHtml() {
  const m = MAINTENANCE;
  const mailto = `mailto:${m.contactEmail}?subject=${encodeURIComponent(`${m.siteName} website - maintenance plan renewal`)}`;
  const favicon = `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}`;
  const hours = Math.max(1, Math.round(m.retryAfterSeconds / 3600));

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#15100c">
<title>${esc(m.headline.join(" "))} | ${esc(m.siteName)}</title>
<link rel="icon" href="${favicon}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,400&family=Manrope:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--void:#15100c;--espresso:#2b2018;--ivory:#f2e9d8;--gold-soft:#d7ab6e;--muted:rgba(242,233,216,.68);--line:rgba(242,233,216,.16);--ease:cubic-bezier(.22,1,.36,1)}
*{box-sizing:border-box;margin:0;padding:0}
html{color-scheme:dark}
body{min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:36px 20px;background:radial-gradient(110% 70% at 50% -10%,rgba(184,135,74,.20),transparent 62%),var(--void);color:var(--ivory);font-family:'Manrope',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;text-align:center}
.wrap{width:100%;max-width:560px}
.mark{display:block;width:68px;height:68px;margin:0 auto 30px;color:var(--gold-soft)}
.mark path{fill:none;stroke:currentColor;stroke-width:1.4;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:draw 1.8s var(--ease) forwards}
.mark path:nth-child(2){animation-delay:.2s}
.mark path:nth-child(3){animation-delay:.4s}
.mark circle{opacity:0;animation:fade .6s ease 1.5s forwards}
.status{display:inline-flex;align-items:center;gap:10px;padding:9px 15px;border:1px solid rgba(215,171,110,.38);border-radius:999px;font:500 11.5px/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-soft)}
.status i{width:6px;height:6px;border-radius:50%;background:var(--gold-soft);animation:pulse 2.4s ease-out infinite}
h1{margin:28px 0 20px;font-family:'Fraunces','Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif;font-weight:300;font-size:clamp(2.7rem,9.5vw,4.5rem);line-height:1.03;letter-spacing:-.012em}
h1 em{font-style:italic;font-weight:300;color:var(--gold-soft)}
.lead{max-width:44ch;margin:0 auto;color:var(--muted);font-size:1.0625rem;line-height:1.75}
.owner{margin-top:38px;padding:24px 22px 26px;border:1px solid var(--line);border-radius:16px;background:rgba(43,32,24,.5)}
.owner small{display:block;margin-bottom:12px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-soft)}
.owner p{margin-bottom:20px;font-size:.98rem;line-height:1.65}
.btn{display:inline-block;padding:13px 26px;border-radius:999px;background:var(--gold-soft);color:var(--void);font-size:.9rem;font-weight:700;letter-spacing:.02em;text-decoration:none;transition:background .3s ease,transform .3s ease}
.btn:hover{background:var(--ivory);transform:translateY(-1px)}
.btn:focus-visible,.alt a:focus-visible{outline:2px solid var(--ivory);outline-offset:3px}
.alt{display:block;margin-top:16px;font-size:.85rem;color:var(--muted)}
.alt a{color:var(--gold-soft);text-decoration:none;border-bottom:1px solid rgba(215,171,110,.4)}
.foot{margin-top:34px;font:400 11.5px/1.7 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.06em;color:rgba(242,233,216,.42)}
.rise{opacity:0;transform:translateY(12px);animation:rise .9s var(--ease) forwards}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes fade{to{opacity:1}}
@keyframes rise{to{opacity:1;transform:none}}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(215,171,110,.55)}70%,100%{box-shadow:0 0 0 9px rgba(215,171,110,0)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rise,.mark circle{opacity:1;transform:none}.mark path{stroke-dashoffset:0}}
</style>
</head>
<body>
<main class="wrap">
  <svg class="mark" viewBox="0 0 40 40" aria-hidden="true">
    <path pathLength="1" d="M4 33 A22 22 0 0 1 35 9"/>
    <path pathLength="1" d="M9.5 33 A16 16 0 0 1 32 13.5" opacity=".65"/>
    <path pathLength="1" d="M15 33 A10 10 0 0 1 29 18.5" opacity=".4"/>
    <circle cx="35" cy="8" r="1.8" fill="currentColor"/>
  </svg>
  <div class="rise" style="animation-delay:.15s"><span class="status"><i></i>HTTP 503 &middot; Service Unavailable</span></div>
  <h1 class="rise" style="animation-delay:.3s">${esc(m.headline[0])}<br><em>${esc(m.headline[1])}</em></h1>
  <p class="lead rise" style="animation-delay:.45s">${esc(m.message)}</p>
  <section class="owner rise" style="animation-delay:.6s" aria-label="For the website owner">
    <small>Website owner?</small>
    <p>${esc(m.ownerNote)}</p>
    <a class="btn" href="${esc(mailto)}">Contact ${esc(m.contactName)}</a>
    <span class="alt">or visit <a href="${esc(m.contactUrl)}" target="_blank" rel="noopener noreferrer">${esc(m.contactUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}</a></span>
  </section>
  <p class="foot rise" style="animation-delay:.75s">${esc(m.domain)} &middot; status 503 &middot; retry in ${hours}h</p>
</main>
</body>
</html>`;
}
