import Link from "next/link";
import { formatGameDate } from "@/lib/utils/format";
import type { Game, PlayerGameStats, Team } from "@/types";

export function PlayerGameLog({
  entries,
}: {
  entries: { game: Game; opponent: Team; stats: PlayerGameStats; isHome: boolean }[];
}) {
  return (
    <ul className="divide-y divide-border-subtle overflow-hidden rounded-xl border border-border-subtle">
      {entries.map(({ game, opponent, stats, isHome }) => (
        <li key={game.id}>
          <Link
            href={`/games/${game.id}`}
            className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 transition-colors hover:bg-surface-muted"
          >
            <div>
              <p className="text-sm font-semibold">
                {isHome ? "vs" : "@"} {opponent.name}
              </p>
              <p className="text-xs text-text-muted">{formatGameDate(game.date)}</p>
            </div>
            <p className="text-sm font-medium tabular-nums text-text-muted">
              {stats.points} PTS · {stats.rebounds} REB · {stats.assists} AST
              {stats.steals > 0 ? ` · ${stats.steals} ROB` : ""}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
