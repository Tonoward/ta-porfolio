import type { Locale } from "./config";

// error.tsx must be a Client Component, so it cannot call the server-only
// getDictionary(). These two strings live here instead of in messages/*.json to
// avoid shipping every dictionary to the browser. `Record<Locale, ...>` makes
// TypeScript require all languages.
export const errorMessages: Record<Locale, { title: string; retry: string }> = {
  en: { title: "Something went wrong", retry: "Try again" },
  es: { title: "Algo salió mal", retry: "Intentar de nuevo" },
  ja: { title: "問題が発生しました", retry: "もう一度試す" },
};
