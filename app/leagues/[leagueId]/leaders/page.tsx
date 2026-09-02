import Link from "next/link";
import { notFound } from "next/navigation";
import { Leaderboard } from "@/components/statistics/Leaderboard";
import { LEADER_CATEGORY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { PLAYERS, getLeagueById, getTeamsByLeague, getLeagueLeaders } from "@/data/mock";
import type { LeaderCategory } from "@/types";

const CATEGORIES: LeaderCategory[] = ["points", "rebounds", "assists", "steals", "blocks"];

function isLeaderCategory(value: string | undefined): value is LeaderCategory {
  return CATEGORIES.includes(value as LeaderCategory);
}

export default async function LeagueLeadersPage({
  params,
  searchParams,
}: {
  params: Promise<{ leagueId: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { leagueId } = await params;
  const { category: rawCategory } = await searchParams;
  const league = getLeagueById(leagueId);
  if (!league) notFound();

  const category: LeaderCategory = isLeaderCategory(rawCategory) ? rawCategory : "points";

  const teams = getTeamsByLeague(leagueId);
  const teamsById = new Map(teams.map((team) => [team.id, team]));
  const playersById = new Map(PLAYERS.filter((player) => player.leagueId === leagueId).map((player) => [player.id, player]));
  const entries = getLeagueLeaders(leagueId, category, 15);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold tracking-tight">Líderes estadísticos</h2>
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/leagues/${leagueId}/leaders?category=${cat}`}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
              cat === category
                ? "border-foreground bg-foreground text-background"
                : "border-border-subtle text-text-muted hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {LEADER_CATEGORY_LABELS[cat]}
          </Link>
        ))}
      </div>
      <Leaderboard category={category} entries={entries} playersById={playersById} teamsById={teamsById} />
    </div>
  );
}
