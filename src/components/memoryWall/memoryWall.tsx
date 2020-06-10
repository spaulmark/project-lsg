import React from "react";
import { PlayerProfile } from "../../model";
import { RelationshipMap, DiscreteRelationshipMap } from "../../utils";
import { Tribe, tribeId, nullTribe } from "../../images/tribe";
import _ from "lodash";
import { TribeContainer } from "./tribeContainer";
import { Likemap } from "../../utils/likeMap";
export interface IMemoryWallProps {
  readonly houseguests: ProfileHouseguest[];
}

export interface ProfileHouseguest extends PlayerProfile {
  id?: number;
  isEvicted?: boolean;
  disabled?: boolean;
  tribe?: Tribe;
  //
  relationships?: RelationshipMap | DiscreteRelationshipMap;
  houseSize: number;
  deltaPopularity?: number;
  likedBy: Likemap;
  dislikedBy: Likemap;
  //
  hohWins?: number;
  povWins?: number;
  nominations?: number;
  tooltip?: string;
}

export function MemoryWall(props: IMemoryWallProps): JSX.Element {
  const houseguests = props.houseguests;
  if (!houseguests || houseguests.length === 0) {
    return <div />;
  }
  const houseguestsByTribe = _.groupBy(houseguests, (hg) =>
    hg.tribe === undefined ? hg.tribe : hg.tribe.name
  );
  const priorityMap: { [id: string]: number } = {};
  _.forEach(houseguestsByTribe, (tribe) => {
    const hg0 = tribe[0];
    priorityMap[tribeId(hg0.tribe)] = (hg0.tribe || nullTribe).priority || 0;
  });

  const tribes: JSX.Element[] = [];
  _.forEach(houseguestsByTribe, (hgs, name) => {
    if (name === "undefined" && _.size(houseguestsByTribe) > 1) {
      return;
    }
    const tribe: Tribe = hgs[0].tribe ? hgs[0].tribe : nullTribe;
    tribes.push(<TribeContainer key={tribeId(tribe)} {...{ tribe, hgs }} />);
  });
  tribes.sort((a, b) => {
    return priorityMap[b.key || ""] - priorityMap[a.key || ""];
  });
  return (
    <div
      style={{
        margin: "auto",
        maxWidth: -1,
      }}
    >
      <div className="columns is-multiline is-centered">{tribes}</div>
    </div>
  );
}
