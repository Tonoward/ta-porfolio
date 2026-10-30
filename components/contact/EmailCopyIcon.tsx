"use client";

//Config
import { siteConfig } from "@/lib/site";

//Icon
import { ClipboardIcon } from "@/components/ui/icons";

//styles
import { iconButtonClass } from "@/lib/styles";

export default function EmailCopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <button
      className={iconButtonClass}
      onClick={() => {
        navigator.clipboard.writeText(siteConfig.contactEmail);
      }}
    >
      <ClipboardIcon />
    </button>
  );
}
