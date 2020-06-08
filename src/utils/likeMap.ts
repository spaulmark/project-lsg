import { RelationshipHouseguest } from "../images/RelationshipMapper";
import _ from "lodash";

export interface Like {
  tribeId: string;
  id: number;
  disabled: boolean;
}

export interface Likemap {
  [id: number]: Like;
}

export function sizeOf(l: Likemap) {
  return Object.keys(_.filter(l, (like) => !like.disabled)).length;
}

export function disableLikes(
  hero: RelationshipHouseguest,
  villain: RelationshipHouseguest
) {
  setLikes(hero, villain, true);
}

export function enableLikes(
  hero: RelationshipHouseguest,
  villain: RelationshipHouseguest
) {
  setLikes(hero, villain, false);
  console.log(hero.likedBy);
  console.log(villain.likedBy);
}

function ignoreProblems(fcns: (() => void)[]) {
  fcns.forEach((f: () => void) => {
    try {
      f();
    } catch {}
  });
}

function setLikes(
  hero: RelationshipHouseguest,
  villain: RelationshipHouseguest,
  b: boolean
) {
  ignoreProblems([
    () => (hero.likedBy[villain.id].disabled = b),
    () => (hero.dislikedBy[villain.id].disabled = b),
    () => (villain.likedBy[hero.id].disabled = b),
    () => (villain.dislikedBy[hero.id].disabled = b),
  ]);
}
