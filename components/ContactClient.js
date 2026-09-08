"use client";
import { useState } from "react";
import useReveal from "@/lib/useReveal";

export default function ContactClient() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrorMsg("Could not reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__media">
          <img src="/images/testimonial-portrait.jpg" alt="Client in a beaded pink gown and matching gele" loading="eager" />
        </div>
        <div className="page-hero__scrim" aria-hidden="true"></div>
        <div className="page-hero__content">
          <span className="eyebrow" data-reveal style={{ color: "var(--gold-soft)" }}>Get In Touch</span>
          <h1 className="display-2" data-reveal style={{ marginTop: ".6rem" }}>Let&apos;s start<br />the conversation.</h1>
        </div>
      </section>

      <section className="contact-split">
        <div className="contact-split__media media-frame" data-reveal-scale>
          <div className="media-frame__art"><img src="/images/story-heritage.jpg" alt="Client in a silver holographic gele and beaded pale blue gown" loading="lazy" /></div>
          <div className="contact-split__media-quote">
            <p>&ldquo;Every message gets a real reply, from a real person, not a queue.&rdquo;</p>
          </div>
        </div>

        <div className="contact-split__body">
          <div data-reveal>
            <span className="eyebrow">Reach Us</span>
            <h2 className="h3" style={{ marginTop: ".6rem" }}>Questions about a service,<br />a class, or something bespoke.</h2>
          </div>

          <div className="contact-methods" data-reveal>
            <div className="contact-methods__item">
              <span className="contact-methods__num">01</span>
              <h4>Email</h4>
              <a href="mailto:tobibamidelejohn98@gmail.com" className="text-link">tobibamidelejohn98@gmail.com</a>
            </div>
            <div className="contact-methods__item">
              <span className="contact-methods__num">02</span>
              <h4>Instagram</h4>
              <a href="https://www.instagram.com/geleglamzzz/" className="text-link" target="_blank" rel="noopener noreferrer">@geleglamzzz</a>
            </div>
            <div className="contact-methods__item">
              <span className="contact-methods__num">03</span>
              <h4>Studio</h4>
              <span className="body-copy" style={{ margin: 0 }}>London, UK — also available to travel, UK &amp; international</span>
            </div>
          </div>

          <div className="contact-split__form-card" data-reveal>
            {status !== "sent" ? (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="field field--full">
                    <label htmlFor="cName">Full name</label>
                    <input id="cName" required disabled={status === "sending"} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="field field--full">
                    <label htmlFor="cEmail">Email</label>
                    <input id="cEmail" type="email" required disabled={status === "sending"} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="field field--full">
                    <label htmlFor="cMessage">Message</label>
                    <textarea id="cMessage" required rows={4} disabled={status === "sending"} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                  </div>
                </div>
                {status === "error" && <p className="field__hint" style={{ color: "var(--burgundy)", marginTop: "1rem" }}>{errorMsg}</p>}
                <button type="submit" className="btn btn--primary" disabled={status === "sending"} style={{ marginTop: "1.6rem" }}>
                  {status === "sending" ? "Sending…" : "Send message"} <span className="btn__arrow">→</span>
                </button>
              </form>
            ) : (
              <div>
                <p className="h3" style={{ marginBottom: ".8rem" }}>Message sent<span className="accent-dot">.</span></p>
                <p className="body-copy">Thank you, we&apos;ll get back to you shortly.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
