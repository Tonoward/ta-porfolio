"use client"; // Error boundaries must be Client Components

import { useParams } from "next/navigation";

import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";
import { defaultLocale, isLocale } from "@/i18n/config";
import { errorMessages } from "@/i18n/error-messages";

export default function ErrorPage({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const { lang } = useParams<{ lang: string }>();
  const messages = errorMessages[isLocale(lang) ? lang : defaultLocale];

  return (
    <PageContainer className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">{messages.title}</h1>
      <Button onClick={() => retry()}>{messages.retry}</Button>
    </PageContainer>
  );
}
