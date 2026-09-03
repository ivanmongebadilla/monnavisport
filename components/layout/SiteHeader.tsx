"use client";

import Link from "next/link";
import { NavLink } from "./NavLink";
import { useSelectedLeague } from "@/components/league/LeagueProvider";

export function SiteHeader() {
  const { selectedLeagueId } = useSelectedLeague();
  const base = `/leagues/${selectedLeagueId}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background">
            M
          </span>
          <span className="whitespace-nowrap text-sm font-bold tracking-tight">
            MONNAVI <span className="hidden text-text-muted sm:inline">SPORTS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <NavLink href="/leagues">Ligas</NavLink>
          <NavLink href={`${base}/games`}>Partidos</NavLink>
          <NavLink href={`${base}/standings`}>Posiciones</NavLink>
          <NavLink href={`${base}/teams`}>Equipos</NavLink>
          <NavLink href={`${base}/players`}>Jugadores</NavLink>
          <NavLink href={`${base}/leaders`}>Líderes</NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/admin"
            aria-label="Administración"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-colors hover:border-foreground/30 hover:text-foreground sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 sm:hidden"
            >
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
            </svg>
            <span className="hidden text-sm font-semibold sm:inline">Administración</span>
          </Link>
        </div>
      </div>

      <div className="relative border-t border-border-subtle lg:hidden">
        <nav className="flex items-center gap-5 overflow-x-auto px-4 py-2.5">
          <NavLink href="/leagues">Ligas</NavLink>
          <NavLink href={`${base}/games`}>Partidos</NavLink>
          <NavLink href={`${base}/standings`}>Posiciones</NavLink>
          <NavLink href={`${base}/teams`}>Equipos</NavLink>
          <NavLink href={`${base}/players`}>Jugadores</NavLink>
          <NavLink href={`${base}/leaders`}>Líderes</NavLink>
        </nav>
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-surface to-transparent"
        />
      </div>
    </header>
  );
}
