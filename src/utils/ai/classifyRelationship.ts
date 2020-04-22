export enum RelationshipType {
  Neutral = "NEUTRAL",
  Friend = "FRIEND",
  Enemy = "ENEMY",
  Pawn = "PAWN",
  Queen = "QUEEN",
  Hunter = "HUNTER",
  Target = "TARGET",
  Dupe = "DUPE",
  Deceiver = "DECEIVER",
}

export enum ThreatLevel {
  Threat = "THREAT",
  Weak = "WEAK",
  Neutral = "NEUTRAL",
}

export const RelationshipTypeToSymbol = {
  NEUTRAL: "-",
  FRIEND: "♥",
  ENEMY: "💔",
  PAWN: "THEY ♥ ME",
  QUEEN: "I ♥ THEM",
  HUNTER: "THEY 💔 ME",
  TARGET: "I 💔 THEM",
  DUPE: "I 💔 THEM THEY ♥ ME",
  DECEIVER: "I ♥ THEM THEY 💔 ME",
};

export const ThreatLevelToSymbol = {
  THREAT: "💢",
  WEAK: "💤",
  NEUTRAL: "-",
};

export const RelationshipTypeToPopularity = {
  NEUTRAL: 0,
  FRIEND: 1,
  ENEMY: -1,
  PAWN: 0.66,
  QUEEN: 0.33,
  HUNTER: -0.66,
  TARGET: -0.33,
  DUPE: 0.25,
  DECEIVER: -0.25,
};

export const ClassifyDiscreteRelationship: {
  [id: string]: { [id: string]: RelationshipType };
} = {
  true: {
    true: RelationshipType.Friend,
    false: RelationshipType.Dupe,
    undefined: RelationshipType.Pawn,
  },
  false: {
    true: RelationshipType.Deceiver,
    false: RelationshipType.Enemy,
    undefined: RelationshipType.Hunter,
  },
  undefined: {
    true: RelationshipType.Queen,
    false: RelationshipType.Target,
    undefined: RelationshipType.Neutral,
  },
};

function f(a: boolean | undefined): "true" | "false" | "undefined" {
  if (a === true) return "true";
  else if (a === false) return "false";
  else return "undefined";
}

export function classifyRelationship(
  heroPopularity: number,
  villainPopularity: number,
  heroRelationship: number | boolean | undefined,
  villainRelationship: number | boolean | undefined
): RelationshipType {
  if (
    typeof heroRelationship !== "number" &&
    typeof villainRelationship !== "number"
  ) {
    return ClassifyDiscreteRelationship[f(heroRelationship)][
      f(villainRelationship)
    ];
  }

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
