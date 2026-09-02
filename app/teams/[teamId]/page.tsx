import Link from "next/link";
import { notFound } from "next/navigation";
import { TeamLogo } from "@/components/teams/TeamLogo";
import { PlayerCard } from "@/components/players/PlayerCard";
import { GameCard } from "@/components/games/GameCard";
import { StatBlock } from "@/components/ui/StatBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatRecord } from "@/lib/utils/format";
import {
  getTeamById,
  getLeagueById,
  getPlayersByTeam,
  getTeamStanding,
  getTeamUpcomingGames,
  getTeamRecentResults,
  getTeamById as resolveTeam,
  getPlayerSeasonAverages,
} from "@/data/mock";

export default async function TeamProfilePage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const team = getTeamById(teamId);
  if (!team) notFound();
  const league = getLeagueById(team.leagueId);
  if (!league) notFound();

  const roster = getPlayersByTeam(teamId);
  const standing = getTeamStanding(team.leagueId, teamId);
  const upcoming = getTeamUpcomingGames(teamId, 3);
  const recent = getTeamRecentResults(teamId, 3);

  return (
    <div>
      <div className="border-b border-border-subtle bg-surface-muted">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Link href={`/leagues/${team.leagueId}/teams`} className="text-sm font-semibold text-text-muted hover:text-foreground">
            ← {league.name}
          </Link>
          <div className="mt-4 flex items-center gap-5">
            <TeamLogo team={team} size="xl" />
            <div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{team.name}</h1>
              <p className="mt-1 text-text-muted">
                {team.city} · {league.name} · Fundado en {team.founded}
              </p>
            </div>
          </div>
          {standing && (
            <div className="mt-6 flex flex-wrap gap-8">
              <StatBlock label="Récord" value={formatRecord(standing.wins, standing.losses)} size="sm" />
              <StatBlock label="Posición" value={`#${standing.rank}`} size="sm" />
              <StatBlock label="Diferencial" value={standing.pointDiff > 0 ? `+${standing.pointDiff}` : standing.pointDiff} size="sm" />
              <StatBlock label="Racha" value={standing.streak} size="sm" />
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <section>
          <SectionHeading title="Roster" className="mb-4" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roster.map((player) => (
              <PlayerCard key={player.id} player={player} team={team} ppg={getPlayerSeasonAverages(player).ppg} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <section>
            <SectionHeading title="Próximos partidos" className="mb-4" />
            {upcoming.length === 0 ? (
              <EmptyState title="No hay partidos programados" />
            ) : (
              <div className="space-y-3">
                {upcoming.map((game) => {
                  const homeTeam = resolveTeam(game.homeTeamId);
                  const awayTeam = resolveTeam(game.awayTeamId);
                  if (!homeTeam || !awayTeam) return null;
                  return <GameCard key={game.id} game={game} homeTeam={homeTeam} awayTeam={awayTeam} />;
                })}
              </div>
            )}
          </section>
          <section>
            <SectionHeading title="Resultados recientes" className="mb-4" />
            {recent.length === 0 ? (
              <EmptyState title="Aún no hay resultados" />
            ) : (
              <div className="space-y-3">
                {recent.map((game) => {
                  const homeTeam = resolveTeam(game.homeTeamId);
                  const awayTeam = resolveTeam(game.awayTeamId);
                  if (!homeTeam || !awayTeam) return null;
                  return <GameCard key={game.id} game={game} homeTeam={homeTeam} awayTeam={awayTeam} />;
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
