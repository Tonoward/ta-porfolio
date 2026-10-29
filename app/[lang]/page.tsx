import type { Metadata } from "next";

import HomeScene from "@/components/home/HomeScene";
import IntroCard from "@/components/home/IntroCard";
import { languageAlternates } from "@/i18n/metadata";
import { getDictionary, getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: languageAlternates(await getLocale()) };
}

// The intro comes first in the HTML (h1, then the work grid), so screen readers
// and search engines read it in that order. On desktop CSS puts the scene on
// the left and the intro on the right, like the sketch.
export default async function Home() {
  const lang = await getLocale();
  const dict = await getDictionary();

  return (
    <div className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-12 lg:py-12">
      <div className="max-lg:mx-auto max-lg:w-full max-lg:max-w-xl lg:col-start-2 lg:row-start-1">
        <IntroCard lang={lang} dict={dict} />
      </div>
      <div className="lg:col-start-1 lg:row-start-1">
        <HomeScene lang={lang} dict={dict} />
      </div>
    </div>
  );
}
