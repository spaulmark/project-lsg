import React from "react";
import { Box } from "../layout/box";
import Slider from "@material-ui/core/Slider";
import { RelationshipMapper } from "../../images/RelationshipMapper";
import { initialProfiles } from "../../images/initialProfiles";
import { players$Next } from "../../subjects/subjects";
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
    this.state = {
      metaRmapper: initialProfiles,
      time: 1,
      selectedEpisode: 1,
      rMapper: initialProfiles.at(1),
    };
  }

  private handleEpisodeChange = (event: any, selectedEpisode: any) => {
    this.setState({ selectedEpisode });
  };

  public componentDidMount() {
    players$Next(this.state.rMapper.houseguests);
  }

  private handleTimeChange = (event: any, time: any) => {
    this.setState({ time });
  };

  public componentDidUpdate(prevProps: TopbarProps, prevState: TopbarState) {
    const metaMapper = this.state.metaRmapper;
    const selectedEpisode = this.state.selectedEpisode;
    if (prevState.selectedEpisode !== this.state.selectedEpisode) {
      players$Next(
        metaMapper.at(metaMapper.episodeStartMarkers[selectedEpisode - 1] + 1)
          .houseguests
      );
    } else if (prevState.time !== this.state.time) {
      players$Next(metaMapper.at(this.state.time).houseguests);
    }
  }

  public render(): JSX.Element {
    const style = { ...{ marginTop: 30 }, ...(this.props.style || {}) };
    const metaMapper = this.state.metaRmapper;
    const min =
      metaMapper.episodeStartMarkers[this.state.selectedEpisode - 1] + 1;
    const max = metaMapper.episodeStartMarkers[this.state.selectedEpisode];
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
              onChange={this.handleEpisodeChange}
              max={metaMapper.episodeStartMarkers.length}
              valueLabelDisplay="on"
              aria-labelledby="episode-slider"
            />
          </div>
        </HasText>
        <HasText className="columns is-vcentered">
          <div className="column is-1">
            <CenteredBold style={{ color: secondary }}>Timeline</CenteredBold>
          </div>
          <div className="column">
            <Slider
              color="secondary"
              aria-labelledby="timeline-slider"
              defaultValue={0}
              onChange={this.handleTimeChange}
              min={min}
              max={max}
              disabled={min >= max || max === undefined}
              valueLabelDisplay="off"
            />
          </div>
        </HasText>
      </Box>
    );
  }
}
