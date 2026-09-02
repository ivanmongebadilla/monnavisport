import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayerAvatar } from "@/components/players/PlayerAvatar";
import { PlayerGameLog } from "@/components/players/PlayerGameLog";
import { QRCodeCard } from "@/components/players/QRCodeCard";
import { PlayerOfTheGameCard } from "@/components/statistics/PlayerOfTheGameCard";
import { StatBlock } from "@/components/ui/StatBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { POSITION_LABELS } from "@/lib/constants";
import { calculatePlayerGameStats } from "@/lib/calculations/playerStats";
import { formatHeight } from "@/lib/utils/format";
import {
  getPlayerBySlug,
  getTeamById,
  getLeagueById,
  getPlayerSeasonAverages,
  getPlayerRecentGames,
  getAwardsByPlayer,
  GAME_EVENTS,
} from "@/data/mock";

export default async function PlayerProfilePage({ params }: { params: Promise<{ playerSlug: string }> }) {
  const { playerSlug } = await params;
  const player = getPlayerBySlug(playerSlug);
  if (!player) notFound();

  const team = getTeamById(player.teamId);
  const league = getLeagueById(player.leagueId);
  if (!team || !league) notFound();

  const averages = getPlayerSeasonAverages(player);
  const recentGames = getPlayerRecentGames(team.id, player.id, 5);
  const gameLogEntries = recentGames.map((game) => {
    const opponentId = game.homeTeamId === team.id ? game.awayTeamId : game.homeTeamId;
    const opponent = getTeamById(opponentId)!;
    const stats = calculatePlayerGameStats(GAME_EVENTS, game.id, player.id, team.id);
    return { game, opponent, stats, isHome: game.homeTeamId === team.id };
  });

  const awards = getAwardsByPlayer(player.id);

  return (
    <div>
      <div className="border-b border-border-subtle bg-surface-muted">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link href={`/teams/${team.id}`} className="text-sm font-semibold text-text-muted hover:text-foreground">
            ← {team.name}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-5">
            <PlayerAvatar initials={player.initials} colorPrimary={team.colorPrimary} size="xl" />
            <div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{player.fullName}</h1>
              <p className="mt-1 text-text-muted">
                #{player.jerseyNumber} · {POSITION_LABELS[player.position]} · {team.name} · {league.name}
              </p>
              <p className="mt-0.5 text-sm text-text-faint">
                {formatHeight(player.heightCm)} · {player.birthYear} · {player.hometown}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-8">
            <StatBlock label="Promedio de puntos" value={averages.ppg.toFixed(1)} />
            <StatBlock label="Rebotes" value={averages.rpg.toFixed(1)} />
            <StatBlock label="Asistencias" value={averages.apg.toFixed(1)} />
            <StatBlock label="Robos" value={averages.spg.toFixed(1)} />
            <StatBlock label="Bloqueos" value={averages.bpg.toFixed(1)} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <section>
              <SectionHeading title="Últimos partidos" className="mb-4" />
              {gameLogEntries.length === 0 ? (
                <EmptyState title="Aún no ha jugado partidos" />
              ) : (
                <PlayerGameLog entries={gameLogEntries} />
              )}
            </section>

            {awards.length > 0 && (
              <section>
                <SectionHeading eyebrow={`${awards.length} veces`} title="Jugador del partido" className="mb-4" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {awards.slice(0, 4).map((award) => {
                    const opponentGame = recentGames.find((g) => g.id === award.gameId);
                    const opponentId = opponentGame
                      ? opponentGame.homeTeamId === team.id
                        ? opponentGame.awayTeamId
                        : opponentGame.homeTeamId
                      : undefined;
                    const opponent = opponentId ? getTeamById(opponentId) : undefined;
                    return (
                      <PlayerOfTheGameCard key={award.id} player={player} team={team} stats={award.stats} opponent={opponent} compact />
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <div>
            <QRCodeCard player={player} />
          </div>
        </div>
      </div>
    </div>
  );
}
