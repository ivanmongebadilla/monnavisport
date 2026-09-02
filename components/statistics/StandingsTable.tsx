import Link from "next/link";
import { TeamLogo } from "@/components/teams/TeamLogo";
import { ScrollHintTable } from "@/components/ui/ScrollHintTable";
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
    <ScrollHintTable>
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border-subtle text-left text-xs font-semibold uppercase tracking-wide text-text-faint">
            <th className="sticky left-0 z-10 bg-surface px-4 py-3 font-semibold">Equipo</th>
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
            const isHighlighted = standing.teamId === highlightTeamId;
            return (
              <tr
                key={standing.teamId}
                className={cn("border-b border-border-subtle last:border-b-0", isHighlighted && "bg-surface-muted")}
              >
                <td className={cn("sticky left-0 z-10 px-4 py-3", isHighlighted ? "bg-surface-muted" : "bg-surface")}>
                  <Link href={`/teams/${team.id}`} className="flex items-center gap-2.5 font-semibold hover:underline">
                    <span className="w-4 shrink-0 text-text-muted">{standing.rank}</span>
                    <TeamLogo team={team} size="sm" />
                    <span className="whitespace-nowrap">{team.name}</span>
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
    </ScrollHintTable>
  );
}
