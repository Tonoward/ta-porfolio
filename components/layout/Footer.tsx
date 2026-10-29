import Link from "next/link";

import { navLinks, siteConfig } from "@/lib/site";

import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="px-4 pb-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl glass p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-bold tracking-tight">{siteConfig.name}</p>
          <p className="text-sm text-muted">AI &amp; Full-Stack developer</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navLinks.map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-muted transition-colors duration-300 hover:text-foreground"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className="flex" />
      </div>
    </footer>
  );
}
