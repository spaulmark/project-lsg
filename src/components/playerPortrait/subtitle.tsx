import React from "react";
import { ProfileHouseguest, PortraitProps, PortraitState } from "../memoryWall";
import { SelectedPlayerData } from "./selectedPortrait";
import {
  RelationshipTypeToSymbol,
  RelationshipType as Relationship,
  classifyRelationship,
} from "../../utils/ai/classifyRelationship";
import { sizeOf } from "../../utils/likeMap";
import { getOnlySelectedPlayerOrNull } from "../../subjects/selectedPlayer$";

function emptySubtitle(): JSX.Element[] {
  return [<br key={1} />, <br key={2} />];
}

export function generatePopularitySubtitle(
  hero: PortraitProps,
  state: PortraitState,
  detailed: boolean = false
): any[] {
  if (state.disabled) return emptySubtitle();
  let key = 0;
  let subtitle: any[] = [];
  // popularity
  // competition wins
  key = addCompsLine(hero, subtitle, key);
  // friendship count / relationship classification titles
  ({ subtitle, key } = addCountTitle(
    hero,
    state,
    subtitle,
    key,
    friendOrEnemyTitle,
    friendEnemyCountTitle
  ));
  return subtitle;
}

function addCountTitle(
  hero: PortraitProps,
  state: PortraitState,
  subtitle: any[],
  key: number,
  discreteTitle: (
    a: PortraitProps,
    c: PortraitState,
    b: SelectedPlayerData
  ) => string[],
  countTitle: (a: PortraitState) => string[]
) {
  if (!hero.isEvicted) {
    const data = getOnlySelectedPlayerOrNull(); // it is correct that only one player selected causes discrete titles
    let titles;
    if (data && data.id !== hero.id) {
      titles = discreteTitle(hero, state, data);
    } else {
      titles = countTitle(state);
    }
    subtitle = subtitle.concat(
      titles.map((txt) => <div key={key++}>{txt}</div>)
    );
  } else {
    subtitle.push(<br key={key++} style={{ lineHeight: 1 }} />);
  }
  return { subtitle, key };
}

function addCompsLine(hero: PortraitProps, subtitle: any[], key: number) {
  if (compWins(hero)) {
    subtitle.push(<div key={key++}>{`${compWins(hero)}`}</div>);
  } else {
    subtitle.push(<br key={key++} style={{ lineHeight: 1 }} />);
  }
  return key;
}

function compWins(houseguest: ProfileHouseguest): string {
  return `${houseguest.hohWins ? `♔ ${houseguest.hohWins}` : ""}${
    houseguest.povWins && houseguest.hohWins
      ? `|🛇 ${houseguest.povWins}`
      : houseguest.povWins
      ? `🛇 ${houseguest.povWins}`
      : ""
  }${
    (houseguest.hohWins || houseguest.povWins) && houseguest.nominations
      ? "|"
      : ""
  }${houseguest.nominations ? `✘ ${houseguest.nominations}` : ""}`;
}

function friendOrEnemyTitle(
  hero: PortraitProps,
  state: PortraitState,
  villain: SelectedPlayerData
): string[] {
  const titles: string[] = [];
  const heroRelationship: boolean | number | undefined = hero.relationships![
    villain.id
  ];
  const villainRelationship: boolean | number | undefined =
    villain.relationships[hero.id!];
  titles.push(
    RelationshipTypeToSymbol[
      classifyRelationship(
        state.popularity || 0,
        0, // was  villain.popularity. but does not matter
        heroRelationship,
        villainRelationship
      )
    ]
  );
  return titles;
}

function friendEnemyCountTitle(hero: PortraitState): string[] {
  const titles: string[] = [];
  const count = {
    friends: sizeOf(hero.likedBy),
    enemies: sizeOf(hero.dislikedBy),
  };
  const friendCountText =
    count.friends > 0
      ? `${count.friends} ${RelationshipTypeToSymbol[Relationship.Friend]}`
      : "";

  const enemyCountText =
    count.enemies > 0
      ? `${count.enemies} ${RelationshipTypeToSymbol[Relationship.Enemy]}`
      : "";

  titles.push(
    `${friendCountText}${
      friendCountText && enemyCountText && " | "
    }${enemyCountText}`
  );
  return titles;
}
