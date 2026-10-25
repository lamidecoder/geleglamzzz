// MAINTENANCE_ENGINE - managed by maintenance-mode.js. Please don't edit this file.
//
// Plain date arithmetic shared by the live site (middleware.js) and by
// maintenance-mode.js, so the two can never disagree about what day it is.

function pad(n, width) {
  return String(n).padStart(width, "0");
}

function daysInMonth(y, m) {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

function build(y, m, d) {
  return pad(y, 4) + "-" + pad(m, 2) + "-" + pad(d, 2);
}

export function parseYmd(s) {
  const found = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ""));
  if (!found) return null;
  const y = Number(found[1]);
  const m = Number(found[2]);
  const d = Number(found[3]);
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y: y, m: m, d: d };
}

export function isValidYmd(s) {
  return parseYmd(s) !== null;
}

// Today's date (YYYY-MM-DD) on the clock of the given time zone, e.g. "Europe/London".
export function todayIn(timeZone, now) {
  const date = now || new Date();
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(date);
    const pick = (type) => parts.find((p) => p.type === type).value;
    return pick("year") + "-" + pick("month") + "-" + pick("day");
  } catch (e) {
    // Unknown time zone name: fall back to UTC rather than break the site.
    return date.toISOString().slice(0, 10);
  }
}

// The due day (e.g. the 26th) inside a given month. A day that doesn't exist
// in that month (the 31st in June) is pulled back to the last day of it.
export function dueInMonth(y, m, day) {
  return build(y, m, Math.min(day, daysInMonth(y, m)));
}

// Moves a date forward (or back, with a negative n) by whole months.
export function addMonths(ymd, n, day) {
  const p = parseYmd(ymd);
  const total = p.y * 12 + (p.m - 1) + n;
  const y = Math.floor(total / 12);
  const m = total - y * 12 + 1;
  return dueInMonth(y, m, day);
}

export function daysBetween(a, b) {
  const pa = parseYmd(a);
  const pb = parseYmd(b);
  return Math.round((Date.UTC(pb.y, pb.m - 1, pb.d) - Date.UTC(pa.y, pa.m - 1, pa.d)) / 86400000);
}

// The first due date that is strictly after today.
export function upcomingDue(today, day) {
  const p = parseYmd(today);
  const thisMonth = dueInMonth(p.y, p.m, day);
  return thisMonth > today ? thisMonth : addMonths(thisMonth, 1, day);
}

// The due date closest to today, before or after (a tie goes to the later one).
export function nearestDue(today, day) {
  const p = parseYmd(today);
  const thisMonth = dueInMonth(p.y, p.m, day);
  const candidates = [addMonths(thisMonth, -1, day), thisMonth, addMonths(thisMonth, 1, day)];
  let best = candidates[0];
  candidates.forEach((c) => {
    const dc = Math.abs(daysBetween(today, c));
    const db = Math.abs(daysBetween(today, best));
    if (dc < db || (dc === db && c > best)) best = c;
  });
  return best;
}

export function humanDate(ymd) {
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const p = parseYmd(ymd);
  return p ? p.d + " " + names[p.m - 1] + " " + p.y : String(ymd);
}

// state = { manual, autoEnabled, from, timeZone }
// manual:      the hand switch (MAINTENANCE_ENABLED)
// autoEnabled: the monthly auto-pause is armed
// from:        the date the automatic pause starts (YYYY-MM-DD)
export function isPausedAt(state, now) {
  if (state.manual) return true;
  if (!state.autoEnabled) return false;
  // A mistyped date must never take the site down by accident.
  if (!isValidYmd(state.from)) return false;
  return todayIn(state.timeZone, now) >= state.from;
}
