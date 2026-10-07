import { Wordmark } from "./Wordmark";
import styles from "./Splash.module.css";

/**
 * Focus-shift intro: the wordmark starts blurred (near) and resolves sharp (far).
 * Pure CSS so it paints with the first frame, never intercepts input, and is
 * removed entirely under prefers-reduced-motion. The page underneath is fully
 * rendered and interactive the whole time.
 */
export function Splash() {
  return (
    <div className={styles.splash} aria-hidden="true">
      <div>
        <b className={styles.word}>
          <Wordmark />
        </b>
        <small className={styles.tag}>Look twenty feet away</small>
      </div>
    </div>
  );
}
