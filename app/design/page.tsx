import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { Project } from "@/content/projects";
import { categoryKeys } from "@/lib/categories";

import Badge from "@/components/ui/Badge";
import Button, { ButtonLink } from "@/components/ui/Button";
import ProjectCard from "@/components/work/ProjectCard";

export const metadata: Metadata = {
  title: "Design tokens",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "background", className: "bg-background" },
  { name: "surface", className: "bg-surface" },
  { name: "primary", className: "bg-primary" },
  { name: "primary-hover", className: "bg-primary-hover" },
  { name: "accent", className: "bg-accent" },
  { name: "muted", className: "bg-muted" },
];

const categoryDots: Record<(typeof categoryKeys)[number], string> = {
  "full-stack": "bg-cat-full-stack",
  ai: "bg-cat-ai",
  embedded: "bg-cat-embedded",
  "backend-cloud": "bg-cat-backend-cloud",
};

// Made-up data, only to preview the card. Real projects live in content/projects.ts.
const sampleProject: Project = {
  slug: "sample-project",
  title: "Document chat for a logistics team",
  summary:
    "A web app where a team uploads PDFs and asks questions about them, with answers that cite the page they came from.",
  categories: ["full-stack", "ai", "backend-cloud", "embedded"],
  categorySummaries: {
    ai: "Retrieval over chunked PDFs with embeddings, page citations and a small evaluation set to track answer quality.",
    "backend-cloud":
      "A containerized API with per-session storage, upload validation and automatic deletion of documents.",
  },
  tags: ["Next.js", "Postgres", "pgvector"],
};

// design system review page
export default function DesignPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 space-y-12 px-6 pt-12 pb-20">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Design tokens</h1>
        <p className="max-w-prose text-muted">
          Palette, glass surfaces, category colors, buttons and cards. Toggle
          your system theme to check both modes.
        </p>
      </header>

      <section aria-labelledby="palette" className="space-y-4">
        <h2 id="palette" className="text-2xl font-semibold">
          Palette
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map((swatch) => (
            <li key={swatch.name} className="space-y-2">
              <div
                className={`${swatch.className} h-16 rounded-2xl border border-border`}
              />
              <p className="text-sm text-muted">{swatch.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="glass" className="space-y-4">
        <h2 id="glass" className="text-2xl font-semibold">
          Glass
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl glass p-6">
            <h3 className="text-lg font-semibold">glass</h3>
            <p className="mt-2 text-muted">
              The default surface. The aurora behind the page shows through and
              is blurred. Text stays above 4.5:1 contrast.
            </p>
          </div>
          <div className="rounded-3xl glass p-6 glass-thick">
            <h3 className="text-lg font-semibold">glass glass-thick</h3>
            <p className="mt-2 text-muted">
              More opaque and blurrier, for navigation and text-heavy panels.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="categories" className="space-y-4">
        <h2 id="categories" className="text-2xl font-semibold">
          Category colors
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {categoryKeys.map((key) => (
            <li
              key={key}
              className="flex items-center gap-4 rounded-2xl glass p-4"
            >
              <span
                className={`${categoryDots[key]} size-4 shrink-0 rounded-full`}
                aria-hidden
              />
              <Badge category={key} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="buttons" className="space-y-4">
        <h2 id="buttons" className="text-2xl font-semibold">
          Buttons
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="glass">Glass</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <ButtonLink href="/design" variant="glass">
            As a link
          </ButtonLink>
        </div>
      </section>

      <section aria-labelledby="cards" className="space-y-4">
        <h2 id="cards" className="text-2xl font-semibold">
          Project card
        </h2>
        <p className="max-w-prose text-muted">
          Same project, seen from the list of each category: the summary changes
          to focus on that category.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <ProjectCard project={sampleProject} category="ai" />
          <ProjectCard project={sampleProject} category="backend-cloud" />
          <ProjectCard project={sampleProject} category="full-stack" />
        </div>
      </section>
    </div>
  );
}
