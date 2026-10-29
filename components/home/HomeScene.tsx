import Link from "next/link";
import type { ReactNode } from "react";

import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import type { Dictionary } from "@/i18n/types";
import type { CategoryKey } from "@/lib/categories";
import { cn } from "@/lib/cn";

import {
  BrainIllustration,
  FlaskIllustration,
  MonitorIllustration,
  PcbIllustration,
  ServerIllustration,
} from "./SceneIcons";

// Everything about one category tile: its drawing, its color and, on large
// screens, where it sits in the 3x3 "scene" grid (the diamond from the sketch).
const tiles: Record<
  CategoryKey,
  {
    Icon: typeof MonitorIllustration;
    color: string;
    glow: string;
    place: string;
  }
> = {
  "full-stack": {
    Icon: MonitorIllustration,
    color: "text-cat-full-stack",
    glow: "hover:shadow-[inset_0_1px_0_var(--glass-highlight),0_22px_44px_-16px_var(--cat-full-stack)]",
    place: "lg:col-start-1 lg:row-start-2",
  },
  ai: {
    Icon: BrainIllustration,
    color: "text-cat-ai",
    glow: "hover:shadow-[inset_0_1px_0_var(--glass-highlight),0_22px_44px_-16px_var(--cat-ai)]",
    place: "lg:col-start-2 lg:row-start-1",
  },
  embedded: {
    Icon: PcbIllustration,
    color: "text-cat-embedded",
    glow: "hover:shadow-[inset_0_1px_0_var(--glass-highlight),0_22px_44px_-16px_var(--cat-embedded)]",
    place: "lg:col-start-3 lg:row-start-2",
  },
  "backend-cloud": {
    Icon: ServerIllustration,
    color: "text-cat-backend-cloud",
    glow: "hover:shadow-[inset_0_1px_0_var(--glass-highlight),0_22px_44px_-16px_var(--cat-backend-cloud)]",
    place: "lg:col-start-2 lg:row-start-3",
  },
};

// Order on phones: 2x2 grid, as in the mobile sketch.
const order: CategoryKey[] = ["full-stack", "ai", "embedded", "backend-cloud"];

const tileClass =
  "glass group flex h-full items-center rounded-3xl transition duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0";

function Tile({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cn(tileClass, className)}>
      {children}
    </Link>
  );
}

// Dashed lines joining the four objects, only on large screens. Drawn center to
// center of the 3x3 grid cells: 1/6, 1/2 and 5/6 of the width and height.
function ConnectionLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden size-full text-foreground/35 lg:block"
    >
      <g
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray="2 6"
        strokeLinecap="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
      >
        {[
          "M50 16.7 16.7 50",
          "M50 16.7 83.3 50",
          "M16.7 50 50 83.3",
          "M83.3 50 50 83.3",
          "M50 16.7H83.3",
        ].map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}

export default function HomeScene({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Pick<Dictionary, "home" | "categories">;
}) {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-24">
      {/* Visible on phones, where it introduces the grid. On desktop the scene
          speaks for itself, so the heading is only for screen readers. */}
      <h2
        id="work-heading"
        className="mb-6 text-center text-2xl font-bold tracking-tight lg:sr-only"
      >
        {dict.home.workHeading}
      </h2>

      <div className="relative">
        <ConnectionLines />

        <ul className="relative grid grid-cols-2 gap-4 md:grid-cols-4 lg:min-h-[34rem] lg:grid-cols-3 lg:grid-rows-3 lg:gap-6">
          {order.map((key) => {
            const { Icon, color, glow, place } = tiles[key];
            return (
              // On desktop the tiles are narrower than their grid cell, so the
              // dashed lines between them show.
              <li
                key={key}
                className={cn(
                  "lg:w-44 lg:self-center lg:justify-self-center",
                  place,
                )}
              >
                <Tile
                  href={localizePath(lang, `/work/${key}`)}
                  className={cn(
                    "flex-col justify-center gap-3 p-5 text-center",
                    glow,
                  )}
                >
                  <Icon className={cn("size-20 lg:size-24", color)} />
                  {/* auto-phrase: Japanese breaks between phrases, not mid-word */}
                  <span className="font-semibold text-balance [word-break:auto-phrase]">
                    {dict.categories[key]}
                  </span>
                </Tile>
              </li>
            );
          })}

          <li className="col-span-2 md:col-span-4 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:self-center">
            <Tile
              href={localizePath(lang, "/lab")}
              className="gap-4 p-4 hover:shadow-[inset_0_1px_0_var(--glass-highlight),0_22px_44px_-16px_var(--primary)]"
            >
              <FlaskIllustration className="size-14 shrink-0 text-primary" />
              <span className="flex flex-col">
                <span className="font-semibold">{dict.home.lab.title}</span>
                <span className="text-sm text-muted">
                  {dict.home.lab.subtitle}
                </span>
              </span>
            </Tile>
          </li>
        </ul>
      </div>
    </section>
  );
}
