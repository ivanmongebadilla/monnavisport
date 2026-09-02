import { EVENT_TYPE_LABELS } from "@/lib/constants";
import type { GameEvent, Player, Team } from "@/types";

export function GameEventList({
  events,
  playersById,
  teamsById,
  onRemove,
}: {
  events: GameEvent[];
  playersById: Map<string, Player>;
  teamsById: Map<string, Team>;
  onRemove: (eventId: string) => void;
}) {
  const reversed = [...events].reverse();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Eventos recientes</p>
      {reversed.length === 0 ? (
        <p className="py-6 text-center text-sm text-white/40">Aún no hay eventos registrados.</p>
      ) : (
        <ul className="max-h-[420px] space-y-1.5 overflow-y-auto pr-1">
          {reversed.map((event) => {
            const player = playersById.get(event.playerId);
            const team = teamsById.get(event.teamId);
            if (!player || !team) return null;
            return (
              <li
                key={event.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2 text-sm"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="shrink-0 font-mono text-xs tabular-nums text-white/40">{event.gameClock}</span>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: team.colorPrimary }} />
                  <span className="truncate font-semibold text-white">
                    #{player.jerseyNumber} {player.lastName}
                  </span>
                  <span className="shrink-0 text-white/50">{EVENT_TYPE_LABELS[event.eventType]}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(event.id)}
                  className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-white/40 transition-colors hover:bg-red-500/20 hover:text-red-300"
                  aria-label="Eliminar evento"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
