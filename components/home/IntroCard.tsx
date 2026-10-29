import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { ArrowDownIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import type { Dictionary } from "@/i18n/types";
import { siteConfig } from "@/lib/site";

// Placeholder avatar. When there is a photo, swap this for a next/image.
function Avatar() {
  return (
    <div
      aria-hidden
      className="grid size-24 place-items-center rounded-full glass text-3xl font-bold tracking-tight text-primary"
    >
      AC
    </div>
  );
}

export default function IntroCard({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Pick<Dictionary, "home">;
}) {
  const { home } = dict;

  return (
    <div className="flex flex-col items-center gap-6 rounded-[2rem] glass p-8 text-center glass-thick max-md:min-h-[calc(100svh-8.5rem)] max-md:justify-center">
      <Avatar />

      <div className="space-y-1">
        <p className="text-sm font-medium text-muted">{siteConfig.name}</p>
        {/* No text-balance: it would split "Full-Stack" at its hyphen. */}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {home.headline}
        </h1>
      </div>

      <p className="text-pretty text-muted">{home.intro}</p>

      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href={localizePath(lang, "/lab")}>{home.tryLab}</ButtonLink>
        <ButtonLink href={localizePath(lang, "/contact")} variant="glass">
          {home.contact}
        </ButtonLink>
      </div>

      <Link
        href={localizePath(lang, "/about")}
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        {home.moreAbout} →
      </Link>

      {/* Phones only: the category grid is below the first screen. */}
      <a
        href="#work"
        aria-label={home.scrollToWork}
        className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-foreground/10 hover:text-foreground motion-safe:animate-[bounce_1s_ease-in-out_3] lg:hidden"
      >
        <ArrowDownIcon />
      </a>
    </div>
  );
}
