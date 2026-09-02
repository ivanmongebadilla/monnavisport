export function formatAverage(value: number): string {
  return value.toFixed(1);
}

export function formatRecord(wins: number, losses: number): string {
  return `${wins}-${losses}`;
}

export function formatGameClock(minutes: number, seconds: number): string {
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const DATE_FORMATTER = new Intl.DateTimeFormat("es-MX", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("es-MX", {
  hour: "numeric",
  minute: "2-digit",
});

export function formatGameDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(iso));
}

export function formatGameTime(iso: string): string {
  return TIME_FORMATTER.format(new Date(iso));
}

export function formatOrdinal(n: number): string {
  return `${n}.er`;
}

export function formatQuarterLabel(quarter: number): string {
  if (quarter <= 4) return `${quarter}${quarter === 1 ? "er" : quarter === 2 ? "do" : quarter === 3 ? "er" : "to"} Cuarto`;
  return `T. Extra ${quarter - 4}`;
}

export function formatHeight(cm: number): string {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${cm} cm (${feet}'${inches}")`;
}
