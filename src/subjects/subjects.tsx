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
import { Tribe, nullTribe } from "../images/tribe";
import { selectedPlayer$, PlayerSet } from "./selectedPlayer$";

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

// this variable is unused but if you delete it it breaks some race condition or something and the code compiles, but doesn't work anymore.
export const cast$ = new BehaviorSubject<PlayerProfile[]>([]);

export function getSelectedPlayers(): PlayerSet {
  return selectedPlayer$.value;
}

// The display mode selected by the viewsbar.
export const displayMode$ = new BehaviorSubject<PortraitDisplayMode>(
  popularityMode
);

// If the screen is fullscreen or not.
export const isFullscreen$ = new BehaviorSubject<boolean>(false);
export const theme$ = new Subject<ColorTheme>();
