"use client";
import { useEffect, useState } from "react";
import { secondsRemaining } from "@/lib/demo";
export function BreakPreview() {
  const [remaining, setRemaining] = useState(20);
  const [deadline, setDeadline] = useState<number | null>(null);
  const running = deadline !== null && remaining > 0;
  useEffect(() => {
    if (!running || deadline === null) return;
    const timer = setInterval(
      () => setRemaining(secondsRemaining(deadline, Date.now())),
      100,
    );
    return () => clearInterval(timer);
  }, [deadline, running]);
  function toggle() {
    setRemaining(20);
    setDeadline(running ? null : Date.now() + 20000);
  }
  return (
    <figure>
      <div className="break-screen">
        <div className="screen-top">
          <span>
            <svg aria-hidden="true">
              <use href="#eye" />
            </svg>
            EyePause / Short break
          </span>
          <button id="play-break" onClick={toggle}>
            {running
              ? "End preview"
              : remaining === 0
                ? "Try again"
                : "Try a 20s break"}
          </button>
        </div>
        <div className="break-center">
          <div
            className="flipclock"
            role="timer"
            aria-live="off"
            aria-label={`${remaining} seconds remaining`}
            id="flipclock"
          >
            <span className="flip">0</span>
            <span className="flip">0</span>
            <span className="colon">:</span>
            <span className="flip" id="tens">
              {Math.floor(remaining / 10)}
            </span>
            <span className="flip" id="ones">
              {remaining % 10}
            </span>
          </div>
          <h3 id="break-title">
            {remaining === 0 ? "Welcome back." : "Let your eyes wander."}
          </h3>
          <p>
            Find something 20 feet away.
            <br />
            There’s nothing you need to do here.
          </p>
        </div>
        <div className="screen-bottom">
          <span>A moment away from the screen</span>
          <span id="break-status" role="status">
            {running
              ? "Look away. We’ll keep time."
              : remaining === 0
                ? "A small pause, well taken."
                : "20 seconds. Just for you."}
          </span>
        </div>
      </div>
      <figcaption className="break-caption">
        <span>Full-screen break / Flip clock</span>
        <span>Less on screen. More room to look away.</span>
      </figcaption>
    </figure>
  );
}
