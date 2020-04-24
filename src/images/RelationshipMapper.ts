import { ProfileHouseguest } from "../components/memoryWall";
import { Tribe, tribeId } from "./tribe";
import { PlayerProfile } from "../model";
import { DiscreteRelationshipMap } from "../utils";
import { Likemap, sizeOf } from "../utils/likeMap";

type Map = "relationships" | "powerRankings";
type LikeKey = "likedBy" | "thinksImThreat";
type DislikeKey = "dislikedBy" | "thinksImWeak";

function calcPowerRank(threats: number, weaks: number, n: number) {
  if (n === 0) return 0;
  const twoN = 2 * n;
  return 0.5 + threats / twoN - weaks / twoN;
}

export interface RelationshipHouseguest extends PlayerProfile {
  id: number;
  isEvicted?: boolean;
  disabled?: boolean;
  tribe?: Tribe;
  //
  relationships: DiscreteRelationshipMap;
  popularity?: number;
  likedBy: Likemap;
  dislikedBy: Likemap;
  //
  powerRankings: DiscreteRelationshipMap;
  powerRanking?: number;
  thinksImWeak: Likemap;
  thinksImThreat: Likemap;
  //
  tooltip?: string;
}
export class RelationshipMapper {
  public houseguests: RelationshipHouseguest[] = [];
  private cache: {
    [id: string]: RelationshipHouseguest;
  } = {};
  private tribeIDs: Set<string> = new Set<string>();
  get nonEvictedHouseguests(): number {
    return this.nonEvictedIDs.length;
  }
  nonEvictedIDs: number[] = []; // this must be an ordered type to guarentee encoding/decoding works. don't use a set
  public constructor(houseguests: RelationshipHouseguest[]) {
    this.houseguests = houseguests;
    if (houseguests.length > 4096) {
      throw new Error("The max number of players is 4096.");
    }
    houseguests.forEach((hg) => {
      this.cache[hg.name.toUpperCase()] = hg;
      !hg.isEvicted && this.nonEvictedIDs.push(hg.id);
    });
  }

  public getById(id: number): RelationshipHouseguest {
    if (this.houseguests[id] === undefined) throw Error("invalid id");
    return this.houseguests[id];
  }

  public reset() {
    this.dropYourBuffs();
    this.houseguests.forEach((hg) => {
      this.evict(hg.name);
      this.unevict(hg.name);
    });
  }

  private get(hero: string) {
    return this.cache[hero.toUpperCase()];
  }
  private getRelationship(h: string, v: string, map: Map) {
    return this.get(h)[map][this.get(v).id];
  }
  private updatePopularities(hg: ProfileHouseguest) {
    const peopleWithOpinions = this.nonEvictedHouseguests - 1;
    const likedBy = sizeOf(hg.likedBy);
    const dislikedBy = sizeOf(hg.dislikedBy);
    const thinksImThreat = sizeOf(hg.thinksImThreat);
    const thinksImWeak = sizeOf(hg.thinksImWeak);
    hg.popularity === undefined && (hg.popularity = 0);
    hg.popularity = (likedBy - dislikedBy) / peopleWithOpinions;
    hg.powerRanking === undefined && (hg.powerRanking = 0);
    likedBy === 0 && dislikedBy === 0 && (hg.popularity = undefined);
    //////
    hg.powerRanking = calcPowerRank(
      thinksImThreat,
      thinksImWeak,
      peopleWithOpinions
    );
    thinksImThreat === 0 && thinksImWeak === 0 && (hg.powerRanking = undefined);
  }

  public dropYourBuffs() {
    this.tribeIDs = new Set<string>();
    this.houseguests.forEach((hg) => {
      hg.tribe = undefined;
    });
  }

  public evict(h: string) {
    const hero = this.get(h);
    const toDelete = this.nonEvictedIDs.indexOf(hero.id);
    if (hero.isEvicted) return;
    hero.isEvicted = true;
    this.nonEvictedIDs.forEach((id) => {
      this.neutral(h, this.houseguests[id].name);
      this.neutral(this.houseguests[id].name, h);
      this.utr(h, this.houseguests[id].name);
      this.utr(this.houseguests[id].name, h);
    });
    this.nonEvictedIDs.splice(toDelete, 1);
  }

  public unevict(h: string) {
    const hero = this.get(h);
    if (!hero.isEvicted) return;
    hero.isEvicted = false;
    this.nonEvictedIDs.push(hero.id);
  }

  private addToLikeMap(l: Likemap, h: RelationshipHouseguest) {
    l[h.id] = { tribeId: tribeId(h.tribe), groups: new Set<number>() };
  }

  private deleteFromLikeMap(l: Likemap, h: RelationshipHouseguest) {
    delete l[h.id];
  }

  public setRelationship(
    h: string,
    v: string,
    newR: boolean | undefined,
    likeKey: LikeKey,
    dislikeKey: DislikeKey,
    map: Map
  ) {
    const hToV = this.getRelationship(h, v, map);
    const hero = this.get(h);
    const villain = this.get(v);
    if (
      hToV === newR ||
      ((hero.isEvicted ||
        hero.disabled ||
        villain.disabled ||
        villain.isEvicted) &&
        newR !== undefined)
    ) {
      return;
    }
    if (hToV === undefined) {
      this.addToLikeMap(villain[newR ? likeKey : dislikeKey], hero);
    } else if (newR === undefined) {
      this.deleteFromLikeMap(villain[hToV ? likeKey : dislikeKey], hero);
    } else {
      this.addToLikeMap(villain[newR ? likeKey : dislikeKey], hero);
      this.deleteFromLikeMap(villain[newR ? dislikeKey : likeKey], hero);
    }
    // actually set it
    hero[map][villain.id] = newR;
    this.updatePopularities(villain);
  }
  public tribe(tribe: Tribe, members: string[]) {
    if (tribe.name.includes("#") || tribe.name.includes("=")) {
      throw new Error("Tribe names cannot contain # or =");
    }
    if (this.tribeIDs.has(tribeId(tribe))) {
      throw new Error(`Tribe ${tribeId(tribe)} declared twice`);
    }
    this.tribeIDs.add(tribeId(tribe));
    members.forEach((hg) => {
      this.get(hg).tribe = tribe;
    });
  }
  public like(hero: string, villain: string) {
    this.setRelationship(
      hero,
      villain,
      true,
      "likedBy",
      "dislikedBy",
      "relationships"
    );
  }
  public dislike(hero: string, villain: string) {
    this.setRelationship(
      hero,
      villain,
      false,
      "likedBy",
      "dislikedBy",
      "relationships"
    );
  }
  public neutral(hero: string, villain: string) {
    this.setRelationship(
      hero,
      villain,
      undefined,
      "likedBy",
      "dislikedBy",
      "relationships"
    );
  }
  public friends(hero: string, villain: string) {
    this.like(hero, villain);
    this.like(villain, hero);
  }
  public threat(h: string, v: string) {
    this.setRelationship(
      h,
      v,
      true,
      "thinksImThreat",
      "thinksImWeak",
      "powerRankings"
    );
  }
  public weak(h: string, v: string) {
    this.setRelationship(
      h,
      v,
      false,
      "thinksImThreat",
      "thinksImWeak",
      "powerRankings"
    );
  }
  public utr(h: string, v: string) {
    this.setRelationship(
      h,
      v,
      undefined,
      "thinksImThreat",
      "thinksImWeak",
      "powerRankings"
    );
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
