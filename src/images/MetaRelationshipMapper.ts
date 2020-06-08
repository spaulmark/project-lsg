import {
  RelationshipMapper,
  RelationshipHouseguest,
} from "./RelationshipMapper";

export class MetaRelationshipMapper {
  public timeline: RelationshipMapper[] = [];
  private _t = 0;
  private get t(): number {
    const t = this._t;
    this._t++;
    return t;
  }

  public constructor(houseguests: RelationshipHouseguest[]) {
    this.timeline[this.t] = new RelationshipMapper(houseguests);
  }
}
