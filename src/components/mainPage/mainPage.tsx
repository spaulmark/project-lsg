import "./bulma.scss";
import React from "react";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topBar";
import { MainContentArea } from "./mainContentArea";
import { MainPageController } from "./mainPageController";
import { Groupbar } from "../sidebar/groupBar";

interface MainPageProps {
  controller: MainPageController;
}

interface MainPageState {
  fullscreen: boolean;
}

export class MainPage extends React.Component<MainPageProps, MainPageState> {
  public constructor(props: MainPageProps) {
    super(props);
    this.state = { fullscreen: false };
    props.controller.inject(this);
  }
  public componentDidMount() {
    this.props.controller.subscribe();
  }
  public componentWillUnmount() {
    this.props.controller.unsubscribe();
  }

  public render() {
    const fullscreen = this.state.fullscreen;
    const hideOnFullscreen = { display: fullscreen ? "none" : "" };
    const wrapperStyle = fullscreen
      ? { margin: "auto" }
      : { margin: "auto", maxWidth: 1380, overflow: "hidden" };
    return (
      <div style={wrapperStyle}>
        <Topbar style={hideOnFullscreen} />
        <Sidebar />
        <div className="columns">
          <div className="column" style={{ overflowX: "hidden" }}>
            <MainContentArea />
          </div>
          <div className="column is-narrow">
            <Groupbar />
          </div>
        </div>
      </div>
    );
  }
}
