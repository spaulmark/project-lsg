import { ProfileHouseguest } from "../components/memoryWall";
import { newDiscreteRelationshipMap } from "../utils";
/* id?: number;
  relationships?: RelationshipMap;
  isEvicted?: boolean;
  isJury?: boolean;
  popularity?: number;
  tooltip?: string;
  getFriendEnemyCount?: () => { friends: number; enemies: number };*/
function importAll(r: any): ProfileHouseguest[] {
  const profiles: ProfileHouseguest[] = [];
  r.keys().map((item: string, i: number) => {
    profiles.push({
      name: item.replace(".png", "").replace("./", ""),
      imageURL: r(item),
      id: i,
      // popularity: 0.5,
      relationships: newDiscreteRelationshipMap(r.length - 1, i), // TODO: need a discrete relationship map.
    });
  });
  return profiles;
}

export const initialProfiles = importAll(
  require.context("./src", false, /.png/)
);
