import { cn } from "@/lib/cn";

/** The standard page column: centered, with the page padding. */
export default function PageContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-5xl px-6 py-12", className)}
      {...props}
    />
  );
}
