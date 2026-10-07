"use client";

import type { KeyboardEvent, Ref } from "react";
import { platforms } from "@/config/platforms";
import { useDownloadState } from "@/hooks/useDownloadState";
import { formatBytes } from "@/lib/format";
import type { DownloadOption } from "@/lib/releases";
import { DownloadButton } from "./DownloadButton";
import { PlatformIcon } from "./PlatformIcon";
import { cn } from "@/lib/cn";

interface PlatformRowProps {
  option: DownloadOption;
  selected: boolean;
  recommended: boolean;
  focusable: boolean;
  radioRef: Ref<HTMLDivElement>;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

const statusText = {
  idle: "",
  starting: "Preparing your download.",
  started: "Download started. Install steps follow.",
} as const;

export function PlatformRow({
  option,
  selected,
  recommended,
  focusable,
  radioRef,
  onSelect,
  onKeyDown,
}: PlatformRowProps) {
  const { state, begin } = useDownloadState();
  const id = option.platformId;
  const nameId = `pf-${id}-name`;
  const infoId = `pf-${id}-info`;
  const steps = platforms.find((p) => p.id === id)?.installSteps ?? [];
  const [requirement, ...hardware] = option.requirements.split(" · ");
  const { primary, alternate } = option;

  let sub: string;
  let info: string[];
  if (option.status === "coming-soon") {
    sub = "Not yet available";
    info = ["Planned. It will appear here first."];
  } else if (option.status === "unavailable" || !primary) {
    sub = requirement;
    info = ["Download temporarily unavailable.", "Check back shortly."];
  } else {
    sub = requirement;
    info = [`${hardware.length ? "Universal " : ""}${primary.label} · ${formatBytes(primary.size)}`, ...hardware];
  }

  return (
    <div
      className={cn(
        "relative grid grid-cols-1 items-center gap-x-4.5 gap-y-3.5 border-b border-border px-1 py-5.5 transition-colors duration-250 md:grid-cols-[minmax(0,1fr)_auto]",
        selected &&
          "bg-surface before:absolute before:inset-y-0 before:-left-4 before:w-0.75 before:bg-accent sm:before:-left-6 lg:before:-left-8",
      )}
    >
      <div
        ref={radioRef}
        className="grid min-h-11 cursor-pointer grid-cols-[36px_minmax(0,1fr)] items-center gap-x-4.5 gap-y-3 md:grid-cols-[44px_minmax(0,1.2fr)_minmax(0,1fr)]"
        role="radio"
        aria-checked={selected}
        aria-labelledby={nameId}
        aria-describedby={infoId}
        tabIndex={focusable ? 0 : -1}
        onClick={onSelect}
        onKeyDown={onKeyDown}
      >
        <PlatformIcon
          id={id}
          className={cn("size-6.5 fill-current", selected ? "text-fg" : "text-fg-muted")}
        />
        <div className="text-title leading-[1.1] font-semibold tracking-[-0.01em] md:text-platform">
          <span id={nameId}>
            {option.label}
            {recommended ? (
              <span className="ml-2.5 inline-block border border-current px-1.75 py-1.25 align-middle font-mono text-[0.65625rem] leading-none font-medium tracking-[0.12em] text-accent uppercase">
                Recommended
              </span>
            ) : null}
          </span>
          <small className="mt-1.5 block font-mono text-xs leading-[1.3] font-normal tracking-[0.02em] text-fg-subtle">
            {sub}
          </small>
        </div>
        <div className="col-start-2 grid font-mono text-caption text-fg-muted md:col-start-auto" id={infoId}>
          {info.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>

      <div className="grid justify-items-stretch gap-1 md:justify-items-center">
        <DownloadButton
          option={option}
          state={state}
          selected={selected}
          describedBy={infoId}
          onBegin={() => {
            onSelect();
            begin();
          }}
        />
        {alternate && option.status === "available" ? (
          <a
            className="inline-flex min-h-11 items-center justify-center px-1.5 font-mono text-xs leading-none text-fg-muted underline underline-offset-3 hover:text-fg"
            href={alternate.href}
            download={alternate.name}
          >
            or .{alternate.name.split(".").pop()?.toLowerCase()} · {formatBytes(alternate.size)}
          </a>
        ) : null}
      </div>

      <span className="sr-only" role="status">
        {statusText[state]}
      </span>

      {state === "started" && primary ? (
        <div className="col-span-full animate-fade-in font-mono text-caption leading-[1.7] text-fg-muted md:pl-15.5">
          <ol className="m-0 list-decimal pl-4.5">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-2 mb-0 text-fg-subtle">
            Nothing happened?{" "}
            <a
              className="inline-block py-3 text-fg-muted underline underline-offset-3"
              href={primary.href}
              download={primary.name}
            >
              Download {primary.name} again
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
}
