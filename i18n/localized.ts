import type { Locale } from "./config";

/**
 * Text that lives in content files (project titles, summaries). English is
 * required; Spanish and Japanese fall back to English until they are written.
 */
export type LocalizedText = { en: string } & Partial<Record<Locale, string>>;

export function localize(text: LocalizedText, lang: Locale): string {
  return text[lang] ?? text.en;
}
