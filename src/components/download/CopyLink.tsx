"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckIcon, LinkIcon } from "@/components/ui/icons";

type CopyState = "idle" | "copied" | "failed";

/** Lets phone visitors send the page to their Mac. */
export function CopyLink() {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0]);
      setState("copied");
    } catch {
      setState("failed");
    }
    timer.current = setTimeout(() => setState("idle"), 2000);
  };

  return (
    <div className="grid gap-2">
      <Button
        variant="secondary"
        block
        onClick={copy}
        icon={state === "copied" ? <CheckIcon /> : <LinkIcon />}
      >
        {state === "copied" ? "Copied" : "Copy link"}
      </Button>
      <p className="m-0 text-caption text-fg-muted" aria-live="polite">
        {state === "copied"
          ? "Link copied. Paste it into a message to your Mac."
          : state === "failed"
            ? "Could not copy. Use Share in your browser menu instead."
            : ""}
      </p>
    </div>
  );
}
