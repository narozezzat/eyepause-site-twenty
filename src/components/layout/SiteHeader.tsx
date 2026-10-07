import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const nav = [
  { href: "/#tour", label: "Tour" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/#get", label: "Download" },
];

/** Brand and theme on one row; on phones the nav drops to its own row so every link stays reachable. */
export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-4 border-b border-border py-2.5">
      <Link
        className="inline-flex min-h-11 items-center text-lg leading-none no-underline"
        href="/"
        aria-label="EyePause home"
      >
        <Wordmark />
      </Link>
      <nav
        aria-label="Primary"
        className="order-last -ml-2 flex w-full font-mono text-caption leading-none sm:order-none sm:ml-auto sm:w-auto sm:gap-2"
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex min-h-11 items-center px-2 text-fg-muted no-underline hover:text-fg"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
