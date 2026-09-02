import type { PlayerAward } from "@/types";
import { calculatePlayerOfTheGame } from "@/lib/calculations/playerOfTheGame";
import { GAMES } from "./schedule";
import { GAME_EVENTS } from "./gameEvents";

export const PLAYER_AWARDS: PlayerAward[] = GAMES.filter((game) => game.status === "final").flatMap((game) => {
  const winner = calculatePlayerOfTheGame(GAME_EVENTS, game.id);
  if (!winner) return [];

  const award: PlayerAward = {
    id: `${game.id}-potg`,
    gameId: game.id,
    playerId: winner.playerId,
    teamId: winner.teamId,
    leagueId: game.leagueId,
    seasonId: game.seasonId,
    type: "PLAYER_OF_THE_GAME",
    performanceScore: winner.performanceScore,
    stats: winner,
    awardedAt: game.date,
  };
  return [award];
});

export function getPlayerAwardByGame(gameId: string): PlayerAward | undefined {
  return PLAYER_AWARDS.find((award) => award.gameId === gameId);
}

export function getAwardsByPlayer(playerId: string): PlayerAward[] {
  return PLAYER_AWARDS.filter((award) => award.playerId === playerId).sort((a, b) =>
    b.awardedAt.localeCompare(a.awardedAt)
  );
}
