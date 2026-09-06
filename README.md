# Gele Glamzzz — Next.js site

A luxury gele artistry website for Gele Glamzzz, built with Next.js 14 (App Router), plain CSS (no Tailwind), and vanilla-JS-in-React for the interactive bits (custom cursor, GSAP scroll reveals, gallery lightbox, the booking wizard).

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com → **Add New Project** → import that repo.
3. Leave all settings on their defaults (Vercel auto-detects Next.js). Click **Deploy**.

That's it, no environment variables or extra config needed for what's here today.

## Project structure

```
app/
  layout.js          shared chrome: fonts, nav, footer, cursor, loader
  globals.css         all styling (plain CSS, no Tailwind)
  page.js              Home
  about/page.js        About (the founder)
  services/page.js     Services
  classes/page.js      Classes
  journal/page.js      Journal (pictures + video)
  achievements/page.js Achievements
  booking/page.js      Booking (wraps components/BookingClient.js)
components/            Nav, Footer, cursor/loader scripts, per-page interactivity
lib/data.js            all the site's editable content lives here (services, testimonials, journal media, etc.)
public/images/         every photo currently on the site
```

## Where to make changes

- **Text content**: almost everything (services, testimonials, journal captions, process steps) is in `lib/data.js` — edit the arrays there rather than hunting through page files.
- **Photos**: add new files to `public/images/` and reference them as `/images/your-file.jpg`.
- **Hero / journal video**: `public/videos/` doesn't exist yet — create it, drop an `.mp4` in, then:
  - Hero: uncomment the `<source>` line in `app/page.js` inside the `<video id="heroVideo">` tag.
  - Journal: in `lib/data.js`, set the `src` field on any `JOURNAL_MEDIA` entry with `type: "video"` to `/videos/your-file.mp4`.
  Both are already wired to autoplay, muted, looped, with no controls — nothing else to change.
- **Booking backend**: `components/BookingClient.js` has a `TODO(backend)` comment exactly where the submit handler should call your real API instead of just showing the success screen.
- **Logo**: `components/LogoMark.js` is a small SVG mark used in the nav and footer. Swap its contents for a different mark any time without touching layout code.
- **Real business details**: email, TikTok, Privacy/Terms links are marked with `data-placeholder-link` or obviously fake addresses — search for `hello@geleglamzzz.com` and `data-placeholder-link` to find every one.

## Notes on what's real vs. placeholder

- Photos are the real ones supplied so far. A few slots (Vogue feature) are still abstract placeholder art with an on-canvas label saying so.
- Testimonials are clearly marked as sample content.
- Sample calendar availability in the booking flow is hardcoded in `components/BookingClient.js` (`SAMPLE_UNAVAILABLE`) — replace with a real feed when there's a backend.
