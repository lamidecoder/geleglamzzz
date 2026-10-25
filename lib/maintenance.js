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
  message:
    "Service on this website is currently paused while its maintenance plan is renewed. It will come back online as soon as that is complete.",
  ownerNote: "Contact NexusHouseUK to renew the maintenance plan and restore service.",
};
