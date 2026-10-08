import { ArrowDownToLine } from "lucide-react";
import { MenuPreview } from "./MenuPreview";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="edition eyebrow">
        <span>A little distance. A different focus.</span>
        <span>Eye care / Made for Mac</span>
      </div>
      <div
        className="poster"
        aria-label="Every 20 minutes, look 20 feet away for 20 seconds"
      >
        <div className="measure">
          <span className="digits">20</span>
          <div className="unit">
            <span>Minutes</span>
            <span>Work.</span>
          </div>
        </div>
        <div className="measure">
          <span className="digits">20</span>
          <div className="unit">
            <span>Feet away</span>
            <span>Look.</span>
          </div>
        </div>
        <div className="measure">
          <span className="digits">20</span>
          <div className="unit">
            <span>Seconds</span>
            <span>Reset.</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-copy">
          <h1 id="hero-title">
            Look up.
            <br />
            Come back fresh.
          </h1>
          <p>
            A quiet reminder to give your eyes a break. Right in your Mac’s menu
            bar.
          </p>
          <a href="#download" className="btn">
            Get EyePause for Mac
            <ArrowDownToLine aria-hidden="true" />
          </a>
          <small>Free. Local. No account required.</small>
        </div>
        <MenuPreview />
      </div>
    </section>
  );
}
