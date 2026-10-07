"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { goClass, goSolidClass } from "./buttonStyles";

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
    timer.current = setTimeout(() => setState("idle"), 2400);
  };

  return (
    <>
      <button type="button" className={cn(goClass, goSolidClass, "md:w-full")} onClick={copy}>
        {state === "copied" ? "Link copied" : "Copy link"}
      </button>
      <span className="sr-only" role="status">
        {state === "copied"
          ? "Link copied to clipboard"
          : state === "failed"
            ? "Could not copy. Share this page from your browser menu instead."
            : ""}
      </span>
      {state === "failed" ? (
        <span className="text-xs text-fg-subtle" aria-hidden="true">
          Could not copy. Share this page from your browser menu instead.
        </span>
      ) : null}
    </>
  );
}
