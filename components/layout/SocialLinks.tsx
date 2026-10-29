import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { socialLinks } from "@/lib/site";
import { iconButtonClass } from "@/lib/styles";

const icons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

// The caller picks the display class (e.g. "flex" or "hidden md:flex"), so two
// competing display utilities never end up on the same element.
export default function SocialLinks({ className }: { className: string }) {
  return (
    <ul className={cn("items-center gap-1", className)}>
      {socialLinks.map(({ name, href, icon }) => {
        const SocialIcon = icons[icon];
        return (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} (opens in a new tab)`}
              className={iconButtonClass}
            >
              <SocialIcon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
