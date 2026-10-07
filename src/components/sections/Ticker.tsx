"use client";

import { useEffect, useRef, useState } from "react";

interface TickerProps {
  /** Value the countdown starts from and loops back to. */
  from: number;
  format?: "seconds" | "clock";
  className?: string;
  id?: string;
}

function display(value: number, format: TickerProps["format"]): string {
  return format === "clock" ? `00:${String(value).padStart(2, "0")}` : String(value);
}

/**
 * Decorative 1 Hz countdown for the product mocks. Ticks only while on screen
 * and stays still under prefers-reduced-motion. Hidden from assistive tech:
 * the surrounding figure carries a static label.
 */
export function Ticker({ from, format = "seconds", className, id }: TickerProps) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | null = null;
    let visible = false;

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const sync = () => {
      stop();
      if (visible && !reduce.matches) {
        timer = setInterval(() => setValue((v) => (v > 0 ? v - 1 : from)), 1000);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    reduce.addEventListener("change", sync);
    return () => {
      stop();
      observer.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, [from]);

  return (
    <span ref={ref} id={id} className={className} aria-hidden="true">
      {display(value, format)}
    </span>
  );
}
