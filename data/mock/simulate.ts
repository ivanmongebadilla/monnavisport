import type { Game, GameEvent, GameEventType, Player } from "@/types";
import { createSeededRandom, hashStringToSeed, pick, randomInt, weightedPick } from "@/lib/utils/random";
import { formatGameClock } from "@/lib/utils/format";

const QUARTER_SECONDS = 600;
const QUARTERS = 4;

type Outcome = "MAKE_2" | "MAKE_3" | "MISS" | "TURNOVER" | "FOUL";

const SHOOTER_WEIGHT: Record<Player["position"], number> = {
  PG: 1.1,
  SG: 1.3,
  SF: 1.2,
  PF: 1.0,
  C: 0.8,
};

const THREE_POINT_WEIGHT: Record<Player["position"], number> = {
  PG: 1.5,
  SG: 1.6,
  SF: 1.1,
  PF: 0.5,
  C: 0.2,
};

const REBOUND_WEIGHT: Record<Player["position"], number> = {
  PG: 0.5,
  SG: 0.6,
  SF: 0.9,
  PF: 1.4,
  C: 1.6,
};

function weightedPlayer(rng: () => number, roster: Player[], weights: Record<Player["position"], number>): Player {
  return weightedPick(
    rng,
    roster.map((player): [Player, number] => [player, weights[player.position]])
  );
}

function makeEvent(
  gameId: string,
  player: Player,
  eventType: GameEventType,
  value: number,
  quarter: number,
  clockSeconds: number,
  baseTimestampMs: number,
  elapsedSeconds: number
): GameEvent {
  return {
    id: `${gameId}-ev${Math.round(elapsedSeconds * 1000 + player.jerseyNumber)}-${eventType}`,
    gameId,
    playerId: player.id,
    teamId: player.teamId,
    eventType,
    value,
    quarter,
    gameClock: formatGameClock(Math.floor(clockSeconds / 60), Math.floor(clockSeconds % 60)),
    timestamp: new Date(baseTimestampMs + elapsedSeconds * 1000).toISOString(),
  };
}

/**
 * Simulates a full game possession-by-possession and returns the resulting
 * GameEvent log. This is the only place points, rebounds, assists, etc. are
 * "decided" — everything downstream (scores, standings, leaders, Player of
 * the Game) is derived from this log by the calculation functions.
 */
export function simulateGame(game: Game, homeRoster: Player[], awayRoster: Player[]): GameEvent[] {
  const rng = createSeededRandom(hashStringToSeed(game.id));
  const events: GameEvent[] = [];
  const baseTimestampMs = new Date(game.date).getTime();
  let idCounter = 0;

  const push = (
    player: Player,
    eventType: GameEventType,
    value: number,
    quarter: number,
    clockSeconds: number,
    elapsedSeconds: number
  ) => {
    idCounter += 1;
    events.push({
      ...makeEvent(game.id, player, eventType, value, quarter, clockSeconds, baseTimestampMs, elapsedSeconds),
      id: `${game.id}-ev${idCounter}`,
    });
  };

  let elapsedSeconds = 0;

  for (let quarter = 1; quarter <= QUARTERS; quarter++) {
    let clock = QUARTER_SECONDS;
    let offenseIsHome = quarter % 2 === 1;

    while (clock > 0) {
      const possessionLength = randomInt(rng, 10, 26);
      clock -= possessionLength;
      elapsedSeconds += possessionLength;
      if (clock < 0) clock = 0;

      const offenseRoster = offenseIsHome ? homeRoster : awayRoster;
      const defenseRoster = offenseIsHome ? awayRoster : homeRoster;

      const outcome = weightedPick<Outcome>(rng, [
        ["MAKE_2", 30],
        ["MAKE_3", 12],
        ["MISS", 28],
        ["TURNOVER", 15],
        ["FOUL", 15],
      ]);

      if (outcome === "MAKE_2") {
        const shooter = weightedPlayer(rng, offenseRoster, SHOOTER_WEIGHT);
        push(shooter, "TWO_POINT", 2, quarter, clock, elapsedSeconds);
        if (rng() < 0.55) {
          const passer = pick(rng, offenseRoster.filter((p) => p.id !== shooter.id));
          push(passer, "ASSIST", 1, quarter, clock, elapsedSeconds);
        }
        offenseIsHome = !offenseIsHome;
      } else if (outcome === "MAKE_3") {
        const shooter = weightedPlayer(rng, offenseRoster, THREE_POINT_WEIGHT);
        push(shooter, "THREE_POINT", 3, quarter, clock, elapsedSeconds);
        if (rng() < 0.65) {
          const passer = pick(rng, offenseRoster.filter((p) => p.id !== shooter.id));
          push(passer, "ASSIST", 1, quarter, clock, elapsedSeconds);
        }
        offenseIsHome = !offenseIsHome;
      } else if (outcome === "MISS") {
        if (rng() < 0.15) {
          const blocker = weightedPlayer(rng, defenseRoster, REBOUND_WEIGHT);
          push(blocker, "BLOCK", 1, quarter, clock, elapsedSeconds);
        }
        const offensiveRebound = rng() < 0.25;
        const rebounder = offensiveRebound
          ? weightedPlayer(rng, offenseRoster, REBOUND_WEIGHT)
          : weightedPlayer(rng, defenseRoster, REBOUND_WEIGHT);
        push(rebounder, "REBOUND", 1, quarter, clock, elapsedSeconds);
        if (!offensiveRebound) offenseIsHome = !offenseIsHome;
      } else if (outcome === "TURNOVER") {
        const offender = pick(rng, offenseRoster);
        push(offender, "TURNOVER", 1, quarter, clock, elapsedSeconds);
        if (rng() < 0.45) {
          const defender = pick(rng, defenseRoster);
          push(defender, "STEAL", 1, quarter, clock, elapsedSeconds);
        }
        offenseIsHome = !offenseIsHome;
      } else {
        const shooter = weightedPlayer(rng, offenseRoster, SHOOTER_WEIGHT);
        const defender = pick(rng, defenseRoster);
        push(defender, "FOUL", 1, quarter, clock, elapsedSeconds);

        const freeThrows = rng() < 0.5 ? 2 : 1;
        let lastMissed = false;
        for (let ft = 0; ft < freeThrows; ft++) {
          const made = rng() < 0.72;
          if (made) {
            push(shooter, "FREE_THROW", 1, quarter, clock, elapsedSeconds);
            lastMissed = false;
          } else {
            lastMissed = true;
          }
        }
        if (lastMissed && rng() < 0.7) {
          const offensiveRebound = rng() < 0.2;
          const rebounder = offensiveRebound
            ? weightedPlayer(rng, offenseRoster, REBOUND_WEIGHT)
            : weightedPlayer(rng, defenseRoster, REBOUND_WEIGHT);
          push(rebounder, "REBOUND", 1, quarter, clock, elapsedSeconds);
          if (!offensiveRebound) offenseIsHome = !offenseIsHome;
        } else {
          offenseIsHome = !offenseIsHome;
        }
      }
    }
  }

  return events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}
