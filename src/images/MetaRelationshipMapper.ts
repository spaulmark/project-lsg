import {
  RelationshipMapper,
  RelationshipHouseguest,
} from "./RelationshipMapper";
import _ from "lodash";

export interface TribeSkeleton {
  members: string[];
  name: string;
  color: string;
  priority?: number;
}

export class MetaRelationshipMapper {
  private timeline: RelationshipMapper[] = [];
  private t: number = 0;
  public episodeStartMarkers: number[] = [0];

  public get time() {
    return this.t;
  }

  public constructor(houseguests: RelationshipHouseguest[]) {
    this.timeline[this.t] = new RelationshipMapper(houseguests);
    this.t++;
  }

  public at(t: number) {
    let time = t;

    if (t >= this.t) time = this.t - 1;
    if (t < 1) time = 1;
    return this.timeline[time];
  }

  private cloneDeep(): RelationshipMapper {
    return _.cloneDeep(this.timeline[this.t - 1]);
  }

  private pushToTimeline(newMap: RelationshipMapper) {
    this.timeline[this.t] = newMap;
    this.t++;
  }

  public endEpisode() {
    this.episodeStartMarkers.push(this.t - 1);
  }

  public tribeSwap(tribes: TribeSkeleton[]) {
    const newMap = this.cloneDeep();
    newMap.dropYourBuffs();
    tribes.forEach((tribeSkeleton) => {
      newMap.tribe({ ...tribeSkeleton }, tribeSkeleton.members);
    });
    this.pushToTimeline(newMap);
  }

  public like(a: string, b: string) {
    const newMap = this.cloneDeep();
    newMap.like(a, b);
    this.pushToTimeline(newMap);
  }

  public friends(a: string, b: string) {
    const newMap = this.cloneDeep();
    newMap.friends(a, b);
    this.pushToTimeline(newMap);
  }

  public dislike(a: string, b: string) {
    const newMap = this.cloneDeep();
    newMap.dislike(a, b);
    this.pushToTimeline(newMap);
  }

  public neutral(a: string, b: string) {
    const newMap = this.cloneDeep();
    newMap.neutral(a, b);
    this.pushToTimeline(newMap);
  }
  public enemies(a: string, b: string) {
    const newMap = this.cloneDeep();
    newMap.enemies(a, b);
    this.pushToTimeline(newMap);
  }
  public alliance(a: string[]) {
    const newMap = this.cloneDeep();
    newMap.alliance(a);
    this.pushToTimeline(newMap);
  }

  public evict(a: string) {
    const newMap = this.cloneDeep();
    newMap.evict(a);
    this.pushToTimeline(newMap);
  }
  public unevict(a: string) {
    const newMap = this.cloneDeep();
    newMap.unevict(a);
    this.pushToTimeline(newMap);
  }
}
