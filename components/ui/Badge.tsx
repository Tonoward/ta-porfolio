import { type CategoryKey, categories } from "@/lib/categories";
import { cn } from "@/lib/cn";

export default function Badge({
  category,
  className,
}: {
  category: CategoryKey;
  className?: string;
}) {
  const { name, badgeClass } = categories[category];

  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset sm:text-sm",
        badgeClass,
        className,
      )}
    >
      {name}
    </span>
  );
}
