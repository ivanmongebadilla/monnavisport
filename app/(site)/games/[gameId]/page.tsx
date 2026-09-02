import Link from "next/link";
import { notFound } from "next/navigation";
import { GameScore } from "@/components/games/GameScore";
import { BoxScoreTable } from "@/components/games/BoxScoreTable";
import { EventTimeline } from "@/components/games/EventTimeline";
import { PlayerOfTheGameCard } from "@/components/statistics/PlayerOfTheGameCard";
import { TeamLogo } from "@/components/teams/TeamLogo";
import { Badge } from "@/components/ui/Badge";
import { calculateAllPlayerGameStats } from "@/lib/calculations/playerStats";
import { formatGameDate, formatGameTime } from "@/lib/utils/format";
import {
  getGameById,
  getTeamById,
  getLeagueById,
  getPlayersByTeam,
  GAME_EVENTS,
  getPlayerAwardByGame,
  getPlayerById,
} from "@/data/mock";

export default async function GameDetailPage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;
  const game = getGameById(gameId);
  if (!game) notFound();

  const homeTeam = getTeamById(game.homeTeamId);
  const awayTeam = getTeamById(game.awayTeamId);
  const league = getLeagueById(game.leagueId);
  if (!homeTeam || !awayTeam || !league) notFound();

  const homeRoster = getPlayersByTeam(game.homeTeamId);
  const awayRoster = getPlayersByTeam(game.awayTeamId);

  if (game.status === "scheduled") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Breadcrumb league={league.name} leagueId={league.id} />
        <div className="mt-6">
          <GameScore game={game} homeTeam={homeTeam} awayTeam={awayTeam} />
          <p className="mt-4 text-center text-sm text-text-muted">
            {formatGameDate(game.date)} · {formatGameTime(game.date)} · {game.venue}
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <RosterPreview team={awayTeam} roster={awayRoster} />
          <RosterPreview team={homeTeam} roster={homeRoster} />
        </div>
      </div>
    );
  }

  const gameEvents = GAME_EVENTS.filter((event) => event.gameId === gameId);
  const boxScores = calculateAllPlayerGameStats(gameEvents, gameId);
  const statsByPlayer = new Map(boxScores.map((line) => [line.playerId, line]));
  const award = getPlayerAwardByGame(gameId);
  const potgPlayer = award ? getPlayerById(award.playerId) : undefined;
  const potgTeam = award ? getTeamById(award.teamId) : undefined;

  const allPlayers = [...homeRoster, ...awayRoster];
  const playersById = new Map(allPlayers.map((player) => [player.id, player]));
  const teamsById = new Map([[homeTeam.id, homeTeam], [awayTeam.id, awayTeam]]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Breadcrumb league={league.name} leagueId={league.id} />
      <div className="mt-6">
        <GameScore game={game} homeTeam={homeTeam} awayTeam={awayTeam} />
        <p className="mt-4 text-center text-sm text-text-muted">
          {formatGameDate(game.date)} · {game.venue}
        </p>
      </div>

      {award && potgPlayer && potgTeam && (
        <div className="mt-10">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-text-faint">Jugador del partido</p>
          <PlayerOfTheGameCard
            player={potgPlayer}
            team={potgTeam}
            stats={award.stats}
            opponent={potgTeam.id === homeTeam.id ? awayTeam : homeTeam}
          />
        </div>
      )}

      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Estadísticas del partido</h2>
        <BoxScoreTable team={awayTeam} roster={awayRoster} statsByPlayer={statsByPlayer} />
        <BoxScoreTable team={homeTeam} roster={homeRoster} statsByPlayer={statsByPlayer} />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-bold tracking-tight">Jugadas de anotación</h2>
        <EventTimeline events={gameEvents} playersById={playersById} teamsById={teamsById} />
      </div>
    </div>
  );
}

function Breadcrumb({ league, leagueId }: { league: string; leagueId: string }) {
  return (
    <Link
      href={`/leagues/${leagueId}/games`}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted hover:text-foreground"
    >
      ← {league}
    </Link>
  );
}

function RosterPreview({ team, roster }: { team: { name: string; initials: string; colorPrimary: string; colorSecondary: string }; roster: ReturnType<typeof getPlayersByTeam> }) {
  return (
    <div className="rounded-xl border border-border-subtle p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <TeamLogo team={team} size="sm" />
        <span className="font-bold">{team.name}</span>
        <Badge className="ml-auto">{roster.length} jugadores</Badge>
      </div>
      <ul className="space-y-1 text-sm text-text-muted">
        {roster.map((player) => (
          <li key={player.id} className="flex justify-between">
            <span>{player.fullName}</span>
            <span className="tabular-nums">#{player.jerseyNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
