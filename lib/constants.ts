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

export const LEADER_CATEGORY_UNIT: Record<LeaderCategory, string> = {
  points: "PTS",
  rebounds: "REB",
  assists: "AST",
  steals: "ROB",
  blocks: "BLQ",
};
