export type GameStatus = "scheduled" | "live" | "final";

export interface Game {
  id: string;
  leagueId: string;
  seasonId: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  venue: string;
  status: GameStatus;
  quarter: number;
  gameClock: string;
  homeScore: number;
  awayScore: number;
  round: number;
}
