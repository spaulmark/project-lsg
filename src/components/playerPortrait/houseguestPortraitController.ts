import {
  PortraitProps,
  HouseguestPortrait,
  PortraitState,
} from "../memoryWall";
import { Subscription } from "rxjs";
import {
  selectedPlayer$,
  displayMode$,
  getSelectedPlayer,
  selectedTribe$,
} from "../../subjects/subjects";
import { SelectedPlayerData } from "./selectedPortrait";
import { Rgb } from "../../model/color";
import { isNullOrUndefined } from "util";
import {
  classifyRelationship,
  RelationshipTypeToPopularity,
} from "../../utils/ai/classifyRelationship";
import { tribeId } from "../../images/tribe";

const selectedColor = new Rgb(51, 255, 249);

export class HouseguestPortraitController {
  private subs: Subscription[] = [];
  private view: HouseguestPortrait;
  constructor(view: HouseguestPortrait) {
    this.view = view;
  }
  get defaultState(): PortraitState {
    return {
      popularity: this.view.props.popularity,
      displayMode: displayMode$.value,
      powerRanking: this.view.props.powerRanking,
      disabled: !!this.view.props.disabled,
    };
  }
  public backgroundColor(
    props: PortraitProps,
    state: PortraitState
  ): undefined | string {
    const selectedPlayer = getSelectedPlayer();
    if (state.disabled) return undefined;
    if (selectedPlayer !== null && selectedPlayer.id === props.id) {
      return selectedColor.toHex();
    }
    return props.isEvicted || state.disabled
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
      selectedTribe$.subscribe({
        next: this.refreshTribeFilter,
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

  private refreshTribeFilter = (id: string) => {
    if (!id) {
      // un-disable
      this.refreshData(getSelectedPlayer());
    } else {
      // disable
      const selectedPlayer = getSelectedPlayer();
      this.view.setState({
        disabled: id !== tribeId(this.view.props.tribe),
      });
      if (selectedPlayer !== null && selectedPlayer.id === this.view.props.id) {
        selectedPlayer$.next(null);
      }
    }
  };

  private refreshData = (data: SelectedPlayerData | null) => {
    if (this.view.state.disabled) return;
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
