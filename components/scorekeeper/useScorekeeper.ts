"use client";

import { useCallback, useReducer } from "react";
import { calculateAllPlayerGameStats } from "@/lib/calculations/playerStats";
import { calculateBothTeamScores } from "@/lib/calculations/teamScore";
import type { Game, GameEvent, GameEventType, Player } from "@/types";

interface ScorekeeperState {
  events: GameEvent[];
  quarter: number;
  selectedPlayerId: string | null;
}

interface EditEventInput {
  eventId: string;
  player: Player;
  eventType: GameEventType;
  value: number;
  quarter: number;
}

type Action =
  | { type: "ADD_EVENT"; player: Player; eventType: GameEventType; value: number }
  | { type: "UNDO_LAST" }
  | { type: "REMOVE_EVENT"; eventId: string }
  | { type: "EDIT_EVENT"; input: EditEventInput }
  | { type: "SELECT_PLAYER"; playerId: string }
  | { type: "SET_QUARTER"; quarter: number };

// Time is not tracked for now — events are ordered purely by entry sequence.
const UNTRACKED_CLOCK = "00:00";

function reducer(state: ScorekeeperState, action: Action, gameId: string): ScorekeeperState {
  switch (action.type) {
    case "ADD_EVENT": {
      const event: GameEvent = {
        id: `${gameId}-live-${state.events.length + 1}-${Date.now()}`,
        gameId,
        playerId: action.player.id,
        teamId: action.player.teamId,
        eventType: action.eventType,
        value: action.value,
        quarter: state.quarter,
        gameClock: UNTRACKED_CLOCK,
        timestamp: new Date().toISOString(),
      };
      return { ...state, events: [...state.events, event] };
    }
    case "UNDO_LAST":
      return { ...state, events: state.events.slice(0, -1) };
    case "REMOVE_EVENT":
      return { ...state, events: state.events.filter((event) => event.id !== action.eventId) };
    case "EDIT_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.input.eventId
            ? {
                ...event,
                playerId: action.input.player.id,
                teamId: action.input.player.teamId,
                eventType: action.input.eventType,
                value: action.input.value,
                quarter: action.input.quarter,
              }
            : event
        ),
      };
    case "SELECT_PLAYER":
      return { ...state, selectedPlayerId: action.playerId };
    case "SET_QUARTER":
      return { ...state, quarter: action.quarter };
    default:
      return state;
  }
}

export function useScorekeeper(game: Game) {
  const [state, dispatch] = useReducer(
    (state: ScorekeeperState, action: Action) => reducer(state, action, game.id),
    {
      events: [],
      quarter: game.status === "scheduled" ? 1 : game.quarter,
      selectedPlayerId: null,
    }
  );

  const addEvent = useCallback((player: Player, eventType: GameEventType, value: number) => {
    dispatch({ type: "ADD_EVENT", player, eventType, value });
  }, []);

  const undoLast = useCallback(() => dispatch({ type: "UNDO_LAST" }), []);
  const removeEvent = useCallback((eventId: string) => dispatch({ type: "REMOVE_EVENT", eventId }), []);
  const editEvent = useCallback((input: EditEventInput) => dispatch({ type: "EDIT_EVENT", input }), []);
  const selectPlayer = useCallback((playerId: string) => dispatch({ type: "SELECT_PLAYER", playerId }), []);
  const setQuarter = useCallback((quarter: number) => dispatch({ type: "SET_QUARTER", quarter }), []);

  const { homeScore, awayScore } = calculateBothTeamScores(state.events, game.id, game.homeTeamId, game.awayTeamId);
  const boxScores = calculateAllPlayerGameStats(state.events, game.id);

  return {
    events: state.events,
    quarter: state.quarter,
    selectedPlayerId: state.selectedPlayerId,
    homeScore,
    awayScore,
    boxScores,
    addEvent,
    undoLast,
    removeEvent,
    editEvent,
    selectPlayer,
    setQuarter,
  };
}
