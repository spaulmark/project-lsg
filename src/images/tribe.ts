export interface Tribe {
  name: string;
  color: string;
}

export function tribeId(t: Tribe | undefined): string {
  if (t === undefined) return "";
  return `${t.name}${t.color}`;
}
