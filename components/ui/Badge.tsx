import { type CategoryKey, categories } from "@/lib/categories";
import { cn } from "@/lib/cn";

export default function Badge({
  category,
  label,
  className,
}: {
  category: CategoryKey;
  /** The translated category name: dict.categories[category]. */
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset sm:text-sm",
        categories[category].badgeClass,
        className,
      )}
    >
      {label}
    </span>
  );
}
