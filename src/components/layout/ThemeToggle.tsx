"use client";

import type { ReactNode } from "react";
import { setThemeChoice, useThemeChoice } from "@/hooks/useThemeChoice";
import { THEME_LABELS, nextThemeChoice, type ThemeChoice } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

const icons: Record<ThemeChoice, ReactNode> = {
  system: (
    <>
      <rect x="2.5" y="3.5" width="15" height="10" rx="1" />
      <path d="M7 16.5h6M10 13.5v3" />
    </>
  ),
  light: (
    <>
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" />
    </>
  ),
  dark: <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" />,
};

/**
 * Cycles System, Light, Dark. One 44px button rather than a segmented control
 * so it fits beside the nav at 375px; the label hides on narrow screens.
 */
export function ThemeToggle() {
  const choice = useThemeChoice();

  if (choice === null) {
    // Same box as the button, so hydration swaps it in without layout shift.
    return <span className={styles.toggle} aria-hidden="true" />;
  }

  const next = nextThemeChoice(choice);
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={`Theme: ${THEME_LABELS[choice]}. Switch to ${THEME_LABELS[next]}.`}
      title={`Theme: ${THEME_LABELS[choice]}`}
      onClick={() => setThemeChoice(next)}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icons[choice]}
      </svg>
      <span className={styles.label} aria-hidden="true">
        {THEME_LABELS[choice]}
      </span>
    </button>
  );
}
