"use client";

//NextJS
import Link from "next/link";
import { usePathname } from "next/navigation";
//React
import { useEffect, useRef, useState } from "react";

//UI
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { navLinks, siteConfig } from "@/lib/site";
import { iconButtonClass } from "@/lib/styles";

//components
import SocialLinks from "./SocialLinks";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
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

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="relative mx-auto max-w-6xl">
        <nav
          aria-label="Main"
          className="flex items-center justify-between gap-4 rounded-full glass py-2 pr-2 pl-6 glass-thick"
        >
          <Link
            href="/"
            className="text-lg font-bold tracking-tight"
            onClick={() => setOpen(false)}
          >
            {siteConfig.name}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 hover:bg-foreground/10 hover:text-foreground",
                    isActive(href)
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted",
                  )}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <SocialLinks className="hidden md:flex" />
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className={cn(iconButtonClass, "md:hidden")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
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
              {navLinks.map(({ name, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-lg font-medium transition-colors duration-300 hover:bg-foreground/10",
                      isActive(href) && "bg-foreground/10",
                    )}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center gap-1 border-t border-border px-1 pt-3">
              <SocialLinks className="flex" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
