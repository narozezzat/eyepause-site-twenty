"use client";

import { useTheme } from "next-themes";
import { useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { THEME_OPTIONS, nextRadioIndex, parseThemeChoice, type ThemeChoice } from "@/lib/theme";

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

const subscribe = () => () => {};

/** False during prerender and hydration, true after: the stored theme is only known on the client. */
function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

const groupClass = "inline-flex shrink-0 border border-border";
const optionClass = "inline-flex size-11 items-center justify-center";

/** System / Light / Dark segmented radiogroup with roving tabindex. */
export function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  if (!mounted) {
    // Same box as the real control, so hydration swaps it in without layout shift.
    return (
      <span className={groupClass} aria-hidden="true">
        {THEME_OPTIONS.map((o) => (
          <span key={o.value} className={optionClass} />
        ))}
      </span>
    );
  }

  const current = parseThemeChoice(theme);

  const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
    const next = nextRadioIndex(event.key, index, THEME_OPTIONS.length);
    if (next === null) return;
    event.preventDefault();
    setTheme(THEME_OPTIONS[next].value);
    buttons.current[next]?.focus();
  };

  return (
    <div role="radiogroup" aria-label="Color theme" className={groupClass}>
      {THEME_OPTIONS.map((option, index) => {
        const checked = option.value === current;
        return (
          <button
            key={option.value}
            ref={(el) => {
              buttons.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            title={option.label}
            onClick={() => setTheme(option.value)}
            onKeyDown={onKeyDown(index)}
            className={cn(
              optionClass,
              "cursor-pointer transition-colors focus-visible:-outline-offset-2",
              checked ? "bg-fg text-bg" : "text-fg-muted hover:text-fg",
            )}
          >
            <svg
              className="size-4.5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              {icons[option.value]}
            </svg>
            <span className="sr-only">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
