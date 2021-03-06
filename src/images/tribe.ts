import { Filter, nullFilter } from "../subjects/filter";
import { PortraitProps } from "../components/memoryWall";
import { Like } from "../utils/likeMap";

export interface Tribe {
  name: string;
  color: string;
  size: number;
  priority?: number;
}

export function tribeId(t: Tribe | undefined): string {
  if (t === undefined) return "";
  return `${t.name}${t.color}`;
}

export function tribeToFilter(t: Tribe | undefined): Filter {
  const tribe = t === undefined ? nullTribe : t;
  if (t === nullTribe) return nullFilter;
  return {
    size: tribe.size,
    isPlayerDisabled: (p: PortraitProps): boolean => {
      return tribeId(p.tribe) !== tribeId(tribe);
    },
    isLikeInGroup: hasSameTribe(tribeId(tribe)),
  };
}

export const nullTribe: Tribe = { name: "", color: "", size: 0 };

function hasSameTribe(tribeId: string): (l: Like) => boolean {
  return (l: Like): boolean => {
    return l.tribeIds.has(tribeId);
  };
}
