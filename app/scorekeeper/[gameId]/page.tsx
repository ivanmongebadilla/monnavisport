import { notFound } from "next/navigation";
import { ScorekeeperPanel } from "@/components/scorekeeper/ScorekeeperPanel";
import { getGameById, getTeamById, getPlayersByTeam } from "@/data/mock";

export default async function ScorekeeperPage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;
  const game = getGameById(gameId);
  if (!game) notFound();

  const homeTeam = getTeamById(game.homeTeamId);
  const awayTeam = getTeamById(game.awayTeamId);
  if (!homeTeam || !awayTeam) notFound();

  const homePlayers = getPlayersByTeam(game.homeTeamId);
  const awayPlayers = getPlayersByTeam(game.awayTeamId);

  return (
    <ScorekeeperPanel game={game} homeTeam={homeTeam} awayTeam={awayTeam} homePlayers={homePlayers} awayPlayers={awayPlayers} />
  );
}
