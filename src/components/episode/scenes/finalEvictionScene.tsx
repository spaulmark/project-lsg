import {
  GameState,
  Houseguest,
  MutableGameState,
  nonEvictedHouseguests,
} from "../../../model";
import { Scene } from "../scene";
import { ProfileHouseguest } from "../../memoryWall";
import { Portrait, Portraits } from "../../playerPortrait/portraits";
import { NextEpisodeButton } from "../../nextEpisodeButton/nextEpisodeButton";
import React from "react";
import { Centered } from "../../layout/centered";

export function finalEvictionScene(
  initialGameState: GameState,
  HoH: Houseguest
): [GameState, Scene] {
  const newGameState = new MutableGameState(initialGameState);
  const nominees = nonEvictedHouseguests(newGameState).filter(
    (hg) => hg.id !== HoH.id
  );
  newGameState.currentLog.nominationsPostVeto = nominees.map((hg) => hg.name);
  newGameState.currentLog.soleVoter = HoH.name;
  newGameState.currentLog.votesInMajority = 1;
  newGameState.currentLog.outOf = 1;
  const hoh: ProfileHouseguest = { ...HoH };
  const scene: Scene = new Scene({
    title: "Final Eviction",
    gameState: newGameState,
    content: (
      <div>
        <Centered>
          {`As the final HoH of the season, ${HoH.name}, you may now cast the sole vote to evict.`}
          <Portrait houseguest={hoh} centered={true} />
          <Portraits houseguests={nominees} centered={true} />
          <Centered></Centered>
        </Centered>
        <NextEpisodeButton />
      </div>
    ),
  });
  return [new GameState(newGameState), scene];
}
