"use client";

import type { MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { ArrowDownIcon, CheckIcon, Spinner } from "@/components/ui/icons";
import { useDownloadState } from "@/hooks/useDownloadState";
import { formatBytes, formatDate } from "@/lib/format";
import {
  availabilityOf,
  extensionOf,
  type DownloadOption,
} from "@/lib/releases";
import { CopyLink } from "./CopyLink";
import { InstallSteps } from "./InstallSteps";

interface DownloadButtonProps {
  option: DownloadOption;
  steps: string[];
  /** Phone or tablet visitor: offer the link instead of an installer they cannot run. */
  mobile?: boolean;
  /** Switches the picker to the Mac build, offered when a planned platform is selected. */
  onShowMac?: () => void;
}

const announce = {
  idle: "",
  starting: "Starting your download.",
  started: "Download started. Install steps follow.",
} as const;

/**
 * The action for the selected platform: idle → starting → started for a live
 * installer, or a notice that explains why there is nothing to download.
 * Mount with `key={platformId}` so switching platforms resets the state.
 */
export function DownloadButton({
  option,
  steps,
  mobile = false,
  onShowMac,
}: DownloadButtonProps) {
  const { state, begin } = useDownloadState();
  const availability = availabilityOf(option);
  const file = option.primary ?? option.alternate;
  const [requirement] = option.requirements.split(" · ");

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // The request already went out on the first click; repeats would only queue duplicates.
    if (state !== "idle") {
      event.preventDefault();
      return;
    }
    begin();
  };

  let action;
  if (mobile && availability !== "coming-soon") {
    action = (
      <>
        <Notice title="EyePause runs on macOS">
          Open this page on your Mac to install it, or copy the link and send it
          there.
        </Notice>
        <CopyLink />
      </>
    );
  } else if (availability === "coming-soon") {
    action = (
      <>
        <Notice title={`${option.label} is planned`}>
          There is no {option.label} build yet. It will appear here first.
          EyePause runs on macOS 14 or later today.
        </Notice>
        {onShowMac ? (
          <Button variant="secondary" block onClick={onShowMac}>
            Show the Mac download
          </Button>
        ) : null}
      </>
    );
  } else if (availability === "unavailable") {
    action = (
      <Notice title="This build is not on the page yet">
        The v{option.version} download is temporarily unavailable. Please check
        back shortly.
      </Notice>
    );
  } else if (file) {
    const ext = extensionOf(file.name);
    action = (
      <>
        {availability === "error" ? (
          <Notice tone="error" title="The DMG is missing from this release">
            Use the {ext.toUpperCase()} instead. It contains the same app: unzip
            it and move EyePause to Applications.
          </Notice>
        ) : null}
        <Button
          size="lg"
          block
          href={file.href}
          download={file.name}
          onClick={onClick}
          aria-expanded={state === "started"}
          aria-controls={`install-${option.platformId}`}
          aria-busy={state === "starting" || undefined}
          aria-describedby={`dl-${option.platformId}-meta`}
          variant={state === "started" ? "secondary" : "primary"}
          icon={
            state === "starting" ? (
              <Spinner />
            ) : state === "started" ? (
              <CheckIcon />
            ) : (
              <ArrowDownIcon />
            )
          }
        >
          {state === "starting"
            ? "Starting download"
            : state === "started"
              ? "Download started"
              : `Download .${ext}`}
        </Button>
      </>
    );
  }

  return (
    <div className="grid min-w-0 gap-4">
      {action}
      {availability === "coming-soon" ? null : (
        <p
          id={`dl-${option.platformId}-meta`}
          className="m-0 font-mono text-caption text-fg-muted tabular-nums wrap-anywhere"
        >
          <span>v{option.version}</span>
          {file ? (
            <span>
              {"\u00a0· "}
              <span className="whitespace-nowrap">
                {formatBytes(file.size)}
              </span>
            </span>
          ) : null}
          <span>
            {"\u00a0· "}
            <span className="whitespace-nowrap">{requirement}</span>
          </span>
          <span>
            {"\u00a0· "}
            <time className="whitespace-nowrap" dateTime={option.publishedAt}>
              {formatDate(option.publishedAt)}
            </time>
          </span>
        </p>
      )}
      {availability === "ready" &&
      option.alternate &&
      !mobile &&
      state === "idle" ? (
        <p className="m-0 text-caption text-fg-muted">
          Prefer a ZIP?{" "}
          <a
            className="inline-flex min-h-11 items-center text-fg underline underline-offset-4 hover:text-accent-text"
            href={option.alternate.href}
            download={option.alternate.name}
          >
            Download .{extensionOf(option.alternate.name)} ·{" "}
            {formatBytes(option.alternate.size)}
          </a>
        </p>
      ) : null}
      {file && state === "started" ? (
        <div id={`install-${option.platformId}`} className="install grid gap-4">
          <h3>You’re three steps away.</h3>
          <InstallSteps steps={steps} />
          <p className="m-0 text-caption text-fg-muted wrap-anywhere">
            Nothing happened?{" "}
            <a
              className="inline-flex min-h-11 items-center text-fg underline underline-offset-4 hover:text-accent-text"
              href={file.href}
              download={file.name}
            >
              Download {file.name} again
            </a>
          </p>
        </div>
      ) : null}
      <span className="sr-only" role="status">
        {announce[state]}
      </span>
    </div>
  );
}
