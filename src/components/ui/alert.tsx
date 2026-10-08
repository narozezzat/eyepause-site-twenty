import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva("flex min-w-0 gap-3 rounded-card border border-l-2 px-4 py-3 text-body-sm text-fg", {
  variants: {
    variant: {
      info: "border-accent bg-accent-soft",
      error: "border-danger bg-danger-soft",
      success: "border-success bg-success-soft",
    },
  },
  defaultVariants: { variant: "info" },
});

function Alert({ className, variant, ...props }: ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="alert-title" className={cn("m-0 font-semibold", className)} {...props} />;
}

function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("text-fg-muted", className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
