import { CardLink } from "@/components/ui/Card";
import { TeamLogo } from "@/components/teams/TeamLogo";
import { GameStatusBadge } from "./GameStatusBadge";
import { cn } from "@/lib/utils/cn";
import type { Game, Team } from "@/types";

function TeamRow({ team, score, showScore, isWinner }: { team: Team; score: number; showScore: boolean; isWinner: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <TeamLogo team={team} size="sm" />
        <span className={cn("truncate text-sm", isWinner ? "font-bold" : "font-medium text-text-muted")}>
          {team.name}
        </span>
      </div>
      {showScore && (
        <span className={cn("tabular-nums text-lg", isWinner ? "font-bold" : "font-semibold text-text-muted")}>
          {score}
        </span>
      )}
    </div>
  );
}

export function GameCard({ game, homeTeam, awayTeam }: { game: Game; homeTeam: Team; awayTeam: Team }) {
  const showScore = game.status !== "scheduled";
  const homeWon = game.status === "final" && game.homeScore > game.awayScore;
  const awayWon = game.status === "final" && game.awayScore > game.homeScore;

  return (
    <CardLink href={`/games/${game.id}`} className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <GameStatusBadge game={game} />
        <span className="truncate text-xs font-medium text-text-faint">{game.venue}</span>
      </div>
      <div className="space-y-2.5">
        <TeamRow team={homeTeam} score={game.homeScore} showScore={showScore} isWinner={homeWon} />
        <TeamRow team={awayTeam} score={game.awayScore} showScore={showScore} isWinner={awayWon} />
      </div>
    </CardLink>
  );
}
