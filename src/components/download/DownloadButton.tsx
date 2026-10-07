"use client";

import type { MouseEvent } from "react";
import type { DownloadState } from "@/hooks/useDownloadState";
import type { DownloadOption } from "@/lib/releases";
import styles from "./DownloadPanel.module.css";

interface DownloadButtonProps {
  option: DownloadOption;
  state: DownloadState;
  selected: boolean;
  describedBy: string;
  onBegin: () => void;
}

/** One action per ledger row: idle → starting → started, or a disabled state that explains itself. */
export function DownloadButton({ option, state, selected, describedBy, onBegin }: DownloadButtonProps) {
  if (option.status === "coming-soon") {
    return (
      <span className={`${styles.go} ${styles.muted}`} aria-disabled="true">
        Coming later
      </span>
    );
  }

  if (option.status === "unavailable" || !option.primary) {
    return (
      <span className={`${styles.go} ${styles.muted}`} aria-disabled="true">
        Temporarily unavailable
      </span>
    );
  }

  const ext = option.primary.name.split(".").pop()?.toLowerCase() ?? "";
  const busy = state === "starting";

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // The file request already went out on the first click; repeat clicks while
    // "starting" or "started" would only queue duplicate downloads.
    if (state !== "idle") {
      event.preventDefault();
      return;
    }
    onBegin();
  };

  return (
    <a
      className={`${styles.go} ${selected ? styles.lit : ""}`}
      href={option.primary.href}
      download={option.primary.name}
      onClick={onClick}
      aria-busy={busy || undefined}
      aria-describedby={describedBy}
    >
      {state === "starting" ? (
        <>
          Preparing
          <span className={styles.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </>
      ) : state === "started" ? (
        <>
          Downloading <span aria-hidden="true">✓</span>
        </>
      ) : (
        <>
          Download .{ext} <span aria-hidden="true">↓</span>
        </>
      )}
    </a>
  );
}
