import type { Game, GameEvent, Standing } from "@/types";
import { calculateBothTeamScores } from "./teamScore";

/**
 * Builds the standings table for a league/season from finished games only.
 * Records, point differentials and streaks are all folded from game
 * results — never edited directly.
 */
export function calculateStandings(
  games: Game[],
  events: GameEvent[],
  leagueId: string,
  seasonId: string,
  teamIds: string[]
): Standing[] {
  const finishedGames = games
    .filter((game) => game.leagueId === leagueId && game.seasonId === seasonId && game.status === "final")
    .sort((a, b) => a.date.localeCompare(b.date));

  const table = new Map<string, Standing>();
  for (const teamId of teamIds) {
    table.set(teamId, {
      leagueId,
      seasonId,
      teamId,
      rank: 0,
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      pointDiff: 0,
      streak: "-",
      last5: [],
    });
  }

  const results = new Map<string, ("W" | "L")[]>();

  for (const game of finishedGames) {
    const { homeScore, awayScore } = calculateBothTeamScores(events, game.id, game.homeTeamId, game.awayTeamId);
    const home = table.get(game.homeTeamId);
    const away = table.get(game.awayTeamId);
    if (!home || !away) continue;

    home.gamesPlayed += 1;
    away.gamesPlayed += 1;
    home.pointsFor += homeScore;
    home.pointsAgainst += awayScore;
    away.pointsFor += awayScore;
    away.pointsAgainst += homeScore;

    const homeWon = homeScore > awayScore;
    if (homeWon) {
      home.wins += 1;
      away.losses += 1;
    } else {
      away.wins += 1;
      home.losses += 1;
    }

    results.set(game.homeTeamId, [...(results.get(game.homeTeamId) ?? []), homeWon ? "W" : "L"]);
    results.set(game.awayTeamId, [...(results.get(game.awayTeamId) ?? []), homeWon ? "L" : "W"]);
  }

  for (const [teamId, standing] of table) {
    standing.pointDiff = standing.pointsFor - standing.pointsAgainst;
    const history = results.get(teamId) ?? [];
    standing.last5 = history.slice(-5);

    let streakCount = 0;
    const streakType = history[history.length - 1];
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i] !== streakType) break;
      streakCount += 1;
    }
    standing.streak = streakType ? `${streakType}${streakCount}` : "-";
  }

  return Array.from(table.values())
    .sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.pointDiff !== a.pointDiff) return b.pointDiff - a.pointDiff;
      return b.pointsFor - a.pointsFor;
    })
    .map((standing, index) => ({ ...standing, rank: index + 1 }));
}
