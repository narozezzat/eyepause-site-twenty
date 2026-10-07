export function SiteFooter({ version }: { version: string }) {
  return (
    <footer className="flex flex-wrap justify-between gap-3 border-t border-border pt-5 pb-10 font-mono text-xs leading-[1.4] text-fg-subtle">
      <span>EyePause {version} · No telemetry</span>
      <span>Free · No account · Made for macOS</span>
    </footer>
  );
}
