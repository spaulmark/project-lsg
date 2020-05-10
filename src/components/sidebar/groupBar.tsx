import React, { useState } from "react";
import { Box } from "../layout/box";
import { Centered } from "../layout/centered";
import { HasText } from "../layout/text";

export function Groupbar() {
  const [isGroupSelectOn, setState] = useState(false);
  return (
    <Box style={{ width: 180, height: "100%" }}>
      <Centered>
        {!isGroupSelectOn && (
          <button className="button is-primary" onClick={() => setState(true)}>
            Select Group
          </button>
        )}
        {isGroupSelectOn && [
          <HasText>{`0 selected`}</HasText>,

          <Centered className="buttons is-centered">
            <button
              className="button is-small is-warning"
              onClick={() => setState(false)}
            >
              Cancel
            </button>
            <button
              className="button is-small is-primary"
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
