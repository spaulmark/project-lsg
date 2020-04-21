import {
  RelationshipMapper,
  RelationshipHouseguest,
} from "./RelationshipMapper";
import { CodedRelationships } from "./encoder";
import { lookup } from "./lookup";

const fromTernary = new Map<string, boolean | undefined>(
  Object.entries({
    "0": false,
    "1": true,
    "2": undefined,
  })
);

export function decodeToRelationshipMapper(
  m: RelationshipMapper,
  c: string
): RelationshipMapper {
  const r = new RelationshipMapper(m.houseguests);
  try {
    if (c.split("|").length !== 4) throw new Error();
    const [tribes, evictees, relationships, powerRankings] = c.split("|");
    decodeRelationships(r, { relationships, powerRankings });
    decodeEvictees(r, evictees);
    decodeTribes(r, tribes);
  } catch (e) {
    // TODO: using js.alert bad
    alert("Invalid code!");
    return m;
  }
  return r;
}

const chex = /[a-f0-9]){6}/;

function decodeTribes(m: RelationshipMapper, c: string) {
  const tribes: string[] = c.split("•");
  tribes.forEach((t) => {
    const hash = t.indexOf("#");
    if (hash === -1) throw new Error(); // invalid tribe, does not have a color
    const tribeName = t.slice(0, hash);
    const color = t.slice(hash + 1, hash + 7);
    const members = t.slice(hash + 7);
    if (!chex.test(color)) throw new Error();
    const tribemates: string[] = [];
    for (let i = 0; i < members.length; i++) {
      tribemates.push(codeToHouseguest(m, members[i]).name);
    }
    m.tribe({ color: `#${color}`, name: tribeName }, tribemates);
  });
}

function codeToHouseguest(
  m: RelationshipMapper,
  c: string
): RelationshipHouseguest {
  const lookedUp: string | undefined = lookup.get(c);
  if (lookedUp === undefined) throw new Error(); // unrecognized character
  if (parseInt(lookedUp, 3) >= m.houseguests.length) throw new Error(); // number too big
  return m.houseguests[parseInt(lookedUp, 3)];
}

function decodeEvictees(m: RelationshipMapper, c: string) {
  for (let i = 0; i < c.length; i++) {
    m.evict(codeToHouseguest(m, c[i]).name);
  }
}

function decodeRelationships(m: RelationshipMapper, c: CodedRelationships) {
  let decodedR = "";
  let decodedP = "";
  let i: number = 0;
  const [relationships, powerRankings] = [c.relationships, c.powerRankings];
  m.houseguests.forEach((hg) => {
    if (hg.isEvicted || hg.isJury) return;
    m.nonEvictedIDs.forEach((id) => {
      if (hg.id === id) return;
      //////////////////////////////////////////////// relationships
      if (decodedR.length === 0) {
        const r: string | undefined = lookup.get(relationships[i]);
        if (r === undefined) throw new Error("Invalid code");
        decodedR = r;
      }
      m.setRelationship(
        hg.name,
        m.houseguests[id].name,
        fromTernary.get(decodedR[0]),
        "likedBy",
        "dislikedBy",
        "relationships"
      );
      //////////////////////////////////////////////// powerRankings
      if (decodedP.length === 0) {
        const p: string | undefined = lookup.get(powerRankings[i]);
        if (p === undefined) throw new Error("Invalid code");
        decodedP = p;
      }
      m.setRelationship(
        hg.name,
        m.houseguests[id].name,
        fromTernary.get(decodedP[0]),
        "thinksImThreat",
        "thinksImWeak",
        "powerRankings"
      );
    });
  });
}
