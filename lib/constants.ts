import type { GameEventType, LeaderCategory, PlayerPosition } from "@/types";

export const POSITION_LABELS: Record<PlayerPosition, string> = {
  PG: "Base",
  SG: "Escolta",
  SF: "Alero",
  PF: "Ala-Pívot",
  C: "Pívot",
};

export const EVENT_TYPE_LABELS: Record<GameEventType, string> = {
  TWO_POINT: "Canasta de 2",
  THREE_POINT: "Triple",
  FREE_THROW: "Tiro libre",
  REBOUND: "Rebote",
  ASSIST: "Asistencia",
  STEAL: "Robo",
  BLOCK: "Bloqueo",
  TURNOVER: "Pérdida",
  FOUL: "Falta",
};

export const EVENT_TYPE_SHORT_LABELS: Record<GameEventType, string> = {
  TWO_POINT: "+2",
  THREE_POINT: "+3",
  FREE_THROW: "+1",
  REBOUND: "REB",
  ASSIST: "AST",
  STEAL: "ROB",
  BLOCK: "BLQ",
  TURNOVER: "PÉR",
  FOUL: "FAL",
};

export const LEADER_CATEGORY_LABELS: Record<LeaderCategory, string> = {
  points: "Puntos",
  rebounds: "Rebotes",
  assists: "Asistencias",
  steals: "Robos",
  blocks: "Bloqueos",
};

export interface ScorekeeperAction {
  type: GameEventType;
  label: string;
  value: number;
  tone: "default" | "score";
}

export const SCOREKEEPER_ACTIONS: ScorekeeperAction[] = [
  { type: "FREE_THROW", label: "+1", value: 1, tone: "score" },
  { type: "TWO_POINT", label: "+2", value: 2, tone: "score" },
  { type: "THREE_POINT", label: "+3", value: 3, tone: "score" },
  { type: "REBOUND", label: "REB", value: 1, tone: "default" },
  { type: "ASSIST", label: "AST", value: 1, tone: "default" },
  { type: "STEAL", label: "ROB", value: 1, tone: "default" },
  { type: "BLOCK", label: "BLQ", value: 1, tone: "default" },
  { type: "FOUL", label: "FALTA", value: 1, tone: "default" },
  { type: "TURNOVER", label: "PÉRDIDA", value: 1, tone: "default" },
];

export const LEADER_CATEGORY_UNIT: Record<LeaderCategory, string> = {
  points: "PTS",
  rebounds: "REB",
  assists: "AST",
  steals: "ROB",
  blocks: "BLQ",
};
