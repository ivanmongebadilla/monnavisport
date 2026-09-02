import { notFound } from "next/navigation";
import { TeamCard } from "@/components/teams/TeamCard";
import { getLeagueById, getTeamsByLeague, getTeamStanding } from "@/data/mock";

export default async function LeagueTeamsPage({ params }: { params: Promise<{ leagueId: string }> }) {
  const { leagueId } = await params;
  const league = getLeagueById(leagueId);
  if (!league) notFound();

  const teams = getTeamsByLeague(leagueId);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold tracking-tight">Equipos</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} standing={getTeamStanding(leagueId, team.id)} />
        ))}
      </div>
    </div>
  );
}
