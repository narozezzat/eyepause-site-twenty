import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { AlertIcon, CheckIcon, InfoIcon } from "./icons";

export type NoticeTone = "info" | "error" | "success";

const tones: Record<NoticeTone, { box: string; icon: string; glyph: ReactNode }> = {
  info: { box: "border-accent bg-accent-soft", icon: "text-accent-text", glyph: <InfoIcon /> },
  error: { box: "border-danger bg-danger-soft", icon: "text-danger", glyph: <AlertIcon /> },
  success: { box: "border-success bg-success-soft", icon: "text-success", glyph: <CheckIcon /> },
};

interface NoticeProps {
  tone?: NoticeTone;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Inline message: icon + text on the tone's soft fill. Errors announce assertively, the rest politely. */
export function Notice({ tone = "info", title, children, className }: NoticeProps) {
  const t = tones[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn("flex min-w-0 gap-3 rounded-card border border-l-2 px-4 py-3 text-body-sm text-fg", t.box, className)}
    >
      <span className={cn("mt-1 shrink-0", t.icon)}>{t.glyph}</span>
      <div className="min-w-0 text-pretty wrap-anywhere">
        {title ? <p className="m-0 font-semibold">{title}</p> : null}
        {children ? <div className={cn("text-fg-muted", title ? "mt-1" : null)}>{children}</div> : null}
      </div>
    </div>
  );
}
