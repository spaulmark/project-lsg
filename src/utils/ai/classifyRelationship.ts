import { isNullOrUndefined } from "util";

export enum RelationshipType {
  Friend = "FRIEND",
  Queen = "QUEEN",
  Pawn = "PAWN",
  Enemy = "ENEMY",
  Neutral = "NEUTRAL",
}

export const RelationshipTypeToSymbol = {
  FRIEND: "♥",
  ENEMY: "💔",
  PAWN: "PAWN",
  QUEEN: "QUEEN",
  NEUTRAL: "NEUTRAL",
};

export function classifyRelationship(
  heroPopularity: number,
  villainPopularity: number,
  heroRelationship: number | boolean | null,
  villainRelationship: number | boolean | null
): RelationshipType {
  const heroLikes = heroRelationship === true;
  const villainLikes = villainRelationship === true;
  const heroDisikes = heroRelationship === false || heroRelationship === null;
  const villainDislikes =
    villainRelationship === false || villainRelationship === null;
  if (
    isNullOrUndefined(heroRelationship) &&
    isNullOrUndefined(villainRelationship)
  ) {
    return RelationshipType.Neutral;
  } else if (heroLikes && villainLikes) {
    return RelationshipType.Friend;
  } else if (heroLikes && villainDislikes) {
    return RelationshipType.Pawn;
  } else if (heroDisikes && villainLikes) {
    return RelationshipType.Enemy;
  } else if (heroDisikes && villainLikes) {
    return RelationshipType.Queen;
  }
  ////// number zone

  const benefitsHero = heroRelationship! > heroPopularity;
  const benefitsVillain = heroRelationship! > villainPopularity;
  if (benefitsHero && benefitsVillain) {
    return RelationshipType.Friend;
  } else if (benefitsHero && !benefitsVillain) {
    return RelationshipType.Pawn;
  } else if (!benefitsHero && benefitsVillain) {
    return RelationshipType.Queen;
  }
  return RelationshipType.Enemy;
}
