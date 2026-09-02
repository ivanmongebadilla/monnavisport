import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border-subtle bg-surface", className)}>{children}</div>
  );
}

export function CardLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-xl border border-border-subtle bg-surface transition-colors hover:border-foreground/30",
        className
      )}
    >
      {children}
    </Link>
  );
}
