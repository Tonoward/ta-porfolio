import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "glass" | "ghost";
type Size = "sm" | "md" | "lg";

type StyleProps = {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition duration-300 ease-out disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_8px_20px_-8px_var(--primary)] hover:-translate-y-px hover:bg-primary-hover motion-reduce:hover:translate-y-0",
  glass:
    "glass text-foreground hover:-translate-y-px motion-reduce:hover:translate-y-0",
  ghost: "text-foreground hover:bg-foreground/10",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5",
  lg: "px-7 py-3.5 text-lg",
};

function buttonStyles({ variant = "primary", size = "md" }: StyleProps) {
  return cn(base, variants[variant], sizes[size]);
}

/** A real <button>. Defaults to type="button" so it never submits a form by accident. */
export default function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
}

/** Same look, but a link. Use it for navigation, and Button for actions. */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return (
    <Link
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
}
