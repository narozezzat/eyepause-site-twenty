import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Page not found · EyePause",
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="py-16 md:py-20 lg:py-24">
      <p
        className="m-0 text-numeral-md font-bold tracking-numeral text-accent-text tabular-nums wdth-62"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="mt-8 mb-0 text-display font-semibold tracking-display text-balance wdth-92">
        This page is out of focus.
      </h1>
      <p className="mt-4 mb-8 max-w-prose text-lede text-pretty text-fg-muted">
        It moved, or never existed. Look twenty feet away for a moment, then head back.
      </p>
      <Link className={buttonVariants({ variant: "primary", size: "lg", block: true })} href="/">
        <ArrowLeftIcon />
        Back to EyePause
      </Link>
    </main>
  );
}
