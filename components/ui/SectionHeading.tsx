import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-text-faint">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 text-sm font-semibold text-text-muted transition-colors hover:text-foreground"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}
