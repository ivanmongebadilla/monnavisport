import { StatButton } from "./StatButton";
import { SCOREKEEPER_ACTIONS } from "@/lib/constants";
import type { GameEventType, Player } from "@/types";

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
        {SCOREKEEPER_ACTIONS.map((action) => (
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
