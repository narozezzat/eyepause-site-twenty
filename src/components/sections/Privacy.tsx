const facts = [
  { stat: "0 bytes", text: <>sent anywhere. EyePause never connects to the internet.</> },
  { stat: "0 accounts", text: <>No sign-up, no subscription, no tracking, no ads.</> },
  {
    stat: "1 URL",
    text: (
      <>
        for automation:{" "}
        <code className="font-mono text-caption text-fg wrap-anywhere">eyepause://pause?minutes=30</code>
      </>
    ),
  },
];

export function Privacy() {
  return (
    <section
      id="privacy"
      aria-labelledby="privacy-h"
      className="grid scroll-mt-20 gap-8 border-t border-border py-12 md:py-16 lg:grid-cols-12"
    >
      <h2
        id="privacy-h"
        className="m-0 text-section font-extrabold tracking-display text-balance uppercase wdth-75 lg:col-span-4"
      >
        Nothing leaves your Mac.
      </h2>
      <div className="grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-8">
        {facts.map((f) => (
          <div key={f.stat} className="min-w-0 py-6 sm:px-4 sm:first:pl-0 sm:last:pr-0">
            <b className="mb-3 block text-numeral-sm font-bold tracking-display tabular-nums wdth-62">
              {f.stat}
            </b>
            <p className="m-0 text-body-sm text-pretty text-fg-muted">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
