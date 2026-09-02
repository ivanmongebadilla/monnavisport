import type { League, Season } from "@/types";

export function LeagueHeader({ league, season }: { league: League; season?: Season }) {
  return (
    <div className="border-b border-border-subtle bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: league.colorPrimary }} />
          <span className="text-xs font-semibold uppercase tracking-widest text-text-faint">
            {season?.label ?? "Temporada"}
          </span>
        </div>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{league.name}</h1>
        <p className="mt-2 max-w-xl text-text-muted">{league.description}</p>
      </div>
    </div>
  );
}
