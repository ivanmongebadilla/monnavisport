import Link from "next/link";
import type { League } from "@/types";

export function LeagueCard({ league, teamCount }: { league: League; teamCount: number }) {
  return (
    <Link
      href={`/leagues/${league.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-subtle bg-surface p-6 transition-all hover:border-foreground/30 hover:shadow-lg hover:shadow-black/5 sm:p-8"
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: league.colorPrimary }}
        aria-hidden
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-text-faint">Básquetbol</p>
        <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{league.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">{league.description}</p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span className="text-sm font-semibold text-text-muted">{teamCount} equipos</span>
        <span className="flex items-center gap-1 text-sm font-bold transition-transform group-hover:translate-x-1">
          Ver liga →
        </span>
      </div>
    </Link>
  );
}
