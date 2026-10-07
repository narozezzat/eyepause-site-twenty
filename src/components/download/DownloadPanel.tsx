"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useDetectedPlatform } from "@/hooks/useDetectedPlatform";
import { formatDate } from "@/lib/format";
import { isMobile } from "@/lib/platform/detect";
import type { DownloadOption } from "@/lib/releases";
import { nextRadioIndex } from "@/lib/theme";
import { CopyLink } from "./CopyLink";
import { PlatformRow } from "./PlatformRow";

/** Download ledger: one row per platform, the chosen row lit. Defaults to the visitor's OS. */
export function DownloadPanel({ options }: { options: DownloadOption[] }) {
  const detected = useDetectedPlatform();
  const [override, setOverride] = useState<string | null>(null);
  const radios = useRef<(HTMLDivElement | null)[]>([]);

  const recommendedId = options.some((o) => o.platformId === detected) ? detected : null;
  const fallbackId =
    options.find((o) => o.status === "available")?.platformId ?? options[0]?.platformId ?? null;
  const selectedId = override ?? recommendedId ?? fallbackId;
  const mobile = detected !== null && isMobile(detected);
  const desktopElsewhere = detected === "windows" || detected === "linux";
  const latest = options[0];

  const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setOverride(options[index].platformId);
      return;
    }
    const next = nextRadioIndex(event.key, index, options.length);
    if (next === null) return;
    event.preventDefault();
    setOverride(options[next].platformId);
    radios.current[next]?.focus();
  };

  return (
    <section className="scroll-mt-4 py-16 sm:py-20 lg:py-28" id="get" aria-labelledby="get-h">
      <div className="mb-4.5 flex flex-wrap items-baseline justify-between gap-3">
        <h2
          id="get-h"
          className="m-0 font-mono text-body leading-none font-medium tracking-label uppercase"
        >
          Download
        </h2>
        {latest ? (
          <span className="font-mono text-caption leading-none text-fg-subtle">
            Latest · v{latest.version} · <time dateTime={latest.publishedAt}>{formatDate(latest.publishedAt)}</time>
          </span>
        ) : null}
      </div>

      {mobile ? (
        <div className="mb-4.5 grid gap-3.5 border border-border bg-surface p-4.5 font-mono text-caption text-fg-muted">
          <p className="m-0">
            <strong className="mb-1 block font-sans text-[1.0625rem] leading-[1.3] font-semibold text-fg">
              EyePause is a Mac app.
            </strong> Open this page on your Mac to install it, or
            copy the link and send it there.
          </p>
          <CopyLink />
        </div>
      ) : null}

      <div className="border-t border-border" role="radiogroup" aria-label="Platform">
        {options.map((option, index) => (
          <PlatformRow
            key={option.platformId}
            option={option}
            selected={option.platformId === selectedId}
            recommended={option.platformId === recommendedId}
            focusable={option.platformId === selectedId}
            radioRef={(el) => {
              radios.current[index] = el;
            }}
            onSelect={() => setOverride(option.platformId)}
            onKeyDown={onKeyDown(index)}
          />
        ))}
      </div>

      {desktopElsewhere ? (
        <p className="mt-4.5 mb-0 font-mono text-caption text-fg-subtle">
          EyePause is macOS-only for now. You can still grab the Mac build for another machine.
        </p>
      ) : null}
    </section>
  );
}
