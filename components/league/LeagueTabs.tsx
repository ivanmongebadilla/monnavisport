"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LeagueSwitcher } from "./LeagueSwitcher";
import { cn } from "@/lib/utils/cn";

export function LeagueTabs({ leagueId }: { leagueId: string }) {
  const pathname = usePathname();
  const base = `/leagues/${leagueId}`;

  const tabs = [
    { href: base, label: "Resumen", exact: true },
    { href: `${base}/standings`, label: "Posiciones" },
    { href: `${base}/games`, label: "Partidos" },
    { href: `${base}/teams`, label: "Equipos" },
    { href: `${base}/players`, label: "Jugadores" },
    { href: `${base}/leaders`, label: "Líderes" },
  ];

  return (
    <div className="flex flex-col gap-2 border-b border-border-subtle pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-0">
      <div className="relative min-w-0">
        <nav className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "shrink-0 whitespace-nowrap border-b-2 py-3 text-sm font-semibold transition-colors",
                  isActive ? "border-foreground text-foreground" : "border-transparent text-text-muted hover:text-foreground"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent sm:hidden"
        />
      </div>
      <div className="shrink-0 self-start pb-2 sm:self-auto sm:pb-0">
        <LeagueSwitcher currentLeagueId={leagueId} />
      </div>
    </div>
  );
}
