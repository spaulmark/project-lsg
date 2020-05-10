export interface Like {
  tribeId: string;
  id: number;
}

export interface Likemap {
  [id: number]: Like;
}

export function sizeOf(l: Likemap) {
  return Object.keys(l).length;
}
