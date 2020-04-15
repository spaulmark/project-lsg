import {
  GameState,
  Houseguest,
  MutableGameState,
  exclude,
  nonEvictedHouseguests,
} from "../../../model";
import { Scene } from "../scene";
import { Portrait } from "../../playerPortrait/portraits";
import { NextEpisodeButton } from "../../nextEpisodeButton/nextEpisodeButton";
import React from "react";
import { Centered, CenteredBold } from "../../layout/centered";
import { DividerBox } from "../../layout/box";

export function generateNomCeremonyScene(
  initialGameState: GameState,
  HoH: Houseguest
): [GameState, Scene, Houseguest[]] {
  const newGameState = new MutableGameState(initialGameState);
  const options = exclude(nonEvictedHouseguests(newGameState), [HoH]);
  const scene = new Scene({
    title: "Nomination Ceremony",
    gameState: newGameState,
    content: (
      <div>
        <Centered>
          This is the nomination ceremony. It is my responsibility as the Head
          of Household to nominate two houseguests for eviction.
        </Centered>
        <Portrait centered={true} houseguest={HoH} />
        <div className="columns is-marginless is-centered">
          <DividerBox className="column">
            <Centered> My first nominee is...</Centered>
          </DividerBox>
          <DividerBox className="column">
            <Centered>My second nominee is...</Centered>
          </DividerBox>
        </div>
        <br />
        <NextEpisodeButton />
      </div>
    ),
  });
  return [new GameState(newGameState), scene, []];
}
