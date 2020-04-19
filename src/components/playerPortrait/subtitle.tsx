import React from "react";
import { roundTwoDigits } from "../../utils";
import { ProfileHouseguest, PortraitProps, PortraitState } from "../memoryWall";
import { SelectedPlayerData } from "./selectedPortrait";
import {
  RelationshipTypeToSymbol,
  RelationshipType as Relationship,
  classifyRelationship,
  ThreatLevelToSymbol,
  ThreatLevel,
} from "../../utils/ai/classifyRelationship";
import { getSelectedPlayer } from "../../subjects/subjects";

function threatLevelOf(a: boolean | undefined): string {
  if (a === undefined) return "-";
  if (a) return "THREAT";
  return "WEAK";
}

export function generatePowerSubtitle(
  hero: PortraitProps,
  state: PortraitState,
  _: boolean | undefined
): any[] {
  let key = 0;
  let subtitle: any[] = [];
  key = addPopularityLine(state, hero, !!_, subtitle, key);
  key = addCompsLine(hero, subtitle, key);
  if (!hero.isEvicted) {
    const data = getSelectedPlayer() as SelectedPlayerData | null;
    if (data && data.id !== hero.id) {
      subtitle.push(
        <div key={key++}>{`${threatLevelOf(hero.powerRankings[data.id])}`}</div>
      );
    } else if (data && data.id === hero.id) {
      subtitle.push(<div key={key++}>I'M SEEN AS</div>);
      subtitle.push(<div key={key++}>{threatLevelCountTitle(hero)}</div>);
    } else {
      subtitle.push(<div key={key++}>{threatLevelCountTitle(hero)}</div>);
    }
  } else {
    subtitle.push(<br key={key++} style={{ lineHeight: 1 }} />);
  }
  return subtitle;
}

export function generatePopularitySubtitle(
  hero: PortraitProps,
  state: PortraitState,
  detailed: boolean = false
): any[] {
  // const data = getSelectedPlayer() as SelectedPlayerData | null;
  let key = 0;
  let subtitle: any[] = [];
  // popularity
  // key = addPopularityLine(state, hero, detailed, subtitle, key);
  // competition wins
  key = addCompsLine(hero, subtitle, key);
  // friendship count / relationship classification titles
  ({ subtitle, key } = addCountTitle(
    hero,
    subtitle,
    key,
    friendOrEnemyTitle,
    friendEnemyCountTitle
  ));
  // if (!data) subtitle.push(<br key={key++} style={{ lineHeight: 1 }} />);
  return subtitle;
}

function addCountTitle(
  hero: PortraitProps,
  subtitle: any[],
  key: number,
  discreteTitle: (a: PortraitProps, b: SelectedPlayerData) => string[],
  countTitle: (a: PortraitProps) => string[]
) {
  if (!hero.isEvicted) {
    const data = getSelectedPlayer() as SelectedPlayerData | null;
    if (data && data.id !== hero.id) {
      const titles = discreteTitle(hero, data);
      subtitle = subtitle.concat(
        titles.map((txt) => <div key={key++}>{txt}</div>)
      );
    } else {
      const titles = countTitle(hero);
      subtitle = subtitle.concat(
        titles.map((txt) => <div key={key++}>{txt}</div>)
      );
    }
  } else {
    subtitle.push(<br key={key++} style={{ lineHeight: 1 }} />);
  }
  return { subtitle, key };
}

function addPopularityLine(
  state: { popularity?: number },
  hero: PortraitProps,
  detailed: boolean,
  subtitle: any[],
  key: number
) {
  let popularity = state.popularity;
  if (popularity && (popularity > 1 || popularity < -1)) {
    popularity = hero.popularity;
  }
  if (popularity && !hero.isEvicted) {
    let popularitySubtitle = `${roundTwoDigits(popularity)}%`;
    const deltaPop = getDeltaPopularity(hero, popularity);
    if (detailed && deltaPop !== 0) {
      const arrow = deltaPop > 0 ? " | ↑" : " | ↓";
      popularitySubtitle += `${arrow} ${deltaPop}%`;
    }
    subtitle.push(<div key={key++}>{""}</div>); // hardcoded to do nothing for the discrete case.
  }
  return key;
}

function addCompsLine(hero: PortraitProps, subtitle: any[], key: number) {
  if (compWins(hero)) {
    subtitle.push(<div key={key++}>{`${compWins(hero)}`}</div>);
  } else {
    subtitle.push(<br key={key++} style={{ lineHeight: 1 }} />);
  }
  return key;
}

function getDeltaPopularity(
  houseguest: PortraitProps,
  statePopularity: number
) {
  if (
    roundTwoDigits(houseguest.popularity) !== roundTwoDigits(statePopularity)
  ) {
    return 0;
  }
  return houseguest.deltaPopularity
    ? roundTwoDigits(houseguest.deltaPopularity)
    : 0;
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
        hero.popularity || 0,
        villain.popularity,
        heroRelationship,
        villainRelationship
      )
    ]
  );
  return titles;
}

function threatLevelCountTitle(hero: PortraitProps): string[] {
  const titles: string[] = [];
  const count = { friends: hero.thinksImThreat, enemies: hero.thinksImWeak };
  const friendCountText =
    count.friends > 0
      ? `${count.friends} ${ThreatLevelToSymbol[ThreatLevel.Threat]}`
      : "";

  const enemyCountText =
    count.enemies > 0
      ? `${count.enemies} ${ThreatLevelToSymbol[ThreatLevel.Weak]}`
      : "";

  titles.push(
    `${friendCountText}${
      friendCountText && enemyCountText && " | "
    }${enemyCountText}`
  );
  return titles;
}

function friendEnemyCountTitle(hero: PortraitProps): string[] {
  const titles: string[] = [];
  const count = { friends: hero.likedBy, enemies: hero.dislikedBy };
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
