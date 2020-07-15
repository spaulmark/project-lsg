import { BehaviorSubject } from "rxjs";
import { SelectedPlayerData } from "../components/playerPortrait/selectedPortrait";
// The player that the user has clicked on.

export type PlayerSet = Map<number, SelectedPlayerData>;

export function emptySet() {
  return new Map<number, SelectedPlayerData>();
}

export const selectedPlayer$ = new BehaviorSubject<PlayerSet>(emptySet());

export function getOnlySelectedPlayerOrNull(
  x?: PlayerSet
): SelectedPlayerData | null {
  const s = x || getSelectedPlayers();
  if (s.size !== 1) return null;
  for (let entry of s.entries()) {
    return entry[1];
  }
  return null; // unreachable code but the compiler can't understand that
}

export const enableMultiSelection$ = new BehaviorSubject<boolean>(false);

export function toggleMultiSelection() {
  enableMultiSelection$.next(!enableMultiSelection$.value);
}

export function multiSelection(): boolean {
  return enableMultiSelection$.value;
}

export function getSelectedPlayers(): PlayerSet {
  return selectedPlayer$.value;
}
