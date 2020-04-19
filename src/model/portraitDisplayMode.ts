import { Rgb, interpolateColor } from "./color";
import { PortraitState, PortraitProps } from "../components/memoryWall";
import { extremeValues, rng } from "../utils";
import {
  generatePopularitySubtitle,
  generatePowerSubtitle,
} from "../components/playerPortrait/subtitle";

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

// const powerMinColor = new Rgb(192, 181, 255);
// const powerMaxColor = new Rgb(255, 204, 94);
const powerMinColor = new Rgb(104, 128, 158); // blue

// const powerMinColor = new Rgb(148, 16, 240);
const powerMaxColor = new Rgb(255, 143, 0);

export const powerMode: PortraitDisplayMode = {
  minColor: powerMinColor,
  maxColor: powerMaxColor,
  backgroundColor: (state: PortraitState) => {
    const powerRanking = state.powerRanking;
    if (powerRanking === undefined) return "rgb(170, 170, 170)";
    return interpolateColor(powerMinColor, powerMaxColor, powerRanking);
  },
  generateSubtitle: generatePowerSubtitle,
};
