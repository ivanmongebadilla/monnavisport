import { CardLink } from "@/components/ui/Card";
import { TeamLogo } from "./TeamLogo";
import { formatRecord } from "@/lib/utils/format";
import type { Standing, Team } from "@/types";

export function TeamCard({ team, standing }: { team: Team; standing?: Standing }) {
  return (
    <CardLink href={`/teams/${team.id}`} className="flex items-center gap-4 p-4">
      <TeamLogo team={team} size="lg" />
      <div className="min-w-0">
        <p className="truncate font-bold">{team.name}</p>
        <p className="text-sm text-text-muted">{team.city}</p>
        {standing && (
          <p className="mt-1 text-sm font-semibold tabular-nums">
            {formatRecord(standing.wins, standing.losses)}
            <span className="ml-1.5 font-normal text-text-faint">#{standing.rank}</span>
          </p>
        )}
      </div>
    </CardLink>
  );
}
