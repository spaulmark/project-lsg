import React from "react";
import { Box } from "../layout/box";
import { HasText } from "../layout/text";
import { TopbarController } from "./topBarController";
import { RelationshipMapper } from "../../images/RelationshipMapper";
import { initialProfiles } from "../../images/initialProfiles";
import { players$ } from "../../subjects/subjects";
import { MetaRelationshipMapper } from "../../images/MetaRelationshipMapper";

interface TopbarProps {
  style?: any;
}
interface TopbarState {
  inputCode: string;
  rMapper: RelationshipMapper;
  metaRmapper: MetaRelationshipMapper;
  time: number;
}
export class Topbar extends React.Component<TopbarProps, TopbarState> {
  private controller: TopbarController;

  public constructor(props: TopbarProps) {
    super(props);
    this.controller = new TopbarController(this);
    this.state = {
      inputCode: "",
      metaRmapper: initialProfiles,
      time: 0,
      rMapper: initialProfiles.at(20),
    };
  }

  public componentDidMount() {
    players$.next(this.state.rMapper.houseguests);
  }
  private handleChange = (event: { target: { value: string } }) => {
    this.setState({ inputCode: event.target.value });
  };

  public render(): JSX.Element {
    const style = { ...{ marginTop: 30 }, ...(this.props.style || {}) };
    return (
      <Box className="level is-mobile" style={style}>
        <HasText className="level-item">
          Enter Code:
          <input
            className="input"
            value={this.state.inputCode}
            onChange={this.handleChange}
          />
          <button
            disabled={!!!this.state.inputCode}
            className={`button is-light`}
            onClick={this.controller.onSubmit}
          >
            Submit
          </button>
        </HasText>
      </Box>
    );
  }
}
