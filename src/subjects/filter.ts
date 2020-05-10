import { PortraitProps } from "../components/memoryWall";
import { BehaviorSubject } from "rxjs";
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

export const selectedFilter$ = new BehaviorSubject<Filter>(nullFilter);
