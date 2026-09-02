import type { Team } from "@/types";
import { CLUBS } from "./names";
import { LEAGUES, getCurrentSeason } from "./leagues";

/**
 * Each club fields one roster per league, mirroring how real municipal
 * clubs enter a Novatos, Segunda Fuerza and Primera Fuerza team.
 */
export const TEAMS: Team[] = LEAGUES.flatMap((league) => {
  const season = getCurrentSeason(league.id)!;
  return CLUBS.map((club) => ({
    id: `${league.id}-${club.slug}`,
    leagueId: league.id,
    seasonId: season.id,
    clubSlug: club.slug,
    name: club.name,
    shortName: club.name,
    initials: club.initials,
    city: club.city,
    colorPrimary: club.colorPrimary,
    colorSecondary: club.colorSecondary,
    founded: club.founded,
  }));
});

export function getTeamById(teamId: string): Team | undefined {
  return TEAMS.find((team) => team.id === teamId);
}

export function getTeamsByLeague(leagueId: string): Team[] {
  return TEAMS.filter((team) => team.leagueId === leagueId);
}
