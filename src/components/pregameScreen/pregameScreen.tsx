import React from "react";
import { PlayerProfile } from "../../model";
import { MemoryWall } from "../memoryWall";
import { NextEpisodeButton } from "../nextEpisodeButton/nextEpisodeButton";
import { HasText } from "../layout/text";

interface PregameScreenProps {
  cast: PlayerProfile[];
}

export function PregameScreen(props: PregameScreenProps): JSX.Element {
  if (props.cast.length === 0) {
    return <HasText>Cast is empty.</HasText>;
  }
  return (
    <HasText>
      Welcome to Big Brother!
      <MemoryWall houseguests={props.cast} />
      <NextEpisodeButton />
    </HasText>
  );
}
