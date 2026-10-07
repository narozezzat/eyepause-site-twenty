"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useDetectedPlatform } from "@/hooks/useDetectedPlatform";
import { formatDate } from "@/lib/format";
import { isMobile } from "@/lib/platform/detect";
import type { DownloadOption } from "@/lib/releases";
import { CopyLink } from "./CopyLink";
import { PlatformRow } from "./PlatformRow";
import styles from "./DownloadPanel.module.css";

const nextKeys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

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
    let next: number | null = null;
    if (event.key in nextKeys) next = (index + nextKeys[event.key] + options.length) % options.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;
    else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setOverride(options[index].platformId);
      return;
    }
    if (next === null) return;
    event.preventDefault();
    setOverride(options[next].platformId);
    radios.current[next]?.focus();
  };

  return (
    <section className={styles.ledger} id="get" aria-labelledby="get-h">
      <div className={styles.head}>
        <h2 id="get-h">Download</h2>
        {latest ? (
          <span>
            Latest · v{latest.version} · <time dateTime={latest.publishedAt}>{formatDate(latest.publishedAt)}</time>
          </span>
        ) : null}
      </div>

      {mobile ? (
        <div className={styles.mobile}>
          <p>
            <strong>EyePause is a Mac app.</strong> Open this page on your Mac to install it, or
            copy the link and send it there.
          </p>
          <CopyLink />
        </div>
      ) : null}

      <div className={styles.rows} role="radiogroup" aria-label="Platform">
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
        <p className={styles.note}>
          EyePause is macOS-only for now. You can still grab the Mac build for another machine.
        </p>
      ) : null}
    </section>
  );
}
