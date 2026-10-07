import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found · EyePause",
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className={styles.main}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1>This page is out of focus.</h1>
      <p className={styles.text}>
        It moved, or never existed. Look twenty feet away for a moment, then head back.
      </p>
      <Link className={styles.home} href="/">
        Back to EyePause <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
