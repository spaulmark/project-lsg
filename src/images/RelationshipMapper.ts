import { ProfileHouseguest } from "../components/memoryWall";
import { Tribe } from "./tribe";

type Map = "relationships" | "powerRankings";
type LikeKey = "likedBy" | "thinksImThreat";
type DislikeKey = "dislikedBy" | "thinksImWeak";

function likeByDislikeBy(threats: number, weaks: number, n: number) {
  if (n === 0) return 0;
  const twoN = 2 * n;
  return 0.5 + threats / twoN - weaks / twoN;
}

export class RelationshipMapper {
  public houseguests: ProfileHouseguest[] = [];
  private cache: {
    [id: string]: ProfileHouseguest;
  } = {};
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
  private getRelationship(h: string, v: string, map: Map) {
    return this.get(h)[map]![this.get(v).id!];
  }
  private updatePopularities(hg: ProfileHouseguest) {
    const peopleWithOpinions = this.nonEvictedHouseguests - 1;
    hg.popularity === undefined && (hg.popularity = 0);
    hg.popularity = (hg.likedBy - hg.dislikedBy) / peopleWithOpinions;
    hg.powerRanking === undefined && (hg.powerRanking = 0);
    hg.likedBy === 0 && hg.dislikedBy === 0 && (hg.popularity = undefined);
    //////
    hg.powerRanking = likeByDislikeBy(
      hg.thinksImThreat,
      hg.thinksImWeak,
      peopleWithOpinions
    );
    hg.thinksImThreat === 0 &&
      hg.thinksImWeak === 0 &&
      (hg.powerRanking = undefined);
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
      hero.isEvicted ||
      hero.isJury ||
      villain.isJury ||
      villain.isEvicted
    ) {
      return;
    }
    if (hToV === undefined) {
      newR === true ? villain[likeKey]++ : villain[dislikeKey]++;
    } else {
      newR === true
        ? villain[likeKey]++ && villain[dislikeKey]--
        : villain[likeKey]-- && villain[dislikeKey]++;
    }
    // actually set it
    hero[map]![villain.id!] = newR;
    this.updatePopularities(villain);
  }
  public tribe(tribe: Tribe, members: string[]) {
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
