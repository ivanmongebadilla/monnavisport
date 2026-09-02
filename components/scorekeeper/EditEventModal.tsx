"use client";

import { useEffect, useState } from "react";
import { RosterGrid } from "./RosterGrid";
import { StatButton } from "./StatButton";
import { SCOREKEEPER_ACTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import type { GameEvent, GameEventType, Player, Team } from "@/types";

/**
 * Full correction flow for any past event — not just the last one. Opened
 * by tapping any row in the recent-events list. Lets the scorekeeper
 * reassign the player (and therefore the team), the stat type, and the
 * quarter, or delete the event outright, all in one clear screen.
 */
export function EditEventModal({
  event,
  homeTeam,
  awayTeam,
  homePlayers,
  awayPlayers,
  onSave,
  onDelete,
  onClose,
}: {
  event: GameEvent;
  homeTeam: Team;
  awayTeam: Team;
  homePlayers: Player[];
  awayPlayers: Player[];
  onSave: (input: { eventId: string; player: Player; eventType: GameEventType; value: number; quarter: number }) => void;
  onDelete: (eventId: string) => void;
  onClose: () => void;
}) {
  const allPlayers = [...homePlayers, ...awayPlayers];
  const [selectedPlayerId, setSelectedPlayerId] = useState(event.playerId);
  const [selectedEventType, setSelectedEventType] = useState<GameEventType>(event.eventType);
  const [selectedQuarter, setSelectedQuarter] = useState(event.quarter);

  useEffect(() => {
    function handleKeyDown(keyEvent: KeyboardEvent) {
      if (keyEvent.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const selectedPlayer = allPlayers.find((player) => player.id === selectedPlayerId) ?? null;
  const selectedAction = SCOREKEEPER_ACTIONS.find((action) => action.type === selectedEventType)!;

  const handleSave = () => {
    if (!selectedPlayer) return;
    onSave({
      eventId: event.id,
      player: selectedPlayer,
      eventType: selectedEventType,
      value: selectedAction.value,
      quarter: selectedQuarter,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4">
      <button type="button" aria-label="Cerrar" className="absolute inset-0" onClick={onClose} />

      <div className="relative flex max-h-[92vh] w-full flex-col rounded-t-2xl border border-white/10 bg-[#111111] text-white sm:max-w-lg sm:rounded-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Corregir jugada</p>
            <p className="mt-0.5 text-sm text-white/60">Cambia el jugador, la acción o el cuarto, o elimínala.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <section>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-white/50">Jugador</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <RosterGrid
                team={awayTeam}
                players={awayPlayers}
                selectedPlayerId={selectedPlayerId}
                onSelect={setSelectedPlayerId}
              />
              <RosterGrid
                team={homeTeam}
                players={homePlayers}
                selectedPlayerId={selectedPlayerId}
                onSelect={setSelectedPlayerId}
              />
            </div>
          </section>

          <section>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-white/50">Acción</p>
            <div className="grid grid-cols-3 gap-2.5">
              {SCOREKEEPER_ACTIONS.map((action) => (
                <StatButton
                  key={action.type}
                  label={action.label}
                  onClick={() => setSelectedEventType(action.type)}
                  tone={selectedEventType === action.type ? "score" : "default"}
                />
              ))}
            </div>
          </section>

          <section>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-white/50">Cuarto</p>
            <div className="flex items-center gap-1.5 rounded-lg bg-white/5 p-1.5">
              {[1, 2, 3, 4].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setSelectedQuarter(q)}
                  className={cn(
                    "flex-1 rounded-md py-2 text-sm font-bold transition-colors",
                    selectedQuarter === q ? "bg-white text-black" : "text-white/60 hover:bg-white/10"
                  )}
                >
                  C{q}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="flex shrink-0 flex-col gap-2.5 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => onDelete(event.id)}
            className="whitespace-nowrap rounded-lg bg-red-500/15 px-4 py-2.5 text-sm font-bold text-red-300 transition-colors hover:bg-red-500/25"
          >
            Eliminar
          </button>
          <div className="hidden flex-1 sm:block" />
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg px-4 py-2.5 text-sm font-bold text-white/60 transition-colors hover:bg-white/10 sm:flex-none"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!selectedPlayer}
              className="flex-1 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
