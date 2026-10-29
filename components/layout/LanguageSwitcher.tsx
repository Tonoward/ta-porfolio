"use client";

import { usePathname } from "next/navigation";
import type { ChangeEvent } from "react";

import { GlobeIcon } from "@/components/ui/icons";
import {
  LOCALE_COOKIE,
  isLocale,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";
import { switchLocale } from "@/i18n/paths";

const ONE_YEAR = 60 * 60 * 24 * 365;

// A native <select>: keyboard, screen readers and the mobile picker work for free.
export default function LanguageSwitcher({
  lang,
  label,
}: {
  lang: Locale;
  /** Translated "Language": dict.language.label. */
  label: string;
}) {
  const pathname = usePathname();

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value;
    if (!isLocale(next)) return;
    // Remember the choice, so proxy.ts prefers it over the browser language.
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
    // A full page load on purpose, not router.push(). The root layout changes
    // with the language, and re-rendering it in the browser makes React warn about
    // the theme <script>. It also guarantees <html lang> and the fonts are fresh.
    const { search, hash } = window.location;
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- full load is intentional, see above
    window.location.assign(`${switchLocale(pathname, next)}${search}${hash}`);
  }

  return (
    <label className="relative inline-flex items-center rounded-full text-foreground transition-colors duration-300 hover:bg-foreground/10">
      <span className="sr-only">{label}</span>
      <GlobeIcon className="pointer-events-none absolute left-3 size-4" />
      <select
        value={lang}
        onChange={onChange}
        className="h-10 cursor-pointer appearance-none rounded-full bg-transparent pr-4 pl-9 text-sm font-medium"
      >
        {locales.map((locale) => (
          <option
            key={locale}
            value={locale}
            lang={locale}
            className="bg-surface text-foreground"
          >
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
