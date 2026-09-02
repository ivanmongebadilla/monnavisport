import type { GameEvent, PlayerGameStats } from "@/types";
import { calculatePerformanceScore } from "./playerOfTheGame";

const EMPTY_STATS: Omit<PlayerGameStats, "gameId" | "playerId" | "teamId" | "performanceScore"> = {
  points: 0,
  rebounds: 0,
  assists: 0,
  steals: 0,
  blocks: 0,
  turnovers: 0,
  fouls: 0,
  fg2m: 0,
  fg3m: 0,
  ftm: 0,
};

/**
 * Derives one player's box score for a single game from the chronological
 * GameEvent log. This is the single source of truth for "what a player did"
 * — nothing about a player's stats is ever hand-set.
 */
export function calculatePlayerGameStats(
  events: GameEvent[],
  gameId: string,
  playerId: string,
  teamId: string
): PlayerGameStats {
  const stats = { ...EMPTY_STATS };

  for (const event of events) {
    if (event.gameId !== gameId || event.playerId !== playerId) continue;

    switch (event.eventType) {
      case "TWO_POINT":
        stats.points += event.value;
        stats.fg2m += 1;
        break;
      case "THREE_POINT":
        stats.points += event.value;
        stats.fg3m += 1;
        break;
      case "FREE_THROW":
        stats.points += event.value;
        stats.ftm += 1;
        break;
      case "REBOUND":
        stats.rebounds += 1;
        break;
      case "ASSIST":
        stats.assists += 1;
        break;
      case "STEAL":
        stats.steals += 1;
        break;
      case "BLOCK":
        stats.blocks += 1;
        break;
      case "TURNOVER":
        stats.turnovers += 1;
        break;
      case "FOUL":
        stats.fouls += 1;
        break;
    }
  }

  return {
    gameId,
    playerId,
    teamId,
    ...stats,
    performanceScore: calculatePerformanceScore(stats),
  };
}

/**
 * Derives box scores for every player who recorded at least one event in a
 * given game.
 */
export function calculateAllPlayerGameStats(events: GameEvent[], gameId: string): PlayerGameStats[] {
  const gameEvents = events.filter((event) => event.gameId === gameId);
  const playerTeamMap = new Map<string, string>();

  for (const event of gameEvents) {
    if (!playerTeamMap.has(event.playerId)) {
      playerTeamMap.set(event.playerId, event.teamId);
    }
  }

  return Array.from(playerTeamMap.entries()).map(([playerId, teamId]) =>
    calculatePlayerGameStats(gameEvents, gameId, playerId, teamId)
  );
}
