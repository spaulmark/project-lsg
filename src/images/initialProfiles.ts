import { PlayerProfile } from "../model";

function importAll(r: any): PlayerProfile[] {
  const profiles: PlayerProfile[] = [];
  r.keys().map((item: string) => {
    profiles.push({
      name: item.replace(".png", "").replace("./", ""),
      imageURL: r(item),
    });
  });
  return profiles;
}

export const initialProfiles = importAll(
  require.context("./src", false, /.png/)
);
