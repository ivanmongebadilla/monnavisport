"use client";

import { useState, useRef, useEffect } from "react";
import { LEAGUES } from "@/data/mock";
import { useSelectedLeague } from "./LeagueProvider";
import { cn } from "@/lib/utils/cn";

export function LeagueSelector() {
  const { selectedLeagueId, setSelectedLeagueId } = useSelectedLeague();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = LEAGUES.find((league) => league.id === selectedLeagueId) ?? LEAGUES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border-subtle bg-surface px-2.5 py-1.5 text-xs font-semibold transition-colors hover:border-foreground/30 sm:px-3 sm:text-sm"
      >
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: current.colorPrimary }} />
        {current.shortName}
        <span className="text-text-faint">▾</span>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-lg shadow-black/5">
          {LEAGUES.map((league) => (
            <button
              key={league.id}
              type="button"
              onClick={() => {
                setSelectedLeagueId(league.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-surface-muted",
                league.id === selectedLeagueId && "bg-surface-muted"
              )}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: league.colorPrimary }} />
              {league.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
