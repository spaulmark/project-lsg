import { newDiscreteRelationshipMap, hashcode } from "../utils";
import prand from "pure-rand";
import {
  RelationshipMapper,
  RelationshipHouseguest,
} from "./RelationshipMapper";
import { encodeRelationships } from "./encoder";

function importAll(
  context: __WebpackModuleApi.RequireContext
): RelationshipHouseguest[] {
  const profiles: RelationshipHouseguest[] = [];

  const evictedHouseguests: Set<string> = new Set<string>();
  const jurors: Set<string> = new Set<string>();

  // evictedHouseguests.add("malachai");
  // evictedHouseguests.add("hillock");
  // evictedHouseguests.add("kuduku");
  // evictedHouseguests.add("izaro");
  // evictedHouseguests.add("rhys of abram");
  // evictedHouseguests.add("avarius");
  // evictedHouseguests.add("doedre");
  // evictedHouseguests.add("kitava");
  // evictedHouseguests.add("baran");
  // evictedHouseguests.add("atziri");
  // evictedHouseguests.add("lunaris");

  setupProfiles(context, profiles, evictedHouseguests, jurors);
  const r: RelationshipMapper = new RelationshipMapper(profiles);
  r.tribe({ name: "Power", color: "#ff0000" }, [
    "Hillock",
    "Piety",
    "Brutus",
    "malachai",
    "kitava",
    "Atziri",
    "doedre",
  ]);
  r.tribe({ name: "Courage", color: "#00ffff" }, [
    "Lunaris",
    "Archbishop Geofri",
    "Solaris",
    "baran",
    "Eleron",
    "Dominus",
    "Avarius",
  ]);
  r.tribe({ name: "Wisgn", color: "#00ff00" }, [
    "Veritania",
    "The Elder",
    "Rhys of Abram",
    "Izaro",
    "kuduku",
    "Shavronne",
    "The Shaper",
  ]);
  randomRelationships(r);
  r.like("izaro", "baran");
  console.log(encodeRelationships(r));
  return r.houseguests;
}

////////////////// safe space below here

// const rainbow =
//   "0123456789™€›…•‡†ƒžŽżŻƖź¡ŹŸŷŶŵŴųŲűŰůŮŭŬūŪũŨŧŦťŤţŢšŠşŞŝŜśŚřŘŗŖŕŔœŒőŐŏŎōŌŋŊŉňŇņŅńŃłŁŀĿľĽļĻĺĹĸķĶĵĴĳĲıİįĮĭĬīĪĩĨħĥĤģĢġĠğĞĝĜěĚęĘėĖĕĔēĒđĐďĎčČċĊĉĈćĆąĄăĂāĀ¼¹µ³²±°¯®¬«ª©¨§¤¢}`_^]\\[@?>=;:/.-,+*)('&%$#\"!zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA";

// function generateLookupTable() {
//   const test2: { [id: string]: string } = {};
//   for (let i = 0; i < rainbow.length; i++) {
//     test2[rainbow[i]] = pad(i.toString(3)); // replace i with whatever i want to lookup table with.
//   }
//   console.log(test2);
// }

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
      isJury: jurors.has(name.toLowerCase()),
      relationships: newDiscreteRelationshipMap(context.length - 1, i),
      powerRankings: newDiscreteRelationshipMap(context.length - 1, i),
      likedBy: 0,
      dislikedBy: 0,
      thinksImThreat: 0,
      thinksImWeak: 0,
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
