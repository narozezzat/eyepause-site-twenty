import { Wordmark } from "@/components/brand/Wordmark";

export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status">
      <span className="animate-breathe text-section motion-reduce:animate-none">
        <Wordmark className="font-extrabold wdth-125" />
      </span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
