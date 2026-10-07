import type { ReactNode } from "react";
import { Ticker } from "./Ticker";
import styles from "./Chapters.module.css";

function Chapter({
  no,
  id,
  anchor,
  title,
  body,
  children,
}: {
  no: string;
  id: string;
  anchor?: string;
  title: string;
  body: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={styles.chap} id={anchor} aria-labelledby={id}>
      <span className={styles.no} aria-hidden="true">
        {no}
      </span>
      <div>
        <h2 id={id}>{title}</h2>
        {body}
      </div>
      {children}
    </section>
  );
}

const exercises = [
  { name: "Near / far", text: "Focus shifts between your hand and the horizon." },
  { name: "Figure 8", text: "Trace a slow sideways eight." },
  { name: "Palming", text: "Warm palms over closed eyes." },
  { name: "Blink", text: "Ten slow, full blinks." },
];

const pauses = [
  { name: "Idle", detail: "5 min without input", state: "Paused" },
  { name: "Locked · Asleep", detail: "Lid closed or screen locked", state: "Paused" },
  { name: "On a call", detail: "Microphone or camera in use", state: "Waiting" },
  { name: "Full screen", detail: "Presenting, up to 10 min", state: "Waiting" },
  { name: "Off hours", detail: "Mon–Fri · 9:00–18:00", state: "Off" },
];

const stats = [
  { value: "90%", label: "Completion Rate" },
  { value: "18", label: "Breaks Completed" },
  { value: "12", label: "Day Streak" },
  { value: "6h40", label: "Screen Time" },
];

const week = [
  { day: "M", height: 85 },
  { day: "T", height: 92 },
  { day: "W", height: 78 },
  { day: "T", height: 95 },
  { day: "F", height: 88 },
  { day: "S", height: 60 },
  { day: "S", height: 90, today: true },
];

/** Numbered, typographic tour of the app (chapters 01–05). */
export function Chapters() {
  return (
    <>
      <Chapter
        no="01"
        id="c1"
        anchor="tour"
        title="The break"
        body={
          <>
            <p>
              Twenty seconds across every display. A floating card by default, full screen when
              you want it to mean it.
            </p>
            <dl>
              <dt>Timer</dt>
              <dd>Flip clock or circular</dd>
              <dt>Long</dt>
              <dd>Stand up, stretch &amp; relax. Every 3 cycles</dd>
              <dt>Strict</dt>
              <dd>Delay or hide Skip. Esc ×3 to escape</dd>
            </dl>
          </>
        }
      >
        <div
          className={styles.full}
          role="img"
          aria-label="Full-screen break overlay counting down from 20 seconds"
        >
          <span className={styles.lbl}>MICRO BREAK</span>
          <Ticker from={20} format="clock" className={styles.clock} />
          <span className={styles.fullTitle}>Look away from your screen</span>
          <span className={styles.fullText}>Focus on an object at least 20 feet (6m) away.</span>
          <span className={styles.acts}>
            <span>Skip</span>
            <span>Snooze</span>
            <span className={styles.done}>I&rsquo;m Done</span>
          </span>
          <span className={styles.esc}>Exit Break (Esc)</span>
          <span className={styles.disp}>Display 1 of 2</span>
        </div>
      </Chapter>

      <Chapter
        no="02"
        id="c2"
        title="Guided eyes"
        body={
          <p>
            Turn on Guided Eye Exercises and each break walks you through one. Twenty seconds is
            enough.
          </p>
        }
      >
        <ul className={styles.ex} aria-label="Eye exercises">
          {exercises.map((e, i) => (
            <li key={e.name} className={i === 0 ? styles.cur : undefined}>
              <b>{e.name}</b>
              {e.text}
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter
        no="03"
        id="c3"
        title="Fair warning"
        body={
          <p>
            A heads-up slides out under the menu bar before each break. Finish the sentence, or
            postpone five minutes.
          </p>
        }
      >
        <div
          className={styles.toast}
          role="img"
          aria-label="Heads-up toast: break in 30 seconds, postpone 5 minutes"
        >
          <Ticker from={30} className={styles.toastNum} />
          <span className={styles.toastText}>
            <b>Break in 30s</b>Micro break · 20 sec
          </span>
          <i className={styles.toastAction}>Postpone 5 min</i>
        </div>
      </Chapter>

      <Chapter
        no="04"
        id="c4"
        title="It waits"
        body={
          <p>
            No Accessibility permission, no camera access. Just the signals macOS already gives
            every app.
          </p>
        }
      >
        <ul className={styles.slab} aria-label="Automatic pause states">
          {pauses.map((p) => (
            <li key={p.name}>
              <span>
                <b>{p.name}</b>
                <small>{p.detail}</small>
              </span>
              <em>{p.state}</em>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter
        no="05"
        id="c5"
        title="The record"
        body={
          <>
            <p>
              Completed, skipped, snoozed. Screen time, streaks, best hours, a year of history.
              Export as CSV or JSON.
            </p>
            <dl>
              <dt>Goal</dt>
              <dd>80% · Met today</dd>
              <dt>Range</dt>
              <dd>7 · 30 · 90 days · Year</dd>
            </dl>
          </>
        }
      >
        <div
          role="img"
          aria-label="Statistics: 90 percent completion, 18 breaks, 12 day streak, 6 hours 40 screen time; weekly bars"
        >
          <div className={styles.big4}>
            {stats.map((s) => (
              <div key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.strip} aria-hidden="true">
            {week.map((d, i) => (
              <i
                key={i}
                className={d.today ? styles.today : undefined}
                style={{ height: `${d.height}%` }}
              />
            ))}
          </div>
          <div className={styles.days} aria-hidden="true">
            {week.map((d, i) => (
              <span key={i}>{d.day}</span>
            ))}
          </div>
        </div>
      </Chapter>
    </>
  );
}
