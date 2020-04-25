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
import { tribeId, Tribe } from "../../images/tribe";
import _ from "lodash";
import {
  calculatePopularity,
  calculatePowerRanking,
} from "../../images/RelationshipMapper";

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
      likedBy: this.view.props.likedBy,
      dislikedBy: this.view.props.dislikedBy,
      thinksImThreat: this.view.props.thinksImThreat,
      thinksImWeak: this.view.props.thinksImWeak,
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

  private refreshTribeFilter = (selectedTribe: Tribe) => {
    // un-disable all
    if (!selectedTribe.name) {
      this.refreshData(getSelectedPlayer());
      return;
    }
    // o/w, disable if nessecary
    const selectedPlayer = getSelectedPlayer();
    this.updateLikeCounts(selectedTribe);
    if (
      tribeId(selectedTribe) !== tribeId(this.view.props.tribe) &&
      selectedPlayer !== null &&
      selectedPlayer.id === this.view.props.id
    ) {
      selectedPlayer$.next(null);
    }
  };

  // this effectively restricts likeCounts to [people on the same tribe as me]
  // this function can later be repurposed into accepting a more generic filter, such as a group in general
  private updateLikeCounts(selectedTribe: Tribe) {
    const props = this.view.props;
    const disabled = tribeId(selectedTribe) !== tribeId(props.tribe);
    const newState: any = {
      disabled,
    };
    const f = hasSameTribe(tribeId(props.tribe));
    newState.likedBy = _.filter(props.likedBy, f);
    newState.dislikedBy = _.filter(props.dislikedBy, f);
    newState.thinksImThreat = _.filter(props.thinksImThreat, f);
    newState.thinksImWeak = _.filter(props.thinksImWeak, f);
    if (!getSelectedPlayer() && !disabled) {
      const n = props.tribe ? props.tribe.size : 0;
      newState.popularity = calculatePopularity({ ...newState }, n);
      newState.powerRanking = calculatePowerRanking({ ...newState }, n);
    }
    this.view.setState(newState);
  }

  private goToDefaultState() {
    if (this.view.state.disabled) return;
    if (tribeId(selectedTribe$.value)) {
      this.updateLikeCounts(selectedTribe$.value);
    } else {
      this.view.setState(this.defaultState);
    }
  }

  private refreshData = (data: SelectedPlayerData | null) => {
    if (this.view.state.disabled) return;
    if (!data) {
      this.goToDefaultState();
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

interface Like {
  tribeId: string;
  groups: Set<number>;
}

const hasSameTribe = (tribe: string): ((l: Like) => boolean) => {
  return (x: { tribeId: string; groups: Set<number> }): boolean => {
    return tribe === x.tribeId;
  };
};
