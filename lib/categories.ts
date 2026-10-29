export type Category = {
  /** Tinted background, text-safe ink and a thin ring, all from the tokens. */
  badgeClass: string;
};

// The keys are also the URL slugs used by /work/[category]. The display names
// are translated: see `categories` in i18n/messages/*.json.
export const categories = {
  "full-stack": {
    badgeClass:
      "bg-cat-full-stack/15 text-cat-full-stack-ink ring-cat-full-stack/30",
  },
  ai: {
    badgeClass: "bg-cat-ai/15 text-cat-ai-ink ring-cat-ai/30",
  },
  embedded: {
    badgeClass: "bg-cat-embedded/15 text-cat-embedded-ink ring-cat-embedded/30",
  },
  "backend-cloud": {
    badgeClass:
      "bg-cat-backend-cloud/15 text-cat-backend-cloud-ink ring-cat-backend-cloud/30",
  },
} as const satisfies Record<string, Category>;

export type CategoryKey = keyof typeof categories;

export const categoryKeys = Object.keys(categories) as CategoryKey[];

// Validates a route param before trusting it as a CategoryKey.
export function isCategoryKey(value: string): value is CategoryKey {
  return value in categories;
}
