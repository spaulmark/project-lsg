import {
  PortraitProps,
  HouseguestPortrait,
  PortraitState,
} from "../memoryWall";
import { Subscription } from "rxjs";
import { displayMode$, selectedTribe$ } from "../../subjects/subjects";
import {
  selectedPlayer$,
  getOnlySelectedPlayerOrNull,
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
import { calculatePopularity } from "../../images/RelationshipMapper";
import { Filter, compose } from "../../subjects/filter";
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
      disabled: !!this.view.props.disabled,
      likedBy: this.view.props.likedBy,
      dislikedBy: this.view.props.dislikedBy,
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
  public unsubscribe() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public subscribe() {
    const subs: Subscription[] = [];
    subs.push(
      selectedPlayer$.subscribe({
        next: (_: any) => {
          this.refreshData(selectedTribe$.getValue());
        },
      })
    );
    subs.push(
      selectedTribe$.subscribe({
        next: (selectedTribe: Tribe) => {
          this.refreshData(selectedTribe);
        },
      })
    );
    subs.push(
      displayMode$.subscribe({
        next: (displayMode) => this.view.setState({ displayMode }),
      })
    );
    this.subs = subs;
  }

  private updateLikeCounts(filter: Filter) {
    const props = this.view.props;
    const disabled = filter.isPlayerDisabled(this.view.props);
    const newState: any = {
      disabled,
    };
    const f: (l: Like) => boolean = filter.isLikeInGroup;
    newState.likedBy = _.filter(props.likedBy, f);
    newState.dislikedBy = _.filter(props.dislikedBy, f);

    const selectedPlayers = getSelectedPlayers().size;
    if (getSelectedPlayers().has(props.id || -1)) newState.popularity = 2;

    const data = getOnlySelectedPlayerOrNull()!;
    if (selectedPlayers === 1 && data.id !== props.id) {
      newState.popularity = getPopularity(
        props.relationships![data.id],
        data.relationships[props.id!]
      );
    } else {
      newState.popularity = calculatePopularity({ ...newState }, filter.size);
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

  private refreshData(selectedTribe: Tribe) {
    const tribeFilter = tribeToFilter(selectedTribe);
    const selectedPlayers = getSelectedPlayers();
    const view = this.view;
    const props = this.view.props;
    if (view.state.disabled) return;
    if (selectedPlayers.size === 0) {
      // no one is selected
      this.goToDefaultState();
    } else if (selectedPlayers.size === 1) {
      // only one person is selected
      this.updateLikeCounts(
        compose(tribeFilter, {
          size: 0, // size does not matter for 1 selected: all popularity is hardcoded
          isPlayerDisabled: (_) => false,
          isLikeInGroup: (l) => true,
        })
      );
    } else {
      // multiple people are selected
      if (!isNullOrUndefined(props.id) && selectedPlayers.get(props.id)) {
        // multiple people are selected and I am one of them
        this.updateLikeCounts(
          compose(tribeFilter, {
            size: 0, // size doesn't matter for selected players --- their color is set to blue.
            isPlayerDisabled: (_) => false,
            isLikeInGroup: (l) => !selectedPlayers.has(l.id),
          })
        );
      } else {
        // multiple people are selected and I am not one of them
        this.updateLikeCounts(
          compose(tribeFilter, {
            size: selectedPlayers.size,
            isPlayerDisabled: (_) => false,
            isLikeInGroup: (l) => selectedPlayers.has(l.id),
          })
        );
      }
    }
  }
}
type Rship = number | boolean | undefined;

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
