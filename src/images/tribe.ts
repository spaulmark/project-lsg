export interface Tribe {
  name: string;
  color: string;
  size: number;
}

export function tribeId(t: Tribe | undefined): string {
  if (t === undefined) return "";
  return `${t.name}${t.color}`;
}

export const nullTribe: Tribe = { name: "", color: "", size: 0 };
