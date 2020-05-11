import { Rgb, interpolateColor } from "./color";
import { PortraitState, PortraitProps } from "../components/memoryWall";
import { extremeValues } from "../utils";
import { generatePopularitySubtitle } from "../components/playerPortrait/subtitle";

export interface PortraitDisplayMode {
  minColor: Rgb;
  maxColor: Rgb;
  backgroundColor: (state: PortraitState) => string;
  generateSubtitle: (
    props: PortraitProps,
    state: PortraitState,
    detailed?: boolean
  ) => any[];
}

const popularityMinColor = new Rgb(252, 137, 137);
const popularityMaxColor = new Rgb(137, 252, 137);

export const popularityMode: PortraitDisplayMode = {
  minColor: popularityMinColor,
  maxColor: popularityMaxColor,
  backgroundColor: (state: PortraitState) => {
    const popularity = state.popularity;
    if (popularity === undefined) {
      return "rgb(170, 170, 170)";
    }

    const extremePopularity = extremeValues(popularity);
    const percent = (extremePopularity + 1) / 2;
    return interpolateColor(popularityMinColor, popularityMaxColor, percent);
  },
  generateSubtitle: generatePopularitySubtitle,
};
