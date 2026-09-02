import Link from "next/link";
import { formatGameClock, formatQuarterLabel } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Game, Team } from "@/types";

/**
 * Always-visible strip: score, clock and undo. This is the one thing a
 * scorekeeper needs glanceable at all times during a live game, so it stays
 * pinned to the top of the viewport while the roster/actions/events below
 * scroll freely underneath it.
 */
export function ScorekeeperStickyBar({
  game,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  quarter,
  clockSeconds,
  running,
  onUndo,
  canUndo,
}: {
  game: Game;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  quarter: number;
  clockSeconds: number;
  running: boolean;
  onUndo: () => void;
  canUndo: boolean;
}) {
  return (
    <div
      className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur pt-[env(safe-area-inset-top)]"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2 sm:px-6">
        <Link
          href={`/games/${game.id}`}
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-white/50 hover:text-white"
          aria-label="Volver al partido"
        >
          <span aria-hidden>←</span>
          <span className="hidden sm:inline">Volver</span>
        </Link>
        <span className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-widest text-white/30 sm:block">
          Modo anotador
        </span>
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Deshacer
        </button>
      </div>

      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 pb-2.5 sm:px-6 sm:pb-3">
        <TeamScore team={awayTeam} score={awayScore} align="left" />

        <div className="flex shrink-0 flex-col items-center gap-0.5 px-1">
          <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-widest text-white/40 sm:text-[10px]">
            {formatQuarterLabel(quarter)}
          </span>
          <span className="font-mono text-2xl font-bold tabular-nums text-white sm:text-3xl">
            {formatGameClock(Math.floor(clockSeconds / 60), clockSeconds % 60)}
          </span>
          {running && (
            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              En marcha
            </span>
          )}
        </div>

        <TeamScore team={homeTeam} score={homeScore} align="right" />
      </div>
    </div>
  );
}

function TeamScore({ team, score, align }: { team: Team; score: number; align: "left" | "right" }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2",
        align === "right" ? "flex-row-reverse text-right" : "text-left"
      )}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: team.colorPrimary }}
        aria-hidden
      />
      <span className="truncate text-[11px] font-bold uppercase tracking-wide text-white/60 sm:text-sm">
        {team.shortName}
      </span>
      <span className="shrink-0 text-3xl font-black tabular-nums text-white sm:text-5xl">{score}</span>
    </div>
  );
}
