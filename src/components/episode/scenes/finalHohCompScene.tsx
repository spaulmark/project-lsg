import {
  GameState,
  Houseguest,
  MutableGameState,
  nonEvictedHouseguests,
  randomPlayer,
  getById,
} from "../../../model";
import { Scene } from "../scene";
import React from "react";

export function finalHohCompScene(
  initialGameState: GameState
): [GameState, Scene, Houseguest] {
  const newGameState = new MutableGameState(initialGameState);
  const final3 = nonEvictedHouseguests(initialGameState);
  const enduranceWinner = randomPlayer(final3);
  const enduranceLosers = final3.filter((hg) => hg.id !== enduranceWinner.id);
  const skillWinner = randomPlayer(final3, [enduranceWinner]);
  const finalHoH = getById(
    newGameState,
    randomPlayer([enduranceWinner, skillWinner]).id
  );
  finalHoH.hohWins++;
  const scene: Scene = new Scene({
    title: "Final HoH Competition",
    gameState: newGameState,
    content: <div>nice meme</div>,
  });
  return [new GameState(newGameState), scene, finalHoH];
}
