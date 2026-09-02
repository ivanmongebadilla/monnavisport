import Link from "next/link";
import { PlayerAvatar } from "@/components/players/PlayerAvatar";
import { LEADER_CATEGORY_UNIT } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import type { LeaderCategory, LeaderEntry, Player, Team } from "@/types";

export function Leaderboard({
  category,
  entries,
  playersById,
  teamsById,
}: {
  category: LeaderCategory;
  entries: LeaderEntry[];
  playersById: Map<string, Player>;
  teamsById: Map<string, Team>;
}) {
  return (
    <ol className="divide-y divide-border-subtle overflow-hidden rounded-xl border border-border-subtle">
      {entries.map((entry, index) => {
        const player = playersById.get(entry.playerId);
        const team = teamsById.get(entry.teamId);
        if (!player || !team) return null;
        const rank = index + 1;

        return (
          <li key={entry.playerId}>
            <Link
              href={`/players/${player.slug}`}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-muted"
            >
              <span
                className={cn(
                  "w-5 shrink-0 text-center text-sm font-bold tabular-nums",
                  rank <= 3 ? "text-foreground" : "text-text-faint"
                )}
              >
                {rank}
              </span>
              <PlayerAvatar initials={player.initials} colorPrimary={team.colorPrimary} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{player.fullName}</p>
                <p className="truncate text-xs text-text-muted">{team.name}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-lg font-bold tabular-nums">{entry.value.toFixed(1)}</span>
                <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-text-faint">
                  {LEADER_CATEGORY_UNIT[category]}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
