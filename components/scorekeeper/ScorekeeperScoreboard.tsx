import { formatGameClock, formatQuarterLabel } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Team } from "@/types";

export function ScorekeeperScoreboard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  quarter,
  clockSeconds,
  running,
  onToggleClock,
  onAdjustClock,
  onSetQuarter,
  onUndo,
  canUndo,
}: {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  quarter: number;
  clockSeconds: number;
  running: boolean;
  onToggleClock: () => void;
  onAdjustClock: (delta: number) => void;
  onSetQuarter: (quarter: number) => void;
  onUndo: () => void;
  canUndo: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <TeamScore team={awayTeam} score={awayScore} align="left" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
            {formatQuarterLabel(quarter)}
          </span>
          <span className="font-mono text-3xl font-bold tabular-nums text-white sm:text-4xl">
            {formatGameClock(Math.floor(clockSeconds / 60), clockSeconds % 60)}
          </span>
        </div>
        <TeamScore team={homeTeam} score={homeScore} align="right" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          type="button"
          onClick={onToggleClock}
          className={cn(
            "rounded-lg px-3 py-2.5 text-sm font-bold transition-colors",
            running ? "bg-red-500/20 text-red-300 hover:bg-red-500/30" : "bg-white text-black hover:bg-white/90"
          )}
        >
          {running ? "Pausar" : "Iniciar"}
        </button>
        <div className="flex items-center justify-center gap-1.5 rounded-lg bg-white/5 px-2 py-1.5">
          <button
            type="button"
            onClick={() => onAdjustClock(-10)}
            className="flex-1 rounded-md py-1.5 text-xs font-bold text-white/70 hover:bg-white/10"
          >
            −10s
          </button>
          <button
            type="button"
            onClick={() => onAdjustClock(10)}
            className="flex-1 rounded-md py-1.5 text-xs font-bold text-white/70 hover:bg-white/10"
          >
            +10s
          </button>
        </div>
        <QuarterPicker quarter={quarter} onSetQuarter={onSetQuarter} />
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="rounded-lg bg-white/10 px-3 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Deshacer
        </button>
      </div>
    </div>
  );
}

function TeamScore({ team, score, align }: { team: Team; score: number; align: "left" | "right" }) {
  return (
    <div className={cn("flex flex-1 flex-col gap-1", align === "right" ? "items-end text-right" : "items-start text-left")}>
      <span className="truncate text-xs font-bold uppercase tracking-wide text-white/60 sm:text-sm">{team.name}</span>
      <span className="text-4xl font-black tabular-nums text-white sm:text-6xl">{score}</span>
    </div>
  );
}

function QuarterPicker({ quarter, onSetQuarter }: { quarter: number; onSetQuarter: (quarter: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-1 rounded-lg bg-white/5 px-1.5 py-1.5">
      {[1, 2, 3, 4].map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onSetQuarter(q)}
          className={cn(
            "h-full flex-1 rounded-md py-1 text-xs font-bold transition-colors",
            quarter === q ? "bg-white text-black" : "text-white/60 hover:bg-white/10"
          )}
        >
          C{q}
        </button>
      ))}
    </div>
  );
}
