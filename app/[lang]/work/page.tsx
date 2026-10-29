import type { Metadata } from "next";
import Link from "next/link";

import PageContainer from "@/components/layout/PageContainer";
import { languageAlternates } from "@/i18n/metadata";
import { localizePath } from "@/i18n/paths";
import { getDictionary, getLocale } from "@/i18n/server";
import { categoryKeys } from "@/lib/categories";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.work.title,
    alternates: languageAlternates(await getLocale(), "/work"),
  };
}

const categoryDots = {
  "full-stack": "bg-cat-full-stack",
  ai: "bg-cat-ai",
  embedded: "bg-cat-embedded",
  "backend-cloud": "bg-cat-backend-cloud",
} as const;

// Plain category picker. It is also the no-3D fallback for phones and keyboards;
// the 3D scene will sit on top of it later.
export default async function WorkPage() {
  const lang = await getLocale();
  const dict = await getDictionary();

  return (
    <PageContainer className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{dict.work.title}</h1>
        <p className="text-muted">{dict.work.pickCategory}</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {categoryKeys.map((key) => (
          <li key={key}>
            <Link
              href={localizePath(lang, `/work/${key}`)}
              className="flex items-center gap-4 rounded-3xl glass p-6 text-lg font-semibold transition duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
            >
              <span
                aria-hidden
                className={`${categoryDots[key]} size-4 shrink-0 rounded-full`}
              />
              {dict.categories[key]}
            </Link>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
