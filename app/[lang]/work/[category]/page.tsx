import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageContainer from "@/components/layout/PageContainer";
import ProjectCard from "@/components/work/ProjectCard";
import { getProjectsByCategory } from "@/content/projects";
import { languageAlternates } from "@/i18n/metadata";
import { localizePath } from "@/i18n/paths";
import { getDictionary, getLocale } from "@/i18n/server";
import { categoryKeys, isCategoryKey } from "@/lib/categories";

// Every category is known at build time, so each one becomes a static page.
export function generateStaticParams() {
  return categoryKeys.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[category]">): Promise<Metadata> {
  const { category } = await params;
  if (!isCategoryKey(category)) notFound();

  const dict = await getDictionary();
  return {
    title: dict.categories[category],
    alternates: languageAlternates(await getLocale(), `/work/${category}`),
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/[lang]/work/[category]">) {
  const { category } = await params;
  if (!isCategoryKey(category)) notFound();

  const lang = await getLocale();
  const dict = await getDictionary();
  const projects = getProjectsByCategory(category);

  return (
    <PageContainer className="space-y-8">
      <header className="space-y-3">
        <Link
          href={localizePath(lang, "/work")}
          className="inline-block text-sm font-medium text-muted transition-colors duration-300 hover:text-foreground"
        >
          ← {dict.work.back}
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">
          {dict.categories[category]}
        </h1>
      </header>

      {projects.length === 0 ? (
        <p className="text-muted">{dict.work.empty}</p>
      ) : (
        <ul className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard
                project={project}
                lang={lang}
                dict={dict}
                category={category}
              />
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  );
}
