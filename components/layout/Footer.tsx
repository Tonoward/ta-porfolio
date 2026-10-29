import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import type { Dictionary } from "@/i18n/types";
import { navLinks, siteConfig } from "@/lib/site";

import SocialLinks from "./SocialLinks";

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Pick<Dictionary, "nav" | "footer" | "social">;
}) {
  return (
    <footer className="px-4 pb-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl glass p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-bold tracking-tight">{siteConfig.name}</p>
          <p className="text-sm text-muted">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.nav.footerLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navLinks.map(({ key, href }) => (
              <li key={href}>
                <Link
                  href={localizePath(lang, href)}
                  className="text-muted transition-colors duration-300 hover:text-foreground"
                >
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className="flex" newTabLabel={dict.social.opensInNewTab} />
      </div>
    </footer>
  );
}
