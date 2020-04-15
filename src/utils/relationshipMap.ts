export interface RelationshipMap {
  [id: number]: number;
}

export interface DiscreteRelationshipMap {
  [id: number]: boolean | null;
}

export function newRelationshipMap(
  size: number,
  exclude: number
): RelationshipMap {
  const result: RelationshipMap = {};
  for (let i = 0; i < size; i++) {
    if (i !== exclude) result[i] = 0;
  }
  return result;
}

export function newDiscreteRelationshipMap(
  size: number,
  exclude: number
): DiscreteRelationshipMap {
  const result: DiscreteRelationshipMap = {};
  for (let i = 0; i < size; i++) {
    if (i !== exclude) result[i] = null;
  }
  return result;
}
