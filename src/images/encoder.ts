import { RelationshipMapper } from "./RelationshipMapper";
import _ from "lodash";

export type CodedRelationships = {
  relationships: string;
  powerRankings: string;
};
const tree =
  "0123456789™€›…Ȋ‡†ƒžŽżŻƖź¡ŹŸŷŶŵŴųŲűŰůŮŭŬūŪũŨŧŦťŤţŢšŠşŞŝŜśŚřŘŗŖŕŔœŒőŐŏŎōŌŋŊŉňŇņŅńŃłŁŀĿľĽļĻĺĹĸķĶĵĴĳĲıİįĮĭĬīĪĩĨħĥĤģĢġĠğĞĝĜěĚęĘėĖĕĔēĒđĐďĎčČċĊĉĈćĆąĄăĂāĀ¼¹µ³²±°¯®¬«ª©¨§¤¢}`_^]\\[@?>=;:/.-,+*)('&%$#\"!zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA";
// the encoding is

// 0 : left child   : false
// 1 : middle child : true
// 2 : right child  : undefined
function toTernary(r: boolean | undefined): string {
  if (r === undefined) return "2";
  if (r === true) return "1";
  return "0";
}
function pad(s: string) {
  let result = s;
  while (result.length < 5) {
    result += "0";
  }
  return result;
}

function encodeEvictees(m: RelationshipMapper): string {
  let result = "";
  m.houseguests.forEach((hg) => {
    if (!hg.isEvicted) return;
    if (tree[hg.id] === undefined) {
      throw new Error(`Invalid houseguest ID: ${hg.id}`);
    }
    result += tree[hg.id];
  });
  return result;
}

function encodeTribes(m: RelationshipMapper): string {
  const houseguestsByTribe = _.groupBy(m.houseguests, (hg) =>
    hg.tribe === undefined ? hg.tribe : hg.tribe.name
  );
  let encodedTribes: string = "";
  _.forEach(houseguestsByTribe, (hgs, tribeName) => {
    if (tribeName === "undefined") return;
    const color = hgs[0].tribe ? hgs[0].tribe.color : "#ffffff";
    let ids = "";
    hgs.forEach((hg) => {
      ids += tree[hg.id];
    });
    const spacer = encodedTribes !== "" ? "•" : "";
    encodedTribes += `${spacer}${tribeName}${color}${ids}`;
  });
  return encodedTribes;
}

function encodeRelationships(m: RelationshipMapper): CodedRelationships {
  let relationships = "";
  let powerRankings = "";
  let rBuffer: string = "";
  let pBuffer: string = "";
  m.houseguests.forEach((hg) => {
    if (hg.isEvicted || hg.isJury) return; // we skip evicted houseguests
    m.nonEvictedIDs.forEach((id) => {
      if (id === hg.id) return; // we don't declare relationships for ourselves
      ///// relationships
      const nextCharR = toTernary(hg.relationships[id]);
      rBuffer += nextCharR;
      if (rBuffer.length === 5) {
        const e: string = tree[parseInt(rBuffer, 3)];
        relationships += e;
        rBuffer = "";
      }
      ///// powerRankings
      const nextCharP = toTernary(hg.powerRankings[id]);
      pBuffer += nextCharP;
      if (pBuffer.length === 5) {
        const e: string = tree[parseInt(pBuffer, 3)];
        powerRankings += e;
        pBuffer = "";
      }
    });
  });
  powerRankings += tree[parseInt(pad(pBuffer), 3)];
  relationships += tree[parseInt(pad(pBuffer), 3)];
  return { relationships, powerRankings };
}

export function encodeRelationshipMapper(m: RelationshipMapper): string {
  const r = encodeRelationships(m);
  return `${encodeTribes(m)}|${encodeEvictees(m)}|${r.relationships}|${
    r.powerRankings
  }`;
}
