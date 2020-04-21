import {
  GameState,
  MutableGameState,
  calculatePopularity,
  nonEvictedHouseguests,
  inJury,
} from "../../model/gameState";
import { Episode, Houseguest } from "../../model";
import { EpisodeType } from "./episodes";
import { roundTwoDigits } from "../../utils";
import {
  classifyRelationship,
  RelationshipType as Relationship,
} from "../../utils/ai/classifyRelationship";
import { PowerRanking } from "../../model/powerRanking";
import { EpisodeLog } from "../../model/logging/episodelog";

function firstImpressions(houseguests: Houseguest[]) {
  for (let i = 0; i < houseguests.length; i++) {
    const iMap = houseguests[i].relationships;
    for (let j = i + 1; j < houseguests.length; j++) {
      // creates a bunch of 100% random mutual relationships
      const jMap = houseguests[j].relationships;
    }
  }
}

function updatePowerRankings(houseguests: Houseguest[]) {
  houseguests.forEach((hg) => {
    hg.powerRanking = new PowerRanking(
      houseguests.length - 1 - hg.superiors.size,
      houseguests.length - 1
    );
  });
}

function updatePopularity(gameState: GameState) {
  const houseguests = nonEvictedHouseguests(gameState);
  houseguests.forEach((hg) => {
    const result = calculatePopularity(hg, nonEvictedHouseguests(gameState));
    hg.deltaPopularity =
      (roundTwoDigits(result) - roundTwoDigits(hg.popularity)) / 100;
    hg.popularity = result;
  });
}

function updateFriendCounts(gameState: GameState) {
  const houseguests = nonEvictedHouseguests(gameState);
  houseguests.forEach((hero) => {
    hero.getFriendEnemyCount = () => {
      let friends = 0;
      let enemies = 0;
      houseguests.forEach((villain) => {
        const rel = classifyRelationship(
          hero.popularity,
          villain.popularity,
          hero.relationshipWith(villain),
          false
        );
        if (hero.id === villain.id) {
          return;
        } else if (rel === Relationship.Friend) {
          friends++;
        } else if (rel === Relationship.Enemy) {
          enemies++;
        }
      });
      return { friends, enemies };
    };
  });
}

export class EpisodeFactory {
  public nextEpisode(gameState: GameState, episodeType: EpisodeType): Episode {
    let newState = new MutableGameState(gameState);
    if (gameState.phase === 0) {
      firstImpressions(newState.houseguests);
    }
    newState.phase++;
    if (nonEvictedHouseguests(gameState).length > 2) {
      newState.log[newState.phase] = new EpisodeLog();
    }

    if (inJury(gameState)) {
      updatePowerRankings(nonEvictedHouseguests(newState));
    }
    updatePopularity(newState);
    updateFriendCounts(newState);
    throw new Error("You can't call this function.");
  }
}
