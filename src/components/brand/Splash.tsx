import { Wordmark } from "./Wordmark";

/**
 * Focus-shift intro: the wordmark starts blurred (near) and resolves sharp (far).
 * Pure CSS so it paints with the first frame, never intercepts input, and is
 * removed entirely under prefers-reduced-motion. The page underneath is fully
 * rendered and interactive the whole time.
 */
export function Splash() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 grid animate-splash-out place-items-center bg-bg motion-reduce:hidden"
      aria-hidden="true"
    >
      <div>
        <b className="block animate-focus-in text-splash">
          <Wordmark className="font-extrabold wdth-125" />
        </b>
        <small className="mt-3.5 block animate-fade-in-late text-center font-mono text-xs leading-none tracking-[0.2em] text-fg-subtle uppercase">
          Look twenty feet away
        </small>
      </div>
    </div>
  );
}
