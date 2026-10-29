// Client-safe: no server-only imports, because proxy.ts and client components use it.

export const locales = ["en", "es", "ja"] as const;

export type Locale = (typeof locales)[number];

/** Used when the visitor's language is not available. */
export const defaultLocale: Locale = "en";

/** Set when the visitor picks a language in the switcher. It beats Accept-Language. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Each language written in itself, so people can find theirs. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ja: "日本語",
};

/** Open Graph wants language_TERRITORY. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  ja: "ja_JP",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
