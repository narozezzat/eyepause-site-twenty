import { describe, expect, it } from "vitest";
import { THEME_OPTIONS, nextRadioIndex, parseThemeChoice } from "@/lib/theme";

describe("parseThemeChoice", () => {
  it("accepts only explicit light or dark", () => {
    expect(parseThemeChoice("light")).toBe("light");
    expect(parseThemeChoice("dark")).toBe("dark");
  });

  it("falls back to system for missing or unknown values", () => {
    expect(parseThemeChoice(undefined)).toBe("system");
    expect(parseThemeChoice("system")).toBe("system");
    expect(parseThemeChoice("Dark")).toBe("system");
  });
});

describe("THEME_OPTIONS", () => {
  it("lists System, Light, Dark in order", () => {
    expect(THEME_OPTIONS.map((o) => o.value)).toEqual(["system", "light", "dark"]);
  });
});

describe("nextRadioIndex", () => {
  it("moves forward with Right/Down and wraps", () => {
    expect(nextRadioIndex("ArrowRight", 0, 3)).toBe(1);
    expect(nextRadioIndex("ArrowDown", 1, 3)).toBe(2);
    expect(nextRadioIndex("ArrowRight", 2, 3)).toBe(0);
  });

  it("moves back with Left/Up and wraps", () => {
    expect(nextRadioIndex("ArrowLeft", 1, 3)).toBe(0);
    expect(nextRadioIndex("ArrowUp", 0, 3)).toBe(2);
  });

  it("jumps to the ends with Home/End", () => {
    expect(nextRadioIndex("Home", 2, 3)).toBe(0);
    expect(nextRadioIndex("End", 0, 3)).toBe(2);
  });

  it("ignores other keys and empty groups", () => {
    expect(nextRadioIndex("Tab", 0, 3)).toBeNull();
    expect(nextRadioIndex(" ", 0, 3)).toBeNull();
    expect(nextRadioIndex("ArrowRight", 0, 0)).toBeNull();
  });
});
