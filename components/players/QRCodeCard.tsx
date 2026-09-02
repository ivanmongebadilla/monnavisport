import QRCode from "qrcode";
import { getPlayerProfileUrl } from "@/lib/utils/config";
import type { Player } from "@/types";

export async function QRCodeCard({ player }: { player: Player }) {
  const url = getPlayerProfileUrl(player.slug);
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 0,
    color: { dark: "#0a0a0a", light: "#00000000" },
  });

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-faint">Perfil digital</p>
      <div
        className="mx-auto mt-4 h-40 w-40 [&>svg]:h-full [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p className="mt-4 break-all text-xs font-medium text-text-muted">{url}</p>
    </div>
  );
}
