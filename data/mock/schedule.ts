import type { Game, GameStatus } from "@/types";
import { LEAGUES, getCurrentSeason } from "./leagues";
import { getTeamsByLeague } from "./teams";
import { VENUES } from "./names";
import { createSeededRandom, hashStringToSeed, shuffle } from "@/lib/utils/random";

const ROUND_SPACING_DAYS = 4;
const SCHEDULE_START = "2026-07-27T18:00:00.000Z";
const TODAY = "2026-09-01T00:00:00.000Z";

/**
 * Circle-method round robin: for n teams (n even) produces n-1 rounds where
 * every team plays exactly once per round. Running it twice (second leg
 * swaps home/away) gives a home-and-away regular season.
 */
function buildRoundRobinPairs(teamIds: string[]): [string, string][][] {
  const n = teamIds.length;
  const rotating = teamIds.slice(1);
  const fixed = teamIds[0];
  const rounds: [string, string][][] = [];

  for (let round = 0; round < n - 1; round++) {
    const pairs: [string, string][] = [];
    const roundTeams = [fixed, ...rotating];
    for (let i = 0; i < n / 2; i++) {
      const home = roundTeams[i];
      const away = roundTeams[n - 1 - i];
      pairs.push(round % 2 === 0 ? [home, away] : [away, home]);
    }
    rounds.push(pairs);
    rotating.unshift(rotating.pop()!);
  }

  return rounds;
}

function buildLeagueSchedule(leagueId: string): Game[] {
  const season = getCurrentSeason(leagueId)!;
  const orderedTeamIds = getTeamsByLeague(leagueId).map((team) => team.id);
  // Shuffle per league (seeded) so the three leagues don't all produce the
  // exact same club-vs-club pairings on the same rounds.
  const rng = createSeededRandom(hashStringToSeed(`schedule-${leagueId}`));
  const teamIds = shuffle(rng, orderedTeamIds);
  const firstLeg = buildRoundRobinPairs(teamIds);
  const secondLeg = firstLeg.map((pairs) => pairs.map(([home, away]): [string, string] => [away, home]));
  const rounds = [...firstLeg, ...secondLeg];

  const games: Game[] = [];
  const startMs = new Date(SCHEDULE_START).getTime();
  const todayMs = new Date(TODAY).getTime();

  rounds.forEach((pairs, roundIndex) => {
    const roundDate = new Date(startMs + roundIndex * ROUND_SPACING_DAYS * 24 * 60 * 60 * 1000);
    pairs.forEach(([homeTeamId, awayTeamId], gameIndex) => {
      const status: GameStatus = roundDate.getTime() <= todayMs ? "final" : "scheduled";
      games.push({
        id: `${leagueId}-r${roundIndex + 1}g${gameIndex + 1}`,
        leagueId,
        seasonId: season.id,
        homeTeamId,
        awayTeamId,
        date: roundDate.toISOString(),
        venue: VENUES[(roundIndex + gameIndex) % VENUES.length],
        status,
        quarter: status === "final" ? 4 : 1,
        gameClock: status === "final" ? "00:00" : "10:00",
        homeScore: 0,
        awayScore: 0,
        round: roundIndex + 1,
      });
    });
  });

  return games;
}

export const GAMES: Game[] = LEAGUES.flatMap((league) => buildLeagueSchedule(league.id));

export function getGameById(gameId: string): Game | undefined {
  return GAMES.find((game) => game.id === gameId);
}

export function getGamesByLeague(leagueId: string): Game[] {
  return GAMES.filter((game) => game.leagueId === leagueId);
}

export function getGamesByTeam(teamId: string): Game[] {
  return GAMES.filter((game) => game.homeTeamId === teamId || game.awayTeamId === teamId);
}
