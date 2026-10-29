import type { CategoryKey } from "@/lib/categories";

export type Project = {
  /** URL segment: /work/case-studies/[slug]. Must match the .mdx filename. */
  slug: string;
  title: string;
  /** Broad summary, shown on the case study page. */
  summary: string;
  /** A project can belong to several categories. */
  categories: CategoryKey[];
  /*One summary per category, written from that category's point of view */
  categorySummaries: Partial<Record<CategoryKey, string>>;
  tags: string[];
  /** Path under /public. undefined defaults to the placeholder image*/
  image?: string;
};

// Metadata only. The long case study text lives in content/case-studies/<slug>.mdx.
export const projects: Project[] = [];

export function getProjectsByCategory(category: CategoryKey): Project[] {
  return projects.filter((project) => project.categories.includes(category));
}

export function getCategorySummary(
  project: Project,
  category: CategoryKey,
): string {
  return project.categorySummaries[category] ?? project.summary;
}
