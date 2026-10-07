import { cn } from "@/lib/cn";

const rule = [
  { lead: "Every", em: "20 minutes" },
  { lead: "look", em: "20 feet", tail: "away" },
  { lead: "for", em: "20 seconds" },
];

/** The rule itself is the hero: three huge numerals, the middle one lit. */
export function Hero() {
  return (
    <>
      <section
        className="grid grid-cols-1 gap-7 pt-10 pb-5 md:grid-cols-3 md:gap-0 md:pt-14"
        aria-label="The 20-20-20 rule"
      >
        {rule.map((r, i) => (
          <div
            key={r.em}
            className={cn(
              "flex min-w-0 items-end gap-4.5 border-border md:block",
              i > 0 && "border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-4.5",
            )}
          >
            <b
              aria-hidden="true"
              className={cn(
                "block flex-none text-rule-stack font-bold tracking-numeral tabular-nums wdth-62 md:text-rule",
                i === 1 && "text-accent",
              )}
            >
              20
            </b>
            <span className="block pb-1.5 font-mono text-xs leading-[1.4] tracking-label text-fg-subtle uppercase md:mt-4.5 md:pb-0">
              {r.lead} <em className="text-fg not-italic">{r.em}</em>
              {r.tail ? ` ${r.tail}` : null}
            </span>
          </div>
        ))}
      </section>
      <section
        className="grid grid-cols-1 items-end gap-5 border-b border-border pt-7 pb-16 md:grid-cols-2 md:gap-10"
        aria-labelledby="thesis-h"
      >
        <h1
          id="thesis-h"
          className="m-0 text-heading font-semibold tracking-display text-balance wdth-92"
        >
          Your eyes focus at arm&rsquo;s length all day. EyePause reminds them to let go.
        </h1>
        <p className="m-0 max-w-[48ch] text-fg-muted">
          A macOS menu bar app that times the rule for you, pauses when you leave or join a
          call, and keeps every statistic on your machine. Free, no account.
        </p>
      </section>
    </>
  );
}
