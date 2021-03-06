import React from "react";
import { SidebarController } from "./sidebarController";
import { Episode } from "../../model";
import { Box } from "../layout/box";
import { HasText } from "../layout/text";
interface SidebarState {
  episodes: Episode[];
  selectedScene: number;
}

export class Sidebar extends React.Component<{}, SidebarState> {
  private controller: SidebarController;
  public constructor(props: {}) {
    super(props);
    this.controller = new SidebarController(this);
    this.state = { episodes: [], selectedScene: 0 };
  }

  public componentDidMount() {
    document.addEventListener("keydown", this.controller.handleKeyDown);
  }

  public componentWillUnmount() {
    this.controller.destroy();
  }

  public render() {
    return (
      <Box style={{ minWidth: 180, display: "none" }}>
        <HasText>{this.getEpisodes()}</HasText>
      </Box>
    );
  }

  private getHighlight(title: string, key: number) {
    if (key === this.state.selectedScene) {
      return <mark>{title}</mark>;
    }
    return title;
  }

  private getEpisodes() {
    const result: JSX.Element[] = [];
    // Weird OBOE to make keys start at 0
    let episodeKey = -1;
    let breakKey = 0;
    this.state.episodes.forEach((episode: Episode) => {
      const id = ++episodeKey;
      result.push(
        <b
          key={id}
          onClick={() => {
            this.controller.switchToScene(id);
          }}
        >
          {this.getHighlight(episode.title, id)}
        </b>
      );
      result.push(<br key={--breakKey} />);
      // episode.scenes.forEach((scene: Scene) => {
      //   const id = ++episodeKey;
      //   if (this.controller.getSelectedEpisode() === episode.gameState.phase) {
      //     result
      //       .push
      //       // <a
      //       //   key={id}
      //       //   href={""}
      //       //   onClick={() => this.controller.switchToScene(id)}
      //       // >
      //       //   {this.getHighlight(scene.title, id)}
      //       // </a>
      //       ();
      //     result.push(<br key={--breakKey} />);
      //   }
      // });
    });
    return result;
  }
}
