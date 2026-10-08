/** First focusable element: jumps keyboard users past the header to `#main`. */
export function SkipLink() {
  return (
    <a
      className="fixed top-2 left-4 z-[100] inline-flex h-11 -translate-y-[200%] items-center bg-accent px-4 font-mono text-caption font-medium text-accent-fg no-underline focus-visible:translate-y-0 sm:left-6 lg:left-8"
      href="#main"
    >
      Skip to content
    </a>
  );
}
