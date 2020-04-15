import React from "react";
import { MemoryWall, ProfileHouseguest } from "../memoryWall";
import { HasText } from "../layout/text";
import { ViewsBar } from "../viewsBar/viewBar";

interface PregameScreenProps {
  cast: ProfileHouseguest[];
}

export function PregameScreen(props: PregameScreenProps): JSX.Element {
  if (props.cast.length === 0) {
    return <HasText>Cast is empty.</HasText>;
  }
  return (
    <HasText>
      <ViewsBar />
      <MemoryWall houseguests={props.cast} />
    </HasText>
  );
}
