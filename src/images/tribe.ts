export interface Tribe {
  name: string;
  color: string;
}

export function tribeId(t: Tribe): string {
  return `${t.name}${t.color}`;
}
