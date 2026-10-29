"use client";

import { useSyncExternalStore } from "react";

import { MoonIcon, SunIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/i18n/types";
import { iconButtonClass } from "@/lib/styles";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

// The theme lives in the DOM (<html data-theme>), not in React state, so we
// subscribe to it. The inline script in layout.tsx sets it before first paint.
function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  window.addEventListener("themechange", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("themechange", onChange);
  };
}

function getSnapshot(): Theme | null {
  const forced = document.documentElement.dataset.theme;
  if (forced === "light" || forced === "dark") return forced;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

// The server can't know the visitor's theme, so the icon is empty until hydrated.
function getServerSnapshot(): Theme | null {
  return null;
}

export default function ThemeToggle({ dict }: { dict: Dictionary["theme"] }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.dataset.themeSwitching = "";
    root.dataset.theme = next;
    // Wait two frames so the new colors paint without transitions, then restore them.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => delete root.dataset.themeSwitching),
    );
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode). The theme still changes for now.
    }
    window.dispatchEvent(new Event("themechange"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={iconButtonClass}
      aria-label={
        theme === null
          ? dict.toggle
          : theme === "dark"
            ? dict.switchToLight
            : dict.switchToDark
      }
    >
      {theme === "dark" && <SunIcon />}
      {theme === "light" && <MoonIcon />}
    </button>
  );
}
