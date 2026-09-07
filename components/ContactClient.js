"use client";
import { useState } from "react";
import useReveal from "@/lib/useReveal";

export default function ContactClient() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    /* TODO(backend): send { name, email, message } to a real endpoint, e.g.
       fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'},
         body: JSON.stringify(form) }) */
    setSent(true);
  }

  return (
    <>
      <section className="page-opener">
        <div className="container container--narrow">
          <span className="eyebrow" data-reveal>Get In Touch</span>
          <h1 className="h2" data-reveal style={{ marginTop: ".8rem" }}>Let&apos;s start<br />the conversation.</h1>
          <p className="lede page-opener__lede" data-reveal>Questions about a service, a class, or something bespoke, this is the place to ask.</p>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: "clamp(1rem,3vw,2rem)" }}>
        <div className="container container--narrow">
          <div style={{ display: "grid", gap: "clamp(2.5rem,5vw,4rem)", gridTemplateColumns: "1fr" }}>
            <div data-reveal>
              <h2 className="h3" style={{ marginBottom: "1.2rem" }}>Reach us directly.</h2>
              <p className="body-copy" style={{ marginBottom: "1.6rem" }}>Prefer email or Instagram? Either works just as well as the form below.</p>
              <p className="body-copy"><a href="mailto:hello@geleglamzzz.com" className="text-link" data-placeholder-link>hello@geleglamzzz.com</a></p>
              <p className="body-copy" style={{ marginTop: ".6rem" }}><a href="https://www.instagram.com/geleglamzzz/" className="text-link" target="_blank" rel="noopener noreferrer">@geleglamzzz</a></p>
              <p className="body-copy" style={{ marginTop: ".6rem" }}>London, UK</p>
            </div>

            {!sent ? (
              <form onSubmit={handleSubmit} data-reveal>
                <div className="form-grid">
                  <div className="field field--full">
                    <label htmlFor="cName">Full name</label>
                    <input id="cName" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="field field--full">
                    <label htmlFor="cEmail">Email</label>
                    <input id="cEmail" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="field field--full">
                    <label htmlFor="cMessage">Message</label>
                    <textarea id="cMessage" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn--primary" style={{ marginTop: "1.6rem" }}>Send message <span className="btn__arrow">→</span></button>
              </form>
            ) : (
              <div data-reveal>
                <p className="h3" style={{ marginBottom: ".8rem" }}>Message sent.</p>
                <p className="body-copy">Thank you, we&apos;ll get back to you shortly.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
