import React from "react";
import { EpisodeType, Episode, InitEpisode } from "./episodes";
import { Scene } from "./scene";
import { GameState } from "../../model";
import { NextEpisodeButton } from "../nextEpisodeButton/nextEpisodeButton";
import { HasText } from "../layout/text";

export const BigBrotherFinale: EpisodeType = {
  canPlayWith: (n: number) => n === 3,
  eliminates: 2,
  arrowsEnabled: true,
  hasViewsbar: true,
};

export function generateBbFinale(
  initialGameState: GameState
): BigBrotherFinaleEpisode {
  const title = "Finale";
  const content = (
    <HasText>
      Finale Night
      <NextEpisodeButton />
    </HasText>
  );
  const scenes: Scene[] = [];
  return new BigBrotherFinaleEpisode({
    gameState: initialGameState,
    content,
    title,
    scenes,
    type: BigBrotherFinale,
  });
}

export class BigBrotherFinaleEpisode extends Episode {
  readonly title: string;
  readonly scenes: Scene[];
  readonly content: JSX.Element;
  readonly gameState: GameState;
  readonly type = BigBrotherFinale;

  public constructor(init: InitEpisode) {
    super(init);
    this.title = init.title;
    this.scenes = init.scenes;
    this.content = init.content;
    this.gameState = init.gameState;
  }
}
