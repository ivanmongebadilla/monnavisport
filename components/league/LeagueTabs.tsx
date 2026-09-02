"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <nav className="flex gap-6 overflow-x-auto border-b border-border-subtle">
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
  );
}
