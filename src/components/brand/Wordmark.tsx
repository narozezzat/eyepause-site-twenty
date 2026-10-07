import { cn } from "@/lib/cn";

/**
 * EyePause wordmark with the mint focus dot, the one place the brand mint appears.
 * `className` replaces the default weight and width, so callers can set their own.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("tracking-[-0.01em] whitespace-nowrap", className ?? "font-bold wdth-118")}>
      EyePause
      <span
        className="ml-[0.08em] inline-block size-[0.24em] rounded-full bg-success align-baseline"
        aria-hidden="true"
      />
    </span>
  );
}
