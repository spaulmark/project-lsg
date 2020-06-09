import { Tribe, tribeId } from "./tribe";
import { PlayerProfile } from "../model";
import { DiscreteRelationshipMap } from "../utils";
import { Likemap, sizeOf, disableLikes, enableLikes } from "../utils/likeMap";
import _ from "lodash";

type Map = "relationships";
type LikeKey = "likedBy";
type DislikeKey = "dislikedBy";

export function calculatePopularity(
  hg: { likedBy: Likemap; dislikedBy: Likemap; name?: string },
  n: number
): number | undefined {
  if (n < 1) return undefined;

  const likedBy = sizeOf(hg.likedBy);
  const dislikedBy = sizeOf(hg.dislikedBy);
  let result: number | undefined = 0;
  result = (likedBy - dislikedBy) / n;
  result > 1 && (result = 1);
  result < -1 && (result = -1);
  likedBy === 0 && dislikedBy === 0 && (result = undefined);
  return result;
}

export interface RelationshipHouseguest extends PlayerProfile {
  id: number;
  isEvicted?: boolean;
  disabled?: boolean;
  tribe?: Tribe;
  //
  relationships: DiscreteRelationshipMap;
  houseSize: number;
  likedBy: Likemap;
  dislikedBy: Likemap;
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
  // note that in the future, this won't matter because unevict() currently breaks this functionality.
  // so basically it doesn't matter anymore because the new codes won't be limited by nonEvictedIDs.

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

  private get(hero: string): RelationshipHouseguest {
    const result = this.cache[hero.toUpperCase()];
    if (result === undefined) throw new Error(`bad name: ${hero}`);
    return result;
  }
  private getRelationship(h: string, v: string, map: Map) {
    return this.get(h)[map][this.get(v).id];
  }

  public dropYourBuffs() {
    this.tribeIDs = new Set<string>();
    this.houseguests.forEach((hg) => {
      hg.tribe = undefined;
    });
  }

  public evict(h: string) {
    const hero = this.get(h);
    const myTribeId = tribeId(hero.tribe);
    let flag = true;
    const toDelete = this.nonEvictedIDs.indexOf(hero.id);
    if (hero.isEvicted) return;
    hero.isEvicted = true;
    this.nonEvictedIDs.forEach((id) => {
      disableLikes(hero, this.houseguests[id]);
      this.houseguests[id].houseSize--;
      const tribe = this.houseguests[id].tribe;
      if (flag && tribe && tribeId(tribe) === myTribeId) {
        tribe.size--;
        flag = false;
      }
    });
    this.nonEvictedIDs.splice(toDelete, 1);
  }

  public unevict(h: string) {
    const hero = this.get(h);
    if (!hero.isEvicted) return;
    hero.isEvicted = false;
    this.nonEvictedIDs.push(hero.id);
    this.nonEvictedIDs.forEach((id) => {
      const hg = this.houseguests[id];
      enableLikes(hero, hg);
      hg.houseSize++;
      hero.houseSize = hg.houseSize;
    });
  }

  private addToLikeMap(l: Likemap, h: RelationshipHouseguest) {
    l[h.id] = {
      tribeIds: new Set([tribeId(h.tribe)]),
      id: h.id,
      disabled: false,
    };
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
  }

  // runs in O(m), m number of edges.
  // if I wanted to make it better, I would have to optimize
  public tribe(skeleton: { name: string; color: string }, members: string[]) {
    const memberSet = new Set(members.map((name) => this.get(name).id));
    const tribe = {
      size: members.filter((hg) => !this.get(hg).isEvicted).length, // only count non-evicted members
      name: skeleton.name,
      color: skeleton.color.toLowerCase(),
    };
    const newTribeId = tribeId(tribe);
    if (tribe.name.includes("#") || tribe.name.includes("=")) {
      throw new Error("Tribe names cannot contain # or =");
    }
    if (this.tribeIDs.has(newTribeId)) {
      throw new Error(`Tribe ${newTribeId} declared twice`);
    }
    this.tribeIDs.add(newTribeId);
    this.houseguests.forEach((hg) => {
      memberSet.has(hg.id) && (hg.tribe = tribe);
      _.forEach(hg.likedBy, (like) => {
        memberSet.has(like.id) && like.tribeIds.add(newTribeId);
      }); // TODO: major fixes needed right here boys
      _.forEach(hg.dislikedBy, (like) => {
        memberSet.has(like.id) && like.tribeIds.add(newTribeId);
      });
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
