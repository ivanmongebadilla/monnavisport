import { TeamLogo } from "@/components/teams/TeamLogo";
import { formatQuarterLabel } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Game, Team } from "@/types";

export function GameScore({ game, homeTeam, awayTeam }: { game: Game; homeTeam: Team; awayTeam: Team }) {
  const isFinal = game.status === "final";
  const homeWon = isFinal && game.homeScore > game.awayScore;
  const awayWon = isFinal && game.awayScore > game.homeScore;

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-6 sm:p-10">
      <div className="mb-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-text-faint">
          {isFinal ? "Resultado final" : game.status === "live" ? formatQuarterLabel(game.quarter) : "Próximo partido"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 sm:gap-8">
        <div className="flex flex-1 flex-col items-center gap-3 text-center">
          <TeamLogo team={awayTeam} size="xl" />
          <span className={cn("text-sm sm:text-base font-bold", awayWon ? "text-foreground" : "text-text-muted")}>
            {awayTeam.name}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-6">
          <span className={cn("tabular-nums text-5xl font-black sm:text-7xl", awayWon ? "text-foreground" : "text-text-faint")}>
            {game.awayScore}
          </span>
          <span className="text-2xl font-light text-text-faint sm:text-3xl">–</span>
          <span className={cn("tabular-nums text-5xl font-black sm:text-7xl", homeWon ? "text-foreground" : "text-text-faint")}>
            {game.homeScore}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3 text-center">
          <TeamLogo team={homeTeam} size="xl" />
          <span className={cn("text-sm sm:text-base font-bold", homeWon ? "text-foreground" : "text-text-muted")}>
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
