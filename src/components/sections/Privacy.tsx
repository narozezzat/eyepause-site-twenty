const facts = [
  { stat: "0 bytes", text: <>sent anywhere. EyePause never connects to the internet.</> },
  { stat: "0 accounts", text: <>No sign-up, no subscription, no tracking, no ads. Ever.</> },
  {
    stat: "1 URL",
    text: (
      <>
        for automation:{" "}
        <code className="font-mono text-[0.78125rem] leading-[1.4] text-fg [overflow-wrap:anywhere]">
          eyepause://pause?minutes=30
        </code>
      </>
    ),
  },
];

export function Privacy() {
  return (
    <section
      className="grid scroll-mt-4 grid-cols-1 divide-y divide-border border-b border-border md:grid-cols-3 md:divide-x md:divide-y-0"
      id="privacy"
      aria-labelledby="privacy-h"
    >
      <h2 id="privacy-h" className="sr-only">
        Privacy
      </h2>
      {facts.map((f) => (
        <div key={f.stat} className="py-7 md:px-6 md:pt-9 md:pb-10 md:first-of-type:pl-0">
          <b className="mb-3 block text-privacy font-bold tracking-display wdth-62">{f.stat}</b>
          <p className="m-0 text-body leading-[1.55] text-fg-muted">{f.text}</p>
        </div>
      ))}
    </section>
  );
}
