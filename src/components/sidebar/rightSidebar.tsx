import { Box } from "../layout/box";
import { GroupButtons } from "./groupButtons";
import React, { useState } from "react";

export function RightSidebar() {
  const [selected, select] = useState("");
  return (
    <Box style={{ width: 180, height: "100%" }}>
      {(!selected || selected === "group") && <GroupButtons hook={select} />}
    </Box>
  );
}
