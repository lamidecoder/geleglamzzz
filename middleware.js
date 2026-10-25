// MAINTENANCE_MODE_MIDDLEWARE - managed by maintenance-mode.js. Please don't edit this file.
//
// While the site is paused (by hand, or automatically on the monthly pause date)
// every page and API route answers with a real HTTP 503 "temporarily unavailable"
// response. Otherwise this does nothing and the site behaves exactly as normal.
// It never runs while you work locally with `npm run dev`.

import { NextResponse } from "next/server";
import * as settings from "./lib/maintenance";
import { isPausedAt } from "./lib/maintenance-engine";

export function middleware(request) {
  if (process.env.NODE_ENV === "development") return NextResponse.next();

  const paused = isPausedAt(
    {
      manual: settings.MAINTENANCE_ENABLED === true,
      autoEnabled: settings.AUTO_PAUSE_ENABLED === true,
      from: settings.AUTO_PAUSE_FROM,
      timeZone: settings.AUTO_PAUSE_TIMEZONE || "Europe/London",
    },
    new Date()
  );
  if (!paused) return NextResponse.next();

  const headers = {
    "Retry-After": String(settings.MAINTENANCE.retryAfterSeconds),
    "Cache-Control": "no-store, max-age=0",
  };

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(settings.maintenanceJson(), { status: 503, headers });
  }

  return new NextResponse(settings.maintenanceHtml(), {
    status: 503,
    headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
  });
}

export const config = {
  matcher: "/:path*",
};
