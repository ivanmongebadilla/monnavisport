import { CardLink } from "@/components/ui/Card";
import { PlayerAvatar } from "./PlayerAvatar";
import { POSITION_LABELS } from "@/lib/constants";
import type { Player, Team } from "@/types";

export function PlayerCard({
  player,
  team,
  ppg,
}: {
  player: Player;
  team: Team;
  ppg?: number;
}) {
  return (
    <CardLink href={`/players/${player.slug}`} className="flex items-center gap-4 p-4">
      <PlayerAvatar initials={player.initials} colorPrimary={team.colorPrimary} size="lg" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold">{player.fullName}</p>
        <p className="text-sm text-text-muted">
          #{player.jerseyNumber} · {POSITION_LABELS[player.position]} · {team.name}
        </p>
      </div>
      {ppg !== undefined && (
        <div className="shrink-0 text-right">
          <p className="text-lg font-bold tabular-nums">{ppg.toFixed(1)}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-faint">PPG</p>
        </div>
      )}
    </CardLink>
  );
}
