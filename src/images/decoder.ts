import {
  RelationshipMapper,
  RelationshipHouseguest,
} from "./RelationshipMapper";
import { CodedRelationships } from "./encoder";
import { Base64 } from "../utils/base64";
import _ from "lodash";

export function decodeToRelationshipMapper(
  m: RelationshipMapper,
  c1: string
): RelationshipMapper | null {
  const r = new RelationshipMapper(_.cloneDeep(m.houseguests));
  r.reset();
  const c = c1.trim();
  try {
    if (c.split("|").length !== 4) throw new Error(`Not a code`);
    const [tribes, evictees, relationships, powerRankings] = c.split("|");
    if (
      relationships.length % 2 > 0 ||
      evictees.length % 2 > 0 ||
      powerRankings.length % 2 > 0
    )
      throw new Error(
        `Misaligned bytes: (${evictees.length}, ${relationships.length}, ${powerRankings.length}`
      );
    decodeEvictees(r, evictees);
    decodeRelationships(r, { relationships, powerRankings });
    decodeTribes(r, tribes);
  } catch (e) {
    alert(e);
    return null;
  }
  return r;
}

const decode = (s: string) => Base64.toInt(s).toString(3).padStart(7, "0"); // base64 --> ternary

const ternaryToRelationship = new Map<string, boolean | undefined>(
  Object.entries({
    "0": false,
    "1": true,
    "2": undefined,
  })
);
function fromTernary(n: string): boolean | undefined {
  const result = ternaryToRelationship.get(n);
  if (result === undefined && n !== "2")
    throw new Error(`${n} is not a ternary value`);
  return result;
}
const chex = /([a-f0-9]){6}/;

function decodeTribes(m: RelationshipMapper, c: string) {
  const tribes: string[] = c.split("=");
  tribes.forEach((t) => {
    const hash = t.indexOf("#");
    if (hash === -1) throw new Error("Invalid tribe, does not have a color");
    const tribeName = t.slice(0, hash);
    const color = t.slice(hash + 1, hash + 7);
    const members = t.slice(hash + 7);
    if (!chex.test(color)) throw new Error(`Invalid color: ${color}`);
    const tribemates: string[] = [];
    let i = 0;
    while (members[2 * i] !== undefined) {
      tribemates.push(
        codeToHouseguest(m, `${members[2 * i]}${members[2 * i + 1]}`, "tribes")
          .name
      );
      i++;
    }
    m.tribe({ color: `#${color}`, name: tribeName }, tribemates);
  });
}

function codeToHouseguest(
  m: RelationshipMapper,
  c: string,
  e?: string
): RelationshipHouseguest {
  const lookedUp: number = Base64.toInt(c);
  if (lookedUp >= m.houseguests.length)
    throw new Error(
      `${lookedUp} (${c}) exceeds the maximum id: ${m.houseguests.length} in ${e}`
    );
  return m.houseguests[lookedUp];
}

function decodeEvictees(m: RelationshipMapper, c: string) {
  let i = 0;
  while (c[2 * i] !== undefined) {
    m.evict(codeToHouseguest(m, `${c[2 * i]}${c[2 * i + 1]}`, "evictees").name);
    i++;
  }
}

function decodeRelationships(m: RelationshipMapper, c: CodedRelationships) {
  let decodedR = "";
  let decodedP = "";
  let r: number = 0;
  let p: number = 0;
  const [relationships, powerRankings] = [c.relationships, c.powerRankings];
  m.houseguests.forEach((hg) => {
    if (hg.isEvicted || hg.isJury) return;
    m.nonEvictedIDs.forEach((id) => {
      if (hg.id === id) return;
      //////////////////////////////////////////////// relationships
      if (decodedR.length === 0) {
        decodedR = decode(`${relationships[r]}${relationships[r + 1]}`);
        r += 2;
      }
      m.setRelationship(
        hg.name,
        m.houseguests[id].name,
        fromTernary(decodedR[0]),
        "likedBy",
        "dislikedBy",
        "relationships"
      );
      decodedR = decodedR.slice(1);
      //////////////////////////////////////////////// powerRankings
      if (decodedP.length === 0) {
        decodedP = decode(`${powerRankings[p]}${powerRankings[p + 1]}`);
        p += 2;
      }
      m.setRelationship(
        hg.name,
        m.houseguests[id].name,
        fromTernary(decodedP[0]),
        "thinksImThreat",
        "thinksImWeak",
        "powerRankings"
      );
      decodedP = decodedP.slice(1);
    });
  });
}
