import React from "react";
import { DividerBox } from "../layout/box";
import { Portraits } from "../playerPortrait/portraits";
import { ProfileHouseguest } from ".";
import styled from "styled-components";
import { textColor } from "../../model/color";
import { selectTribe } from "./selectedTribe";
import { Subscription } from "rxjs";
import { selectedTribe$ } from "../../subjects/subjects";
import { Tribe, tribeId } from "../../images/tribe";

interface TribeContainerProps {
  hgs: ProfileHouseguest[];
  tribe: Tribe;
}

interface TribeContainerState {
  selected: boolean;
}

export class TribeContainer extends React.Component<
  TribeContainerProps,
  TribeContainerState
> {
  private subs: Subscription[] = [];

  public constructor(props: TribeContainerProps) {
    super(props);
    this.state = { selected: false };
  }
  public componentDidMount() {
    this.subs.push(
      selectedTribe$.subscribe((selected) => {
        this.setState({
          selected: tribeId(selected) === tribeId(this.props.tribe),
        });
      })
    );
  }

  public componentWillUnmount() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  private select() {
    selectTribe(this.props.tribe);
  }

  public render() {
    const Hoverable = this.getHoverable(this.props.tribe.color);
    const tribeName = this.props.tribe.name;
    return (
      <DividerBox key={tribeName} style={{ textAlign: "center" }}>
        {tribeName !== "undefined" && (
          <p>
            <Hoverable onClick={this.select.bind(this)}>{tribeName}</Hoverable>
          </p>
        )}
        <div
          style={{
            margin: "auto",
            maxWidth: this.props.hgs.length > 7 ? 800 : -1,
          }}
        >
          <Portraits houseguests={this.props.hgs} centered={true}></Portraits>
        </div>
      </DividerBox>
    );
  }
  private getHoverable = (color: string) => {
    const normal = `background-color: ; color: ${color};`;
    const hilite = `background-color: ${color}; color: ${textColor(color)};`;
    const selected = this.state.selected;
    return styled.b`
      :not(:hover) {
        ${selected ? hilite : normal}
      }
      :hover {
        ${hilite}
      }
    `;
  };
}
