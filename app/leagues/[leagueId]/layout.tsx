import { notFound } from "next/navigation";
import { LeagueHeader } from "@/components/league/LeagueHeader";
import { LeagueTabs } from "@/components/league/LeagueTabs";
import { getLeagueById, getCurrentSeason } from "@/data/mock";

export default async function LeagueLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ leagueId: string }>;
}) {
  const { leagueId } = await params;
  const league = getLeagueById(leagueId);
  if (!league) notFound();
  const season = getCurrentSeason(leagueId);

  return (
    <div>
      <LeagueHeader league={league} season={season} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <LeagueTabs leagueId={leagueId} />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
