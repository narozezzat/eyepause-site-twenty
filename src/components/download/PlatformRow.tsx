"use client";

import type { KeyboardEvent, Ref } from "react";
import { platforms } from "@/config/platforms";
import { useDownloadState } from "@/hooks/useDownloadState";
import { formatBytes } from "@/lib/format";
import type { DownloadOption } from "@/lib/releases";
import { DownloadButton } from "./DownloadButton";
import { PlatformIcon } from "./PlatformIcon";
import styles from "./DownloadPanel.module.css";

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
    <div className={`${styles.row} ${selected ? styles.selected : ""}`}>
      <div
        ref={radioRef}
        className={styles.pick}
        role="radio"
        aria-checked={selected}
        aria-labelledby={nameId}
        aria-describedby={infoId}
        tabIndex={focusable ? 0 : -1}
        onClick={onSelect}
        onKeyDown={onKeyDown}
      >
        <PlatformIcon id={id} className={styles.icon} />
        <div className={styles.name}>
          <span id={nameId}>
            {option.label}
            {recommended ? <span className={styles.badge}>Recommended</span> : null}
          </span>
          <small>{sub}</small>
        </div>
        <div className={styles.info} id={infoId}>
          {info.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>

      <div className={styles.act}>
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
          <a className={styles.alt} href={alternate.href} download={alternate.name}>
            or .{alternate.name.split(".").pop()?.toLowerCase()} · {formatBytes(alternate.size)}
          </a>
        ) : null}
      </div>

      <span className="visually-hidden" role="status">
        {statusText[state]}
      </span>

      {state === "started" && primary ? (
        <div className={styles.after}>
          <ol>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>
            Nothing happened?{" "}
            <a href={primary.href} download={primary.name}>
              Download {primary.name} again
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
}
