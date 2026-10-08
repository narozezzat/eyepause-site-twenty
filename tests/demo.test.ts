import { describe, expect, it } from "vitest";
import {
  cycleFraction,
  formatClock,
  remainingSeconds,
  sampleStats,
  secondsRemaining,
} from "../src/lib/demo";

describe("break preview deadline", () => {
  it("starts at twenty and rounds up partial seconds", () => {
    expect(secondsRemaining(21000, 1000)).toBe(20);
    expect(secondsRemaining(21000, 1100)).toBe(20);
    expect(secondsRemaining(21000, 2000)).toBe(19);
  });
  it("catches up after a background tab resumes and never becomes negative", () => {
    expect(secondsRemaining(21000, 18500)).toBe(3);
    expect(secondsRemaining(21000, 21000)).toBe(0);
    expect(secondsRemaining(21000, 65000)).toBe(0);
  });
  it("caps the display if the system clock moves backwards", () => {
    expect(secondsRemaining(21000, -1000)).toBe(20);
  });
});

it("keeps sample statistics totals consistent with their bars", () => {
  expect(
    sampleStats.day.values.reduce((sum: number, value) => sum + value, 0),
  ).toBe(8);
  expect(
    sampleStats.week.values.reduce((sum: number, value) => sum + value, 0),
  ).toBe(62);
});

describe("menu bar clock", () => {
  it("counts whole seconds across the full cycle", () => {
    expect(remainingSeconds(768000, 0)).toBe(768);
    expect(remainingSeconds(768000, 500)).toBe(768);
    expect(remainingSeconds(768000, 900000)).toBe(0);
  });
  it("formats seconds as the app's menu bar does", () => {
    expect(formatClock(768)).toBe("12:48");
    expect(formatClock(1200)).toBe("20:00");
    expect(formatClock(5)).toBe("00:05");
  });
  it("never shows a negative or fractional time", () => {
    expect(formatClock(-3)).toBe("00:00");
    expect(formatClock(59.6)).toBe("01:00");
  });
  it("keeps the progress bar within the cycle", () => {
    expect(cycleFraction(600, 1200)).toBe(0.5);
    expect(cycleFraction(1500, 1200)).toBe(1);
    expect(cycleFraction(-1, 1200)).toBe(0);
  });
});
