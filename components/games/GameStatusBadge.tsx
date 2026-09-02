import { Badge } from "@/components/ui/Badge";
import { formatGameDate, formatGameTime } from "@/lib/utils/format";
import type { Game } from "@/types";

export function GameStatusBadge({ game }: { game: Game }) {
  if (game.status === "live") {
    return (
      <Badge tone="live">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
        En vivo
      </Badge>
    );
  }
  if (game.status === "final") {
    return <Badge tone="neutral">Final</Badge>;
  }
  return (
    <Badge tone="neutral">
      {formatGameDate(game.date)} · {formatGameTime(game.date)}
    </Badge>
  );
}
