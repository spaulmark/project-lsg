import { PortraitProps } from "../components/memoryWall";
import { Like } from "../utils/likeMap";

export interface Filter {
  size: number;
  isPlayerDisabled: (p: PortraitProps) => boolean;
  isLikeInGroup: (l: Like) => boolean;
}

export const nullFilter: Filter = {
  size: -1,
  isPlayerDisabled: (_: any) => false,
  isLikeInGroup: (_: any) => true,
};

export function compose(tribe: Filter, selected: Filter): Filter {
  const size = tribe.size < 1 ? selected.size : tribe.size - selected.size;
  return {
    size,
    isPlayerDisabled: (p) =>
      tribe.isPlayerDisabled(p) || selected.isPlayerDisabled(p),
    isLikeInGroup: (p) => tribe.isLikeInGroup(p) && selected.isLikeInGroup(p),
  };
}
