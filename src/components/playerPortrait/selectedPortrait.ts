import { RelationshipMap, DiscreteRelationshipMap } from "../../utils";
import { getSelectedPlayer, selectedPlayer$ } from "../../subjects/subjects";

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
    (getSelectedPlayer() && getSelectedPlayer()!.id === player.id)
  ) {
    selectedPlayer$.next(null);
  } else {
    selectedPlayer$.next(player);
  }
}
