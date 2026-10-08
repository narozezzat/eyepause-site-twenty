import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { withBasePath } from "@/config/site";
export function SiteHeader() {
  return (
    <>
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <defs>
          <symbol id="eye" viewBox="0 0 24 24">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </symbol>
          <symbol id="arrow" viewBox="0 0 24 24">
            <path d="M12 3v16m-6-6 6 6 6-6M4 21h16" />
          </symbol>
          <symbol id="pause" viewBox="0 0 24 24">
            <path d="M8 4v16M16 4v16" />
          </symbol>
          <symbol id="sound" viewBox="0 0 24 24">
            <path d="m11 4-6 5H2v6h3l6 5V4Zm4 4c3 2 3 6 0 8m3-11c5 4 5 10 0 14" />
          </symbol>
          <symbol id="settings" viewBox="0 0 24 24">
            <path d="M3 7h18M3 17h18" />
            <rect x="7" y="4" width="4" height="6" fill="var(--bg)" />
            <rect x="14" y="14" width="4" height="6" fill="var(--bg)" />
          </symbol>
          <symbol id="monitor" viewBox="0 0 24 24">
            <path d="M3 4h18v13H3zM8 21h8m-4-4v4" />
          </symbol>
        </defs>
      </svg>
      <header className="top">
        <div className="wrap nav">
          <a
            className="brand"
            href={withBasePath("/")}
            aria-label="EyePause home"
          >
            <svg aria-hidden="true">
              <use href="#eye" />
            </svg>
            EyePause
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href={withBasePath("/#the-break")}>The break</a>
            <a href={withBasePath("/#your-day")}>Your day</a>
          </nav>
          <div className="nav-end">
            <ThemeToggle />
            <a className="nav-download" href={withBasePath("/#download")}>
              Download
              <svg aria-hidden="true">
                <use href="#arrow" />
              </svg>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
