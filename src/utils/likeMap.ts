export interface Likemap {
  [id: number]: {
    tribeId: string;
    groups: Set<number>;
  };
}

export function sizeOf(l: Likemap) {
  return Object.keys(l).length;
}
