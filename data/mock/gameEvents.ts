import { calculateBothTeamScores } from "@/lib/calculations/teamScore";
import { GAMES } from "./schedule";
import { getPlayersByTeam } from "./players";
import { simulateGame } from "./simulate";

/**
 * The full chronological GameEvent log for every finished game in the
 * league. Everything statistical in the app (scores, standings, leaders,
 * Player of the Game, player profiles) is derived from this array.
 */
export const GAME_EVENTS = GAMES.filter((game) => game.status === "final").flatMap((game) => {
  const homeRoster = getPlayersByTeam(game.homeTeamId);
  const awayRoster = getPlayersByTeam(game.awayTeamId);
  return simulateGame(game, homeRoster, awayRoster);
});

// Cache each finished game's final score on the Game record itself, the way
// a `games` table would store a denormalized score column. The scores are
// still computed once, here, straight from the event log.
for (const game of GAMES) {
  if (game.status !== "final") continue;
  const { homeScore, awayScore } = calculateBothTeamScores(GAME_EVENTS, game.id, game.homeTeamId, game.awayTeamId);
  game.homeScore = homeScore;
  game.awayScore = awayScore;
}
