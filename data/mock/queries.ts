import type { LeaderCategory, Player, PlayerSeasonAverages, Standing } from "@/types";
import { calculateLeagueLeaders, calculatePlayerSeasonAverages, calculateStandings } from "@/lib/calculations";
import { GAMES } from "./schedule";
import { GAME_EVENTS } from "./gameEvents";
import { getCurrentSeason } from "./leagues";
import { getTeamsByLeague } from "./teams";

export function getLeagueStandings(leagueId: string): Standing[] {
  const season = getCurrentSeason(leagueId);
  if (!season) return [];
  const teamIds = getTeamsByLeague(leagueId).map((team) => team.id);
  return calculateStandings(GAMES, GAME_EVENTS, leagueId, season.id, teamIds);
}

export function getTeamStanding(leagueId: string, teamId: string): Standing | undefined {
  return getLeagueStandings(leagueId).find((standing) => standing.teamId === teamId);
}

export function getLeagueLeaders(leagueId: string, category: LeaderCategory, limit = 10) {
  const season = getCurrentSeason(leagueId);
  if (!season) return [];
  return calculateLeagueLeaders(GAMES, GAME_EVENTS, leagueId, season.id, category).slice(0, limit);
}

export function getUpcomingGames(leagueId: string, limit = 5) {
  return GAMES.filter((game) => game.leagueId === leagueId && game.status === "scheduled")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function getRecentResults(leagueId: string, limit = 5) {
  return GAMES.filter((game) => game.leagueId === leagueId && game.status === "final")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function getTeamUpcomingGames(teamId: string, limit = 5) {
  return GAMES.filter((game) => (game.homeTeamId === teamId || game.awayTeamId === teamId) && game.status === "scheduled")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function getTeamRecentResults(teamId: string, limit = 5) {
  return GAMES.filter((game) => (game.homeTeamId === teamId || game.awayTeamId === teamId) && game.status === "final")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function getPlayerRecentGames(teamId: string, playerId: string, limit = 5) {
  const games = GAMES.filter(
    (game) => (game.homeTeamId === teamId || game.awayTeamId === teamId) && game.status === "final"
  ).sort((a, b) => b.date.localeCompare(a.date));
  return games.slice(0, limit);
}

export function getPlayerSeasonAverages(player: Player): PlayerSeasonAverages {
  return calculatePlayerSeasonAverages(GAMES, GAME_EVENTS, player.id, player.teamId, player.leagueId, player.seasonId);
}
