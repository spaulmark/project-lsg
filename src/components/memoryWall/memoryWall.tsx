import React from "react";
import { PlayerProfile } from "../../model";
import { Portraits } from "../playerPortrait/portraits";
import { RelationshipMap, DiscreteRelationshipMap } from "../../utils";
import { Tribe } from "../../images/tribe";
import _ from "lodash";
import { DividerBox } from "../layout/box";
import styled from "styled-components";
import { textColor } from "../../model/color";
export interface IMemoryWallProps {
  readonly houseguests: ProfileHouseguest[];
}

const getHoverable = (color: string) => {
  return styled.p`
    background-color: ${color};
    color: ${textColor(color)};
    // :hover {
    //   color: ${color};
    // }
  `;
};

export interface ProfileHouseguest extends PlayerProfile {
  id?: number;
  isEvicted?: boolean;
  isJury?: boolean;
  tribe?: Tribe;
  //
  relationships?: RelationshipMap | DiscreteRelationshipMap;
  popularity?: number;
  deltaPopularity?: number;
  likedBy: number;
  dislikedBy: number;
  //
  powerRankings: DiscreteRelationshipMap;
  powerRanking?: number;
  thinksImWeak: number;
  thinksImThreat: number;
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
  const tribes: JSX.Element[] = [];
  _.forEach(houseguestsByTribe, (hgs, tribeName) => {
    if (tribeName === "undefined" && _.size(houseguestsByTribe) > 1) {
      return;
    }
    const color = hgs[0].tribe ? hgs[0].tribe.color : "";
    const Hoverable = getHoverable(color);
    tribes.push(
      <DividerBox key={tribeName} style={{ textAlign: "center" }}>
        {tribeName !== "undefined" && (
          <b>
            <Hoverable>{tribeName}</Hoverable>
          </b>
        )}
        <Portraits houseguests={hgs} centered={true}></Portraits>
      </DividerBox>
    );
  });
  return (
    <div
      style={{
        margin: "auto",
        maxWidth: -1,
      }}
    >
      {tribes}
    </div>
  );
}
