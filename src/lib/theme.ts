/** localStorage key for an explicit theme. Absent means "follow the OS". */
export const THEME_STORAGE_KEY = "eyepause-theme";

export type Theme = "light" | "dark";
export type ThemeChoice = "system" | Theme;

export const THEME_CHOICES: readonly ThemeChoice[] = ["system", "light", "dark"];

export const THEME_LABELS: Record<ThemeChoice, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

/** Page background per theme, mirrored in globals.css (--bg) for the browser chrome. */
export const THEME_COLORS: Record<Theme, string> = {
  dark: "#0c0e10",
  light: "#f4f3ef",
};

export const LIGHT_QUERY = "(prefers-color-scheme: light)";

/** Anything other than an explicit "light" or "dark" means "system". */
export function parseThemeChoice(value: unknown): ThemeChoice {
  return value === "light" || value === "dark" ? value : "system";
}

/** The site is dark-first: the OS has to ask for light explicitly. */
export function resolveTheme(choice: ThemeChoice, systemPrefersLight: boolean): Theme {
  if (choice !== "system") return choice;
  return systemPrefersLight ? "light" : "dark";
}

export function nextThemeChoice(choice: ThemeChoice): ThemeChoice {
  return THEME_CHOICES[(THEME_CHOICES.indexOf(choice) + 1) % THEME_CHOICES.length];
}

/**
 * Runs synchronously as the first thing in <head>, before any CSS or body
 * paints, so an explicit choice never flashes the OS theme first. Keep it
 * tiny and dependency-free: it is inlined into every page.
 */
export const themeInitScript =
  `(function(){var d=document.documentElement,t=null;` +
  `try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}` +
  `if(t!=="light"&&t!=="dark")t=null;if(t)d.dataset.theme=t;` +
  `try{d.style.colorScheme=t||(matchMedia(${JSON.stringify(LIGHT_QUERY)}).matches?"light":"dark")}catch(e){}})()`;
