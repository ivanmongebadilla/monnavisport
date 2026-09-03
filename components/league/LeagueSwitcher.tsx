"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LEAGUES } from "@/data/mock";
import { useSelectedLeague } from "./LeagueProvider";
import { cn } from "@/lib/utils/cn";

/**
 * Lives inside a league page's own tab bar (LeagueTabs). Switching leagues
 * here navigates to the equivalent page for the new league — e.g. switching
 * while on Posiciones takes you to that league's Posiciones, not its home —
 * and keeps the site-wide "last viewed league" (used by the header's global
 * nav) in sync.
 */
export function LeagueSwitcher({ currentLeagueId }: { currentLeagueId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { selectedLeagueId, setSelectedLeagueId } = useSelectedLeague();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = LEAGUES.find((league) => league.id === currentLeagueId) ?? LEAGUES[0];

  useEffect(() => {
    if (selectedLeagueId !== currentLeagueId) {
      setSelectedLeagueId(currentLeagueId);
    }
    // Only re-sync when the URL's league changes, not on every context update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLeagueId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (leagueId: string) => {
    setOpen(false);
    if (leagueId === currentLeagueId) return;
    const newPath = pathname.replace(`/leagues/${currentLeagueId}`, `/leagues/${leagueId}`);
    const query = searchParams.toString();
    setSelectedLeagueId(leagueId);
    router.push(query ? `${newPath}?${query}` : newPath);
  };

  return (
    <div className="relative shrink-0" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border-subtle bg-surface px-3 py-1.5 text-sm font-semibold transition-colors hover:border-foreground/30"
      >
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: current.colorPrimary }} />
        {current.shortName}
        <span className="text-text-faint">▾</span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-lg shadow-black/5"
        >
          {LEAGUES.map((league) => (
            <button
              key={league.id}
              type="button"
              role="option"
              aria-selected={league.id === currentLeagueId}
              onClick={() => handleSelect(league.id)}
              className={cn(
                "flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-surface-muted",
                league.id === currentLeagueId && "bg-surface-muted"
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
