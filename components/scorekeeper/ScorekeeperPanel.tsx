"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useScorekeeper } from "./useScorekeeper";
import { ScorekeeperScoreboard } from "./ScorekeeperScoreboard";
import { RosterGrid } from "./RosterGrid";
import { PlayerActionGrid } from "./PlayerActionGrid";
import { GameEventList } from "./GameEventList";
import { calculatePlayerOfTheGame } from "@/lib/calculations/playerOfTheGame";
import { PlayerOfTheGameCard } from "@/components/statistics/PlayerOfTheGameCard";
import type { Game, Player, Team } from "@/types";

export function ScorekeeperPanel({
  game,
  homeTeam,
  awayTeam,
  homePlayers,
  awayPlayers,
}: {
  game: Game;
  homeTeam: Team;
  awayTeam: Team;
  homePlayers: Player[];
  awayPlayers: Player[];
}) {
  const scorekeeper = useScorekeeper(game);

  const allPlayers = useMemo(() => [...homePlayers, ...awayPlayers], [homePlayers, awayPlayers]);
  const playersById = useMemo(() => new Map(allPlayers.map((player) => [player.id, player])), [allPlayers]);
  const teamsById = useMemo(
    () => new Map([[homeTeam.id, homeTeam], [awayTeam.id, awayTeam]]),
    [homeTeam, awayTeam]
  );
  const pointsByPlayer = useMemo(
    () => new Map(scorekeeper.boxScores.map((line) => [line.playerId, line.points])),
    [scorekeeper.boxScores]
  );

  const selectedPlayer = scorekeeper.selectedPlayerId ? playersById.get(scorekeeper.selectedPlayerId) ?? null : null;

  const potg = useMemo(() => {
    const winner = calculatePlayerOfTheGame(scorekeeper.events, game.id);
    if (!winner) return null;
    const player = playersById.get(winner.playerId);
    const team = teamsById.get(winner.teamId);
    if (!player || !team) return null;
    return { player, team, stats: winner };
  }, [scorekeeper.events, game.id, playersById, teamsById]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-16 text-white">
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <div className="mb-5 flex items-center justify-between">
          <Link href={`/games/${game.id}`} className="text-sm font-semibold text-white/50 hover:text-white">
            ← Volver al partido
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Modo anotador</span>
        </div>

        <ScorekeeperScoreboard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeScore={scorekeeper.homeScore}
          awayScore={scorekeeper.awayScore}
          quarter={scorekeeper.quarter}
          clockSeconds={scorekeeper.clockSeconds}
          running={scorekeeper.running}
          onToggleClock={scorekeeper.toggleClock}
          onAdjustClock={scorekeeper.adjustClock}
          onSetQuarter={scorekeeper.setQuarter}
          onUndo={scorekeeper.undoLast}
          canUndo={scorekeeper.events.length > 0}
        />

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Jugadores en cancha</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <RosterGrid
                  team={awayTeam}
                  players={awayPlayers}
                  selectedPlayerId={scorekeeper.selectedPlayerId}
                  onSelect={scorekeeper.selectPlayer}
                  pointsByPlayer={pointsByPlayer}
                />
                <RosterGrid
                  team={homeTeam}
                  players={homePlayers}
                  selectedPlayerId={scorekeeper.selectedPlayerId}
                  onSelect={scorekeeper.selectPlayer}
                  pointsByPlayer={pointsByPlayer}
                />
              </div>
            </div>

            <PlayerActionGrid
              player={selectedPlayer}
              onAction={(eventType, value) => {
                if (selectedPlayer) scorekeeper.addEvent(selectedPlayer, eventType, value);
              }}
            />

            {potg && (
              <div>
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-white/50">
                  Jugador del partido (en vivo)
                </p>
                <PlayerOfTheGameCard player={potg.player} team={potg.team} stats={potg.stats} compact />
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <GameEventList
              events={scorekeeper.events}
              playersById={playersById}
              teamsById={teamsById}
              onRemove={scorekeeper.removeEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
