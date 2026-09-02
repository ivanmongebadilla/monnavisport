import Link from "next/link";
import { TeamLogo } from "@/components/teams/TeamLogo";
import { cn } from "@/lib/utils/cn";
import type { Standing, Team } from "@/types";

export function StandingsTable({
  standings,
  teamsById,
  highlightTeamId,
}: {
  standings: Standing[];
  teamsById: Map<string, Team>;
  highlightTeamId?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border-subtle">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border-subtle text-left text-xs font-semibold uppercase tracking-wide text-text-faint">
            <th className="px-4 py-3 font-semibold">#</th>
            <th className="px-4 py-3 font-semibold">Equipo</th>
            <th className="px-3 py-3 text-center font-semibold">JJ</th>
            <th className="px-3 py-3 text-center font-semibold">G</th>
            <th className="px-3 py-3 text-center font-semibold">P</th>
            <th className="px-3 py-3 text-center font-semibold">DIF</th>
            <th className="px-3 py-3 text-center font-semibold">RACHA</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing) => {
            const team = teamsById.get(standing.teamId);
            if (!team) return null;
            return (
              <tr
                key={standing.teamId}
                className={cn(
                  "border-b border-border-subtle last:border-b-0",
                  standing.teamId === highlightTeamId && "bg-surface-muted"
                )}
              >
                <td className="px-4 py-3 tabular-nums text-text-muted">{standing.rank}</td>
                <td className="px-4 py-3">
                  <Link href={`/teams/${team.id}`} className="flex items-center gap-2.5 font-semibold hover:underline">
                    <TeamLogo team={team} size="sm" />
                    {team.name}
                  </Link>
                </td>
                <td className="px-3 py-3 text-center tabular-nums text-text-muted">{standing.gamesPlayed}</td>
                <td className="px-3 py-3 text-center tabular-nums font-semibold">{standing.wins}</td>
                <td className="px-3 py-3 text-center tabular-nums font-semibold">{standing.losses}</td>
                <td className={cn("px-3 py-3 text-center tabular-nums", standing.pointDiff >= 0 ? "text-emerald-600" : "text-red-600")}>
                  {standing.pointDiff > 0 ? "+" : ""}
                  {standing.pointDiff}
                </td>
                <td className="px-3 py-3 text-center tabular-nums text-text-muted">{standing.streak}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
