import type { Metadata } from "next";
import Link from "next/link";
import { TeamLogo } from "@/components/teams/TeamLogo";
import { StatBlock } from "@/components/ui/StatBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatGameDate, formatGameTime } from "@/lib/utils/format";
import { LEAGUES, TEAMS, PLAYERS, GAMES, getTeamById, getUpcomingGames } from "@/data/mock";

export const metadata: Metadata = { title: "Administración — MONNAVI SPORTS" };

export default function AdminPage() {
  const finishedGames = GAMES.filter((game) => game.status === "final").length;
  const scheduledGames = GAMES.filter((game) => game.status === "scheduled").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-faint">Panel operativo</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight">Administración</h1>
      <p className="mt-2 max-w-xl text-text-muted">
        Vista general de las tres ligas y acceso rápido al modo anotador para capturar partidos en curso.
      </p>

      <div className="mt-8 flex flex-wrap gap-10 border-y border-border-subtle py-6">
        <StatBlock label="Ligas" value={LEAGUES.length} size="sm" />
        <StatBlock label="Equipos" value={TEAMS.length} size="sm" />
        <StatBlock label="Jugadores" value={PLAYERS.length} size="sm" />
        <StatBlock label="Partidos jugados" value={finishedGames} size="sm" />
        <StatBlock label="Partidos programados" value={scheduledGames} size="sm" />
      </div>

      <div className="mt-10 space-y-10">
        {LEAGUES.map((league) => {
          const games = getUpcomingGames(league.id, 6);
          return (
            <section key={league.id}>
              <SectionHeading
                eyebrow={league.name}
                title="Partidos por anotar"
                action={{ label: "Ver liga", href: `/leagues/${league.id}` }}
                className="mb-4"
              />
              {games.length === 0 ? (
                <EmptyState title="No hay partidos programados" description="Todos los partidos de esta liga ya fueron capturados." />
              ) : (
                <div className="overflow-hidden rounded-xl border border-border-subtle">
                  <ul className="divide-y divide-border-subtle">
                    {games.map((game) => {
                      const homeTeam = getTeamById(game.homeTeamId);
                      const awayTeam = getTeamById(game.awayTeamId);
                      if (!homeTeam || !awayTeam) return null;
                      return (
                        <li key={game.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center -space-x-2">
                              <TeamLogo team={awayTeam} size="sm" />
                              <TeamLogo team={homeTeam} size="sm" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">
                                {awayTeam.name} @ {homeTeam.name}
                              </p>
                              <p className="text-xs text-text-muted">
                                {formatGameDate(game.date)} · {formatGameTime(game.date)} · {game.venue}
                              </p>
                            </div>
                          </div>
                          <Link
                            href={`/scorekeeper/${game.id}`}
                            className="rounded-full bg-foreground px-4 py-1.5 text-sm font-bold text-background transition-opacity hover:opacity-90"
                          >
                            Anotar partido
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
