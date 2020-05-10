import { RelationshipMap, DiscreteRelationshipMap } from "../../utils";
import {
  selectedPlayer$,
  emptySet,
  getOnlySelectedPlayerOrNull,
} from "../../subjects/selectedPlayer$";

export interface SelectedPlayerData {
  id: number;
  popularity: number;
  relationships: RelationshipMap | DiscreteRelationshipMap;
  powerRankings: DiscreteRelationshipMap;
  isEvicted: boolean;
  superiors?: Set<number>;
}

export function selectPlayer(player: SelectedPlayerData | null) {
  if (
    !player ||
    (getOnlySelectedPlayerOrNull() &&
      getOnlySelectedPlayerOrNull()!.id === player.id)
  ) {
    selectedPlayer$.next(emptySet);
  } else {
    selectedPlayer$.next(new Set<SelectedPlayerData>().add(player));
  }
}
