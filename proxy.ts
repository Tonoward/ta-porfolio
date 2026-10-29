import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE, isLocale, locales } from "./i18n/config";
import { negotiateLocale } from "./i18n/negotiate";

// Every page lives under /[lang]. A request without a language prefix is
// redirected: saved choice (cookie) first, then the browser language, then English.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    saved && isLocale(saved)
      ? saved
      : negotiateLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  // The answer depends on these headers, so caches must not share it between visitors.
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Skip Next.js internals, API routes and any file with an extension (favicon, images).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
