import { BehaviorSubject, Subject } from "rxjs";
import { MemoryWallScreen } from "../components/memoryWallScreen/memoryWallScreen";
import { Episode, PlayerProfile } from "../model";
import React from "react";
import {
  PortraitDisplayMode,
  popularityMode,
} from "../model/portraitDisplayMode";
import { ColorTheme } from "../theme/theme";
import { ProfileHouseguest } from "../components/memoryWall";
import { Tribe, nullTribe, tribeId } from "../images/tribe";
import {
  emptySet,
  getSelectedPlayers,
  selectedPlayer$,
} from "./selectedPlayer$";
import { selectTribe } from "../components/memoryWall/selectedTribe";

// What is currently being displayed.
export const mainContentStream$ = new BehaviorSubject(<MemoryWallScreen />);
// Push episodes to this subject to add them to the sidebar. Null resets everything.
export const episodes$ = new BehaviorSubject<Episode | null>(null);
// Forcibly switches to an episode. Used when adding a new episode.
export const switchEpisode$ = new Subject<number>();
export function newEpisode(episode: Episode | null) {
  episodes$.next(episode);
}
export function switchSceneRelative(n: number) {
  switchEpisode$.next(n);
}

export const selectedTribe$ = new BehaviorSubject<Tribe>(nullTribe);

export const players$ = new BehaviorSubject<ProfileHouseguest[]>([]);

export function players$Next(next: ProfileHouseguest[]) {
  let tribeValidated = false;
  let validatedPlayers = emptySet();
  const selectedTribe = selectedTribe$.value;
  const selectedPlayers = getSelectedPlayers();
  next.forEach((hg) => {
    if (!tribeValidated && tribeId(hg.tribe) === tribeId(selectedTribe)) {
      tribeValidated = true;
    }
    if (!hg.isEvicted && selectedPlayers.has(hg.id || -1)) {
      validatedPlayers.set(hg.id!, {
        ...hg,
        id: hg.id!,
        relationships: hg.relationships!,
        isEvicted: hg.isEvicted!,
        tribe: hg.tribe || null,
      });
    }
  });
  if (validatedPlayers.size !== selectedPlayers.size) {
    selectedPlayer$.next(validatedPlayers);
  }
  if (!tribeValidated) {
    selectTribe(nullTribe);
  }
  players$.next(next);
}

// this variable is unused but if you delete it it breaks some race condition or something and the code compiles, but doesn't work anymore.
export const cast$ = new BehaviorSubject<PlayerProfile[]>([]);

// The display mode selected by the viewsbar.
export const displayMode$ = new BehaviorSubject<PortraitDisplayMode>(
  popularityMode
);

// If the screen is fullscreen or not.
export const isFullscreen$ = new BehaviorSubject<boolean>(false);
export const theme$ = new Subject<ColorTheme>();
