import { cn } from "@/lib/utils/cn";
import type { Player, Team } from "@/types";

export function RosterGrid({
  team,
  players,
  selectedPlayerId,
  onSelect,
  pointsByPlayer,
}: {
  team: Team;
  players: Player[];
  selectedPlayerId: string | null;
  onSelect: (playerId: string) => void;
  pointsByPlayer?: Map<string, number>;
}) {
  return (
    <div>
      <p className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: team.colorSecondary }} />
        {team.name}
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
        {players.map((player) => {
          const isSelected = player.id === selectedPlayerId;
          const points = pointsByPlayer?.get(player.id) ?? 0;
          return (
            <button
              key={player.id}
              type="button"
              onClick={() => onSelect(player.id)}
              className={cn(
                "flex flex-col items-start rounded-lg border px-3 py-2.5 text-left transition-colors",
                isSelected
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/10"
              )}
            >
              <span className="text-sm font-bold tabular-nums">#{player.jerseyNumber}</span>
              <span className="truncate text-xs font-medium opacity-80">{player.lastName}</span>
              {points > 0 && (
                <span className={cn("mt-1 text-[10px] font-bold tabular-nums", isSelected ? "text-black/60" : "text-white/50")}>
                  {points} PTS
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
