import type en from "./messages/en.json";

/**
 * English is the source of truth: every other language must have exactly the
 * same keys, or TypeScript fails in dictionaries.ts.
 */
export type Dictionary = typeof en;
