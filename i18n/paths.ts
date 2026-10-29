import { isLocale, type Locale } from "./config";

/** "/work" in Spanish -> "/es/work". The home page is "/" -> "/es". */
export function localizePath(lang: Locale, path: string): string {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** "/es/work" -> "/work", "/es" -> "/". Paths without a locale are returned as is. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (!isLocale(first)) return pathname;
  return rest.length ? `/${rest.join("/")}` : "/";
}

/** The same page in another language: "/es/work" -> "/ja/work". */
export function switchLocale(pathname: string, next: Locale): string {
  return localizePath(next, stripLocale(pathname));
}
