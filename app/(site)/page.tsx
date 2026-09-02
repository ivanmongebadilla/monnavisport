import { LeagueCard } from "@/components/league/LeagueCard";
import { GameCard } from "@/components/games/GameCard";
import { Leaderboard } from "@/components/statistics/Leaderboard";
import { PlayerOfTheGameCard } from "@/components/statistics/PlayerOfTheGameCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  LEAGUES,
  PLAYERS,
  TEAMS,
  getTeamById,
  getTeamsByLeague,
  getRecentResults,
  getUpcomingGames,
  getLeagueLeaders,
  getPlayerAwardByGame,
} from "@/data/mock";

export default function HomePage() {
  const recentResults = LEAGUES.flatMap((league) => getRecentResults(league.id, 1)).sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  const upcomingGames = LEAGUES.flatMap((league) => getUpcomingGames(league.id, 2)).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const playersById = new Map(PLAYERS.map((player) => [player.id, player]));
  const teamsById = new Map(TEAMS.map((team) => [team.id, team]));

  return (
    <div>
      <section className="border-b border-border-subtle bg-surface-muted">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-faint">
            MONNAVI · Software · IA · Automatización · IoT
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-6xl">
            MONNAVI <span className="text-text-muted">SPORTS</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-text-muted">
            Plataforma digital para ligas deportivas. Estadísticas, resultados y perfiles de jugador en tiempo real
            para las ligas municipales de básquetbol de Caborca, Sonora.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Temporada 2026" title="Elige tu liga" className="mb-6" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {LEAGUES.map((league) => (
            <LeagueCard key={league.id} league={league} teamCount={getTeamsByLeague(league.id).length} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Resultados recientes" className="mb-4" />
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
          </div>
          <div>
            <SectionHeading title="Próximos partidos" className="mb-4" />
            {upcomingGames.length === 0 ? (
              <EmptyState title="No hay partidos programados" />
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
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Producciones recientes" title="Jugadores del partido" className="mb-6" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {LEAGUES.map((league) => {
            const [lastGame] = getRecentResults(league.id, 1);
            if (!lastGame) return null;
            const award = getPlayerAwardByGame(lastGame.id);
            const player = award && playersById.get(award.playerId);
            const team = award && teamsById.get(award.teamId);
            if (!award || !player || !team) return null;
            return (
              <div key={league.id}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-faint">{league.name}</p>
                <PlayerOfTheGameCard player={player} team={team} stats={award.stats} compact />
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Líderes por liga" title="Mejores jugadores" className="mb-6" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {LEAGUES.map((league) => (
            <div key={league.id}>
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-text-faint">{league.name}</p>
              <Leaderboard
                category="points"
                entries={getLeagueLeaders(league.id, "points", 3)}
                playersById={playersById}
                teamsById={teamsById}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
