/** Use a deadline so background-tab throttling cannot stretch a twenty-second break. */
export function secondsRemaining(deadline: number, now: number): number {
  return Math.max(0, Math.min(20, Math.ceil((deadline - now) / 1000)));
}

/** Whole seconds left until a deadline, for the menu bar timer's longer cycle. */
export function remainingSeconds(deadline: number, now: number): number {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}

/** Seconds as the app's menu bar shows them, e.g. 768 -> "12:48". */
export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** Share of the cycle still to run, clamped to 0...1, so the bar follows the timer. */
export function cycleFraction(left: number, cycle: number): number {
  return Math.min(1, Math.max(0, left / cycle));
}

export const sampleStats = {
  day: {
    values: [1, 2, 1, 2, 2],
    labels: ["09", "10", "11", "12", "13"],
    period: "today",
    scale: 32,
  },
  week: {
    values: [12, 10, 14, 8, 10, 3, 5],
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    period: "this week",
    scale: 6,
  },
} as const;
