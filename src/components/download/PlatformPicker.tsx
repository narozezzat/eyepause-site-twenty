"use client";

import { useRef, type ReactNode, type KeyboardEvent } from "react";
import type { DownloadOption } from "@/lib/releases";
import { nextRadioIndex } from "@/lib/theme";
import { PlatformRow } from "./PlatformRow";

interface PlatformPickerProps {
  options: DownloadOption[];
  selectedId: string | null;
  /** The visitor's OS, when it is one of the options. */
  detectedId: string | null;
  onChange: (platformId: string) => void;
  action: ReactNode;
}

/**
 * Radiogroup with roving tabindex: arrows move and select, Home/End jump. Stacked on phones, inline from `sm`.
 * Hand-rolled rather than Radix RadioGroup: the selected entry nests its download button, and a
 * Radix radio item is itself a button, which can't contain another one.
 */
export function PlatformPicker({
  options,
  selectedId,
  detectedId,
  onChange,
  action,
}: PlatformPickerProps) {
  const radios = useRef<(HTMLDivElement | null)[]>([]);

  const onKeyDown =
    (index: number) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        onChange(options[index].platformId);
        return;
      }
      const next = nextRadioIndex(event.key, index, options.length);
      if (next === null) return;
      event.preventDefault();
      onChange(options[next].platformId);
      radios.current[next]?.focus();
    };

  return (
    <div role="radiogroup" aria-label="Platform" className="download-ledger">
      {options.map((option, index) => (
        <div
          key={option.platformId}
          className="ledger-entry"
          data-selected={option.platformId === selectedId}
        >
          <PlatformRow
            option={option}
            selected={option.platformId === selectedId}
            tag={
              option.platformId === detectedId
                ? option.platformId === "macos"
                  ? "Recommended for this Mac"
                  : "Detected"
                : null
            }
            radioRef={(el) => {
              radios.current[index] = el;
            }}
            onSelect={() => onChange(option.platformId)}
            onKeyDown={onKeyDown(index)}
          />
          {option.platformId === selectedId ? (
            <div className="ledger-action">{action}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
