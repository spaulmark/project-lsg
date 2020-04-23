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
      selectedTribe$.subscribe((id) => {
        this.setState({ selected: id === tribeId(this.props.tribe) });
      })
    );
  }

  public componentWillUnmount() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  private select() {
    console.log("selecting", this.props.tribe.name);
    selectTribe(this.props.tribe);
  }

  public render() {
    console.log(this.props.tribe.name, this.state);
    const Hoverable = this.getHoverable(this.props.tribe.color);
    const tribeName = this.props.tribe.name;
    return (
      <DividerBox key={tribeName} style={{ textAlign: "center" }}>
        {tribeName !== "undefined" && (
          <p>
            <Hoverable onClick={this.select.bind(this)}>{tribeName}</Hoverable>
          </p>
        )}
        <Portraits houseguests={this.props.hgs} centered={true}></Portraits>
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
        ${selected ? normal : hilite}
      }
    `;
  };
}
