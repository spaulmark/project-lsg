import { newDiscreteRelationshipMap, hashcode } from "../utils";
import prand from "pure-rand";
import {
  RelationshipMapper,
  RelationshipHouseguest,
} from "./RelationshipMapper";

function importAll(
  context: __WebpackModuleApi.RequireContext
): RelationshipMapper {
  const profiles: RelationshipHouseguest[] = [];
  setupProfiles(context, profiles, new Set<string>(), new Set<string>());
  const r: RelationshipMapper = new RelationshipMapper(profiles);
  // r.tribe({ name: "Dream Team", color: "#cacf64" }, [
  //   "Lunaris",
  //   "Archbishop Geofri",
  //   "Solaris",
  //   "baran",
  //   "Eleron",
  //   "Hillock",
  //   "Piety",
  //   "Brutus",
  //   "Dominus",
  //   "Avarius",
  // ]);
  // r.tribe({ name: "Scream Team", color: "#64cacf" }, [
  //   "Veritania",
  //   "The Elder",
  //   "Rhys",
  //   "Izaro",
  //   "Shavronne",
  //   "malachai",
  //   "kitava",
  //   "Atziri",
  //   "doedre",
  //   "The Shaper",
  // ]);
  // randomRelationships(r);
  // r.evict("kuduku");
  // console.log(encodeRelationshipMapper(r));
  return r;
}

////////////////// safe space below here

export const initialProfiles = importAll(
  require.context("./src", false, /.png/)
);

function setupProfiles(
  context: __WebpackModuleApi.RequireContext,
  profiles: RelationshipHouseguest[],
  evictedHouseguests: Set<string>,
  jurors: Set<string>
) {
  context.keys().map((item: string, i: number) => {
    const name = item.replace(".png", "").replace("./", "");
    profiles.push({
      name,
      imageURL: context(item),
      id: i,
      isEvicted: evictedHouseguests.has(name.toLowerCase()),
      disabled: jurors.has(name.toLowerCase()),
      relationships: newDiscreteRelationshipMap(context.length - 1, i),
      powerRankings: newDiscreteRelationshipMap(context.length - 1, i),
      likedBy: {},
      dislikedBy: {},
      thinksImThreat: {},
      thinksImWeak: {},
    });
  });
}

function randomInt(
  a: number,
  b: number,
  rng: prand.RandomGenerator
): [number, prand.RandomGenerator] {
  let result: number;
  [result, rng] = prand.uniformIntDistribution(a, b, rng);
  return [result, rng];
}
function randomChoice(
  a: (number | boolean | undefined)[],
  rng: prand.RandomGenerator
): [number | boolean | undefined, prand.RandomGenerator] {
  const [result, rng2] = randomInt(0, a.length - 1, rng);
  return [a[result], rng2];
}

function randomRelationships(r: RelationshipMapper) {
  let castNames = "";
  r.houseguests.forEach((houseguest) => (castNames += houseguest.name));
  let rng = prand.xorshift128plus(hashcode(castNames));
  const hgs = r.houseguests;
  for (let i = 0; i < hgs.length; i++) {
    const hero = hgs[i].name;
    for (let j = i + 1; j < hgs.length; j++) {
      const villain = hgs[j].name;
      let r1;
      let r2;
      [r1, rng] = randomChoice([true, false, undefined], rng);
      [r2, rng] = randomChoice([true, false, undefined], rng);
      r.setRelationship(
        hero,
        villain,
        r1 as any,
        "likedBy",
        "dislikedBy",
        "relationships"
      );
      r.setRelationship(
        villain,
        hero,
        r2 as any,
        "likedBy",
        "dislikedBy",
        "relationships"
      );
      [r1, rng] = randomChoice([true, false, undefined], rng);
      [r2, rng] = randomChoice([true, false, undefined], rng);
      r.setRelationship(
        hero,
        villain,
        r1 as any,
        "thinksImThreat",
        "thinksImWeak",
        "powerRankings"
      );
      r.setRelationship(
        villain,
        hero,
        r2 as any,
        "thinksImThreat",
        "thinksImWeak",
        "powerRankings"
      );
    }
  }
}
