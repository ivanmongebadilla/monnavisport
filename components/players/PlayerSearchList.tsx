"use client";

import { useMemo, useState } from "react";
import { PlayerCard } from "./PlayerCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Player, Team } from "@/types";

export function PlayerSearchList({
  players,
  teamsById,
  ppgByPlayer,
}: {
  players: Player[];
  teamsById: Map<string, Team>;
  ppgByPlayer: Map<string, number>;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return players;
    return players.filter(
      (player) =>
        player.fullName.toLowerCase().includes(normalized) ||
        teamsById.get(player.teamId)?.name.toLowerCase().includes(normalized)
    );
  }, [players, query, teamsById]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar jugador o equipo…"
        className="mb-5 w-full max-w-sm rounded-lg border border-border-subtle bg-surface px-4 py-2.5 text-sm outline-none placeholder:text-text-faint focus:border-foreground/40"
      />
      {filtered.length === 0 ? (
        <EmptyState title="No se encontraron jugadores" description="Intenta con otro nombre." />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((player) => {
            const team = teamsById.get(player.teamId);
            if (!team) return null;
            return <PlayerCard key={player.id} player={player} team={team} ppg={ppgByPlayer.get(player.id)} />;
          })}
        </div>
      )}
    </div>
  );
}
