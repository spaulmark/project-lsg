import { Topbar } from "./topBar";
import { decodeToRelationshipMapper } from "../../images/decoder";
import { RelationshipMapper } from "../../images/RelationshipMapper";
import { players$, selectedTribe$ } from "../../subjects/subjects";
import { selectedPlayer$, emptySet } from "../../subjects/selectedPlayer$";
import { nullTribe } from "../../images/tribe";

export class TopbarController {
  private view: Topbar;
  public constructor(view: Topbar) {
    this.view = view;
  }
  public onSubmit = () => {
    if (!this.view.state.inputCode) return;
    const newMap: RelationshipMapper | null = decodeToRelationshipMapper(
      this.view.state.rMapper,
      this.view.state.inputCode
    );
    this.view.setState({ inputCode: "" });
    if (newMap === null) return;

    this.view.setState({ rMapper: newMap });
    players$.next(newMap.houseguests);
    selectedPlayer$.next(emptySet());
    selectedTribe$.next(nullTribe);
  };
}
