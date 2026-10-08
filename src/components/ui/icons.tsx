import { ArrowDown, ArrowLeft, Check, Info, Link, TriangleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 16px lucide icons, square caps to match the site's edges. Always decorative.
 * stroke-[2.25] on lucide's 24-unit grid draws the site's 1.5 stroke on a 16-unit grid.
 */
function icon(Glyph: LucideIcon) {
  return function Icon({ className }: { className?: string }) {
    return (
      <Glyph
        className={cn("stroke-[2.25] [stroke-linecap:square] [stroke-linejoin:miter]", className ?? "size-4")}
        aria-hidden="true"
        focusable="false"
      />
    );
  };
}

export const ArrowDownIcon = icon(ArrowDown);
export const ArrowLeftIcon = icon(ArrowLeft);
export const CheckIcon = icon(Check);
export const InfoIcon = icon(Info);
export const AlertIcon = icon(TriangleAlert);
export const LinkIcon = icon(Link);

/** Rotating bracket: a square spinner that stops (one turn) under reduced motion. */
export const Spinner = () => (
  <span
    className="inline-block size-3.5 animate-spin border-2 border-current border-r-transparent"
    aria-hidden="true"
  />
);
