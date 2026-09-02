import { cn } from "@/lib/utils/cn";
import type { Team } from "@/types";

const SIZE_CLASSES = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-24 w-24 text-2xl",
};

export function TeamLogo({
  team,
  size = "md",
  className,
}: {
  team: Pick<Team, "initials" | "colorPrimary" | "colorSecondary">;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg font-bold tracking-tight text-white",
        SIZE_CLASSES[size],
        className
      )}
      style={{
        backgroundColor: team.colorPrimary,
        boxShadow: `inset 0 -3px 0 0 ${team.colorSecondary}`,
      }}
    >
      {team.initials}
    </span>
  );
}
