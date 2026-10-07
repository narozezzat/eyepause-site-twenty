import styles from "./SiteFooter.module.css";

export function SiteFooter({ version }: { version: string }) {
  return (
    <footer className={styles.footer}>
      <span>EyePause {version} · No telemetry</span>
      <span>Free · No account · Made for macOS</span>
    </footer>
  );
}
