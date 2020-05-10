import React, { useState } from "react";
import { Box } from "../layout/box";
import { Centered } from "../layout/centered";
import { HasText } from "../layout/text";
import { Subscription } from "rxjs";
import {
  enableMultiSelection$,
  selectedPlayer$,
  emptySet,
} from "../../subjects/selectedPlayer$";

interface GroupBarState {
  groupSelectOn: boolean;
  count: number;
}

export class Groupbar extends React.Component<{}, GroupBarState> {
  private subs: Subscription[] = [];

  public constructor(props: any) {
    super(props);
    this.state = { groupSelectOn: false, count: 0 };
  }

  public componentDidMount() {
    this.subs.push(
      enableMultiSelection$.subscribe((groupSelectOn) =>
        this.setState({ groupSelectOn })
      )
    );
    this.subs.push(
      selectedPlayer$.subscribe((set) => {
        console.log(set);
        this.setState({ count: set.size });
      })
    );
  }

  public componentWillUnmount() {
    this.subs.forEach((sub) => sub.unsubscribe);
  }

  private cancel() {
    enableMultiSelection$.next(false);
    selectedPlayer$.next(emptySet());
  }

  public render() {
    const setState = (b: boolean) => enableMultiSelection$.next(b);
    const isGroupSelectOn = this.state.groupSelectOn;
    return (
      <Box style={{ width: 180, height: "100%" }}>
        <Centered>
          {!isGroupSelectOn && (
            <button
              className="button is-primary"
              onClick={() => setState(true)}
            >
              Select Group
            </button>
          )}
          {isGroupSelectOn && [
            <HasText key="x_selected">{`${this.state.count} selected`}</HasText>,
            <Centered key="buttons" className="buttons is-centered">
              <button
                key="cancel"
                className="button is-small is-warning"
                onClick={this.cancel.bind(this)}
              >
                Cancel
              </button>
              <button
                key="done"
                className={"button is-small is-primary"}
                disabled={this.state.count < 2}
                onClick={() => setState(false)}
              >
                Done
              </button>
            </Centered>,
          ]}
        </Centered>
      </Box>
    );
  }
}
