/** Use a deadline so background-tab throttling cannot stretch a twenty-second break. */
export function secondsRemaining(deadline: number, now: number): number {
  return Math.max(0, Math.min(20, Math.ceil((deadline - now) / 1000)));
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
