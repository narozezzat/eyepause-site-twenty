/** Installation instructions use the numbered ledger treatment from Twenty Feet. */
export function InstallSteps({ steps }: { steps: string[] }) {
  if (steps.length === 0) return null;
  return (
    <ol aria-label="Install steps">
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  );
}
