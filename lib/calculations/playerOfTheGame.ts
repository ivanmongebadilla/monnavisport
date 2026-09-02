import type { GameEvent, PlayerGameStats } from "@/types";
import { calculateAllPlayerGameStats } from "./playerStats";

type StatLine = Pick<
  PlayerGameStats,
  "points" | "rebounds" | "assists" | "steals" | "blocks" | "turnovers"
>;

/**
 * Performance Score = PTS + REB + AST + STL + BLK - TOV
 */
export function calculatePerformanceScore(stats: StatLine): number {
  return stats.points + stats.rebounds + stats.assists + stats.steals + stats.blocks - stats.turnovers;
}

export function calculatePlayerOfTheGame(events: GameEvent[], gameId: string): PlayerGameStats | null {
  const boxScores = calculateAllPlayerGameStats(events, gameId);
  if (boxScores.length === 0) return null;

  return boxScores.reduce((best, current) => (current.performanceScore > best.performanceScore ? current : best));
}
