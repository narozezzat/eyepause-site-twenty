"use client";

import type { MouseEvent } from "react";
import type { DownloadState } from "@/hooks/useDownloadState";
import type { DownloadOption } from "@/lib/releases";
import { cn } from "@/lib/cn";
import { goClass, goLitClass, goMutedClass, goSolidClass } from "./buttonStyles";

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
      <span className={cn(goClass, goMutedClass)} aria-disabled="true">
        Coming later
      </span>
    );
  }

  if (option.status === "unavailable" || !option.primary) {
    return (
      <span className={cn(goClass, goMutedClass)} aria-disabled="true">
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
      className={cn(
        goClass,
        selected ? goLitClass : goSolidClass,
        "hover:translate-x-0.5 aria-busy:cursor-progress",
      )}
      href={option.primary.href}
      download={option.primary.name}
      onClick={onClick}
      aria-busy={busy || undefined}
      aria-describedby={describedBy}
    >
      {state === "starting" ? (
        <>
          Preparing
          <span className="inline-flex gap-0.5" aria-hidden="true">
            <i className="size-1 animate-dot rounded-full bg-current" />
            <i className="size-1 animate-dot rounded-full bg-current [animation-delay:0.15s]" />
            <i className="size-1 animate-dot rounded-full bg-current [animation-delay:0.3s]" />
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
