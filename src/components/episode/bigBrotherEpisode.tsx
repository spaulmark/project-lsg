import {
  MutableGameState,
  getById,
  inJury,
  nonEvictedHouseguests,
  GameState,
  EpisodeType,
  Episode,
  InitEpisode,
} from "../../model";
import { getFinalists, finalJurySize } from "../../model/season";
import { Scene } from "./scene";

export const BigBrotherVanilla: EpisodeType = {
  canPlayWith: (n: number) => {
    return n > 1;
  },
  eliminates: 1,
  arrowsEnabled: true,
  hasViewsbar: true,
};

// Refactoring ideas
/**
 * Might be best to start passing ids instead of houseguests for HoH/nominees/veto winner
 */

export function evictHouseguest(gameState: MutableGameState, id: number) {
  const evictee = getById(gameState, id);
  if (gameState.currentLog) gameState.currentLog.evicted = evictee.id;
  evictee.isEvicted = true;
  if (gameState.remainingPlayers - getFinalists() <= finalJurySize()) {
    evictee.isJury = true;
  }
  if (inJury(gameState)) {
    nonEvictedHouseguests(gameState).forEach((hg) => {
      hg.superiors.delete(evictee.id);
    });
  }
  gameState.remainingPlayers--;
}

export function generateBbVanilla(initialGameState: GameState): null {
  return null;
}
export class BigBrotherVanillaEpisode extends Episode {
  readonly title: string;
  readonly scenes: Scene[];
  readonly content: JSX.Element;
  readonly gameState: GameState;
  readonly type = BigBrotherVanilla;

  public constructor(init: InitEpisode) {
    super(init);
    this.title = init.title;
    this.scenes = init.scenes;
    this.content = init.content;
    this.gameState = init.gameState;
  }
}
