import React from "react";
import { selectPlayer } from "./selectedPortrait";
import { isNullOrUndefined } from "util";
import { RelationshipMap, DiscreteRelationshipMap } from "../../utils";
import _ from "lodash";
import { HouseguestPortraitController } from "./houseguestPortraitController";
import { PortraitDisplayMode } from "../../model/portraitDisplayMode";
import styled from "styled-components";
import { ColorTheme } from "../../theme/theme";
import { Tribe } from "../../images/tribe";
import { displayMode$ } from "../../subjects/subjects";

const Subtitle = styled.small`
  font-weight: 100;
  font-size: small;
`;

const MemoryWallPortrait = styled.div`
  margin: 5px;
  border: 1px solid
    ${({ theme }: { theme: ColorTheme }) => theme.portraitBorder};
  color: black;
  border-radius: 5px;
  text-align: center;
  font-weight: 600;
  max-width: 7rem;
  word-wrap: break-word;
  -webkit-transition-property: none;
  -moz-transition-property: none;
  -o-transition-property: none;
  transition-property: none;
`;

const Evicted = styled(MemoryWallPortrait)`
  font-weight: 100;
  color: grey;
  background-color: #111111;
`;

const Jury = styled(MemoryWallPortrait)`
  font-weight: 100;
  color: #c3ae88;
  background-color: #5d5340;
  filter: brightness(0.6);
`;

const Normal = styled.img`
  min-width: 100px;
  width: 100%;
  width: -moz-available; /* For Mozzila */
  width: -webkit-fill-available; /* For Chrome */
  width: stretch; /* Unprefixed */
`;

const Grayscale = styled(Normal)`
  filter: grayscale(100%);
`;

const Sepia = styled(Normal)`
  filter: sepia(100%);
`;

export interface PortraitProps {
  imageURL: string;
  name: string;
  id?: number;
  relationships?: RelationshipMap | DiscreteRelationshipMap;
  popularity?: number;
  powerRankings: DiscreteRelationshipMap;
  powerRanking?: number;
  isEvicted?: boolean;
  disabled?: boolean;
  deltaPopularity?: number;
  detailed?: boolean;
  superiors?: Set<number>;
  likedBy: number;
  dislikedBy: number;
  thinksImWeak: number;
  thinksImThreat: number;
  tribe?: Tribe;
}

export interface PortraitState {
  popularity?: number;
  powerRanking?: number;
  displayMode: PortraitDisplayMode;
  disabled: boolean;
}
export class HouseguestPortrait extends React.Component<
  PortraitProps,
  PortraitState
> {
  private controller: HouseguestPortraitController;

  public constructor(props: PortraitProps) {
    super(props);
    this.controller = new HouseguestPortraitController(this);
    this.state = this.controller.defaultState;
  }

  public componentDidMount() {
    if (isNullOrUndefined(this.props.id)) {
      return;
    }
    this.controller.subscribe();
  }

  public componentWillUnmount() {
    this.controller.unsubscribe();
  }

  private onClick(): void {
    if (
      isNullOrUndefined(this.props.id) ||
      !this.props.relationships ||
      this.state.disabled ||
      this.props.isEvicted
    ) {
      return;
    }
    const data = {
      id: this.props.id,
      relationships: this.props.relationships,
      isEvicted: !!this.props.isEvicted,
      popularity: this.props.popularity || 0,
      superiors: this.props.superiors,
      powerRankings: this.props.powerRankings,
    };
    selectPlayer(data);
  }

  public render() {
    const props = this.props;
    const state = this.state;
    const Img = getImageClass(props, state);
    let subtitle: any[] = [];
    subtitle = this.state.displayMode.generateSubtitle(
      props,
      state,
      !!props.detailed
    );

    let Portrait = MemoryWallPortrait;
    if (state.disabled) {
      Portrait = Jury;
    } else if (props.isEvicted) {
      Portrait = Evicted;
    }
    return (
      <Portrait
        onClick={() => this.onClick()}
        style={{
          backgroundColor: this.controller.backgroundColor(props, this.state),
        }}
      >
        <Img src={props.imageURL} style={{ height: 100 }} />
        <br />
        {props.name}
        <br />
        <Subtitle>{subtitle}</Subtitle>
      </Portrait>
    );
  }
}

function getImageClass(props: PortraitProps, state: PortraitState) {
  let imageClass = props.isEvicted ? Grayscale : Normal;
  imageClass = state.disabled ? Sepia : imageClass;
  return imageClass;
}
