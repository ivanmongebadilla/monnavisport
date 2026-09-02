export type Sport = "basketball";

export interface League {
  id: string;
  name: string;
  shortName: string;
  sport: Sport;
  description: string;
  colorPrimary: string;
  colorAccent: string;
  order: number;
}

export interface Season {
  id: string;
  leagueId: string;
  label: string;
  year: number;
  isCurrent: boolean;
  startDate: string;
  endDate: string;
}
