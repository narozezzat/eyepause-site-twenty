import { describe, expect, it } from "vitest";
import { availabilityOf, extensionOf } from "@/lib/releases/availability";
import type { DownloadFile, DownloadOption } from "@/lib/releases/types";

const file = (name: string): DownloadFile => ({ name, label: "X", size: 1, href: `/d/${name}` });
const option = (over: Partial<DownloadOption>): DownloadOption => ({
  platformId: "macos",
  label: "macOS",
  status: "available",
  version: "1.0.0",
  publishedAt: "2026-01-01T00:00:00Z",
  requirements: "macOS 14+",
  primary: file("EyePause.dmg"),
  alternate: file("EyePause.zip"),
  ...over,
});

describe("availabilityOf", () => {
  it("is ready when the primary installer exists", () => {
    expect(availabilityOf(option({}))).toBe("ready");
  });

  it("is an error when only the alternate format shipped", () => {
    expect(availabilityOf(option({ status: "unavailable", primary: null }))).toBe("error");
  });

  it("is unavailable when no installer shipped", () => {
    expect(availabilityOf(option({ status: "unavailable", primary: null, alternate: null }))).toBe("unavailable");
  });

  it("is coming-soon for planned platforms regardless of files", () => {
    expect(availabilityOf(option({ status: "coming-soon", primary: null, alternate: null }))).toBe("coming-soon");
  });
});

describe("extensionOf", () => {
  it("lowercases the last extension", () => {
    expect(extensionOf("EyePause-1.9.15.DMG")).toBe("dmg");
  });

  it("returns empty for names without one", () => {
    expect(extensionOf("EyePause")).toBe("");
    expect(extensionOf(".hidden")).toBe("");
  });
});
