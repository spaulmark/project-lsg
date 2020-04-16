import { ProfileHouseguest } from "../components/memoryWall";
import { newDiscreteRelationshipMap } from "../utils";
import { Tribe } from "./tribe";

class RelationshipMapper {
  public houseguests: ProfileHouseguest[] = [];
  private cache: { [id: string]: ProfileHouseguest } = {};
  private tribes: { [id: string]: ProfileHouseguest[] } = {};
  public constructor(houseguests: ProfileHouseguest[]) {
    this.houseguests = houseguests;
    houseguests.forEach((hg) => {
      this.cache[hg.name.toUpperCase()] = hg;
    });
  }
  private get(hero: string) {
    return this.cache[hero.toUpperCase()];
  }
  private getRelationship(h: string, v: string) {
    return this.get(h).relationships![this.get(v).id!];
  }

  private setRelationship(h: string, v: string, newR: boolean | undefined) {
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
  r.like("atziri", "dominus");
  r.friends("solaris", "lunaris");
  r.enemies("the elder", "the shaper");
  r.alliance(["eleron", "avarius", "archbishop geofri", "baran"]);
  r.dislike("brutus", "piety");
  r.like("hillock", "izaro");
  r.dislike("izaro", "hillock");
  r.like("veritania", "rhys of abram");
  return r.houseguests;
}

export const initialProfiles = importAll(
  require.context("./src", false, /.png/)
);
