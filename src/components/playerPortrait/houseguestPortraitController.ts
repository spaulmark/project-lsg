import {
  PortraitProps,
  HouseguestPortrait,
  PortraitState,
} from "../memoryWall";
import { Subscription } from "rxjs";
import { displayMode$, selectedTribe$ } from "../../subjects/subjects";
import {
  selectedPlayer$,
  PlayerSet,
  getOnlySelectedPlayerOrNull,
  emptySet,
  getSelectedPlayers,
} from "../../subjects/selectedPlayer$";
import { Rgb } from "../../model/color";
import { isNullOrUndefined } from "util";
import {
  classifyRelationship,
  RelationshipTypeToPopularity,
} from "../../utils/ai/classifyRelationship";
import { tribeId, Tribe, tribeToFilter } from "../../images/tribe";
import _ from "lodash";
import {
  calculatePopularity,
  calculatePowerRanking,
} from "../../images/RelationshipMapper";
import { Filter } from "../../subjects/filter";
import { Like } from "../../utils/likeMap";

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
    const data = getSelectedPlayers();
    if (state.disabled) return undefined;
    const id = isNullOrUndefined(props.id) ? -1 : props.id;
    if (data.get(id)) {
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
      this.refreshData(getSelectedPlayers());
      return;
    }
    // o/w, disable if nessecary
    const selectedPlayer = getOnlySelectedPlayerOrNull();
    this.updateLikeCounts(tribeToFilter(selectedTribe));
    if (
      tribeId(selectedTribe) !== tribeId(this.view.props.tribe) &&
      selectedPlayer !== null &&
      selectedPlayer.id === this.view.props.id
    ) {
      selectedPlayer$.next(emptySet());
    }
  };

  private updateLikeCounts(filter: Filter) {
    const props = this.view.props;
    const disabled = filter.isPlayerDisabled(this.view.props);
    const newState: any = {
      disabled,
    };
    const f: (l: Like) => boolean = filter.isLikeInGroup;
    newState.likedBy = _.filter(props.likedBy, f);
    newState.dislikedBy = _.filter(props.dislikedBy, f);
    newState.thinksImThreat = _.filter(props.thinksImThreat, f);
    newState.thinksImWeak = _.filter(props.thinksImWeak, f);
    if (getSelectedPlayers().size > 0 && !disabled) {
      const n = filter.size;
      newState.popularity = calculatePopularity({ ...newState }, n);
      newState.powerRanking = calculatePowerRanking({ ...newState }, n);
    }
    this.view.setState(newState);
  }

  private goToDefaultState() {
    if (this.view.state.disabled) return;
    if (tribeId(selectedTribe$.value)) {
      this.updateLikeCounts(tribeToFilter(selectedTribe$.value));
    } else {
      this.view.setState(this.defaultState);
    }
  }

  private selectSelf() {
    this.view.setState({
      popularity: 2, // note; popularity = 2 means the player is currently selected.
      powerRanking: 2,
    });
  }

  private refreshData = (set: PlayerSet) => {
    const view = this.view;
    const props = this.view.props;
    if (view.state.disabled) return;
    if (set.size === 0) {
      // no one is selected
      this.goToDefaultState();
    } else if (set.size === 1) {
      // only one person is selected
      const data = getOnlySelectedPlayerOrNull()!;
      if (data.id !== props.id) {
        view.setState({
          popularity: getPopularity(
            props.relationships![data.id],
            data.relationships[props.id!]
          ),
          powerRanking: getPowerRanking(
            props.powerRankings![data.id],
            data.powerRankings[props.id!]
          ),
        });
      } else {
        this.selectSelf();
      }
    } else {
      const map = getSelectedPlayers();
      if (props.id && map.get(props.id)) {
        // multiple people are selected and I am one of them
        this.selectSelf();
      } else {
        // multiple people are selected and I am not one of them
        this.updateLikeCounts({
          size: map.size,
          isPlayerDisabled: (_) => false,
          isLikeInGroup: (l) => map.has(l.id),
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
