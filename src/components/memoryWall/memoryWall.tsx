import React from "react";
import { PlayerProfile } from "../../model";
import { Portraits } from "../playerPortrait/portraits";
import { RelationshipMap, DiscreteRelationshipMap } from "../../utils";
export interface IMemoryWallProps {
  readonly houseguests: ProfileHouseguest[];
}

export interface ProfileHouseguest extends PlayerProfile {
  id?: number;
  relationships?: RelationshipMap | DiscreteRelationshipMap;
  isEvicted?: boolean;
  isJury?: boolean;
  popularity?: number;
  deltaPopularity?: number;
  hohWins?: number;
  povWins?: number;
  nominations?: number;
  tooltip?: string;
  getFriendEnemyCount?: () => { friends: number; enemies: number };
}

export function MemoryWall(props: IMemoryWallProps): JSX.Element {
  if (!props.houseguests || props.houseguests.length === 0) {
    return <div />;
  }
  return (
    <div
      style={{
        margin: "auto",
        maxWidth: -1,
      }}
    >
      <Portraits
        houseguests={props.houseguests}
        centered={true}
        detailed={true}
      />
    </div>
  );
}
