//NextJS
import type { Metadata } from "next";
//i18n
import { languageAlternates } from "@/i18n/metadata";
import { getDictionary, getLocale } from "@/i18n/server";
//Components
import PageContainer from "@/components/layout/PageContainer";
import EmailForm from "@/components/contact/EmailForm";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.contact.title,
    alternates: languageAlternates(await getLocale(), "/contact"),
  };
}

export type ContactFormData = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export default async function ContactPage() {
  const dict = await getDictionary();

  return (
    <PageContainer className="flex flex-col items-center justify-center space-y-8">
      <div className="w-full space-y-8">
        <header className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            {dict.pages.contact.title}
          </h1>
          <p className="max-w-prose text-muted">Let's get in touch!</p>
        </header>

        <section aria-labelledby="glass" className="space-y-4">
          <div className="space-y-4 rounded-3xl glass p-6">
            <EmailForm />
            <div className="flex flex-wrap space-x-1">
            <p className="text-muted">
              If you prefer, you can use this email: 
            </p>
            <p className="text-muted">contact@example.com</p>
            <p className="text-muted">to contact me.</p>
            </div>
          </div>
        </section>

      </div>
    </PageContainer>
  );
}
