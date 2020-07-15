import React from "react";
import { popularityMode } from "../../model/portraitDisplayMode";
import { ViewBarTag } from "./viewBarTag";
import { Box } from "../layout/box";
import styled from "styled-components";
import { ColorTheme } from "../../theme/theme";

const ViewsBox = styled(Box)`
  background: ${({ theme }: { theme: ColorTheme }) => theme.overlay};
`;

export function ViewsBar() {
  return (
    <ViewsBox className="level is-mobile" key="viewsbar">
      <ViewBarTag mode={popularityMode} text={"Relationships"}></ViewBarTag>
    </ViewsBox>
  );
}
