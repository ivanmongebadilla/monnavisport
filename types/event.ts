export type GameEventType =
  | "TWO_POINT"
  | "THREE_POINT"
  | "FREE_THROW"
  | "REBOUND"
  | "ASSIST"
  | "STEAL"
  | "BLOCK"
  | "TURNOVER"
  | "FOUL";

export interface GameEvent {
  id: string;
  gameId: string;
  playerId: string;
  teamId: string;
  eventType: GameEventType;
  value: number;
  quarter: number;
  gameClock: string;
  timestamp: string;
}
