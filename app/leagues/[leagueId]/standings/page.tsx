import { notFound } from "next/navigation";
import { StandingsTable } from "@/components/statistics/StandingsTable";
import { getLeagueById, getTeamsByLeague, getLeagueStandings } from "@/data/mock";

export default async function LeagueStandingsPage({ params }: { params: Promise<{ leagueId: string }> }) {
  const { leagueId } = await params;
  const league = getLeagueById(leagueId);
  if (!league) notFound();

  const teams = getTeamsByLeague(leagueId);
  const teamsById = new Map(teams.map((team) => [team.id, team]));
  const standings = getLeagueStandings(leagueId);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold tracking-tight">Tabla de posiciones</h2>
      <StandingsTable standings={standings} teamsById={teamsById} />
      <p className="mt-4 text-xs text-text-faint">
        JJ: Juegos jugados · G: Ganados · P: Perdidos · DIF: Diferencial de puntos · RACHA: Racha actual
      </p>
    </div>
  );
}
