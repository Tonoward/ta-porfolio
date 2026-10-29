import { defaultLocale, isLocale, type Locale } from "./config";

/**
 * Picks a supported locale from an Accept-Language header, e.g.
 * "ja-JP,ja;q=0.9,en;q=0.8" -> "ja". Regions are ignored ("es-MX" -> "es").
 * Falls back to the default locale when nothing matches.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const candidates = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const quality = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
      return {
        language: tag.trim().toLowerCase().split("-")[0],
        quality: Number.isNaN(quality) ? 0 : quality,
        index,
      };
    })
    .filter((candidate) => candidate.quality > 0)
    // Highest quality first; the header order breaks ties.
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  for (const { language } of candidates) {
    if (isLocale(language)) return language;
  }
  return defaultLocale;
}
