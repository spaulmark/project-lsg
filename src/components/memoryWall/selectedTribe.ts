import { Tribe, tribeId, nullTribe } from "../../images/tribe";
import { selectedTribe$ } from "../../subjects/subjects";

export function selectTribe(t: Tribe) {
  if (tribeId(t) === tribeId(selectedTribe$.value)) {
    selectedTribe$.next(nullTribe);
  } else {
    selectedTribe$.next(t);
  }
}
