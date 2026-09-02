import { TeamLogo } from "@/components/teams/TeamLogo";
import { formatQuarterLabel } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Game, Team } from "@/types";

export function GameScore({ game, homeTeam, awayTeam }: { game: Game; homeTeam: Team; awayTeam: Team }) {
  const isFinal = game.status === "final";
  const homeWon = isFinal && game.homeScore > game.awayScore;
  const awayWon = isFinal && game.awayScore > game.homeScore;

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-4 sm:p-10">
      <div className="mb-4 text-center sm:mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-text-faint">
          {isFinal ? "Resultado final" : game.status === "live" ? formatQuarterLabel(game.quarter) : "Próximo partido"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-1 sm:gap-8">
        <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center sm:gap-3">
          <TeamLogo team={awayTeam} size="lg" className="sm:hidden" />
          <TeamLogo team={awayTeam} size="xl" className="hidden sm:flex" />
          <span
            className={cn(
              "w-full truncate px-1 text-xs font-bold sm:text-base",
              awayWon ? "text-foreground" : "text-text-muted"
            )}
          >
            {awayTeam.name}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-6">
          <span className={cn("tabular-nums text-3xl font-black sm:text-7xl", awayWon ? "text-foreground" : "text-text-faint")}>
            {game.awayScore}
          </span>
          <span className="text-lg font-light text-text-faint sm:text-3xl">–</span>
          <span className={cn("tabular-nums text-3xl font-black sm:text-7xl", homeWon ? "text-foreground" : "text-text-faint")}>
            {game.homeScore}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center sm:gap-3">
          <TeamLogo team={homeTeam} size="lg" className="sm:hidden" />
          <TeamLogo team={homeTeam} size="xl" className="hidden sm:flex" />
          <span
            className={cn(
              "w-full truncate px-1 text-xs font-bold sm:text-base",
              homeWon ? "text-foreground" : "text-text-muted"
            )}
          >
            {homeTeam.name}
          </span>
        </div>
      </div>
      {game.status === "live" && (
        <p className="mt-6 text-center text-sm font-semibold tabular-nums text-text-muted">{game.gameClock}</p>
      )}
    </div>
  );
}
