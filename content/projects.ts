import type { CategoryKey } from "@/lib/categories";
import type { Locale } from "@/i18n/config";
import { localize, type LocalizedText } from "@/i18n/localized";

export type Project = {
  /** URL segment: /work/case-studies/[slug]. Must match the .mdx filename. */
  slug: string;
  /** Text is { en: "...", es: "...", ja: "..." }. Only English is required. */
  title: LocalizedText;
  /** Broad summary, shown on the case study page. */
  summary: LocalizedText;
  /** A project can belong to several categories. */
  categories: CategoryKey[];
  /** One summary per category, written from that category's point of view. */
  categorySummaries: Partial<Record<CategoryKey, LocalizedText>>;
  /** Technology names are not translated. */
  tags: string[];
  /** Path under /public. undefined defaults to the placeholder image */
  image?: string;
};

// Metadata only. The long case study text lives in content/case-studies/<slug>.<lang>.mdx
// (English is the fallback).
export const projects: Project[] = [];

export function getProjectsByCategory(category: CategoryKey): Project[] {
  return projects.filter((project) => project.categories.includes(category));
}

export function getCategorySummary(
  project: Project,
  category: CategoryKey,
  lang: Locale,
): string {
  const summary = project.categorySummaries[category] ?? project.summary;
  return localize(summary, lang);
}
