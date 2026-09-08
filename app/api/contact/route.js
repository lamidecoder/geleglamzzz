import { Resend } from "resend";

// A simple in-memory rate limiter — resets on server restart. Blocks a burst
// of spam from the same IP without needing a database. Fine for a site this
// size; if traffic grows, this would want a proper store (e.g. Redis).
const submissions = new Map();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return Response.json({ error: "Too many messages sent recently. Please try again later." }, { status: 429 });
    }

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Please fill in every field." }, { status: 400 });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      console.error("Contact form: missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars");
      return Response.json({ error: "The contact form is not fully configured yet. Please email directly instead." }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Gele Glamzzz Website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New website enquiry from ${name}`,
      text: `New message from the Gele Glamzzz contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<h2>New website enquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });

    if (error) {
      console.error("Resend error (contact):", error);
      return Response.json({ error: "Something went wrong sending your message. Please try again." }, { status: 500 });
    }

    // The message to the business is the critical part and already
    // succeeded above. This confirmation to the person who submitted the
    // form is a nice-to-have on top — if it fails, log it but don't turn
    // an already-successful enquiry into an error for the customer.
    try {
      await resend.emails.send({
        from: "Gele Glamzzz <onboarding@resend.dev>",
        to: email,
        subject: "We've received your message — Gele Glamzzz",
        text: `Hi ${name},\n\nThanks for reaching out to Gele Glamzzz. We've received your message and will get back to you shortly.\n\nFor your reference, here's what you sent:\n"${message}"\n\nSpeak soon,\nGele Glamzzz`,
        html: `<p>Hi ${escapeHtml(name)},</p><p>Thanks for reaching out to Gele Glamzzz. We've received your message and will get back to you shortly.</p><p>For your reference, here's what you sent:</p><p style="color:#555">${escapeHtml(message).replace(/\n/g, "<br>")}</p><p>Speak soon,<br>Gele Glamzzz</p>`,
      });
    } catch (confirmErr) {
      console.error("Contact confirmation email failed (business notification already sent):", confirmErr);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
