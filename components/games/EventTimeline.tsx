import { EVENT_TYPE_LABELS } from "@/lib/constants";
import { formatQuarterLabel } from "@/lib/utils/format";
import type { GameEvent, Player, Team } from "@/types";

const SCORING_TYPES = new Set(["TWO_POINT", "THREE_POINT", "FREE_THROW"]);

export function EventTimeline({
  events,
  playersById,
  teamsById,
}: {
  events: GameEvent[];
  playersById: Map<string, Player>;
  teamsById: Map<string, Team>;
}) {
  const scoringPlays = [...events].filter((event) => SCORING_TYPES.has(event.eventType)).reverse();

  const grouped = new Map<number, GameEvent[]>();
  for (const event of scoringPlays) {
    grouped.set(event.quarter, [...(grouped.get(event.quarter) ?? []), event]);
  }

  return (
    <div className="space-y-6">
      {Array.from(grouped.entries()).map(([quarter, quarterEvents]) => (
        <div key={quarter}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-faint">
            {formatQuarterLabel(quarter)}
          </p>
          <ul className="space-y-1.5">
            {quarterEvents.map((event) => {
              const player = playersById.get(event.playerId);
              const team = teamsById.get(event.teamId);
              if (!player || !team) return null;
              return (
                <li key={event.id} className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm hover:bg-surface-muted">
                  <span className="w-12 shrink-0 font-mono text-xs tabular-nums text-text-faint">{event.gameClock}</span>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: team.colorPrimary }} />
                  <span className="font-semibold">{player.fullName}</span>
                  <span className="text-text-muted">{EVENT_TYPE_LABELS[event.eventType]}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
