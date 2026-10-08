import type { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertIcon, CheckIcon, InfoIcon } from "./icons";

export type NoticeTone = "info" | "error" | "success";

const tones: Record<NoticeTone, { icon: string; glyph: ReactNode }> = {
  info: { icon: "text-accent-text", glyph: <InfoIcon /> },
  error: { icon: "text-danger", glyph: <AlertIcon /> },
  success: { icon: "text-success", glyph: <CheckIcon /> },
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
    <Alert variant={tone} role={tone === "error" ? "alert" : "status"} className={className}>
      <span className={cn("mt-1 shrink-0", t.icon)}>{t.glyph}</span>
      <div className="min-w-0 text-pretty wrap-anywhere">
        {title ? <AlertTitle>{title}</AlertTitle> : null}
        {children ? <AlertDescription className={title ? "mt-1" : undefined}>{children}</AlertDescription> : null}
      </div>
    </Alert>
  );
}
