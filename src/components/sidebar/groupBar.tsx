import React from "react";
import { Box } from "../layout/box";
import { HasText } from "../layout/text";

export class Groupbar extends React.Component<{}, {}> {
  public render() {
    return (
      <Box style={{ minWidth: 180 }}>
        <HasText>groups go here</HasText>
      </Box>
    );
  }
}
