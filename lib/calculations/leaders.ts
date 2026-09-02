import type { Game, GameEvent, LeaderCategory, LeaderEntry } from "@/types";
import { calculateAllPlayerGameStats } from "./playerStats";

const CATEGORY_STAT_KEY: Record<LeaderCategory, "points" | "rebounds" | "assists" | "steals" | "blocks"> = {
  points: "points",
  rebounds: "rebounds",
  assists: "assists",
  steals: "steals",
  blocks: "blocks",
};

/**
 * Aggregates per-game box scores across every finished game in a
 * league/season to rank players by season-average for a given category.
 */
export function calculateLeagueLeaders(
  games: Game[],
  events: GameEvent[],
  leagueId: string,
  seasonId: string,
  category: LeaderCategory,
  minGames = 1
): LeaderEntry[] {
  const finishedGameIds = new Set(
    games
      .filter((game) => game.leagueId === leagueId && game.seasonId === seasonId && game.status === "final")
      .map((game) => game.id)
  );

  const totals = new Map<string, { teamId: string; sum: number; games: number }>();
  const statKey = CATEGORY_STAT_KEY[category];

  for (const gameId of finishedGameIds) {
    const boxScores = calculateAllPlayerGameStats(events, gameId);
    for (const line of boxScores) {
      const entry = totals.get(line.playerId) ?? { teamId: line.teamId, sum: 0, games: 0 };
      entry.sum += line[statKey];
      entry.games += 1;
      totals.set(line.playerId, entry);
    }
  }

  return Array.from(totals.entries())
    .filter(([, entry]) => entry.games >= minGames)
    .map(([playerId, entry]) => ({
      playerId,
      teamId: entry.teamId,
      value: entry.sum / entry.games,
      gamesPlayed: entry.games,
    }))
    .sort((a, b) => b.value - a.value);
}
