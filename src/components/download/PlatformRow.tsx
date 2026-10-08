"use client";

import type { KeyboardEvent, Ref } from "react";
import type { DownloadOption } from "@/lib/releases";
import { availabilityOf } from "@/lib/releases";

interface PlatformRowProps {
  option: DownloadOption;
  selected: boolean;
  tag: string | null;
  radioRef: Ref<HTMLDivElement>;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

export function PlatformRow({
  option,
  selected,
  tag,
  radioRef,
  onSelect,
  onKeyDown,
}: PlatformRowProps) {
  const id = option.platformId;
  const availability = availabilityOf(option);
  const planned = availability === "coming-soon";
  return (
    <div
      ref={radioRef}
      role="radio"
      aria-checked={selected}
      aria-labelledby={`pf-${id}-name`}
      aria-describedby={`pf-${id}-sub`}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className="platform-choice"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {id === "windows" ? (
          <path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" />
        ) : (
          <path d="M3 4h18v13H3zM8 21h8m-4-4v4" />
        )}
      </svg>
      <span className="platform" id={`pf-${id}-name`}>
        {option.label}
        <small>
          {selected ? "Selected" : "Select platform"}
          {tag ? ` · ${tag}` : ""}
        </small>
      </span>
      <span className="details" id={`pf-${id}-sub`}>
        {planned ? (
          id === "windows" ? (
            "A little further down the road."
          ) : (
            "We’ll keep a place for you."
          )
        ) : (
          <>
            Apple silicon + Intel
            <br />
            {option.requirements}
          </>
        )}
      </span>
      <span className="soon">
        {planned
          ? "Coming soon"
          : availability === "unavailable"
            ? "Currently unavailable"
            : "Available now"}
      </span>
    </div>
  );
}
