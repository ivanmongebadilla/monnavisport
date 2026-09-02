import type { GameEvent } from "@/types";

/**
 * Sums a team's points for a game directly from scoring GameEvents. The
 * scoreboard is a projection of the event log, never an independently
 * mutated number.
 */
export function calculateTeamScore(events: GameEvent[], gameId: string, teamId: string): number {
  return events
    .filter((event) => event.gameId === gameId && event.teamId === teamId)
    .reduce((total, event) => {
      if (event.eventType === "TWO_POINT" || event.eventType === "THREE_POINT" || event.eventType === "FREE_THROW") {
        return total + event.value;
      }
      return total;
    }, 0);
}

export function calculateBothTeamScores(
  events: GameEvent[],
  gameId: string,
  homeTeamId: string,
  awayTeamId: string
): { homeScore: number; awayScore: number } {
  return {
    homeScore: calculateTeamScore(events, gameId, homeTeamId),
    awayScore: calculateTeamScore(events, gameId, awayTeamId),
  };
}

export function calculateQuarterScores(
  events: GameEvent[],
  gameId: string,
  teamId: string,
  quarters: number
): number[] {
  const scores = Array.from({ length: quarters }, () => 0);
  for (const event of events) {
    if (event.gameId !== gameId || event.teamId !== teamId) continue;
    if (event.eventType !== "TWO_POINT" && event.eventType !== "THREE_POINT" && event.eventType !== "FREE_THROW") {
      continue;
    }
    const index = event.quarter - 1;
    if (index >= 0 && index < scores.length) scores[index] += event.value;
  }
  return scores;
}
