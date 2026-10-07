import { describe, expect, it } from "vitest";
import {
  THEME_STORAGE_KEY,
  nextThemeChoice,
  parseThemeChoice,
  resolveTheme,
  themeInitScript,
} from "@/lib/theme";

describe("parseThemeChoice", () => {
  it("accepts only explicit light or dark", () => {
    expect(parseThemeChoice("light")).toBe("light");
    expect(parseThemeChoice("dark")).toBe("dark");
  });

  it("falls back to system for missing or unknown values", () => {
    expect(parseThemeChoice(null)).toBe("system");
    expect(parseThemeChoice(undefined)).toBe("system");
    expect(parseThemeChoice("system")).toBe("system");
    expect(parseThemeChoice("Dark")).toBe("system");
    expect(parseThemeChoice("")).toBe("system");
  });
});

describe("resolveTheme", () => {
  it("honours an explicit choice regardless of the OS", () => {
    expect(resolveTheme("light", false)).toBe("light");
    expect(resolveTheme("dark", true)).toBe("dark");
  });

  it("follows the OS on system, dark-first", () => {
    expect(resolveTheme("system", true)).toBe("light");
    expect(resolveTheme("system", false)).toBe("dark");
  });
});

describe("nextThemeChoice", () => {
  it("cycles system, light, dark", () => {
    expect(nextThemeChoice("system")).toBe("light");
    expect(nextThemeChoice("light")).toBe("dark");
    expect(nextThemeChoice("dark")).toBe("system");
  });
});

describe("themeInitScript", () => {
  function run(stored: string | null | Error, prefersLight: boolean) {
    const root = { dataset: {} as Record<string, string>, style: { colorScheme: "" } };
    const storage = {
      getItem: (key: string) => {
        if (stored instanceof Error) throw stored;
        return key === THEME_STORAGE_KEY ? stored : null;
      },
    };
    const matchMedia = () => ({ matches: prefersLight });
    new Function("document", "localStorage", "matchMedia", themeInitScript)(
      { documentElement: root },
      storage,
      matchMedia,
    );
    return root;
  }

  it("applies an explicit choice over the OS", () => {
    const root = run("light", false);
    expect(root.dataset.theme).toBe("light");
    expect(root.style.colorScheme).toBe("light");
  });

  it("leaves data-theme unset on system and mirrors the OS scheme", () => {
    const root = run(null, true);
    expect(root.dataset.theme).toBeUndefined();
    expect(root.style.colorScheme).toBe("light");
  });

  it("ignores junk and survives blocked storage", () => {
    expect(run("purple", false).dataset.theme).toBeUndefined();
    const blocked = run(new Error("SecurityError"), false);
    expect(blocked.dataset.theme).toBeUndefined();
    expect(blocked.style.colorScheme).toBe("dark");
  });
});
