import { Tribe, tribeId } from "../../images/tribe";
import { selectedTribe$ } from "../../subjects/subjects";

export function selectTribe(t: Tribe) {
  if (tribeId(t) === selectedTribe$.value) {
    selectedTribe$.next("");
  } else selectedTribe$.next(tribeId(t));
}
