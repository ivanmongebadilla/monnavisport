export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle px-6 py-12 text-center">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
    </div>
  );
}
