export interface PlayerGameStats {
  gameId: string;
  playerId: string;
  teamId: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fg2m: number;
  fg3m: number;
  ftm: number;
  performanceScore: number;
}

export interface PlayerSeasonAverages {
  playerId: string;
  leagueId: string;
  seasonId: string;
  gamesPlayed: number;
  ppg: number;
  rpg: number;
  apg: number;
  spg: number;
  bpg: number;
  tpg: number;
  totalPoints: number;
  totalRebounds: number;
  totalAssists: number;
  totalSteals: number;
  totalBlocks: number;
  totalTurnovers: number;
}

export interface Standing {
  leagueId: string;
  seasonId: string;
  teamId: string;
  rank: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  pointDiff: number;
  streak: string;
  last5: ("W" | "L")[];
}

export type LeaderCategory = "points" | "rebounds" | "assists" | "steals" | "blocks";

export interface LeaderEntry {
  playerId: string;
  teamId: string;
  value: number;
  gamesPlayed: number;
}

export interface PlayerAward {
  id: string;
  gameId: string;
  playerId: string;
  teamId: string;
  leagueId: string;
  seasonId: string;
  type: "PLAYER_OF_THE_GAME";
  performanceScore: number;
  stats: PlayerGameStats;
  awardedAt: string;
}
