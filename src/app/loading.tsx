import { Wordmark } from "@/components/brand/Wordmark";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loading} role="status">
      <span className={styles.mark}>
        <Wordmark />
      </span>
      <span className="visually-hidden">Loading</span>
    </div>
  );
}
