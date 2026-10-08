"use client";
import { useState } from "react";
export function MenuPreview() {
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState("12:48");
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
            role="timer"
            aria-label={`Next break in ${time}`}
          >
            {time}
          </div>
          <div className="timer-label" id="timer-label" role="status">
            {paused
              ? "Paused. Take your time."
              : time === "20:00"
                ? "Next break in twenty minutes."
                : "A little focus, then a little distance."}
          </div>
          <div className="progress">
            <i></i>
          </div>
        </div>
        <div className="pop-actions">
          <button
            id="pause"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Resume timer" : "Pause timer"}
          </button>
          <button
            id="skip"
            onClick={() => {
              setTime("20:00");
              setPaused(false);
            }}
          >
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
