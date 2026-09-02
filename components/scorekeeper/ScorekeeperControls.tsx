import { cn } from "@/lib/utils/cn";

export function ScorekeeperControls({
  quarter,
  onSetQuarter,
}: {
  quarter: number;
  onSetQuarter: (quarter: number) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">Cuarto</p>
      <div className="flex items-center gap-1.5 rounded-lg bg-white/5 p-1.5">
        {[1, 2, 3, 4].map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onSetQuarter(q)}
            className={cn(
              "flex-1 rounded-md py-2.5 text-sm font-bold transition-colors",
              quarter === q ? "bg-white text-black" : "text-white/60 hover:bg-white/10"
            )}
          >
            C{q}
          </button>
        ))}
      </div>
    </div>
  );
}
