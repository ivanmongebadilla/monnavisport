import Link from "next/link";
import { PlayerAvatar } from "@/components/players/PlayerAvatar";
import type { Player, PlayerGameStats, Team } from "@/types";

export function PlayerOfTheGameCard({
  player,
  team,
  stats,
  opponent,
  compact = false,
}: {
  player: Player;
  team: Team;
  stats: PlayerGameStats;
  opponent?: Team;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/players/${player.slug}`}
      className="block overflow-hidden rounded-2xl bg-[#0a0a0a] text-white transition-transform hover:scale-[1.01]"
    >
      <div className={compact ? "p-5" : "p-8"}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">MONNAVI SPORTS</span>
          <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/80">
            Jugador del partido
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <PlayerAvatar
            initials={player.initials}
            colorPrimary="#ffffff"
            size={compact ? "md" : "lg"}
            className="border-white/40 bg-white/10 text-white"
          />
          <div className="min-w-0">
            <p className={compact ? "text-lg font-black leading-tight" : "text-2xl font-black leading-tight sm:text-3xl"}>
              {player.fullName}
            </p>
            <p className="text-sm font-medium text-white/60">
              #{player.jerseyNumber} · {team.name}
              {opponent ? ` vs ${opponent.name}` : ""}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-3 border-t border-white/10 pt-5">
          <StatCell label="PTS" value={stats.points} />
          <StatCell label="REB" value={stats.rebounds} />
          <StatCell label="AST" value={stats.assists} />
          <StatCell label="ROB" value={stats.steals} />
        </div>

        <div className="mt-5 flex items-center justify-between rounded-lg bg-white/5 px-4 py-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Puntuación de rendimiento
          </span>
          <span className="text-xl font-black tabular-nums">{stats.performanceScore}</span>
        </div>
      </div>
    </Link>
  );
}

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-black tabular-nums sm:text-3xl">{value}</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">{label}</span>
    </div>
  );
}
