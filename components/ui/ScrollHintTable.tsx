"use client";

import { useRef, useState, type UIEvent } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Wraps a wide table in a horizontally-scrollable container and shows an
 * edge fade + "desliza" hint on mobile whenever there's more content off
 * to the right — otherwise a scrollable stats table just looks cut off with
 * no clue it can be swiped.
 */
export function ScrollHintTable({ children, className }: { children: React.ReactNode; className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={cn("overflow-x-auto rounded-xl border border-border-subtle", className)}
      >
        {children}
      </div>
      {canScrollRight && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-10 rounded-r-xl bg-gradient-to-l from-background to-transparent sm:hidden"
        />
      )}
    </div>
  );
}
