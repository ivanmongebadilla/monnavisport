import { cn } from "@/lib/utils/cn";

export function StatBlock({
  label,
  value,
  size = "md",
  className,
}: {
  label: string;
  value: string | number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const valueSize = {
    sm: "text-2xl",
    md: "text-3xl sm:text-4xl",
    lg: "text-5xl sm:text-6xl",
  }[size];

  return (
    <div className={cn("flex flex-col", className)}>
      <span className={cn("font-bold tabular-nums tracking-tight", valueSize)}>{value}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-text-faint">{label}</span>
    </div>
  );
}
