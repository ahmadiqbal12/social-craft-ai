export type ClassValue = string | number | null | undefined | false;

/** Tiny classnames joiner, no dependency needed. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
