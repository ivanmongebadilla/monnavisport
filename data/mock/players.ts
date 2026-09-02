import type { Player, PlayerPosition } from "@/types";
import { createSeededRandom, hashStringToSeed, randomInt, shuffle } from "@/lib/utils/random";
import { slugify } from "@/lib/utils/slug";
import { FIRST_NAMES, HOMETOWNS, LAST_NAMES } from "./names";
import { TEAMS } from "./teams";

const ROSTER_POSITIONS: PlayerPosition[] = ["PG", "SG", "SF", "PF", "C", "PG", "SG", "SF", "PF"];

const LEAGUE_AGE_RANGE: Record<string, [number, number]> = {
  novatos: [2009, 2011],
  "segunda-fuerza": [2003, 2008],
  "primera-fuerza": [1993, 2002],
};

const POSITION_HEIGHT_RANGE: Record<PlayerPosition, [number, number]> = {
  PG: [165, 180],
  SG: [172, 185],
  SF: [178, 192],
  PF: [185, 198],
  C: [190, 208],
};

function generatePlayersForTeam(teamId: string, leagueId: string, seasonId: string): Player[] {
  const rng = createSeededRandom(hashStringToSeed(teamId));
  const jerseyPool = shuffle(rng, Array.from({ length: 45 }, (_, i) => i)).slice(0, ROSTER_POSITIONS.length);
  const [minYear, maxYear] = LEAGUE_AGE_RANGE[leagueId] ?? [1995, 2005];

  const usedNames = new Set<string>();

  return ROSTER_POSITIONS.map((position, index) => {
    let firstName = "";
    let lastName = "";
    let attempt = 0;
    do {
      firstName = FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)];
      lastName = LAST_NAMES[Math.floor(rng() * LAST_NAMES.length)];
      attempt += 1;
    } while (usedNames.has(`${firstName} ${lastName}`) && attempt < 20);
    usedNames.add(`${firstName} ${lastName}`);

    const fullName = `${firstName} ${lastName}`;
    const [minHeight, maxHeight] = POSITION_HEIGHT_RANGE[position];

    const player: Player = {
      id: `${teamId}-p${index + 1}`,
      teamId,
      leagueId,
      seasonId,
      slug: "",
      firstName,
      lastName,
      fullName,
      jerseyNumber: jerseyPool[index],
      position,
      heightCm: randomInt(rng, minHeight, maxHeight),
      birthYear: randomInt(rng, minYear, maxYear),
      hometown: HOMETOWNS[Math.floor(rng() * HOMETOWNS.length)],
      initials: `${firstName[0]}${lastName[0]}`,
    };

    return player;
  });
}

/**
 * Slugs are assigned globally (not per team) so URLs stay clean —
 * /players/juan-perez — with a numeric suffix only when two players
 * across the whole league share a name.
 */
function assignUniqueSlugs(players: Player[]): Player[] {
  const usedSlugs = new Map<string, number>();
  return players.map((player) => {
    const base = slugify(player.fullName);
    const count = usedSlugs.get(base) ?? 0;
    usedSlugs.set(base, count + 1);
    return { ...player, slug: count === 0 ? base : `${base}-${count + 1}` };
  });
}

export const PLAYERS: Player[] = assignUniqueSlugs(
  TEAMS.flatMap((team) => generatePlayersForTeam(team.id, team.leagueId, team.seasonId))
);

export function getPlayerById(playerId: string): Player | undefined {
  return PLAYERS.find((player) => player.id === playerId);
}

export function getPlayerBySlug(slug: string): Player | undefined {
  return PLAYERS.find((player) => player.slug === slug);
}

export function getPlayersByTeam(teamId: string): Player[] {
  return PLAYERS.filter((player) => player.teamId === teamId).sort((a, b) => a.jerseyNumber - b.jerseyNumber);
}
