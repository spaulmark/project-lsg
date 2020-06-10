import React from "react";
import { Box } from "../layout/box";
import Slider from "@material-ui/core/Slider";
import { RelationshipMapper } from "../../images/RelationshipMapper";
import { initialProfiles } from "../../images/initialProfiles";
import { players$ } from "../../subjects/subjects";
import { MetaRelationshipMapper } from "../../images/MetaRelationshipMapper";
import { HasText } from "../layout/text";
import { CenteredBold } from "../layout/centered";
import { primary, secondary } from "../../App";

interface TopbarProps {
  style?: any;
}
interface TopbarState {
  rMapper: RelationshipMapper;
  metaRmapper: MetaRelationshipMapper;
  time: number;
  selectedEpisode: number;
}
export class Topbar extends React.Component<TopbarProps, TopbarState> {
  // private controller: TopbarController;

  public constructor(props: TopbarProps) {
    super(props);
    // this.controller = new TopbarController(this);
    this.state = {
      metaRmapper: initialProfiles,
      time: 1,
      selectedEpisode: 1,
      rMapper: initialProfiles.at(1),
    };
  }

  private handleChange = (event: any, newValue: any) => {
    this.setState({ selectedEpisode: newValue });
  };
  public componentDidMount() {
    players$.next(this.state.rMapper.houseguests);
  }

  public componentDidUpdate(prevProps: TopbarProps, prevState: TopbarState) {
    const metaMapper = this.state.metaRmapper;
    const selectedEpisode = this.state.selectedEpisode;
    if (prevState.selectedEpisode !== this.state.selectedEpisode) {
      players$.next(
        metaMapper.at(metaMapper.episodeStartMarkers[selectedEpisode - 1])
          .houseguests
      );
    }
  }

  public render(): JSX.Element {
    const style = { ...{ marginTop: 30 }, ...(this.props.style || {}) };
    const metaMapper = this.state.metaRmapper;
    return (
      <Box className="" style={style}>
        <HasText className="columns is-gapless is-vcentered">
          <div className="column is-1">
            <CenteredBold style={{ color: primary }}>Episode</CenteredBold>
          </div>
          <div className="column ">
            <Slider
              color="primary"
              marks={true}
              step={1}
              defaultValue={1}
              min={1}
              onChange={this.handleChange}
              max={metaMapper.episodeStartMarkers.length}
              valueLabelDisplay="on"
              aria-labelledby="continuous-slider"
            />
          </div>
        </HasText>
        <HasText className="columns is-vcentered">
          <div className="column is-1">
            <CenteredBold style={{ color: secondary }}>Timeline</CenteredBold>
          </div>
          <div className="column">
            <Slider color="secondary" aria-labelledby="continuous-slider" />
          </div>
        </HasText>
      </Box>
    );
  }
}
