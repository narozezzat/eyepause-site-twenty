"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { count, grow, prefersReducedMotion } from "@/components/motion/engine";
import { sampleStats } from "@/lib/demo";

export function StatsPreview() {
  const [period, setPeriod] = useState<keyof typeof sampleStats>("week");
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef(period);
  // A period switch re-counts the total and regrows the bars, like the app's chart.
  useEffect(() => {
    if (shown.current === period) return;
    shown.current = period;
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const tweens = [
      count(el.querySelector(".stat-value span"), { duration: 0.9 }),
      grow([...el.querySelectorAll(".bar")]),
    ];
    return () => tweens.forEach((t) => t?.revert());
  }, [period]);
  const data = sampleStats[period];
  const total = data.values.reduce((sum: number, value) => sum + value, 0);
  return (
    <div className="stats" ref={root}>
      <div className="stats-header">
        <span>Breaks taken</span>
        <div className="segmented" role="group" aria-label="Statistics period">
          {(["day", "week"] as const).map((value) => (
            <button
              key={value}
              aria-pressed={period === value}
              onClick={() => setPeriod(value)}
            >
              {value === "day" ? "Day" : "Week"}
            </button>
          ))}
        </div>
      </div>
      <div className="stat-value" aria-live="polite">
        <span>{total}</span>
        <small>{data.period}</small>
      </div>
      <div
        role="img"
        aria-label={`Sample ${period === "day" ? "hourly" : "daily"} breaks: ${data.values.join(", ")}`}
      >
        <div className="chart">
          {data.values.map((value, index) => (
            <div
              key={index}
              className="bar"
              style={{ "--h": `${value * data.scale}%` } as CSSProperties}
            >
              {index === data.values.length - 1 && <em>{value}</em>}
            </div>
          ))}
        </div>
        <div className="chart-labels">
          {data.labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      </div>
      <div className="stats-footer">
        <span>Every break counts.</span>
        <span>Sample statistics</span>
      </div>
    </div>
  );
}
