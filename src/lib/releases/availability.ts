import type { DownloadOption } from "./types";

/**
 * What the download action can offer for one platform:
 * - `ready`: the primary installer is on the site.
 * - `error`: the primary installer is missing but the other format is there.
 * - `unavailable`: no installer for this release yet (snapshot build, or assets not copied).
 * - `coming-soon`: the platform has no build at all.
 */
export type Availability = "ready" | "error" | "unavailable" | "coming-soon";

export function availabilityOf(option: DownloadOption): Availability {
  if (option.status === "coming-soon") return "coming-soon";
  if (option.status === "available" && option.primary) return "ready";
  return option.alternate ? "error" : "unavailable";
}

/** File extension shown on buttons, e.g. "dmg". */
export function extensionOf(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  return dot > 0 ? fileName.slice(dot + 1).toLowerCase() : "";
}
