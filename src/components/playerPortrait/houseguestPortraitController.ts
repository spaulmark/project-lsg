import { PortraitProps, HouseguestPortrait } from "../memoryWall";
import { Subscription } from "rxjs";
import {
  selectedPlayer$,
  displayMode$,
  getSelectedPlayer,
} from "../../subjects/subjects";
import { SelectedPlayerData } from "./selectedPortrait";
import { Rgb } from "../../model/color";
import { PowerRanking } from "../../model/powerRanking";
import { isNullOrUndefined } from "util";
import {
  classifyRelationship,
  RelationshipTypeToPopularity,
} from "../../utils/ai/classifyRelationship";

const selectedColor = new Rgb(51, 255, 249);

export class HouseguestPortraitController {
  private subs: Subscription[] = [];
  private view: HouseguestPortrait;
  constructor(view: HouseguestPortrait) {
    this.view = view;
  }

  get defaultState() {
    return {
      popularity: this.view.props.popularity,
      displayMode: displayMode$.value,
      powerRanking: this.view.props.powerRanking,
    };
  }

  public backgroundColor(props: PortraitProps): undefined | string {
    const selectedPlayer = getSelectedPlayer();
    if (selectedPlayer !== null && selectedPlayer.id === props.id) {
      return selectedColor.toHex();
    }
    return props.isEvicted || props.isJury
      ? undefined
      : this.view.state.displayMode.backgroundColor(this.view.state);
  }

  public subscribe() {
    const subs: Subscription[] = [];
    subs.push(
      selectedPlayer$.subscribe({
        next: this.refreshData,
      })
    );
    subs.push(
      displayMode$.subscribe({
        next: (displayMode) => this.view.setState({ displayMode }),
      })
    );
    this.subs = subs;
  }

  public unsubscribe() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  private refreshData = (data: SelectedPlayerData | null) => {
    if (!data) {
      this.view.setState(this.defaultState);
    } else {
      if (data.id !== this.view.props.id) {
        this.view.setState({
          popularity: getPopularity(
            this.view.props.relationships![data.id],
            data.relationships[this.view.props.id!]
          ),
          powerRanking: getPowerRanking(
            this.view.props.powerRankings![data.id],
            data.powerRankings[this.view.props.id!]
          ),
        });
      } else {
        // note; popularity = 2 means the player is currently selected.
        this.view.setState({
          popularity: 2,
          powerRanking: 2,
        });
      }
    }
  };
}
type Rship = number | boolean | undefined;

function getPowerRanking(hero: Rship, villain: Rship): number | undefined {
  if (typeof hero === "number") {
    return hero;
  } else if (typeof villain === "number") {
    return villain;
  }
  if (hero === true) return 1;
  if (hero === false) return 0;
  return undefined;
}

function getPopularity(hero: Rship, villain: Rship): number | undefined {
  if (isNullOrUndefined(hero) && isNullOrUndefined(villain)) return undefined;

  if (typeof hero === "number") {
    return hero;
  } else if (typeof villain === "number") {
    return villain;
  }

  const relationshipType = classifyRelationship(0, 0, hero, villain);
  return RelationshipTypeToPopularity[relationshipType];
}
