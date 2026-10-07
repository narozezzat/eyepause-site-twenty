import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import styles from "./SiteHeader.module.css";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/#tour", label: "Tour" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/#get", label: "Download" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="EyePause home">
        <Wordmark />
      </Link>
      <div className={styles.end}>
        <nav aria-label="Primary" className={styles.nav}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
