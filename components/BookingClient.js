"use client";
import { useState, useMemo } from "react";
import useReveal from "@/lib/useReveal";
import { SERVICES } from "@/lib/data";

const STEP_NAMES = ["Your Occasion", "Your Date", "Your Experience", "Your Details", "Review & Send"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const OCCASIONS = ["Bridal", "Traditional Ceremony", "Birthday / Celebration", "Photoshoot", "Private Event", "Other"];
/* TODO(backend): replace with a real availability feed */
const SAMPLE_UNAVAILABLE = ["2026-09-12", "2026-09-13", "2026-09-19", "2026-09-26", "2026-10-03", "2026-10-10", "2026-10-24", "2026-10-31"];

function pad(n) { return n < 10 ? "0" + n : "" + n; }
function isoDate(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

export default function BookingPage() {
  useReveal();
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState(null);
  const [date, setDate] = useState(null);
  const [dateLabel, setDateLabel] = useState("");
  const [service, setService] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", time: "", location: "", people: 1, notes: "" });
  const [calMonth, setCalMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  function goTo(n) { setStep(n); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: window.__prefersReducedMotion ? "auto" : "smooth" }); }

  const canContinue =
    (step === 1 && !!occasion) ||
    (step === 2 && !!date) ||
    (step === 3 && !!service) ||
    step === 4 || step === 5;

  function handleNext() {
    if (step === 4) {
      if (!form.name || !form.email || !form.phone || !form.location) { setFormError(true); return; }
      setFormError(false);
    }
    if (step < 5) goTo(step + 1);
  }

  function handleSubmit() {
    /* TODO(backend): send { occasion, date, service, form } to a real endpoint, e.g.
       fetch('/api/bookings', { method:'POST', headers:{'Content-Type':'application/json'},
         body: JSON.stringify({ occasion, date, service, form }) }) */
    setSubmitted(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: window.__prefersReducedMotion ? "auto" : "smooth" });
  }

  function resetAll() {
    setSubmitted(false); setStep(1); setOccasion(null); setDate(null); setDateLabel("");
    setService(null); setForm({ name: "", email: "", phone: "", time: "", location: "", people: 1, notes: "" });
  }

  const daysInMonth = new Date(calMonth.y, calMonth.m + 1, 0).getDate();
  const firstDay = new Date(calMonth.y, calMonth.m, 1).getDay();

  return (
    <div className="booking-page">
      <div className="booking-page__sticky">
        <div className="booking__progress" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={`booking__progress-seg${n < step ? " is-done" : n === step ? " is-active" : ""}`}><span></span></div>
          ))}
        </div>
        <div className="booking__step-label"><span>Step 0{step} / 05</span><span>{STEP_NAMES[step - 1]}</span></div>
      </div>

      <div className="booking__body">
        {!submitted && (
          <>
            {step === 1 && (
              <div className="booking__step is-active">
                <p className="eyebrow booking__kicker">Step 01</p>
                <h1 className="h3 booking__title">What are you booking for?</h1>
                <div className="option-grid" role="radiogroup" aria-label="Occasion type">
                  {OCCASIONS.map((o, i) => (
                    <button key={o} type="button" className={`option-card${occasion === o ? " is-selected" : ""}`} role="radio" aria-checked={occasion === o} onClick={() => setOccasion(o)}>
                      <span className="option-card__num">{pad(i + 1)}</span>
                      <span className="option-card__label">{o}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="booking__step is-active">
                <p className="eyebrow booking__kicker">Step 02</p>
                <h1 className="h3 booking__title">Choose your date.</h1>
                <div className="calendar">
                  <div className="calendar__head">
                    <button type="button" aria-label="Previous month" onClick={() => setCalMonth((c) => (c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 }))}>←</button>
                    <span className="calendar__month">{MONTH_NAMES[calMonth.m]} {calMonth.y}</span>
                    <div className="calendar__nav"><button type="button" aria-label="Next month" onClick={() => setCalMonth((c) => (c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 }))}>→</button></div>
                  </div>
                  <div className="calendar__dow">{["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i}>{d}</span>)}</div>
                  <div className="calendar__grid">
                    {Array.from({ length: firstDay }).map((_, i) => <span key={"e" + i} className="calendar__day is-empty"></span>)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const d = i + 1;
                      const iso = isoDate(calMonth.y, calMonth.m, d);
                      const thisDate = new Date(calMonth.y, calMonth.m, d);
                      const isPast = thisDate < today;
                      const isUnavail = SAMPLE_UNAVAILABLE.includes(iso);
                      const isSelected = date === iso;
                      return (
                        <button key={d} type="button" disabled={isPast || isUnavail}
                          className={`calendar__day${isPast ? " is-past" : isUnavail ? " is-unavailable" : " is-enabled"}${isSelected ? " is-selected" : ""}`}
                          onClick={() => { setDate(iso); setDateLabel(thisDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })); }}>
                          {d}
                        </button>
                      );
                    })}
                  </div>
                  <div className="calendar__legend"><span><i></i>Available</span><span><i className="unavail"></i>Unavailable</span></div>
                  <p className="calendar__selected-note">{date ? `Selected: ${dateLabel}` : "No date selected yet."}</p>
                </div>
                <p className="field__hint" style={{ marginTop: "1rem", maxWidth: "46ch" }}>Sample availability shown for preview. Connect a real booking backend to reflect live availability automatically.</p>
              </div>
            )}

            {step === 3 && (
              <div className="booking__step is-active">
                <p className="eyebrow booking__kicker">Step 03</p>
                <h1 className="h3 booking__title">Your experience.</h1>
                <div className="service-select">
                  {SERVICES.map((s) => (
                    <div key={s.title} className={`service-option${service === s.title ? " is-selected" : ""}`} role="radio" aria-checked={service === s.title} tabIndex={0} onClick={() => setService(s.title)}>
                      <div className="service-option__left">
                        <span className="service-option__radio"></span>
                        <div><p className="service-option__name">{s.title}</p><p className="service-option__desc">{s.desc}</p></div>
                      </div>
                      <span className="service-option__price">Price on consultation</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="booking__step is-active">
                <p className="eyebrow booking__kicker">Step 04</p>
                <h1 className="h3 booking__title">Tell us about your moment.</h1>
                <div className="form-grid">
                  <div className="field"><label htmlFor="bkName">Full name</label><input id="bkName" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                  <div className="field"><label htmlFor="bkEmail">Email</label><input id="bkEmail" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                  <div className="field"><label htmlFor="bkPhone">Phone number</label><input id="bkPhone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                  <div className="field"><label htmlFor="bkTime">Preferred time</label><input id="bkTime" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
                  <div className="field"><label htmlFor="bkLocation">Event location</label><input id="bkLocation" placeholder="e.g. Venue, borough or postcode" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                  <div className="field"><label htmlFor="bkPeople">Number of people</label><input id="bkPeople" type="number" min="1" value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })} /></div>
                  <div className="field field--full"><label htmlFor="bkNotes">Additional notes</label><textarea id="bkNotes" placeholder="Outfit colour, inspiration images, anything we should know." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}></textarea></div>
                </div>
                {formError && <p className="field__hint" style={{ color: "var(--burgundy)", marginTop: "1rem" }}>Please fill in your name, email, phone and location to continue.</p>}
              </div>
            )}

            {step === 5 && (
              <div className="booking__step is-active">
                <p className="eyebrow booking__kicker">Step 05</p>
                <h1 className="h3 booking__title">Review your request.</h1>
                <dl className="review-list">
                  {[["Occasion", occasion], ["Date", dateLabel], ["Experience", service], ["Name", form.name], ["Email", form.email], ["Phone", form.phone], ["Location", form.location], ["Number of people", form.people], ["Preferred time", form.time], ["Notes", form.notes]].map(([k, v]) => (
                    <div key={k} className="review-row"><dt>{k}</dt><dd>{v || "—"}</dd></div>
                  ))}
                </dl>
                <p className="field__hint" style={{ marginBottom: "2rem", maxWidth: "52ch" }}>This sends a request, not a confirmed appointment. Gele Glamzzz will reply to confirm availability.</p>
              </div>
            )}

            <div className="booking__nav" style={step === 1 ? { justifyContent: "flex-end" } : undefined}>
              {step > 1 && <button className="booking__back" onClick={() => goTo(step - 1)}>← Back</button>}
              {step < 5 && <button className="btn btn--primary" disabled={!canContinue} onClick={handleNext}>Continue <span className="btn__arrow">→</span></button>}
              {step === 5 && <button className="btn btn--primary" onClick={handleSubmit}>Request my appointment <span className="btn__arrow">→</span></button>}
            </div>
          </>
        )}

        {submitted && (
          <div className="booking__success is-active">
            <div className="booking__success-inner">
              <p className="eyebrow" style={{ marginBottom: "1.4rem" }}>Request Received</p>
              <h1 className="display-2" style={{ marginBottom: "1.6rem" }}>Your moment<br />has been reserved<span className="accent-dot">.</span></h1>
              <p className="lede" style={{ marginBottom: "2.4rem" }}>Thank you. Your request has been received. We&apos;ll be in touch shortly to confirm your appointment.</p>
              <a href="/" className="btn btn--ghost" onClick={(e) => { e.preventDefault(); resetAll(); if (window.__navigateWithTransition) window.__navigateWithTransition("/"); else window.location.href = "/"; }}>Return home</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
