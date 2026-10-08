"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { draw, prefersReducedMotion } from "@/components/motion/engine";

const exercises = [
  {
    label: "Near / far",
    title: "A little movement for your eyes.",
    text: "Shift your focus from something nearby to something in the distance. Follow a guided exercise during your break.",
    caption: "A change of focus / Near → Far",
    art: (
      <>
        <circle cx="65" cy="75" r="21" />
        <circle cx="335" cy="75" r="42" />
        <circle cx="335" cy="75" r="29" />
        <path d="M105 75h171m-10-7 10 7-10 7M65 104v15m-5-5 5 5 5-5M335 124v10" />
      </>
    ),
  },
  {
    label: "Figure 8",
    title: "Take the long way around.",
    text: "Trace a slow, sideways figure eight with your eyes. Keep your head still and move at a comfortable pace.",
    caption: "A gentle path / Figure 8",
    art: (
      <path d="M200 75C110-40 35 20 60 85s100 40 140-10 145-105 145 0-100 55-145 0Z" />
    ),
  },
  {
    label: "Blink",
    title: "Slow down. Blink fully.",
    text: "Close your eyes gently, pause, and open them again. Follow a few slow, full blinks during your break.",
    caption: "A moment of rest / Blink",
    art: (
      <path d="M100 65q100 85 200 0M130 85l-15 25m55-10-6 28m66-28 6 28m34-43 15 25" />
    ),
  },
];

export function ExercisePreview() {
  const [index, setIndex] = useState(0);
  const exercise = exercises[index];
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef(index);
  // Switching exercises redraws the eye path and eases the new words in.
  useEffect(() => {
    if (shown.current === index) return;
    shown.current = index;
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const tweens = [
      draw([...el.querySelectorAll(".exercise-figure svg > *")]),
      gsap.from(
        [...el.querySelectorAll(".exercise-figure .mono, [aria-live] > *")],
        {
          opacity: 0,
          y: 6,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      ),
    ];
    return () => tweens.forEach((t) => t.revert());
  }, [index]);
  return (
    <div className="exercise" ref={root}>
      <div className="exercise-figure">
        <svg viewBox="0 0 400 150" role="img" aria-label={exercise.caption}>
          {exercise.art}
        </svg>
        <div className="mono muted">{exercise.caption}</div>
      </div>
      <div className="exercise-content">
        <div aria-live="polite">
          <h3>{exercise.title}</h3>
          <p>{exercise.text}</p>
        </div>
        <div
          className="exercise-tabs"
          role="group"
          aria-label="Eye exercise preview"
        >
          {exercises.map(({ label }, i) => (
            <button
              key={label}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
