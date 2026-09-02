import { cn } from "@/lib/utils/cn";

const SIZE_CLASSES = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-20 w-20 text-xl",
  xl: "h-32 w-32 text-3xl",
};

export function PlayerAvatar({
  initials,
  colorPrimary,
  size = "md",
  className,
}: {
  initials: string;
  colorPrimary?: string;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border-2 font-bold tracking-tight",
        SIZE_CLASSES[size],
        className
      )}
      style={{
        borderColor: colorPrimary ?? "#e5e5e5",
        color: colorPrimary ?? "#171717",
        backgroundColor: colorPrimary ? `${colorPrimary}14` : "#fafafa",
      }}
    >
      {initials}
    </span>
  );
}
