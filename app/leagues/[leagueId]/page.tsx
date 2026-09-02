import { notFound } from "next/navigation";
import { GameCard } from "@/components/games/GameCard";
import { StandingsTable } from "@/components/statistics/StandingsTable";
import { Leaderboard } from "@/components/statistics/Leaderboard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  PLAYERS,
  getLeagueById,
  getTeamsByLeague,
  getTeamById,
  getLeagueStandings,
  getLeagueLeaders,
  getUpcomingGames,
  getRecentResults,
} from "@/data/mock";

export default async function LeagueOverviewPage({ params }: { params: Promise<{ leagueId: string }> }) {
  const { leagueId } = await params;
  const league = getLeagueById(leagueId);
  if (!league) notFound();

  const teams = getTeamsByLeague(leagueId);
  const teamsById = new Map(teams.map((team) => [team.id, team]));
  const playersById = new Map(PLAYERS.filter((player) => player.leagueId === leagueId).map((player) => [player.id, player]));

  const standings = getLeagueStandings(leagueId);
  const upcomingGames = getUpcomingGames(leagueId, 4);
  const recentResults = getRecentResults(leagueId, 4);
  const pointLeaders = getLeagueLeaders(leagueId, "points", 5);

  return (
    <div className="space-y-12">
      <section>
        <SectionHeading title="Tabla de posiciones" action={{ label: "Ver completa", href: `/leagues/${leagueId}/standings` }} className="mb-4" />
        <StandingsTable standings={standings.slice(0, 5)} teamsById={teamsById} />
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <section>
          <SectionHeading title="Próximos partidos" action={{ label: "Ver todos", href: `/leagues/${leagueId}/games` }} className="mb-4" />
          {upcomingGames.length === 0 ? (
            <EmptyState title="No hay partidos programados" description="Vuelve pronto para ver el calendario." />
          ) : (
            <div className="space-y-3">
              {upcomingGames.map((game) => {
                const homeTeam = getTeamById(game.homeTeamId);
                const awayTeam = getTeamById(game.awayTeamId);
                if (!homeTeam || !awayTeam) return null;
                return <GameCard key={game.id} game={game} homeTeam={homeTeam} awayTeam={awayTeam} />;
              })}
            </div>
          )}
        </section>

        <section>
          <SectionHeading title="Resultados recientes" action={{ label: "Ver todos", href: `/leagues/${leagueId}/games` }} className="mb-4" />
          {recentResults.length === 0 ? (
            <EmptyState title="Aún no hay resultados" />
          ) : (
            <div className="space-y-3">
              {recentResults.map((game) => {
                const homeTeam = getTeamById(game.homeTeamId);
                const awayTeam = getTeamById(game.awayTeamId);
                if (!homeTeam || !awayTeam) return null;
                return <GameCard key={game.id} game={game} homeTeam={homeTeam} awayTeam={awayTeam} />;
              })}
            </div>
          )}
        </section>
      </div>

      <section>
        <SectionHeading
          eyebrow="Puntos por juego"
          title="Líderes en puntos"
          action={{ label: "Ver todos los líderes", href: `/leagues/${leagueId}/leaders` }}
          className="mb-4"
        />
        <Leaderboard category="points" entries={pointLeaders} playersById={playersById} teamsById={teamsById} />
      </section>
    </div>
  );
}
