import styles from "./Wordmark.module.css";

/** EyePause wordmark with the mint focus dot, the one place the brand mint appears. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`${styles.mark} ${className ?? ""}`}>
      EyePause<span className={styles.dot} aria-hidden="true" />
    </span>
  );
}
