"use client";

import { useState, type CSSProperties } from "react";
import { sampleStats } from "@/lib/demo";

export function StatsPreview() {
  const [period, setPeriod] = useState<keyof typeof sampleStats>("week");
  const data = sampleStats[period];
  const total = data.values.reduce((sum: number, value) => sum + value, 0);
  return (
    <div className="stats">
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
