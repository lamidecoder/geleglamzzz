// MAINTENANCE_MODE_MIDDLEWARE - managed by maintenance-mode.js. Please don't edit this file.
//
// While the site is paused (by hand, or automatically on the monthly pause date)
// every page and API route answers with a real HTTP 503 "temporarily unavailable"
// response. Otherwise this does nothing and the site behaves exactly as normal.
// It never runs while you work locally with `npm run dev`.

import { NextResponse } from "next/server";
import * as settings from "./lib/maintenance";
import { isPausedAt } from "./lib/maintenance-engine";
import { maintenanceHtml, maintenanceJson } from "./lib/maintenance-page";

export function middleware(request) {
  if (process.env.NODE_ENV === "development") return NextResponse.next();

  const now = new Date();
  const paused = isPausedAt(
    {
      manual: settings.MAINTENANCE_ENABLED === true,
      autoEnabled: settings.AUTO_PAUSE_ENABLED === true,
      from: settings.AUTO_PAUSE_FROM,
      timeZone: settings.AUTO_PAUSE_TIMEZONE || "Europe/London",
    },
    now
  );
  if (!paused) return NextResponse.next();

  const info = settings.MAINTENANCE;
  const headers = {
    "Retry-After": String((info && info.retryAfterSeconds) || 86400),
    "Cache-Control": "no-store, max-age=0",
  };

  const path = request.nextUrl.pathname;

  if (path.startsWith("/api/")) {
    return NextResponse.json(maintenanceJson(info), { status: 503, headers });
  }

  return new NextResponse(maintenanceHtml(info, { path, now }), {
    status: 503,
    headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
  });
}

export const config = {
  matcher: "/:path*",
};
