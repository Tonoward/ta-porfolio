type ClassValue = string | false | null | undefined;

/** Joins class names and skips falsy values. It does not resolve conflicts. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
