import { Wordmark } from "./Wordmark";

/**
 * Focus-shift intro: the wordmark starts blurred (near) and resolves sharp (far),
 * gone by 1.2s. Pure CSS so it paints with the first frame, never intercepts
 * input, and is removed entirely under prefers-reduced-motion. The page
 * underneath is fully rendered and interactive the whole time.
 */
export function Splash() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 grid animate-splash-out place-items-center bg-bg motion-reduce:hidden"
      aria-hidden="true"
    >
      <div className="grid justify-items-center gap-3">
        <b className="block animate-focus-in text-numeral-sm">
          <Wordmark className="font-extrabold wdth-125" />
        </b>
        <small className="block animate-enter font-mono text-micro tracking-caps text-fg-subtle uppercase">
          Look twenty feet away
        </small>
      </div>
    </div>
  );
}
