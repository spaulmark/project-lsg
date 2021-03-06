import { newDiscreteRelationshipMap } from "../utils";
import { RelationshipHouseguest } from "./RelationshipMapper";
import { MetaRelationshipMapper } from "./MetaRelationshipMapper";

const master_kohga = "master kohga";
const master = "master kohga";
const revali = "revali";
const teebo = "teebo";
const kass = "kass";
const link = "link";
const chio = "chio";
const roscoe = "roscoe";
const riju = "riju";
const magda = "magda";
const ancient_oven = "ancient oven";
const oven = "ancient oven";
const patrica = "patrica";
const patricia = "patrica";
const oaki = "oaki";
const mipha = "mipha";
const prince_sidon = "prince sidon";
const sidon = "prince sidon";
const epona = "epona";
const robbie = "robbie";
const karson = "karson";
const urbosa = "urbosa";
const hunnie = "hunnie";
const pelison = "pelison";
const horse = "royal white horse";
function importAll(
  context: __WebpackModuleApi.RequireContext
): MetaRelationshipMapper {
  const profiles: RelationshipHouseguest[] = [];
  setupProfiles(context, profiles, new Set<string>(), new Set<string>());
  const r: MetaRelationshipMapper = new MetaRelationshipMapper(profiles);

  const tribeSwap = r.tribeSwap.bind(r);
  const like = r.like.bind(r);
  const friends = r.friends.bind(r);
  const dislike = r.dislike.bind(r);
  const alliance = r.alliance.bind(r);
  const neutral = r.neutral.bind(r);
  const enemies = r.enemies.bind(r);
  const evict = r.evict.bind(r);
  const unevict = r.unevict.bind(r);
  const endEpisode = r.endEpisode.bind(r);
  tribeSwap([
    {
      name: "Wisdom",
      color: "#635cb9",
      priority: -1,
      members: [
        "ancient oven",
        "epona",
        "hunnie",
        "karson",
        "mipha",
        "pelison",
        "urbosa",
      ],
    },
    {
      name: "Power",
      color: "#c70134",
      priority: 1,
      members: [
        "Kass",
        "magda",
        "master kohga",
        "patrica",
        "revali",
        "roscoe",
        "teebo",
      ],
    },
    {
      name: "Courage",
      color: "#7d8d4e",
      members: [
        "Link",
        "chio",
        "oaki",
        "prince sidon",
        "royal white horse",
        "robbie",
        "riju",
      ],
    },
  ]);
  dislike(magda, patrica);
  dislike(magda, roscoe);
  dislike(magda, kass);
  like(magda, revali);
  like(epona, hunnie);
  like(epona, urbosa);
  like(epona, pelison);
  dislike(epona, ancient_oven);
  like(master_kohga, revali);
  like(master_kohga, kass);
  dislike(master_kohga, teebo);
  friends(chio, link);
  like(chio, riju);
  dislike(chio, robbie);
  like(magda, master_kohga);
  dislike(master_kohga, roscoe);
  like(roscoe, revali);
  like(roscoe, master_kohga);
  like(roscoe, magda);
  like(roscoe, kass);
  like(roscoe, patrica);
  like(roscoe, teebo);
  like(pelison, mipha);
  like(pelison, urbosa);
  like(pelison, hunnie);
  like(revali, magda);
  like(revali, master_kohga);
  like(revali, kass);
  like(revali, roscoe);
  dislike(revali, patrica);
  dislike(revali, teebo);
  like(chio, oaki);
  dislike(robbie, chio);
  like(chio, prince_sidon);
  like(oaki, prince_sidon);
  like(oaki, chio);
  like(oaki, riju);
  like(oaki, link);
  like(link, robbie);
  like(link, oaki);
  like(mipha, oven);
  dislike(epona, karson);
  like(epona, mipha);
  like(robbie, riju);
  like(robbie, link);
  like(mipha, urbosa);
  like(mipha, epona);
  like(sidon, oaki);
  like(urbosa, epona);
  alliance([teebo, roscoe, kass]); // YIKES LOL -- he wants koga as his fourth
  like(revali, teebo);
  dislike(revali, patrica);
  like(pelison, oven);
  like(pelison, mipha);
  like(oven, epona); // according to pelison
  like(oaki, sidon);
  like(robbie, horse);
  dislike(robbie, link);
  like(robbie, oaki);
  like(oaki, riju); // he wants to be her goat
  dislike(oaki, link);
  like(sidon, link);
  like(riju, link);
  dislike(roscoe, patrica);
  dislike(roscoe, master);
  dislike(roscoe, magda);
  like(teebo, kass);
  dislike(teebo, patricia);
  like(kass, master);
  like(master, magda);
  friends(sidon, horse);
  dislike(sidon, robbie);
  dislike(sidon, riju);
  like(riju, robbie);
  like(riju, oaki);
  like(riju, chio);
  dislike(riju, horse);
  // posted update 1
  dislike(mipha, hunnie);
  neutral(mipha, oven);
  neutral(magda, kass);
  like(magda, teebo);
  like(hunnie, urbosa);
  dislike(robbie, link);
  neutral(robbie, oaki);
  like(robbie, sidon);
  dislike(oaki, robbie);
  dislike(chio, horse);
  like(patricia, roscoe);
  like(patricia, magda);
  like(patricia, kass);
  dislike(patricia, revali);
  dislike(patricia, master);
  dislike(patricia, teebo);
  like(mipha, oven);
  neutral(mipha, hunnie);
  dislike(mipha, karson);
  like(sidon, robbie);
  dislike(link, robbie);
  dislike(chio, riju);
  dislike(oaki, link);
  dislike(sidon, link);
  like(hunnie, epona);
  like(hunnie, pelison);
  like(hunnie, mipha);
  neutral(sidon, robbie);
  neutral(sidon, horse);
  like(pelison, epona);
  like(karson, mipha);
  like(karson, pelison);
  dislike(mipha, urbosa);
  enemies(teebo, patricia);
  like(oven, urbosa);
  dislike(oven, karson);
  dislike(oven, hunnie);
  dislike(teebo, magda);
  like(patricia, teebo);
  neutral(teebo, patricia);
  dislike(kass, revali);
  dislike(kass, magda);
  dislike(horse, chio);
  dislike(master, patricia);
  neutral(link, chio);
  like(link, sidon);
  like(link, riju);
  like(sidon, robbie);
  like(sidon, horse);
  like(riju, sidon);
  friends(robbie, oaki);
  dislike(oaki, horse);
  dislike(karson, pelison);
  dislike(link, chio);
  like(magda, kass);
  alliance([roscoe, teebo, kass, patricia]);
  neutral(oaki, chio);
  dislike(revali, master);
  evict(magda);
  evict(chio);
  evict(karson);
  endEpisode();
  /////////////////// EPISODE 2 BEGINS //////////////////////////////////

  tribeSwap([
    {
      name: "Gerudo Town",
      color: "#FE7555",
      members: [epona, horse, teebo],
    },
    {
      name: "Kakariko Village",
      color: "#761536",
      members: [kass, sidon, urbosa],
      priority: -2,
    },
    {
      name: "Zora's Domain",
      color: "#635cb9",
      members: [mipha, riju, patrica],
      priority: -1,
    },
    {
      name: "Korok Forest",
      color: "#7d8d4e",
      members: [oaki, revali, pelison],
    },
    {
      name: "Goron City",
      color: "#C70134",
      members: [link, oven, roscoe],
    },
    {
      name: "Rito Village",
      color: "#FCE78E",
      members: [robbie, master, hunnie],
    },
  ]);

  dislike(oven, hunnie);
  like(epona, karson);
  dislike(urbosa, pelison);
  like(oaki, revali);
  like(epona, horse);
  dislike(master, hunnie);
  dislike(master, robbie);
  dislike(oaki, pelison);
  dislike(robbie, hunnie);
  like(sidon, urbosa);
  dislike(sidon, revali);
  dislike(sidon, kass);
  dislike(mipha, riju);
  like(mipha, patricia);
  dislike(hunnie, oven);
  neutral(oaki, pelison);
  dislike(epona, pelison);
  like(riju, mipha);
  friends(roscoe, oven);
  like(robbie, master);
  like(patricia, mipha);
  dislike(mipha, riju);
  tribeSwap([
    {
      name: "Gerudo-Kakariko",
      color: "#FE7555",
      members: [epona, horse, teebo, kass, sidon, urbosa],
    },

    {
      name: "Zora's Domain",
      color: "#635cb9",
      members: [mipha, riju, patrica],
    },

    {
      name: "Korok Forest",
      color: "#7d8d4e",
      members: [oaki, revali, pelison],
    },

    {
      name: "Rito-Goron",
      color: "#FCE78E",
      members: [robbie, master, hunnie, link, oven, roscoe],
    },
  ]);
  dislike(link, robbie);
  like(horse, epona);
  friends(robbie, master);
  friends(robbie, link);
  dislike(robbie, roscoe);
  neutral(master, roscoe);
  neutral(roscoe, master);
  dislike(teebo, epona);
  dislike(teebo, urbosa);
  dislike(epona, kass);
  dislike(epona, teebo);
  neutral(sidon, kass);
  like(epona, sidon);
  dislike(sidon, teebo);
  like(sidon, kass);
  dislike(link, roscoe);
  like(hunnie, link);
  like(hunnie, oven);
  like(hunnie, master);
  friends(epona, sidon);
  like(pelison, revali);
  alliance([riju, mipha, patricia]);
  dislike(roscoe, hunnie);
  like(roscoe, master);
  like(epona, kass);
  friends(link, robbie);
  dislike(hunnie, master);
  dislike(sidon, horse);
  dislike(robbie, oven);
  like(pelison, hunnie);
  like(pelison, oaki);
  like(sidon, patricia);
  evict(roscoe);
  evict(teebo);
  endEpisode();
  //////////////////////// episode 3 ends
  r.tribeSwap([
    {
      name: "Stamina Vessel",
      color: "#7d8d4e",
      members: [master, sidon, patricia, oaki, oven],
    },
    {
      name: "Heart Container",
      color: "#c70134",
      members: [revali, link, robbie, mipha, urbosa],
    },
    {
      name: "Spirit Orb",
      color: "#761536",
      members: [kass, riju, horse, hunnie, pelison],
    },
    { name: "Exile", color: "#202020", priority: -1, members: [epona] },
  ]);
  dislike(sidon, revali);
  friends(revali, master);
  like(oaki, mipha);
  friends(oaki, riju);
  like(robbie, revali);
  dislike(robbie, kass);
  dislike(robbie, patricia);
  dislike(riju, mipha);
  enemies(horse, riju);
  friends(oaki, revali);
  dislike(robbie, mipha);
  dislike(robbie, urbosa);
  like(revali, robbie);
  dislike(urbosa, horse);
  dislike(urbosa, sidon);
  like(pelison, riju);
  dislike(pelison, urbosa);
  friends(riju, mipha);
  dislike(horse, pelison);
  dislike(riju, oven);
  like(patricia, sidon);
  friends(sidon, revali);
  dislike(oaki, pelison);
  neutral(master, patrica);
  neutral(patricia, master);
  neutral(horse, riju);
  neutral(riju, horse);
  enemies(hunnie, pelison);
  friends(oaki, patrica);
  like(kass, sidon);
  like(kass, horse);
  like(kass, epona);
  dislike(link, riju);
  dislike(hunnie, riju);
  like(hunnie, pelison);
  like(hunnie, master);
  like(horse, kass);
  like(horse, oaki);
  like(horse, riju);
  neutral(horse, pelison);
  friends(master, epona);
  neutral(sidon, oaki);
  friends(urbosa, revali);
  dislike(revali, mipha);
  like(riju, urbosa);
  like(hunnie, kass);
  like(hunnie, horse);
  like(pelison, hunnie);
  dislike(epona, patrica);
  dislike(patrica, urbosa);
  dislike(patrica, pelison);
  neutral(patrica, riju);
  dislike(patrica, link);
  dislike(patrica, horse);
  dislike(master, oaki);
  dislike(epona, oaki);
  dislike(sidon, oaki);
  evict(oaki);

  endEpisode();
  //////////////////////// episode 4 ends
  tribeSwap([
    {
      name: "Heart Container",
      color: "#c70134",
      members: [revali, link, robbie, mipha, urbosa],
    },
    {
      name: "Spirit Orb",
      color: "#761536",
      members: [kass, riju, horse, hunnie, pelison],
    },
    {
      name: "Stamina Vessel",
      color: "#7d8d4e",
      members: [master, sidon, patricia, epona, oven],
    },
  ]);
  dislike(urbosa, mipha);
  dislike(sidon, revali);
  neutral(sidon, link);
  dislike(sidon, mipha);
  dislike(sidon, patricia);
  dislike(sidon, hunnie);
  like(sidon, pelison);
  dislike(pelison, riju);
  dislike(pelison, horse);
  dislike(hunnie, horse);
  like(pelison, kass);
  like(pelison, horse);
  like(revali, link);
  dislike(link, patricia);
  dislike(link, mipha);
  dislike(mipha, robbie);
  dislike(urbosa, robbie);
  dislike(revali, robbie);
  friends(master, sidon);
  neutral(sidon, urbosa);
  dislike(mipha, link);
  evict(robbie);
  evict(riju);
  evict(oven);
  endEpisode();
  //////////////////////// episode 5 ends

  tribeSwap([
    {
      name: "Naboris",
      color: "#FE7555",
      members: [master_kohga, urbosa, kass],
    },
    { name: "Medoh", color: "#FCE78E", members: [revali, epona, horse] },
    { name: "Rudania", color: "#C70134", members: [sidon, mipha, hunnie] },
    { name: "Ruta", color: "#635CB9", members: [patrica, link, pelison] },
  ]);
  dislike(mipha, sidon);
  dislike(patricia, horse);
  like(pelison, patricia);
  dislike(urbosa, sidon);
  dislike(urbosa, kass);
  dislike(urbosa, epona);
  neutral(revali, kass);
  like(master, hunnie);
  dislike(master, kass);
  dislike(hunnie, sidon);
  dislike(epona, revali);
  neutral(epona, mipha);
  dislike(kass, urbosa);
  like(revali, urbosa);
  dislike(revali, epona);
  dislike(revali, horse);
  tribeSwap([
    {
      name: "Naboris-Ruta",
      color: "#FE7555",
      members: [master_kohga, urbosa, kass, patrica, link, pelison],
    },
    { name: "Medoh", color: "#FCE78E", members: [revali, epona, horse] },
    { name: "Rudania", color: "#C70134", members: [sidon, mipha, hunnie] },
  ]);
  dislike(kass, patricia);
  dislike(kass, link);
  dislike(kass, mipha);
  like(mipha, sidon);
  like(hunnie, sidon);
  like(hunnie, horse);
  dislike(master, horse);
  dislike(urbosa, patricia);
  friends(urbosa, master);
  like(master, kass);
  dislike(master, pelison);
  dislike(master, mipha);
  like(urbosa, link);
  alliance([horse, epona, revali]);
  dislike(horse, link);
  dislike(kass, pelison);
  dislike(epona, sidon);
  dislike(revali, kass);
  neutral(revali, link);
  dislike(revali, sidon);
  dislike(revali, pelison);
  like(horse, urbosa);
  like(mipha, urbosa);
  dislike(sidon, link);
  like(link, urbosa);
  like(urbosa, pelison);
  dislike(epona, link);
  dislike(epona, mipha);
  dislike(master, link);
  evict(pelison);
  endEpisode();
  //////////////////////// episode 6 ends
  tribeSwap([
    {
      name: "Tarrey Town",
      color: "#de4861",
      members: [
        revali,
        kass,
        master,
        patrica,
        sidon,
        link,
        horse,
        mipha,
        epona,
        urbosa,
        hunnie,
      ],
    },
  ]);
  like(link, revali);
  neutral(master, hunnie);
  neutral(mipha, urbosa);
  like(urbosa, mipha);
  dislike(link, horse);
  friends(urbosa, sidon);
  dislike(horse, mipha);
  dislike(horse, kass);
  dislike(horse, patricia);
  /////// surprise returnee twist

  tribeSwap([
    {
      name: "Tarrey Town",
      color: "#de4861",
      members: [
        revali,
        kass,
        master,
        patrica,
        sidon,
        link,
        horse,
        mipha,
        epona,
        urbosa,
        hunnie,
        oaki,
        oven,
      ],
    },
  ]);
  unevict(oven);
  unevict(oaki);
  endEpisode();
  /////////////// episode 7 ends
  like(epona, link);
  friends(oaki, oven);
  like(urbosa, oven);
  dislike(sidon, oven);
  dislike(sidon, oaki);
  dislike(link, sidon);
  like(oaki, patricia);
  like(oaki, mipha);
  dislike(oven, sidon);
  dislike(oven, kass);
  dislike(oven, patricia);
  dislike(master, oven);
  like(hunnie, oven);
  dislike(link, horse);
  like(epona, link);
  dislike(oven, sidon);
  dislike(oven, master);
  dislike(oven, revali);
  dislike(urbosa, oaki);
  dislike(urbosa, patricia);
  like(epona, patricia);
  dislike(oaki, sidon);
  dislike(oaki, master);
  dislike(kass, oaki);
  like(kass, patricia);
  dislike(kass, horse);
  like(kass, urbosa);
  like(horse, hunnie);
  like(horse, master);
  neutral(horse, kass);
  neutral(horse, oaki);
  dislike(horse, oven);
  like(urbosa, kass);
  dislike(kass, oven);
  dislike(kass, hunnie);
  dislike(oaki, hunnie);
  neutral(master, oaki);
  neutral(oaki, master);
  neutral(master, oven);
  dislike(horse, oaki);
  dislike(urbosa, mipha);
  like(oaki, sidon);
  like(epona, oven);
  dislike(epona, hunnie);
  dislike(epona, patrica);
  neutral(epona, link);
  like(mipha, hunnie);
  like(mipha, urbosa);
  like(mipha, oaki);
  neutral(mipha, epona);
  neutral(mipha, link);
  dislike(mipha, horse);
  dislike(mipha, master);
  dislike(mipha, kass);
  dislike(patricia, oven);
  like(master, oven);
  dislike(master, oaki);
  dislike(master, patrica);
  like(master, hunnie);
  like(sidon, horse);
  dislike(epona, link);
  dislike(revali, link);
  like(mipha, patricia);
  dislike(urbosa, patricia);
  friends(master, urbosa);
  like(master, oven);
  dislike(oven, horse);
  friends(epona, kass);
  evict(link);
  endEpisode();
  /////////////// episode 8 begins
  dislike(hunnie, oaki);
  dislike(hunnie, patrica);
  like(oaki, hunnie);
  dislike(urbosa, kass);
  dislike(hunnie, revali);
  dislike(epona, horse);
  dislike(sidon, kass);
  dislike(sidon, horse);
  dislike(oaki, revali);
  like(sidon, hunnie);
  like(epona, hunnie);
  evict(mipha);
  endEpisode();
  //////////// episode 9 begins
  like(patricia, hunnie);
  neutral(patricia, oven);
  neutral(patricia, horse);
  neutral(patricia, revali);
  dislike(patricia, sidon);
  dislike(master, hunnie);
  dislike(oven, revali);
  like(sidon, kass);
  like(sidon, horse);
  neutral(sidon, hunnie);
  neutral(sidon, revali);
  dislike(revali, oaki);
  like(revali, sidon);
  like(revali, hunnie);
  friends(horse, oaki);
  friends(horse, patrica);
  like(horse, oven);
  like(oaki, epona);
  dislike(oaki, sidon);
  dislike(oaki, master);
  dislike(oaki, kass);
  like(oaki, urbosa);
  /// challenge ends
  like(oven, hunnie);
  like(patricia, oven);
  dislike(urbosa, hunnie);
  dislike(revali, sidon);
  like(revali, oven);
  dislike(revali, horse);
  dislike(master, epona);
  like(master, hunnie);
  dislike(sidon, hunnie);
  dislike(hunnie, epona);
  dislike(oven, patricia);
  evict(horse);
  endEpisode();
  ////// episode 10 begins

  tribeSwap([
    {
      name: "Divine Trial",
      color: "#FCE78E",
      members: [epona, master_kohga, urbosa, kass, hunnie],
      priority: 1,
    },
    {
      name: "Lost Woods",
      color: "#B8B8B8",
      members: [oven, revali, sidon, patricia, oaki],
    },
  ]);
  dislike(sidon, kass);
  dislike(epona, kass);
  dislike(epona, hunnie);
  like(master, epona);
  dislike(master, urbosa);
  like(patricia, sidon);
  dislike(patricia, oaki);
  dislike(sidon, epona);
  neutral(oaki, sidon);
  dislike(patricia, oven);
  like(urbosa, hunnie);
  like(oven, patricia);
  neutral(sidon, oaki);
  like(sidon, revali);
  dislike(master, hunnie);
  like(hunnie, patrica);
  dislike(kass, urbosa);
  like(oaki, sidon);
  dislike(oaki, patrica);
  like(revali, sidon);
  like(master, hunnie);
  dislike(urbosa, hunnie);
  evict(patricia);
  evict(hunnie);
  endEpisode();
  //// episode 11 begins

  tribeSwap([
    {
      name: "Hyrule Castle",
      color: "#95654E",
      members: [oaki, sidon, mipha, urbosa, kass, revali, epona, oven, master],
    },
  ]);
  like(sidon, oven);
  dislike(sidon, epona);
  dislike(sidon, kass);
  dislike(sidon, urbosa);
  r.unevict(mipha);
  dislike(mipha, urbosa);
  dislike(mipha, kass);
  dislike(urbosa, sidon);
  neutral(urbosa, epona);
  neutral(urbosa, oaki);
  like(sidon, mipha);
  neutral(revali, oaki);
  dislike(mipha, epona);
  neutral(kass, oven);
  neutral(kass, revali);
  alliance([oaki, oven, mipha]);
  neutral(oaki, master);
  dislike(oaki, urbosa);
  dislike(kass, oven);
  dislike(sidon, oven);
  dislike(oaki, epona);
  like(sidon, kass);
  dislike(oaki, oven);
  friends(revali, kass);
  dislike(master, oven);
  dislike(mipha, oven);
  like(master, oaki);
  dislike(mipha, revali);
  evict(oaki);
  endEpisode();
  /////////// episode 13 begins
  dislike(revali, epona);
  neutral(master, oven);
  friends(mipha, kass);
  friends(mipha, epona);
  dislike(epona, revali);
  alliance([urbosa, oven, revali]);
  neutral(oven, epona);
  neutral(epona, oven);
  dislike(urbosa, master);
  like(urbosa, epona);
  dislike(mipha, epona);
  like(mipha, oven);
  enemies(kass, revali);
  dislike(kass, mipha);
  dislike(master, revali);
  like(revali, kass);
  friends(sidon, epona);
  enemies(revali, kass);
  like(master, urbosa);
  dislike(sidon, mipha);
  dislike(mipha, kass);
  friends(oven, epona);
  neutral(mipha, sidon);
  neutral(sidon, mipha);
  evict(kass);
  endEpisode();
  /////////// episode 14 begins
  enemies(sidon, mipha);
  dislike(revali, urbosa);
  enemies(oven, epona);
  enemies(mipha, epona);
  enemies(revali, sidon);
  like(master, revali);
  like(sidon, mipha);
  neutral(urbosa, epona);
  dislike(master, urbosa);
  dislike(master, revali);
  evict(oven);
  endEpisode();
  /////// episode 15 begins
  like(master, revali);
  like(urbosa, epona);
  like(revali, mipha);
  dislike(sidon, epona);
  like(sidon, revali);
  like(master, mipha);
  dislike(master, epona);
  like(mipha, revali);
  dislike(epona, urbosa);
  evict(sidon);
  endEpisode();
  /////////// episode 16 begins
  dislike(urbosa, epona);
  like(urbosa, master);
  evict(epona);
  endEpisode();
  ////////// episode 17 begins
  friends(master, mipha);
  like(urbosa, mipha);
  dislike(urbosa, master);
  evict(master);
  endEpisode();
  return r;
}

////////////////// safe space below here

export const initialProfiles: MetaRelationshipMapper = importAll(
  require.context("./src", false, /.png/)
);

function setupProfiles(
  context: __WebpackModuleApi.RequireContext,
  profiles: RelationshipHouseguest[],
  evictedHouseguests: Set<string>,
  jurors: Set<string>
) {
  const houseSize = context.keys().length;
  context.keys().forEach((item: string, i: number) => {
    const name = item.replace(".png", "").replace("./", "");
    profiles.push({
      name,
      imageURL: context(item),
      id: i,
      houseSize,
      isEvicted: evictedHouseguests.has(name.toLowerCase()),
      disabled: jurors.has(name.toLowerCase()),
      relationships: newDiscreteRelationshipMap(context.length - 1, i),
      likedBy: {},
      dislikedBy: {},
    });
  });
}

// function randomInt(
//   a: number,
//   b: number,
//   rng: prand.RandomGenerator
// ): [number, prand.RandomGenerator] {
//   let result: number;
//   [result, rng] = prand.uniformIntDistribution(a, b, rng);
//   return [result, rng];
// }
// function randomChoice(
//   a: (number | boolean | undefined)[],
//   rng: prand.RandomGenerator
// ): [number | boolean | undefined, prand.RandomGenerator] {
//   const [result, rng2] = randomInt(0, a.length - 1, rng);
//   return [a[result], rng2];
// }

// function randomRelationships(r: RelationshipMapper) {
//   let castNames = "";
//   r.houseguests.forEach((houseguest) => (castNames += houseguest.name));
//   let rng = prand.xorshift128plus(hashcode(castNames));
//   const hgs = r.houseguests;
//   for (let i = 0; i < hgs.length; i++) {
//     const hero = hgs[i].name;
//     for (let j = i + 1; j < hgs.length; j++) {
//       const villain = hgs[j].name;
//       let r1;
//       let r2;
//       [r1, rng] = randomChoice([true, false, undefined], rng);
//       [r2, rng] = randomChoice([true, false, undefined], rng);
//       r.setRelationship(
//         hero,
//         villain,
//         r1 as any,
//         "likedBy",
//         "dislikedBy",
//         "relationships"
//       );
//       r.setRelationship(
//         villain,
//         hero,
//         r2 as any,
//         "likedBy",
//         "dislikedBy",
//         "relationships"
//       );
//     }
//   }
// }
