import React from "react";
import { ThemeSwitcher } from "./themeSwitch";
import { Box } from "../layout/box";
import { HasText } from "../layout/text";

export function Topbar(props: { style?: any }): JSX.Element {
  const style = { ...{ marginTop: 30 }, ...(props.style || {}) };
  return (
    <Box className="level is-mobile" style={style}>
      <HasText className="level-item">
        TODO: Enter Code: <input className="input" />
      </HasText>
      <div className="level-item">
        <ThemeSwitcher />
      </div>
    </Box>
  );
}
