// Shared HTML email templates for Gele Glamzzz — matches the site's dark,
// gold and cream brand. Built table-based with inline styles throughout
// since that's what actually renders consistently across Gmail, Outlook,
// Apple Mail, etc. — modern CSS (flexbox, grid, external stylesheets)
// is unreliable in email clients, so none of that is used here.

const COLORS = {
  void: "#15100c",
  espresso: "#2b2018",
  champagne: "#dac49c",
  ivory: "#f2e9d8",
  cream: "#faf6ee",
  gold: "#b8874a",
  goldSoft: "#d7ab6e",
  text: "#3a2f24",
  muted: "#8a7c6a",
};

const FONT_SERIF = "Georgia, 'Times New Roman', serif";
const FONT_SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// The outer shell every email is wrapped in: dark header with the
// wordmark, cream body card, muted footer with the site link.
function shell({ preheader = "", bodyHtml, siteUrl = "https://jaygele.com" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gele Glamzzz</title>
</head>
<body style="margin:0; padding:0; background-color:${COLORS.ivory}; font-family:${FONT_SANS};">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.ivory}; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; background-color:${COLORS.cream};">

          <!-- Header -->
          <tr>
            <td style="background-color:${COLORS.void}; padding:32px 40px; text-align:center;">
              <div style="color:${COLORS.goldSoft}; font-size:11px; letter-spacing:3px; text-transform:uppercase; font-family:${FONT_SANS}; margin-bottom:6px;">&#9098;</div>
              <div style="color:${COLORS.ivory}; font-family:${FONT_SERIF}; font-size:22px; letter-spacing:4px; text-transform:uppercase;">Gele Glamzzz</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px; border-top:1px solid ${COLORS.champagne};">
              <p style="margin:0; font-family:${FONT_SANS}; font-size:12px; color:${COLORS.muted}; text-align:center; line-height:1.6;">
                Gele Glamzzz &middot; Luxury Gele Artistry &middot; London<br>
                <a href="${siteUrl}" style="color:${COLORS.gold}; text-decoration:none;">${siteUrl.replace(/^https?:\/\//, "")}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label, value) {
  return `<tr>
    <td style="padding:10px 0; border-bottom:1px solid ${COLORS.champagne}; font-family:${FONT_SANS}; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:${COLORS.muted}; width:110px; vertical-align:top;">${esc(label)}</td>
    <td style="padding:10px 0; border-bottom:1px solid ${COLORS.champagne}; font-family:${FONT_SANS}; font-size:15px; color:${COLORS.text}; vertical-align:top;">${value}</td>
  </tr>`;
}

// ---------- CONTACT: notification to the business ----------
function contactNotificationHtml({ name, email, message }) {
  const body = `
    <p style="margin:0 0 6px; font-family:${FONT_SANS}; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${COLORS.gold};">New Enquiry</p>
    <h1 style="margin:0 0 24px; font-family:${FONT_SERIF}; font-size:26px; color:${COLORS.text}; font-weight:normal;">Someone reached out<br>through the website.</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      ${detailRow("Name", esc(name))}
      ${detailRow("Email", `<a href="mailto:${esc(email)}" style="color:${COLORS.text}; text-decoration:underline;">${esc(email)}</a>`)}
    </table>
    <p style="margin:0 0 8px; font-family:${FONT_SANS}; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:${COLORS.muted};">Message</p>
    <p style="margin:0; padding:20px; background-color:${COLORS.ivory}; font-family:${FONT_SANS}; font-size:15px; line-height:1.6; color:${COLORS.text}; white-space:pre-wrap;">${esc(message)}</p>
    <p style="margin:24px 0 0; font-family:${FONT_SANS}; font-size:13px; color:${COLORS.muted};">Reply directly to this email to respond — it's already addressed to them.</p>
  `;
  return shell({ preheader: `New enquiry from ${name}`, bodyHtml: body });
}

// ---------- CONTACT: confirmation to the customer ----------
function contactConfirmationHtml({ name, message }) {
  const body = `
    <p style="margin:0 0 6px; font-family:${FONT_SANS}; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${COLORS.gold};">Message Received</p>
    <h1 style="margin:0 0 20px; font-family:${FONT_SERIF}; font-size:26px; color:${COLORS.text}; font-weight:normal;">Thank you, ${esc(name)}.</h1>
    <p style="margin:0 0 24px; font-family:${FONT_SANS}; font-size:15px; line-height:1.7; color:${COLORS.text};">We've received your message and will get back to you shortly.</p>
    <p style="margin:0 0 8px; font-family:${FONT_SANS}; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:${COLORS.muted};">What you sent</p>
    <p style="margin:0 0 28px; padding:20px; background-color:${COLORS.ivory}; font-family:${FONT_SANS}; font-size:15px; line-height:1.6; color:${COLORS.text}; white-space:pre-wrap;">${esc(message)}</p>
    <p style="margin:0; font-family:${FONT_SERIF}; font-style:italic; font-size:16px; color:${COLORS.text};">Speak soon,<br>Gele Glamzzz</p>
  `;
  return shell({ preheader: "We've received your message", bodyHtml: body });
}

// ---------- BOOKING: notification to the business ----------
function bookingNotificationHtml({ occasion, dateLabel, serviceTitle, form }) {
  const body = `
    <p style="margin:0 0 6px; font-family:${FONT_SANS}; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${COLORS.gold};">New Booking Request</p>
    <h1 style="margin:0 0 24px; font-family:${FONT_SERIF}; font-size:26px; color:${COLORS.text}; font-weight:normal;">A new request<br>just came in.</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      ${detailRow("Occasion", esc(occasion))}
      ${detailRow("Date", esc(dateLabel))}
      ${detailRow("Time", esc(form.time || "Not specified"))}
      ${detailRow("Service", esc(serviceTitle))}
      ${detailRow("Name", esc(form.name))}
      ${detailRow("Email", `<a href="mailto:${esc(form.email)}" style="color:${COLORS.text}; text-decoration:underline;">${esc(form.email)}</a>`)}
      ${detailRow("Phone", esc(form.phone || "—"))}
      ${detailRow("Location", esc(form.location || "—"))}
      ${detailRow("Guests", esc(String(form.people || "—")))}
    </table>
    ${form.notes ? `<p style="margin:0 0 8px; font-family:${FONT_SANS}; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:${COLORS.muted};">Notes</p>
    <p style="margin:0 0 24px; padding:20px; background-color:${COLORS.ivory}; font-family:${FONT_SANS}; font-size:15px; line-height:1.6; color:${COLORS.text}; white-space:pre-wrap;">${esc(form.notes)}</p>` : ""}
    <p style="margin:24px 0 0; font-family:${FONT_SANS}; font-size:13px; color:${COLORS.muted};">Reply directly to this email to respond — it's already addressed to them.</p>
  `;
  return shell({ preheader: `New booking request from ${form.name}`, bodyHtml: body });
}

// ---------- BOOKING: confirmation to the customer ----------
function bookingConfirmationHtml({ occasion, dateLabel, serviceTitle, form }) {
  const body = `
    <p style="margin:0 0 6px; font-family:${FONT_SANS}; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:${COLORS.gold};">Request Received</p>
    <h1 style="margin:0 0 20px; font-family:${FONT_SERIF}; font-size:26px; color:${COLORS.text}; font-weight:normal;">Thank you, ${esc(form.name)}.</h1>
    <p style="margin:0 0 24px; font-family:${FONT_SANS}; font-size:15px; line-height:1.7; color:${COLORS.text};">Here's a summary of your booking request:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      ${detailRow("Occasion", esc(occasion))}
      ${detailRow("Date", esc(dateLabel))}
      ${detailRow("Service", esc(serviceTitle))}
    </table>
    <p style="margin:0 0 28px; padding:16px 20px; background-color:${COLORS.ivory}; font-family:${FONT_SANS}; font-size:13px; line-height:1.6; color:${COLORS.muted}; font-style:italic;">This is a request, not a confirmed appointment — we'll be in touch shortly to confirm availability and finalise the details.</p>
    <p style="margin:0; font-family:${FONT_SERIF}; font-style:italic; font-size:16px; color:${COLORS.text};">Speak soon,<br>Gele Glamzzz</p>
  `;
  return shell({ preheader: "We've received your booking request", bodyHtml: body });
}

export { contactNotificationHtml, contactConfirmationHtml, bookingNotificationHtml, bookingConfirmationHtml };
