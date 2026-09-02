import { cn } from "@/lib/utils/cn";

export function ScorekeeperControls({
  quarter,
  running,
  onToggleClock,
  onAdjustClock,
  onSetQuarter,
}: {
  quarter: number;
  running: boolean;
  onToggleClock: () => void;
  onAdjustClock: (delta: number) => void;
  onSetQuarter: (quarter: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      <button
        type="button"
        onClick={onToggleClock}
        className={cn(
          "rounded-lg px-3 py-3 text-sm font-bold transition-colors sm:py-2.5",
          running ? "bg-red-500/20 text-red-300 hover:bg-red-500/30" : "bg-white text-black hover:bg-white/90"
        )}
      >
        {running ? "Pausar" : "Iniciar"}
      </button>
      <div className="flex items-center justify-center gap-1.5 rounded-lg bg-white/5 px-2 py-1.5">
        <button
          type="button"
          onClick={() => onAdjustClock(-10)}
          className="flex-1 rounded-md py-2 text-xs font-bold text-white/70 hover:bg-white/10 sm:py-1.5"
        >
          −10s
        </button>
        <button
          type="button"
          onClick={() => onAdjustClock(10)}
          className="flex-1 rounded-md py-2 text-xs font-bold text-white/70 hover:bg-white/10 sm:py-1.5"
        >
          +10s
        </button>
      </div>
      <QuarterPicker quarter={quarter} onSetQuarter={onSetQuarter} />
    </div>
  );
}

function QuarterPicker({ quarter, onSetQuarter }: { quarter: number; onSetQuarter: (quarter: number) => void }) {
  return (
    <div className="col-span-2 flex items-center justify-center gap-1 rounded-lg bg-white/5 px-1.5 py-1.5 sm:col-span-2">
      {[1, 2, 3, 4].map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onSetQuarter(q)}
          className={cn(
            "h-full flex-1 rounded-md py-2.5 text-xs font-bold transition-colors sm:py-1.5",
            quarter === q ? "bg-white text-black" : "text-white/60 hover:bg-white/10"
          )}
        >
          C{q}
        </button>
      ))}
    </div>
  );
}
