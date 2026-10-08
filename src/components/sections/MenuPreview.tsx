"use client";
import { heroTimer, useDemoTimer } from "@/hooks/useDemoTimer";
import { cycleFraction, formatClock } from "@/lib/demo";
export function MenuPreview() {
  const { left, paused, skipped } = useDemoTimer(heroTimer);
  const time = formatClock(left);
  // The bar fills as the cycle runs, so it empties again on Skip.
  const elapsed = 1 - cycleFraction(left, heroTimer.cycle);
  return (
    <div
      className="desktop"
      aria-label="Interactive preview of the EyePause menu bar popover"
    >
      <div className="menubar">
        <span className="menu-active">
          <svg aria-hidden="true">
            <use href="#eye" />
          </svg>
          <span id="menu-time">{paused ? "Paused" : time}</span>
        </span>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M2 8c6-6 14-6 20 0M5 12c4-4 10-4 14 0m-10 4c2-2 4-2 6 0m-3 4h.01" />
        </svg>
        <span>Thu 9:41</span>
      </div>
      <div className="popover">
        <div className="pop-head">
          EyePause<span>Next break</span>
        </div>
        <div className="timer">
          <div
            className="timer-value"
            id="timer"
            data-paused={paused || undefined}
            role="timer"
            aria-label={`Next break in ${time}`}
          >
            {time}
          </div>
          <div className="timer-label" id="timer-label" role="status">
            {paused
              ? "Paused. Take your time."
              : skipped
                ? "Next break in twenty minutes."
                : "A little focus, then a little distance."}
          </div>
          <div className="progress">
            <i style={{ width: `${(elapsed * 100).toFixed(2)}%` }}></i>
          </div>
        </div>
        <div className="pop-actions">
          <button
            id="pause"
            aria-pressed={paused}
            onClick={heroTimer.togglePause}
          >
            {paused ? "Resume timer" : "Pause timer"}
          </button>
          <button id="skip" onClick={heroTimer.skip}>
            Skip break
          </button>
        </div>
        <div className="pop-foot">
          <span>Today</span>
          <b>8 breaks taken (sample)</b>
        </div>
      </div>
      <div className="desktop-caption">
        Always close. Never in the way.
        <br />
        Interactive app preview
      </div>
    </div>
  );
}
