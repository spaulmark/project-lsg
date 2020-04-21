import { Topbar } from "./topBar";
import { decodeToRelationshipMapper } from "../../images/decoder";
import { RelationshipMapper } from "../../images/RelationshipMapper";
import { players$ } from "../../subjects/subjects";

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
    if (newMap === null) return;
    this.view.setState({ rMapper: newMap, inputCode: "" });
    players$.next(newMap.houseguests);
  };
}
