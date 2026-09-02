import Link from "next/link";
import { TeamLogo } from "@/components/teams/TeamLogo";
import type { Player, PlayerGameStats, Team } from "@/types";

export function BoxScoreTable({
  team,
  roster,
  statsByPlayer,
}: {
  team: Team;
  roster: Player[];
  statsByPlayer: Map<string, PlayerGameStats>;
}) {
  const sorted = [...roster].sort((a, b) => (statsByPlayer.get(b.id)?.points ?? 0) - (statsByPlayer.get(a.id)?.points ?? 0));

  return (
    <div className="overflow-x-auto rounded-xl border border-border-subtle">
      <div className="flex items-center gap-2.5 border-b border-border-subtle px-4 py-3">
        <TeamLogo team={team} size="sm" />
        <span className="font-bold">{team.name}</span>
      </div>
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border-subtle text-left text-xs font-semibold uppercase tracking-wide text-text-faint">
            <th className="px-4 py-2.5 font-semibold">Jugador</th>
            <th className="px-2 py-2.5 text-center font-semibold">PTS</th>
            <th className="px-2 py-2.5 text-center font-semibold">REB</th>
            <th className="px-2 py-2.5 text-center font-semibold">AST</th>
            <th className="px-2 py-2.5 text-center font-semibold">ROB</th>
            <th className="px-2 py-2.5 text-center font-semibold">BLQ</th>
            <th className="px-2 py-2.5 text-center font-semibold">PER</th>
            <th className="px-2 py-2.5 text-center font-semibold">FAL</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((player) => {
            const stats = statsByPlayer.get(player.id);
            return (
              <tr key={player.id} className="border-b border-border-subtle last:border-b-0">
                <td className="px-4 py-2.5">
                  <Link href={`/players/${player.slug}`} className="font-medium hover:underline">
                    #{player.jerseyNumber} {player.fullName}
                  </Link>
                </td>
                <td className="px-2 py-2.5 text-center tabular-nums font-semibold">{stats?.points ?? 0}</td>
                <td className="px-2 py-2.5 text-center tabular-nums text-text-muted">{stats?.rebounds ?? 0}</td>
                <td className="px-2 py-2.5 text-center tabular-nums text-text-muted">{stats?.assists ?? 0}</td>
                <td className="px-2 py-2.5 text-center tabular-nums text-text-muted">{stats?.steals ?? 0}</td>
                <td className="px-2 py-2.5 text-center tabular-nums text-text-muted">{stats?.blocks ?? 0}</td>
                <td className="px-2 py-2.5 text-center tabular-nums text-text-muted">{stats?.turnovers ?? 0}</td>
                <td className="px-2 py-2.5 text-center tabular-nums text-text-muted">{stats?.fouls ?? 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
