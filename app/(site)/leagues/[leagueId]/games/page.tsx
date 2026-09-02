import Link from "next/link";
import { notFound } from "next/navigation";
import { GameCard } from "@/components/games/GameCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils/cn";
import { getLeagueById, getTeamById, getGamesByLeague } from "@/data/mock";

export default async function LeagueGamesPage({
  params,
  searchParams,
}: {
  params: Promise<{ leagueId: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { leagueId } = await params;
  const { tab: rawTab } = await searchParams;
  const league = getLeagueById(leagueId);
  if (!league) notFound();

  const tab = rawTab === "results" ? "results" : "upcoming";
  const games = getGamesByLeague(leagueId);

  const upcoming = games
    .filter((game) => game.status === "scheduled")
    .sort((a, b) => a.date.localeCompare(b.date));
  const results = games
    .filter((game) => game.status === "final")
    .sort((a, b) => b.date.localeCompare(a.date));

  const list = tab === "results" ? results : upcoming;

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold tracking-tight">Partidos</h2>
      <div className="mb-6 flex gap-2">
        <Link
          href={`/leagues/${leagueId}/games?tab=upcoming`}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
            tab === "upcoming"
              ? "border-foreground bg-foreground text-background"
              : "border-border-subtle text-text-muted hover:border-foreground/30 hover:text-foreground"
          )}
        >
          Próximos ({upcoming.length})
        </Link>
        <Link
          href={`/leagues/${leagueId}/games?tab=results`}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
            tab === "results"
              ? "border-foreground bg-foreground text-background"
              : "border-border-subtle text-text-muted hover:border-foreground/30 hover:text-foreground"
          )}
        >
          Resultados ({results.length})
        </Link>
      </div>

      {list.length === 0 ? (
        <EmptyState title={tab === "results" ? "Aún no hay resultados" : "No hay partidos programados"} />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((game) => {
            const homeTeam = getTeamById(game.homeTeamId);
            const awayTeam = getTeamById(game.awayTeamId);
            if (!homeTeam || !awayTeam) return null;
            return <GameCard key={game.id} game={game} homeTeam={homeTeam} awayTeam={awayTeam} />;
          })}
        </div>
      )}
    </div>
  );
}
