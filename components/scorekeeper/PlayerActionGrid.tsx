import { StatButton } from "./StatButton";
import type { GameEventType, Player } from "@/types";

const ACTIONS: { type: GameEventType; label: string; value: number; tone: "default" | "score" }[] = [
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

export function PlayerActionGrid({
  player,
  onAction,
}: {
  player: Player | null;
  onAction: (eventType: GameEventType, value: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Acciones del jugador</p>
        {player ? (
          <p className="text-sm font-bold text-white">
            #{player.jerseyNumber} {player.fullName}
          </p>
        ) : (
          <p className="text-sm font-medium text-white/40">Selecciona un jugador</p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {ACTIONS.map((action) => (
          <StatButton
            key={action.type}
            label={action.label}
            onClick={() => player && onAction(action.type, action.value)}
            disabled={!player}
            tone={action.tone}
          />
        ))}
      </div>
    </div>
  );
}
