export type PlayerPosition = "PG" | "SG" | "SF" | "PF" | "C";

export interface Player {
  id: string;
  teamId: string;
  leagueId: string;
  seasonId: string;
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  jerseyNumber: number;
  position: PlayerPosition;
  heightCm: number;
  birthYear: number;
  hometown: string;
  initials: string;
}
