import { BreakPreview } from "./BreakPreview";
import { ExercisePreview } from "./ExercisePreview";
import { StatsPreview } from "./StatsPreview";
export function Chapters() {
  return (
    <>
      <section className="chapter" id="the-break">
        <div className="chapter-head">
          <div className="chapter-no">
            <b>01</b>Look away
          </div>
          <h2>
            A small pause.
            <br />A wider view.
          </h2>
          <p>
            Every twenty minutes, leave the close-up behind. EyePause gives you
            twenty seconds to focus on something further away.
          </p>
        </div>
        <BreakPreview />
      </section>
      <section className="chapter" id="your-day">
        <div className="routine-grid">
          <div className="routine-left">
            <div className="chapter-no">
              <b>02</b>Find your rhythm
            </div>
            <h2 style={{ marginTop: 28 }}>
              Good timing.
              <br />
              Quiet by design.
            </h2>
            <p>
              A heads-up before every break. A timer that waits when you step
              away. Small details that fit the way you work.
            </p>
            <div
              className="toast"
              role="img"
              aria-label="EyePause notification: Your break is coming up in 30 seconds. Finish your thought."
            >
              <div className="toast-icon">
                <svg aria-hidden="true">
                  <use href="#eye" />
                </svg>
              </div>
              <div>
                <strong>Your break is coming up.</strong>
                <p>30 seconds. Finish your thought.</p>
              </div>
              <span className="mono">now</span>
            </div>
          </div>
          <div>
            <div className="feature-row">
              <svg aria-hidden="true">
                <use href="#pause" />
              </svg>
              <div>
                <h3>It pauses when you do.</h3>
                <p>
                  Idle, asleep, or screen locked? The timer waits until you’re
                  back.
                </p>
              </div>
            </div>
            <div className="feature-row">
              <svg aria-hidden="true">
                <use href="#settings" />
              </svg>
              <div>
                <h3>Your day. Your settings.</h3>
                <p>
                  Set your timing, pause a session, or skip a break. Launch at
                  login and let EyePause take it from there.
                </p>
              </div>
            </div>
            <div className="feature-row">
              <svg aria-hidden="true">
                <use href="#sound" />
              </svg>
              <div>
                <h3>A sound, or silence.</h3>
                <p>
                  Choose a gentle cue for your break. Or keep things completely
                  quiet.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ExercisePreview />
      </section>
      <section className="chapter">
        <div className="stats-grid">
          <div className="stats-copy">
            <div className="chapter-no">
              <b>03</b>See the habit
            </div>
            <h2>
              Small breaks.
              <br />
              They add up.
            </h2>
            <p>
              See the breaks you’ve taken today and across the week. A simple
              record of making room for yourself.
            </p>
            <div className="privacy">
              <strong>Your habits stay yours.</strong>
              <br />
              100% local. No account. No telemetry.
            </div>
          </div>
          <StatsPreview />
        </div>
      </section>
    </>
  );
}
