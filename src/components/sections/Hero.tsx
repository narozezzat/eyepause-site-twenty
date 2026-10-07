import styles from "./Hero.module.css";

const rule = [
  { lead: "Every", em: "20 minutes" },
  { lead: "look", em: "20 feet", tail: "away" },
  { lead: "for", em: "20 seconds" },
];

/** The rule itself is the hero: three huge numerals, the middle one lit. */
export function Hero() {
  return (
    <>
      <section className={styles.rule} aria-label="The 20-20-20 rule">
        {rule.map((r) => (
          <div className={styles.num} key={r.em}>
            <b aria-hidden="true">20</b>
            <span>
              {r.lead} <em>{r.em}</em>
              {r.tail ? ` ${r.tail}` : null}
            </span>
          </div>
        ))}
      </section>
      <section className={styles.thesis} aria-labelledby="thesis-h">
        <h1 id="thesis-h">
          Your eyes focus at arm&rsquo;s length all day. EyePause reminds them to let go.
        </h1>
        <p>
          A macOS menu bar app that times the rule for you, pauses when you leave or join a
          call, and keeps every statistic on your machine. Free, no account.
        </p>
      </section>
    </>
  );
}
