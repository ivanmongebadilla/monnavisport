"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap text-sm font-semibold transition-colors",
        isActive ? "text-foreground" : "text-text-muted hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}
