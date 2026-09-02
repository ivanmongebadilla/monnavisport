import { notFound } from "next/navigation";
import { PlayerSearchList } from "@/components/players/PlayerSearchList";
import { PLAYERS, getLeagueById, getTeamsByLeague, getPlayerSeasonAverages } from "@/data/mock";

export default async function LeaguePlayersPage({ params }: { params: Promise<{ leagueId: string }> }) {
  const { leagueId } = await params;
  const league = getLeagueById(leagueId);
  if (!league) notFound();

  const teams = getTeamsByLeague(leagueId);
  const teamsById = new Map(teams.map((team) => [team.id, team]));
  const players = PLAYERS.filter((player) => player.leagueId === leagueId).sort((a, b) =>
    a.fullName.localeCompare(b.fullName)
  );
  const ppgByPlayer = new Map(players.map((player) => [player.id, getPlayerSeasonAverages(player).ppg]));

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold tracking-tight">Jugadores</h2>
      <PlayerSearchList players={players} teamsById={teamsById} ppgByPlayer={ppgByPlayer} />
    </div>
  );
}
