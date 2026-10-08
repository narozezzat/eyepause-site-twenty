import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Shared button look; call it on `next/link` where `Button` cannot render. */
const buttonVariants = cva(
  "relative inline-flex min-w-11 shrink-0 items-center justify-center gap-2 rounded-control font-sans font-semibold whitespace-nowrap no-underline select-none transition-[background-color,color,box-shadow,transform] duration-150 ease-out active:translate-y-px aria-busy:cursor-progress disabled:pointer-events-none disabled:bg-transparent disabled:text-fg-subtle disabled:inset-ring disabled:inset-ring-border aria-disabled:pointer-events-none aria-disabled:bg-transparent aria-disabled:text-fg-subtle aria-disabled:inset-ring aria-disabled:inset-ring-border",
  {
    variants: {
      variant: {
        primary: "cursor-pointer bg-accent text-accent-fg hover:bg-fg hover:text-bg",
        secondary:
          "cursor-pointer bg-transparent text-fg inset-ring inset-ring-border-strong hover:bg-surface-2 hover:inset-ring-fg",
        ghost: "cursor-pointer bg-transparent text-fg-muted hover:bg-surface-2 hover:text-fg",
      },
      size: {
        md: "h-11 px-4 text-body-sm",
        lg: "h-12 px-6 text-base",
      },
      /** Full width below `sm`, for the primary action on phones. */
      block: { true: "w-full sm:w-auto" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariantProps = Omit<VariantProps<typeof buttonVariants>, "block"> & { block?: boolean };

interface CommonProps extends ButtonVariantProps {
  /** Trailing icon, decorative. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type AsAnchor = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };
type AsButton = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export type ButtonProps = AsAnchor | AsButton;

/** Shared primitive: `primary | secondary | ghost`, `md` (44px) or `lg` (48px). Renders `<a>` when given `href`. */
function Button(props: ButtonProps) {
  const { variant, size, block, icon, className, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size, block }), className);
  const content = (
    <>
      {children}
      {icon ? (
        <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a data-slot="button" className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button data-slot="button" type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}

export { Button, buttonVariants };
