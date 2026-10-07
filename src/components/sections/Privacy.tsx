import styles from "./Privacy.module.css";

export function Privacy() {
  return (
    <section className={styles.priv} id="privacy" aria-labelledby="privacy-h">
      <h2 id="privacy-h" className="visually-hidden">
        Privacy
      </h2>
      <div>
        <b>0 bytes</b>
        <p>sent anywhere. EyePause never connects to the internet.</p>
      </div>
      <div>
        <b>0 accounts</b>
        <p>No sign-up, no subscription, no tracking, no ads. Ever.</p>
      </div>
      <div>
        <b>1 URL</b>
        <p>
          for automation: <code>eyepause://pause?minutes=30</code>
        </p>
      </div>
    </section>
  );
}
