"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LEAGUES } from "@/data/mock";

const STORAGE_KEY = "monnavi-selected-league";
const DEFAULT_LEAGUE_ID = "primera-fuerza";

interface LeagueContextValue {
  selectedLeagueId: string;
  setSelectedLeagueId: (leagueId: string) => void;
}

const LeagueContext = createContext<LeagueContextValue | null>(null);

export function LeagueProvider({ children }: { children: React.ReactNode }) {
  const [selectedLeagueId, setSelectedLeagueIdState] = useState(DEFAULT_LEAGUE_ID);

  useEffect(() => {
    // Reads localStorage after mount (not in the useState initializer) so the
    // first client render matches the server-rendered default and avoids a
    // hydration mismatch; the resulting setState is expected here.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LEAGUES.some((league) => league.id === stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedLeagueIdState(stored);
    }
  }, []);

  const setSelectedLeagueId = (leagueId: string) => {
    setSelectedLeagueIdState(leagueId);
    window.localStorage.setItem(STORAGE_KEY, leagueId);
  };

  const value = useMemo(() => ({ selectedLeagueId, setSelectedLeagueId }), [selectedLeagueId]);

  return <LeagueContext.Provider value={value}>{children}</LeagueContext.Provider>;
}

export function useSelectedLeague() {
  const context = useContext(LeagueContext);
  if (!context) throw new Error("useSelectedLeague must be used within LeagueProvider");
  return context;
}
