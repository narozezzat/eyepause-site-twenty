"use client";

import { useSyncExternalStore } from "react";
import {
  LIGHT_QUERY,
  THEME_COLORS,
  THEME_STORAGE_KEY,
  parseThemeChoice,
  resolveTheme,
  type ThemeChoice,
} from "@/lib/theme";

const listeners = new Set<() => void>();

/** In-memory copy so the toggle still works for the session when storage is blocked. */
let current: ThemeChoice | undefined;
let systemQuery: MediaQueryList | null = null;

function readStored(): ThemeChoice {
  try {
    return parseThemeChoice(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "system";
  }
}

function writeStored(choice: ThemeChoice) {
  try {
    if (choice === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice lasts until reload, which is the best we can do.
  }
}

/** Same effect as the inline head script, plus the browser chrome colour. */
function applyToDocument(choice: ThemeChoice) {
  const root = document.documentElement;
  const theme = resolveTheme(choice, window.matchMedia(LIGHT_QUERY).matches);
  if (choice === "system") delete root.dataset.theme;
  else root.dataset.theme = choice;
  root.style.colorScheme = theme;
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    // Each tag is scoped to an OS scheme by its media attribute; an explicit
    // choice paints both, system restores each to its own scheme.
    const own = meta.media.includes("light") ? "light" : "dark";
    meta.content = THEME_COLORS[choice === "system" ? own : theme];
  });
}

/** Swap tokens without every transitioned element animating to the new colours. */
function withoutTransitions(change: () => void) {
  const root = document.documentElement;
  root.setAttribute("data-theme-switching", "");
  change();
  // Force the new styles to compute while transitions are off, then re-enable.
  void window.getComputedStyle(root).color;
  requestAnimationFrame(() => root.removeAttribute("data-theme-switching"));
}

function emit() {
  listeners.forEach((listener) => listener());
}

function onSystemChange() {
  if (getSnapshot() === "system") withoutTransitions(() => applyToDocument("system"));
}

function onStorage(event: StorageEvent) {
  if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
  current = readStored();
  withoutTransitions(() => applyToDocument(getSnapshot()));
  emit();
}

/** Window listeners are shared: attached for the first subscriber, removed after the last. */
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    applyToDocument(getSnapshot());
    // Keep the instance: removeEventListener must target the same MediaQueryList.
    systemQuery = window.matchMedia(LIGHT_QUERY);
    systemQuery.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;
    systemQuery?.removeEventListener("change", onSystemChange);
    systemQuery = null;
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): ThemeChoice {
  if (current === undefined) current = readStored();
  return current;
}

/** Null during prerender and hydration, so server and client HTML always match. */
const getServerSnapshot = (): ThemeChoice | null => null;

export function setThemeChoice(choice: ThemeChoice) {
  current = choice;
  writeStored(choice);
  withoutTransitions(() => applyToDocument(choice));
  emit();
}

export function useThemeChoice(): ThemeChoice | null {
  return useSyncExternalStore<ThemeChoice | null>(subscribe, getSnapshot, getServerSnapshot);
}
