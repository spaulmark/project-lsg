import { BehaviorSubject } from "rxjs";
import { SelectedPlayerData } from "../components/playerPortrait/selectedPortrait";
import { getSelectedPlayers } from "./subjects";
// The player that the user has clicked on.

export type PlayerSet = Set<SelectedPlayerData>;

export const emptySet = new Set<SelectedPlayerData>();

export const selectedPlayer$ = new BehaviorSubject<PlayerSet>(emptySet);

export function getOnlySelectedPlayerOrNull(
  x?: PlayerSet | undefined
): SelectedPlayerData | null {
  const s = x || getSelectedPlayers();
  if (s.size !== 1) return null;
  for (let entry of s.entries()) {
    return entry[0];
  }
  return null; // unreachable code
}
