import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found · EyePause",
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="border-b border-border pt-14 pb-18">
      <p
        className="m-0 text-code font-bold tracking-numeral text-accent tabular-nums wdth-62"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="mt-8 mb-3 text-heading font-semibold tracking-display wdth-92">
        This page is out of focus.
      </h1>
      <p className="mb-7 max-w-[48ch] text-fg-muted">
        It moved, or never existed. Look twenty feet away for a moment, then head back.
      </p>
      <Link
        className="inline-flex min-h-11 items-center gap-2.5 bg-fg px-5 py-3.5 text-body leading-none font-semibold text-bg no-underline"
        href="/"
      >
        Back to EyePause <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
