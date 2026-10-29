import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Roboto } from "next/font/google";
import "../globals.css";

import { locales, openGraphLocales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { siteConfig } from "@/lib/site";

//components
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

// Roboto has no Japanese glyphs. Without `preload: false` the browser would
// download this font on every page. With it, only pages that show Japanese
// characters fetch the pieces they need.
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  preload: false,
  display: "swap",
});

// One static page per language, built ahead of time.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const dict = await getDictionary();

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.meta.description,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: openGraphLocales[lang],
    },
  };
}

// Colors the browser UI (mobile address bar) to match the page background.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1b26" },
  ],
};

// Applies a saved theme before first paint, so there is no flash of the wrong
// theme. With no saved choice, the system preference applies (see globals.css).
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLocale();
  const dict = await getDictionary();

  return (
    // suppressHydrationWarning: the script above changes <html> before React loads.
    <html
      lang={lang}
      className={`${roboto.variable} ${notoSansJP.variable} h-full`}
      suppressHydrationWarning
    >
      {/* A plain inline <script>, not next/script: next/script queues inline code
          until Next's JavaScript loads, which is after the first paint and brings
          back the flash. React only warns about <script> when this layout
          re-renders in the browser, and it only does that when the language
          changes. LanguageSwitcher uses a full page load, so that never happens. */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {dict.a11y.skipToContent}
        </a>
        <NavBar lang={lang} dict={dict} />
        <main
          id="main"
          tabIndex={-1}
          className="flex flex-1 flex-col outline-none"
        >
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
