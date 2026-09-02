"use client";

import Link from "next/link";
import { NavLink } from "./NavLink";
import { LeagueSelector } from "@/components/league/LeagueSelector";
import { useSelectedLeague } from "@/components/league/LeagueProvider";

export function SiteHeader() {
  const { selectedLeagueId } = useSelectedLeague();
  const base = `/leagues/${selectedLeagueId}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background">
            M
          </span>
          <span className="text-sm font-bold tracking-tight">
            MONNAVI <span className="text-text-muted">SPORTS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/leagues">Ligas</NavLink>
          <NavLink href={`${base}/games`}>Partidos</NavLink>
          <NavLink href={`${base}/standings`}>Posiciones</NavLink>
          <NavLink href={`${base}/teams`}>Equipos</NavLink>
          <NavLink href={`${base}/players`}>Jugadores</NavLink>
          <NavLink href={`${base}/leaders`}>Líderes</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <LeagueSelector />
          <Link
            href="/admin"
            className="hidden rounded-full border border-border-subtle px-3 py-1.5 text-sm font-semibold text-text-muted transition-colors hover:border-foreground/30 hover:text-foreground sm:block"
          >
            Administración
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-5 overflow-x-auto border-t border-border-subtle px-4 py-2.5 md:hidden">
        <NavLink href="/leagues">Ligas</NavLink>
        <NavLink href={`${base}/games`}>Partidos</NavLink>
        <NavLink href={`${base}/standings`}>Posiciones</NavLink>
        <NavLink href={`${base}/teams`}>Equipos</NavLink>
        <NavLink href={`${base}/players`}>Jugadores</NavLink>
        <NavLink href={`${base}/leaders`}>Líderes</NavLink>
      </nav>
    </header>
  );
}
