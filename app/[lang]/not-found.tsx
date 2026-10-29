import PageContainer from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { localizePath } from "@/i18n/paths";
import { getDictionary, getLocale } from "@/i18n/server";

export default async function NotFound() {
  const lang = await getLocale();
  const dict = await getDictionary();

  return (
    <PageContainer className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        {dict.notFound.title}
      </h1>
      <p className="max-w-prose text-muted">{dict.notFound.body}</p>
      <ButtonLink href={localizePath(lang, "/")}>
        {dict.notFound.backHome}
      </ButtonLink>
    </PageContainer>
  );
}
