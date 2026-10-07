/** localStorage key next-themes uses for an explicit choice. */
export const THEME_STORAGE_KEY = "eyepause-theme";

export type ThemeChoice = "system" | "light" | "dark";

export const THEME_OPTIONS: readonly { value: ThemeChoice; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/** Anything other than an explicit "light" or "dark" means "system". */
export function parseThemeChoice(value: unknown): ThemeChoice {
  return value === "light" || value === "dark" ? value : "system";
}

const steps: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

/**
 * Roving-tabindex target for a radiogroup key press: arrows wrap, Home/End
 * jump to the ends. Returns null for keys the group does not handle.
 */
export function nextRadioIndex(key: string, index: number, length: number): number | null {
  if (length <= 0) return null;
  if (key in steps) return (index + steps[key] + length) % length;
  if (key === "Home") return 0;
  if (key === "End") return length - 1;
  return null;
}
