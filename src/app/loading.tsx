import { Wordmark } from "@/components/brand/Wordmark";

export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status">
      <span className="text-loading font-extrabold tracking-display wdth-125 animate-breathe motion-reduce:animate-none">
        <Wordmark className="font-extrabold wdth-125" />
      </span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
