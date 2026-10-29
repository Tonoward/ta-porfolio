import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/lib/site";

//components
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the script above changes <html> before React loads.
    <html
      lang="en"
      className={`${roboto.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <NavBar />
        <main
          id="main"
          tabIndex={-1}
          className="flex flex-1 flex-col outline-none"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
