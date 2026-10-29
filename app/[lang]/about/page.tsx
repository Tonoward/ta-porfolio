import type { Metadata } from "next";

import PageContainer from "@/components/layout/PageContainer";
import { languageAlternates } from "@/i18n/metadata";
import { getDictionary, getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.about.title,
    alternates: languageAlternates(await getLocale(), "/about"),
  };
}

export default async function AboutPage() {
  const dict = await getDictionary();

  return (
    <PageContainer>
      <h1 className="text-4xl font-bold tracking-tight">
        {dict.pages.about.title}
      </h1>
      <p className="mt-3 text-muted">{dict.pages.comingSoon}</p>
    </PageContainer>
  );
}
