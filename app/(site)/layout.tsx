import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LeagueProvider } from "@/components/league/LeagueProvider";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LeagueProvider>
      <div className="flex min-h-full flex-1 flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </LeagueProvider>
  );
}
