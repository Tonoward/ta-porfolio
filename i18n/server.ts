import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import { isLocale, type Locale } from "./config";
import type { Dictionary } from "./types";

// Each loader is typed as returning a full Dictionary, so a missing or extra key
// in es.json or ja.json is a compile error.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./messages/en.json").then((module) => module.default),
  es: () => import("./messages/es.json").then((module) => module.default),
  ja: () => import("./messages/ja.json").then((module) => module.default),
};

/** The locale of the current request, read from the /[lang] URL segment. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
