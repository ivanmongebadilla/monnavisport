"use client";

import { useCallback, useReducer, useRef } from "react";
import { calculateAllPlayerGameStats } from "@/lib/calculations/playerStats";
import { calculateBothTeamScores } from "@/lib/calculations/teamScore";
import { formatGameClock } from "@/lib/utils/format";
import type { Game, GameEvent, GameEventType, Player } from "@/types";

interface ScorekeeperState {
  events: GameEvent[];
  quarter: number;
  clockSeconds: number;
  running: boolean;
  selectedPlayerId: string | null;
}

type Action =
  | { type: "ADD_EVENT"; player: Player; eventType: GameEventType; value: number }
  | { type: "UNDO_LAST" }
  | { type: "REMOVE_EVENT"; eventId: string }
  | { type: "SELECT_PLAYER"; playerId: string }
  | { type: "SET_QUARTER"; quarter: number }
  | { type: "ADJUST_CLOCK"; deltaSeconds: number }
  | { type: "TOGGLE_CLOCK" }
  | { type: "TICK" };

const QUARTER_SECONDS = 600;

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
        gameClock: formatGameClock(Math.floor(state.clockSeconds / 60), state.clockSeconds % 60),
        timestamp: new Date().toISOString(),
      };
      return { ...state, events: [...state.events, event] };
    }
    case "UNDO_LAST":
      return { ...state, events: state.events.slice(0, -1) };
    case "REMOVE_EVENT":
      return { ...state, events: state.events.filter((event) => event.id !== action.eventId) };
    case "SELECT_PLAYER":
      return { ...state, selectedPlayerId: action.playerId };
    case "SET_QUARTER":
      return { ...state, quarter: action.quarter, clockSeconds: QUARTER_SECONDS, running: false };
    case "ADJUST_CLOCK":
      return { ...state, clockSeconds: Math.max(0, Math.min(QUARTER_SECONDS, state.clockSeconds + action.deltaSeconds)) };
    case "TOGGLE_CLOCK":
      return { ...state, running: !state.running };
    case "TICK":
      if (!state.running) return state;
      if (state.clockSeconds <= 0) return { ...state, running: false };
      return { ...state, clockSeconds: state.clockSeconds - 1 };
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
      clockSeconds: QUARTER_SECONDS,
      running: false,
      selectedPlayerId: null,
    }
  );

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTicking = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => dispatch({ type: "TICK" }), 1000);
  }, []);

  const stopTicking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const toggleClock = useCallback(() => {
    dispatch({ type: "TOGGLE_CLOCK" });
    if (state.running) stopTicking();
    else startTicking();
  }, [state.running, startTicking, stopTicking]);

  const addEvent = useCallback((player: Player, eventType: GameEventType, value: number) => {
    dispatch({ type: "ADD_EVENT", player, eventType, value });
  }, []);

  const undoLast = useCallback(() => dispatch({ type: "UNDO_LAST" }), []);
  const removeEvent = useCallback((eventId: string) => dispatch({ type: "REMOVE_EVENT", eventId }), []);
  const selectPlayer = useCallback((playerId: string) => dispatch({ type: "SELECT_PLAYER", playerId }), []);
  const setQuarter = useCallback((quarter: number) => {
    stopTicking();
    dispatch({ type: "SET_QUARTER", quarter });
  }, [stopTicking]);
  const adjustClock = useCallback((deltaSeconds: number) => dispatch({ type: "ADJUST_CLOCK", deltaSeconds }), []);

  const { homeScore, awayScore } = calculateBothTeamScores(state.events, game.id, game.homeTeamId, game.awayTeamId);
  const boxScores = calculateAllPlayerGameStats(state.events, game.id);

  return {
    events: state.events,
    quarter: state.quarter,
    clockSeconds: state.clockSeconds,
    running: state.running,
    selectedPlayerId: state.selectedPlayerId,
    homeScore,
    awayScore,
    boxScores,
    addEvent,
    undoLast,
    removeEvent,
    selectPlayer,
    setQuarter,
    adjustClock,
    toggleClock,
  };
}
