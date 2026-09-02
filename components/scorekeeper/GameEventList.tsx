import { EVENT_TYPE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import type { GameEvent, Player, Team } from "@/types";

export function GameEventList({
  events,
  playersById,
  teamsById,
  onEdit,
}: {
  events: GameEvent[];
  playersById: Map<string, Player>;
  teamsById: Map<string, Team>;
  onEdit: (eventId: string) => void;
}) {
  const reversed = [...events].reverse();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Eventos recientes</p>
        {reversed.length > 0 && <p className="text-xs text-white/30">Toca una jugada para corregirla</p>}
      </div>
      {reversed.length === 0 ? (
        <p className="py-6 text-center text-sm text-white/40">Aún no hay eventos registrados.</p>
      ) : (
        <ul className="space-y-1.5 lg:max-h-[420px] lg:overflow-y-auto lg:pr-1">
          {reversed.map((event, index) => {
            const player = playersById.get(event.playerId);
            const team = teamsById.get(event.teamId);
            if (!player || !team) return null;
            const isLatest = index === 0;
            return (
              <li key={event.id}>
                <button
                  type="button"
                  onClick={() => onEdit(event.id)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/10 active:bg-white/15"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={cn(
                        "shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold tabular-nums",
                        isLatest ? "bg-white/20 text-white" : "text-white/40"
                      )}
                    >
                      C{event.quarter}
                    </span>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: team.colorPrimary }} />
                    <span className="truncate font-semibold text-white">
                      #{player.jerseyNumber} {player.lastName}
                    </span>
                    <span className="shrink-0 text-white/50">{EVENT_TYPE_LABELS[event.eventType]}</span>
                  </div>
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0 text-white/30"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
