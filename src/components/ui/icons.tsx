import type { ReactNode } from "react";

/** 16px stroke icons, square caps to match the site's edges. Always decorative. */
function Icon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      className={className ?? "size-4"}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const ArrowDownIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M8 2.5v10M3.5 8 8 12.5 12.5 8" />
  </Icon>
);

export const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M13.5 8h-10M8 3.5 3.5 8 8 12.5" />
  </Icon>
);

export const CheckIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="m3 8.5 3.25 3.25L13 5" />
  </Icon>
);

export const InfoIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <rect x="1.75" y="1.75" width="12.5" height="12.5" />
    <path d="M8 7v4.5M8 4.5v.5" />
  </Icon>
);

export const AlertIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M8 1.75 14.5 13.5h-13z" />
    <path d="M8 6.5v3M8 11.25v.5" />
  </Icon>
);

export const LinkIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M6.5 9.5 9.5 6.5M7 4.5l1.5-1.5a2.5 2.5 0 0 1 3.5 3.5L10.5 8M9 11.5 7.5 13A2.5 2.5 0 0 1 4 9.5L5.5 8" />
  </Icon>
);

/** Rotating bracket: a square spinner that stops (one turn) under reduced motion. */
export const Spinner = () => (
  <span
    className="inline-block size-3.5 animate-spin border-2 border-current border-r-transparent"
    aria-hidden="true"
  />
);
