import { cn } from "@/lib/utils/cn";

export function StatButton({
  label,
  sublabel,
  onClick,
  disabled,
  tone = "default",
}: {
  label: string;
  sublabel?: string;
  onClick: () => void;
  disabled?: boolean;
  tone?: "default" | "score";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-20 flex-col items-center justify-center gap-0.5 rounded-xl border text-lg font-bold transition-colors active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-24",
        tone === "score"
          ? "border-white/10 bg-white text-black hover:bg-white/90"
          : "border-white/10 bg-white/10 text-white hover:bg-white/20"
      )}
    >
      <span>{label}</span>
      {sublabel && <span className="text-[10px] font-semibold uppercase tracking-wide opacity-60">{sublabel}</span>}
    </button>
  );
}
