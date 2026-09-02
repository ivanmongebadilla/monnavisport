"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useScorekeeper } from "./useScorekeeper";
import { ScorekeeperStickyBar } from "./ScorekeeperStickyBar";
import { ScorekeeperControls } from "./ScorekeeperControls";
import { RosterGrid } from "./RosterGrid";
import { PlayerActionGrid } from "./PlayerActionGrid";
import { GameEventList } from "./GameEventList";
import { EditEventModal } from "./EditEventModal";
import { calculatePlayerOfTheGame } from "@/lib/calculations/playerOfTheGame";
import { PlayerOfTheGameCard } from "@/components/statistics/PlayerOfTheGameCard";
import { cn } from "@/lib/utils/cn";
import type { Game, Player, Team } from "@/types";

type RosterTab = "away" | "home";

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
  const [rosterTab, setRosterTab] = useState<RosterTab>("home");
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const actionGridRef = useRef<HTMLDivElement>(null);

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

  // On mobile, selecting a player from the roster jumps the (below-the-fold)
  // action grid into view so the scorekeeper never has to hunt for it
  // between plays. On larger screens everything already fits, so this is a
  // no-op (already-visible elements don't scroll).
  useEffect(() => {
    if (scorekeeper.selectedPlayerId) {
      actionGridRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [scorekeeper.selectedPlayerId]);

  const potg = useMemo(() => {
    const winner = calculatePlayerOfTheGame(scorekeeper.events, game.id);
    if (!winner) return null;
    const player = playersById.get(winner.playerId);
    const team = teamsById.get(winner.teamId);
    if (!player || !team) return null;
    return { player, team, stats: winner };
  }, [scorekeeper.events, game.id, playersById, teamsById]);

  const editingEvent = editingEventId ? scorekeeper.events.find((event) => event.id === editingEventId) ?? null : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <ScorekeeperStickyBar
        game={game}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        homeScore={scorekeeper.homeScore}
        awayScore={scorekeeper.awayScore}
        quarter={scorekeeper.quarter}
        onUndo={scorekeeper.undoLast}
        canUndo={scorekeeper.events.length > 0}
      />

      <div className="mx-auto max-w-5xl px-3 pb-16 pt-4 sm:px-6">
        <ScorekeeperControls quarter={scorekeeper.quarter} onSetQuarter={scorekeeper.setQuarter} />

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Jugadores en cancha</p>
                <RosterTeamToggle
                  awayTeam={awayTeam}
                  homeTeam={homeTeam}
                  active={rosterTab}
                  onChange={setRosterTab}
                />
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className={cn(rosterTab === "away" ? "block" : "hidden md:block")}>
                  <RosterGrid
                    team={awayTeam}
                    players={awayPlayers}
                    selectedPlayerId={scorekeeper.selectedPlayerId}
                    onSelect={scorekeeper.selectPlayer}
                    pointsByPlayer={pointsByPlayer}
                  />
                </div>
                <div className={cn(rosterTab === "home" ? "block" : "hidden md:block")}>
                  <RosterGrid
                    team={homeTeam}
                    players={homePlayers}
                    selectedPlayerId={scorekeeper.selectedPlayerId}
                    onSelect={scorekeeper.selectPlayer}
                    pointsByPlayer={pointsByPlayer}
                  />
                </div>
              </div>
            </div>

            <div ref={actionGridRef} className="scroll-mt-24">
              <PlayerActionGrid
                player={selectedPlayer}
                onAction={(eventType, value) => {
                  if (selectedPlayer) scorekeeper.addEvent(selectedPlayer, eventType, value);
                }}
              />
            </div>

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
              onEdit={setEditingEventId}
            />
          </div>
        </div>
      </div>

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homePlayers={homePlayers}
          awayPlayers={awayPlayers}
          onSave={(input) => {
            scorekeeper.editEvent(input);
            setEditingEventId(null);
          }}
          onDelete={(eventId) => {
            scorekeeper.removeEvent(eventId);
            setEditingEventId(null);
          }}
          onClose={() => setEditingEventId(null)}
        />
      )}
    </div>
  );
}

function RosterTeamToggle({
  awayTeam,
  homeTeam,
  active,
  onChange,
}: {
  awayTeam: Team;
  homeTeam: Team;
  active: RosterTab;
  onChange: (tab: RosterTab) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white/5 p-1 md:hidden">
      <button
        type="button"
        onClick={() => onChange("away")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-bold transition-colors",
          active === "away" ? "bg-white text-black" : "text-white/60"
        )}
      >
        {awayTeam.shortName}
      </button>
      <button
        type="button"
        onClick={() => onChange("home")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-bold transition-colors",
          active === "home" ? "bg-white text-black" : "text-white/60"
        )}
      >
        {homeTeam.shortName}
      </button>
    </div>
  );
}
