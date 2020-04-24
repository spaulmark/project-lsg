import {
  GameState,
  MutableGameState,
  nonEvictedHouseguests,
} from "../../model/gameState";
import { Episode } from "../../model";
import { EpisodeType } from "./episodes";
import { EpisodeLog } from "../../model/logging/episodelog";

export class EpisodeFactory {
  public nextEpisode(gameState: GameState, episodeType: EpisodeType): Episode {
    let newState = new MutableGameState(gameState);
    newState.phase++;
    if (nonEvictedHouseguests(gameState).length > 2) {
      newState.log[newState.phase] = new EpisodeLog();
    }
    throw new Error("You can't call this function.");
  }
}
