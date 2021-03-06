import { RelationshipMap, DiscreteRelationshipMap } from "../../utils";
import {
  selectedPlayer$,
  emptySet,
  getOnlySelectedPlayerOrNull,
  multiSelection,
  getSelectedPlayers,
} from "../../subjects/selectedPlayer$";
import { Tribe } from "../../images/tribe";

export interface SelectedPlayerData {
  id: number;
  // popularity: number;
  relationships: RelationshipMap | DiscreteRelationshipMap;
  isEvicted: boolean;
  superiors?: Set<number>;
  tribe: Tribe | null;
}

function selectWithMultiSelection(player: SelectedPlayerData) {
  const map = getSelectedPlayers();
  if (map.get(player.id)) {
    map.delete(player.id);
    selectedPlayer$.next(map);
  } else {
    selectedPlayer$.next(map.set(player.id, player));
  }
}

function selectWithoutMultiSelection(player: SelectedPlayerData) {
  const data = getOnlySelectedPlayerOrNull();
  if (data && data.id === player.id) {
    selectedPlayer$.next(emptySet());
  } else {
    selectedPlayer$.next(
      new Map<number, SelectedPlayerData>().set(player.id, player)
    );
  }
}

export function selectPlayer(player: SelectedPlayerData | null) {
  if (!player) {
    selectedPlayer$.next(emptySet());
    return;
  }
  multiSelection()
    ? selectWithMultiSelection(player)
    : selectWithoutMultiSelection(player);
}
