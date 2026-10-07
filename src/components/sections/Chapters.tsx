import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Ticker } from "./Ticker";

const prose = "mt-0 mb-3.5 max-w-[42ch] text-fg-muted";

function Specs({ items }: { items: [string, string][] }) {
  return (
    <dl className="mt-5 mb-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-caption leading-[1.45]">
      {items.map(([term, detail]) => (
        <Fragment key={term}>
          <dt className="pt-0.5 text-micro tracking-widest text-fg-subtle uppercase">{term}</dt>
          <dd className="m-0 text-fg">{detail}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

const acts = [{ label: "Skip" }, { label: "Snooze" }, { label: "I\u2019m Done", primary: true }];

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
    <section
      className="grid scroll-mt-4 grid-cols-1 items-start gap-4.5 border-b border-border py-16 sm:py-20 md:grid-cols-[96px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.25fr)] lg:py-28"
      id={anchor}
      aria-labelledby={id}
    >
      <span
        className="text-numeral-sm font-bold tracking-[-0.03em] text-fg-subtle wdth-62 md:text-chapter-no"
        aria-hidden="true"
      >
        {no}
      </span>
      <div>
        <h2
          id={id}
          className="mt-0 mb-3.5 text-chapter font-bold tracking-display uppercase wdth-75"
        >
          {title}
        </h2>
        {body}
      </div>
      <div className="min-w-0 md:col-start-2 lg:col-start-auto">{children}</div>
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
            <p className={prose}>
              Twenty seconds across every display. A floating card by default, full screen when
              you want it to mean it.
            </p>
            <Specs
              items={[
                ["Timer", "Flip clock or circular"],
                ["Long", "Stand up, stretch & relax. Every 3 cycles"],
                ["Strict", "Delay or hide Skip. Esc ×3 to escape"],
              ]}
            />
          </>
        }
      >
        <div
          className="relative grid place-content-center justify-items-center border border-border bg-overlay-bg px-4 pt-10 pb-14 text-center text-overlay-fg sm:px-6 md:aspect-[16/10] md:py-6"
          role="img"
          aria-label="Full-screen break overlay counting down from 20 seconds"
        >
          <span className="font-mono text-micro leading-none font-medium tracking-eyebrow text-overlay-fg-subtle">
            MICRO BREAK
          </span>
          <Ticker
            from={20}
            format="clock"
            className="mt-3.5 mb-4.5 block text-clock font-bold tracking-[-0.03em] tabular-nums wdth-62"
          />
          <span className="mb-1.5 block text-title font-semibold">Look away from your screen</span>
          <span className="mx-auto mb-5.5 block text-sm text-overlay-fg-muted">
            Focus on an object at least 20 feet (6m) away.
          </span>
          <span className="flex justify-center font-mono text-xs leading-none font-medium tracking-widest uppercase">
            {acts.map((a) => (
              <span
                key={a.label}
                className={cn(
                  "-ml-px border px-3 py-2.75 first:ml-0 sm:px-4",
                  a.primary
                    ? "border-overlay-accent bg-overlay-accent text-overlay-accent-fg"
                    : "border-overlay-border",
                )}
              >
                {a.label}
              </span>
            ))}
          </span>
          <span className="absolute bottom-3.5 left-4 font-mono text-[0.625rem] leading-none text-overlay-fg-subtle sm:text-micro">
            Exit Break (Esc)
          </span>
          <span className="absolute right-4 bottom-3.5 font-mono text-[0.625rem] leading-none text-overlay-fg-subtle sm:text-micro">
            Display 1 of 2
          </span>
        </div>
      </Chapter>

      <Chapter
        no="02"
        id="c2"
        title="Guided eyes"
        body={
          <p className={prose}>
            Turn on Guided Eye Exercises and each break walks you through one. Twenty seconds is
            enough.
          </p>
        }
      >
        <ul
          className="m-0 grid list-none grid-cols-2 gap-px border border-border bg-border p-0 md:grid-cols-4"
          aria-label="Eye exercises"
        >
          {exercises.map((e, i) => (
            <li
              key={e.name}
              className={cn(
                "px-3.5 py-4 font-mono text-xs leading-[1.45] text-fg-muted",
                i === 0 ? "bg-surface" : "bg-bg",
              )}
            >
              <b
                className={cn(
                  "mb-2 block font-sans text-numeral-xs font-bold wdth-62",
                  i === 0 ? "text-accent" : "text-fg",
                )}
              >
                {e.name}
              </b>
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
          <p className={prose}>
            A heads-up slides out under the menu bar before each break. Finish the sentence, or
            postpone five minutes.
          </p>
        }
      >
        <div
          className="flex max-w-105 items-center gap-4 border border-border bg-surface px-4.5 py-4"
          role="img"
          aria-label="Heads-up toast: break in 30 seconds, postpone 5 minutes"
        >
          <Ticker
            from={30}
            className="min-w-[1.1em] text-numeral-sm font-bold text-accent tabular-nums wdth-62"
          />
          <span className="font-mono text-xs leading-[1.4] text-fg-muted">
            <b className="block font-sans text-body leading-[1.2] font-semibold text-fg">
              Break in 30s
            </b>
            Micro break · 20 sec
          </span>
          <i className="ml-auto hidden border border-border px-3 py-2.5 font-mono text-micro leading-none font-medium tracking-widest whitespace-nowrap uppercase not-italic md:inline-block">
            Postpone 5 min
          </i>
        </div>
      </Chapter>

      <Chapter
        no="04"
        id="c4"
        title="It waits"
        body={
          <p className={prose}>
            No Accessibility permission, no camera access. Just the signals macOS already gives
            every app.
          </p>
        }
      >
        <ul
          className="m-0 list-none divide-y divide-border border border-border bg-surface p-0"
          aria-label="Automatic pause states"
        >
          {pauses.map((p) => (
            <li
              key={p.name}
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-3.5 font-mono text-caption leading-[1.4]"
            >
              <span>
                <b className="font-sans text-body font-semibold">{p.name}</b>
                <small className="block text-caption leading-[1.4] text-fg-subtle">{p.detail}</small>
              </span>
              <em className="self-center text-micro tracking-widest text-accent uppercase not-italic">
                {p.state}
              </em>
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
            <p className={prose}>
              Completed, skipped, snoozed. Screen time, streaks, best hours, a year of history.
              Export as CSV or JSON.
            </p>
            <Specs
              items={[
                ["Goal", "80% · Met today"],
                ["Range", "7 · 30 · 90 days · Year"],
              ]}
            />
          </>
        }
      >
        <div
          role="img"
          aria-label="Statistics: 90 percent completion, 18 breaks, 12 day streak, 6 hours 40 screen time; weekly bars"
        >
          <div className="grid grid-cols-2 gap-px border border-border bg-border">
            {stats.map((s, i) => (
              <div key={s.label} className="bg-bg p-4.5">
                <b
                  className={cn(
                    "block text-stat font-bold tracking-display tabular-nums wdth-62",
                    i === 0 && "text-accent",
                  )}
                >
                  {s.value}
                </b>
                <span className="font-mono text-micro tracking-[0.12em] text-fg-subtle uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3.5 grid h-22.5 grid-cols-7 items-end gap-1" aria-hidden="true">
            {week.map((d, i) => (
              <i
                key={i}
                className={d.today ? "bg-accent" : "bg-border"}
                style={{ height: `${d.height}%` }}
              />
            ))}
          </div>
          <div
            className="mt-1.5 grid grid-cols-7 gap-1 font-mono text-micro leading-none text-fg-subtle"
            aria-hidden="true"
          >
            {week.map((d, i) => (
              <span key={i}>{d.day}</span>
            ))}
          </div>
        </div>
      </Chapter>
    </>
  );
}
