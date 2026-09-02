import { cn } from "@/lib/utils/cn";

type BadgeTone = "neutral" | "live" | "success" | "danger";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-surface-muted text-text-muted border-border-subtle",
  live: "bg-red-50 text-red-600 border-red-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  danger: "bg-red-50 text-red-700 border-red-200",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
