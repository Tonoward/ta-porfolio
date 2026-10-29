import type { Metadata } from "next";

import { defaultLocale, locales, type Locale } from "./config";

/**
 * Canonical and hreflang links for one page. Tells search engines that
 * /en/work, /es/work and /ja/work are the same page in different languages.
 * `path` is the page without the locale: "" for home, "/work" for Work.
 */
export function languageAlternates(
  lang: Locale,
  path = "",
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      ...Object.fromEntries(
        locales.map((locale) => [locale, `/${locale}${path}`]),
      ),
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
