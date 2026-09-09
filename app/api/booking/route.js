import { Resend } from "resend";
import { bookingNotificationHtml, bookingConfirmationHtml } from "@/lib/emailTemplates";

const submissions = new Map();
const WINDOW_MS = 10 * 60 * 1000;
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
      return Response.json({ error: "Too many requests sent recently. Please try again later." }, { status: 429 });
    }

    const { occasion, dateLabel, serviceTitle, form } = await request.json();

    if (!occasion || !dateLabel || !serviceTitle || !form?.name || !form?.email || !form?.phone || !form?.location) {
      return Response.json({ error: "Please fill in every required field." }, { status: 400 });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      console.error("Booking form: missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars");
      return Response.json({ error: "The booking form is not fully configured yet. Please email directly instead." }, { status: 500 });
    }

    const lines = [
      `Occasion: ${occasion}`,
      `Requested date: ${dateLabel}`,
      `Time: ${form.time || "Not specified"}`,
      `Service: ${serviceTitle}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Location: ${form.location}`,
      `Number of people: ${form.people || 1}`,
      `Notes: ${form.notes || "None"}`,
    ];

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Gele Glamzzz Website <hello@jaygele.com>",
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: form.email,
      subject: `New booking request — ${occasion} — ${form.name}`,
      text: `New booking request from the Gele Glamzzz website.\n\n${lines.join("\n")}\n\nThis is a request, not a confirmed appointment. Reply directly to ${form.email} to confirm.`,
      html: bookingNotificationHtml({ occasion, dateLabel, serviceTitle, form }),
    });

    if (error) {
      console.error("Resend error (booking):", error);
      return Response.json({ error: "Something went wrong sending your request. Please try again." }, { status: 500 });
    }

    // Business notification above is the critical part and already
    // succeeded. This confirmation to the customer is on top of that —
    // if it fails, log it but don't turn a successful request into an
    // error message for the person who just booked.
    const customerLines = [
      `Occasion: ${occasion}`,
      `Requested date: ${dateLabel}`,
      `Service: ${serviceTitle}`,
    ];
    try {
      await resend.emails.send({
        from: "Gele Glamzzz <hello@jaygele.com>",
        to: form.email,
        replyTo: [process.env.CONTACT_TO_EMAIL, "hello@jaygele.com"],
        subject: "We've received your booking request — Gele Glamzzz",
        text: `Hi ${form.name},\n\nThanks for your booking request with Gele Glamzzz. Here's a summary of what you sent:\n\n${customerLines.join("\n")}\n\nThis is a request, not a confirmed appointment — we'll be in touch shortly to confirm availability and finalise the details.\n\nSpeak soon,\nGele Glamzzz`,
        html: bookingConfirmationHtml({ occasion, dateLabel, serviceTitle, form }),
      });
    } catch (confirmErr) {
      console.error("Booking confirmation email failed (business notification already sent):", confirmErr);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Booking form error:", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
