import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-bold tracking-tight">MONNAVI SPORTS</p>
          <p className="mt-1 text-sm text-text-muted">
            Un producto de MONNAVI · Software · IA · Automatización · IoT
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm text-text-muted">
          <Link href="/leagues" className="hover:text-foreground">Ligas</Link>
          <Link href="/admin" className="hover:text-foreground">Administración</Link>
          <span>Caborca, Sonora</span>
        </div>
      </div>
    </footer>
  );
}
