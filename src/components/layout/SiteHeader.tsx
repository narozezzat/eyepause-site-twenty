import { ArrowDownToLine } from "lucide-react";
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
              <ArrowDownToLine aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
