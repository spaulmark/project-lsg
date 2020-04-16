import { ProfileHouseguest } from "../components/memoryWall";
import { newDiscreteRelationshipMap } from "../utils";
import { Tribe } from "./tribe";
import prand from "pure-rand";

class RelationshipMapper {
  public houseguests: ProfileHouseguest[] = [];
  private cache: { [id: string]: ProfileHouseguest } = {};
  private nonEvictedHouseguests: number = 0;
  public constructor(houseguests: ProfileHouseguest[]) {
    this.houseguests = houseguests;
    houseguests.forEach((hg) => {
      this.cache[hg.name.toUpperCase()] = hg;
      !hg.isEvicted && this.nonEvictedHouseguests++;
    });
  }
  private get(hero: string) {
    return this.cache[hero.toUpperCase()];
  }
  private getRelationship(h: string, v: string) {
    return this.get(h).relationships![this.get(v).id!];
  }

  private updatePopularity(hg: ProfileHouseguest) {
    hg.popularity === undefined && (hg.popularity = 0);
    hg.popularity = (hg.likedBy - hg.dislikedBy) / this.houseguests.length;
    hg.likedBy === 0 && hg.dislikedBy === 0 && (hg.popularity = undefined);
  }

  public setRelationship(h: string, v: string, newR: boolean | undefined) {
    const hToV = this.getRelationship(h, v);
    const hero = this.get(h);
    const villain = this.get(v);
    if (
      hToV === newR ||
      hero.isEvicted ||
      hero.isJury ||
      villain.isJury ||
      villain.isEvicted
    ) {
      return;
    }
    if (hToV === undefined) {
      newR === true ? villain.likedBy++ : villain.dislikedBy++;
    } else {
      newR === true
        ? villain.likedBy++ && villain.dislikedBy--
        : villain.likedBy-- && villain.dislikedBy++;
    }
    // actually set it
    hero.relationships![villain.id!] = newR;
    this.updatePopularity(villain);
  }

  public tribe(tribe: Tribe, members: string[]) {
    members.forEach((hg) => {
      this.get(hg).tribe = tribe;
    });
  }

  public like(hero: string, villain: string) {
    this.setRelationship(hero, villain, true);
  }
  public dislike(hero: string, villain: string) {
    this.setRelationship(hero, villain, false);
  }
  public neutral(hero: string, villain: string) {
    this.setRelationship(hero, villain, undefined);
  }
  public friends(hero: string, villain: string) {
    this.like(hero, villain);
    this.like(villain, hero);
  }

  public alliance(members: string[]) {
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        this.friends(members[i], members[j]);
      }
    }
  }

  public enemies(hero: string, villain: string) {
    this.dislike(hero, villain);
    this.dislike(villain, hero);
  }
}

function importAll(
  context: __WebpackModuleApi.RequireContext
): ProfileHouseguest[] {
  const profiles: ProfileHouseguest[] = [];

  const evictedHouseguests: Set<string> = new Set<string>();
  const jurors: Set<string> = new Set<string>();
  evictedHouseguests.add("kitava");

  context.keys().map((item: string, i: number) => {
    const name = item.replace(".png", "").replace("./", "");
    profiles.push({
      name,
      imageURL: context(item),
      id: i,
      isEvicted: evictedHouseguests.has(name.toLowerCase()),
      isJury: jurors.has(name.toLowerCase()),
      relationships: newDiscreteRelationshipMap(context.length - 1, i),
      likedBy: 0,
      dislikedBy: 0,
    });
  });
  const r: RelationshipMapper = new RelationshipMapper(profiles);
  r.tribe({ name: "Vaal", color: "#ff0000" }, [
    "Hillock",
    "Piety",
    "Brutus",
    "malachai",
    "kitava",
    "Atziri",
    "doedre",
  ]);
  r.tribe({ name: "Templars", color: "#00ffff" }, [
    "Lunaris",
    "Archbishop Geofri",
    "Solaris",
    "baran",
    "Eleron",
    "Dominus",
    "Avarius",
  ]);
  r.tribe({ name: "The Atlas of Worlds", color: "#00ff00" }, [
    "Veritania",
    "The Elder",
    "Rhys of Abram",
    "Izaro",
    "kuduku",
    "Shavronne",
    "The Shaper",
  ]);
  randomRelationships(r);
  // r.like("atziri", "dominus");
  // r.friends("solaris", "lunaris");
  // r.enemies("the elder", "the shaper");
  // r.alliance(["eleron", "avarius", "archbishop geofri", "baran"]);
  // r.dislike("brutus", "piety");
  // r.like("hillock", "izaro");
  // r.dislike("izaro", "hillock");
  // r.like("veritania", "rhys of abram");
  return r.houseguests;
}

export const initialProfiles = importAll(
  require.context("./src", false, /.png/)
);

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
  let rng = prand.xorshift128plus(0);
  const hgs = r.houseguests;
  for (let i = 0; i < hgs.length; i++) {
    const hero = hgs[i].name;
    for (let j = i + 1; j < hgs.length; j++) {
      const villain = hgs[j].name;
      let r1;
      let r2;
      [r1, rng] = randomChoice([true, false, undefined], rng);
      [r2, rng] = randomChoice([true, false, undefined], rng);
      r.setRelationship(hero, villain, r1 as any);
      r.setRelationship(villain, hero, r2 as any);
    }
  }
}
