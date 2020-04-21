import React from "react";
import { MemoryWall } from "../memoryWall";
import { HasText } from "../layout/text";
import { ViewsBar } from "../viewsBar/viewBar";
import { ProfileHouseguest } from "../memoryWall/memoryWall";
import { Subscription } from "rxjs";
import { players$ } from "../../subjects/subjects";

interface PregameScreenState {
  cast: ProfileHouseguest[];
}

export class MemoryWallScreen extends React.Component<{}, PregameScreenState> {
  private subs: Subscription[] = [];
  public constructor(props: never) {
    super(props);
    this.state = { cast: players$.value };
  }

  public componentDidMount() {
    this.subs.push(
      players$.subscribe((cast) => {
        this.setState({ cast });
      })
    );
  }

  public componentWillUnmount() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public render() {
    if (this.state.cast.length === 0) {
      return <HasText>Cast is empty.</HasText>;
    }
    return (
      <HasText>
        <ViewsBar />
        <MemoryWall houseguests={this.state.cast} />
      </HasText>
    );
  }
}
