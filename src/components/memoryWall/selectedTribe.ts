import { Tribe, tribeId, nullTribe } from "../../images/tribe";
import { selectedTribe$ } from "../../subjects/subjects";
import {
  getSelectedPlayers,
  emptySet,
  selectedPlayer$,
} from "../../subjects/selectedPlayer$";

export function selectTribe(t: Tribe) {
  if (tribeId(t) === tribeId(selectedTribe$.value)) {
    selectedTribe$.next(nullTribe);
  } else {
    selectedTribe$.next(t);
    const selectedPlayers = getSelectedPlayers();
    const newSelectedPlayers = emptySet();
    selectedPlayers.forEach((player) => {
      const tribe = player.tribe || nullTribe;
      if (tribeId(tribe) === tribeId(t)) {
        newSelectedPlayers.set(player.id, player);
      }
    });
    selectedPlayer$.next(newSelectedPlayers);
  }
}
