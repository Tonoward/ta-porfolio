"use client";

//NextJS
import Link from "next/link";
import { usePathname } from "next/navigation";
//React
import { useEffect, useRef, useState } from "react";

//UI
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import { localizePath, stripLocale } from "@/i18n/paths";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { navLinks, siteConfig } from "@/lib/site";
import { iconButtonClass } from "@/lib/styles";

//components
import LanguageSwitcher from "./LanguageSwitcher";
import SocialLinks from "./SocialLinks";
import ThemeToggle from "./ThemeToggle";

export default function NavBar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Pick<Dictionary, "nav" | "theme" | "language" | "social">;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the mobile menu and returns focus to the button that opened it.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // The URL is "/es/work" but navLinks hold "/work", so drop the language first.
  function isActive(href: string) {
    const path = stripLocale(pathname);
    return path === href || path.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="relative mx-auto max-w-6xl">
        <nav
          aria-label={dict.nav.label}
          className="flex items-center justify-between gap-4 rounded-full glass py-2 pr-2 pl-6 glass-thick"
        >
          <Link
            href={localizePath(lang, "/")}
            className="text-lg font-bold tracking-tight"
            onClick={() => setOpen(false)}
          >
            {siteConfig.name}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ key, href }) => (
              <li key={href}>
                <Link
                  href={localizePath(lang, href)}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 hover:bg-foreground/10 hover:text-foreground",
                    isActive(href)
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted",
                  )}
                >
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <SocialLinks
              className="hidden md:flex"
              newTabLabel={dict.social.opensInNewTab}
            />
            <div className="hidden md:block">
              <LanguageSwitcher lang={lang} label={dict.language.label} />
            </div>
            <ThemeToggle dict={dict.theme} />
            <button
              ref={menuButtonRef}
              type="button"
              className={cn(iconButtonClass, "md:hidden")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full mt-2 rounded-3xl glass p-3 glass-thick md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map(({ key, href }) => (
                <li key={href}>
                  <Link
                    href={localizePath(lang, href)}
                    aria-current={isActive(href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-lg font-medium transition-colors duration-300 hover:bg-foreground/10",
                      isActive(href) && "bg-foreground/10",
                    )}
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between gap-1 border-t border-border px-1 pt-3">
              <SocialLinks
                className="flex"
                newTabLabel={dict.social.opensInNewTab}
              />
              <LanguageSwitcher lang={lang} label={dict.language.label} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
