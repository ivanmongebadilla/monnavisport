import type { League, Season } from "@/types";

export const LEAGUES: League[] = [
  {
    id: "novatos",
    name: "Novatos",
    shortName: "Novatos",
    sport: "basketball",
    description: "La puerta de entrada al básquetbol competitivo. Jugadores en desarrollo, ritmo formativo.",
    colorPrimary: "#16a34a",
    colorAccent: "#bbf7d0",
    order: 1,
  },
  {
    id: "segunda-fuerza",
    name: "Segunda Fuerza",
    shortName: "Segunda Fuerza",
    sport: "basketball",
    description: "El siguiente escalón. Equipos más sólidos, mayor intensidad de juego.",
    colorPrimary: "#2563eb",
    colorAccent: "#bfdbfe",
    order: 2,
  },
  {
    id: "primera-fuerza",
    name: "Primera Fuerza",
    shortName: "Primera Fuerza",
    sport: "basketball",
    description: "La máxima categoría de la liga municipal. El mejor nivel competitivo de Caborca.",
    colorPrimary: "#dc2626",
    colorAccent: "#fecaca",
    order: 3,
  },
];

export const CURRENT_SEASON_LABEL = "Temporada 2026";

export const SEASONS: Season[] = LEAGUES.map((league) => ({
  id: `${league.id}-2026`,
  leagueId: league.id,
  label: CURRENT_SEASON_LABEL,
  year: 2026,
  isCurrent: true,
  startDate: "2026-01-10",
  endDate: "2026-05-30",
}));

export function getLeagueById(leagueId: string): League | undefined {
  return LEAGUES.find((league) => league.id === leagueId);
}

export function getCurrentSeason(leagueId: string): Season | undefined {
  return SEASONS.find((season) => season.leagueId === leagueId && season.isCurrent);
}
