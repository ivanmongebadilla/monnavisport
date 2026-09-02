import type { Game, GameEvent, PlayerSeasonAverages } from "@/types";
import { calculatePlayerGameStats } from "./playerStats";

/**
 * Folds every finished game a player appeared in into season-average
 * totals. Used on player profile pages instead of any stored average.
 */
export function calculatePlayerSeasonAverages(
  games: Game[],
  events: GameEvent[],
  playerId: string,
  teamId: string,
  leagueId: string,
  seasonId: string
): PlayerSeasonAverages {
  const finishedGames = games.filter(
    (game) =>
      game.leagueId === leagueId &&
      game.seasonId === seasonId &&
      game.status === "final" &&
      (game.homeTeamId === teamId || game.awayTeamId === teamId)
  );

  let totalPoints = 0;
  let totalRebounds = 0;
  let totalAssists = 0;
  let totalSteals = 0;
  let totalBlocks = 0;
  let totalTurnovers = 0;
  let gamesPlayed = 0;

  for (const game of finishedGames) {
    const line = calculatePlayerGameStats(events, game.id, playerId, teamId);
    const played =
      line.points > 0 ||
      line.rebounds > 0 ||
      line.assists > 0 ||
      line.steals > 0 ||
      line.blocks > 0 ||
      line.turnovers > 0 ||
      line.fouls > 0;
    if (!played) continue;

    gamesPlayed += 1;
    totalPoints += line.points;
    totalRebounds += line.rebounds;
    totalAssists += line.assists;
    totalSteals += line.steals;
    totalBlocks += line.blocks;
    totalTurnovers += line.turnovers;
  }

  const divisor = gamesPlayed || 1;

  return {
    playerId,
    leagueId,
    seasonId,
    gamesPlayed,
    ppg: totalPoints / divisor,
    rpg: totalRebounds / divisor,
    apg: totalAssists / divisor,
    spg: totalSteals / divisor,
    bpg: totalBlocks / divisor,
    tpg: totalTurnovers / divisor,
    totalPoints,
    totalRebounds,
    totalAssists,
    totalSteals,
    totalBlocks,
    totalTurnovers,
  };
}
