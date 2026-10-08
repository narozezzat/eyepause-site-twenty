"use client";

import { useState } from "react";
import { platforms } from "@/config/platforms";
import { useDetectedPlatform } from "@/hooks/useDetectedPlatform";
import { isMobile } from "@/lib/platform/detect";
import type { DownloadOption } from "@/lib/releases";
import { DownloadButton } from "./DownloadButton";
import { PlatformPicker } from "./PlatformPicker";

/** The download section: pick a platform, then act on it. Defaults to the visitor's OS, else macOS. */
export function DownloadPanel({ options }: { options: DownloadOption[] }) {
  const detected = useDetectedPlatform();
  const [override, setOverride] = useState<string | null>(null);

  const detectedId = options.some((o) => o.platformId === detected)
    ? detected
    : null;
  const fallbackId =
    options.find((o) => o.status === "available")?.platformId ??
    options[0]?.platformId ??
    null;
  const selectedId = override ?? detectedId ?? fallbackId;
  const selected = options.find((o) => o.platformId === selectedId) ?? null;
  const mobile = detected !== null && isMobile(detected);
  const steps = platforms.find((p) => p.id === selectedId)?.installSteps ?? [];

  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="download-section"
    >
      <div className="chapter-no">
        <b>04</b>Make a little room
      </div>
      <div className="download-heading">
        <h2 id="download-title">Your next break starts here.</h2>
        <p>
          One small app.
          <br />A little more space in your day.
        </p>
      </div>
      <PlatformPicker
        options={options}
        selectedId={selectedId}
        detectedId={detectedId}
        onChange={setOverride}
        action={
          selected ? (
            <DownloadButton
              key={selected.platformId}
              option={selected}
              steps={steps}
              mobile={mobile}
              onShowMac={
                options.some((o) => o.platformId === "macos")
                  ? () => setOverride("macos")
                  : undefined
              }
            />
          ) : null
        }
      />
      <p className="download-note">
        {mobile
          ? "On your phone? Open this page on your Mac to install EyePause."
          : "Free to use. No sign-up. Just a Mac and a moment."}
      </p>
      <noscript>
        <p className="download-note">
          EyePause runs on macOS 14 or later. To install: open the DMG, drag
          EyePause into Applications, then launch it. Enable JavaScript to
          choose another platform.
        </p>
      </noscript>
    </section>
  );
}
