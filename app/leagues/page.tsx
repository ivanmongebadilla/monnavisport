import type { Metadata } from "next";
import { LeagueCard } from "@/components/league/LeagueCard";
import { LEAGUES, getTeamsByLeague } from "@/data/mock";

export const metadata: Metadata = { title: "Ligas — MONNAVI SPORTS" };

export default function LeaguesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-faint">Básquetbol municipal</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Ligas</h1>
      <p className="mt-2 max-w-xl text-text-muted">
        Tres categorías, un mismo estándar. Elige una liga para ver posiciones, equipos, jugadores y líderes.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {LEAGUES.map((league) => (
          <LeagueCard key={league.id} league={league} teamCount={getTeamsByLeague(league.id).length} />
        ))}
      </div>
    </div>
  );
}
