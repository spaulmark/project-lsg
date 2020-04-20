import { RelationshipMapper } from "./RelationshipMapper";
import _ from "lodash";
import { lookup } from "./lookup";

type CodedRelationships = { relationships: string; powerRankings: string };
// 0123456789™€›…•‡†ƒžŽżŻƖź¡ŹŸŷŶŵŴųŲűŰůŮŭŬūŪũŨŧŦťŤţŢšŠşŞŝŜśŚřŘŗŖŕŔœŒőŐŏŎōŌŋŊŉňŇņŅńŃłŁŀĿľĽļĻĺĹĸķĶĵĴĳĲıİįĮĭĬīĪĩĨħĥĤģĢġĠğĞĝĜěĚęĘėĖĕĔēĒđĐďĎčČċĊĉĈćĆąĄăĂāĀ¼¹µ³²±°¯®¬«ª©¨§¤¢}`_^]\[@?>=;:/.-,+*)('&%$#"!zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA
const tree =
  "0123456789™€›…•‡†ƒžŽżŻƖź¡ŹŸŷŶŵŴųŲűŰůŮŭŬūŪũŨŧŦťŤţŢšŠşŞŝŜśŚřŘŗŖŕŔœŒőŐŏŎōŌŋŊŉňŇņŅńŃłŁŀĿľĽļĻĺĹĸķĶĵĴĳĲıİįĮĭĬīĪĩĨħĥĤģĢġĠğĞĝĜěĚęĘėĖĕĔēĒđĐďĎčČċĊĉĈćĆąĄăĂāĀ¼¹µ³²±°¯®¬«ª©¨§¤¢}`_^]\\[@?>=;:/.-,+*)('&%$#\"!zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA";
// the encoding is

// 0 : left child   : false
// 1 : middle child : true
// 2 : right child  : undefined
function toTernary(r: boolean | undefined): string {
  if (r === undefined) return "2";
  if (r === true) return "1";
  return "0";
}
const fromTernary = new Map<string, boolean | undefined>(
  Object.entries({
    "0": false,
    "1": true,
    "2": undefined,
  })
);
function pad(s: string) {
  let result = s;
  while (result.length < 5) {
    result += "0";
  }
  return result;
}

export function encodeRelationships(m: RelationshipMapper): CodedRelationships {
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

export function decodeRelationships(
  m: RelationshipMapper,
  c: CodedRelationships
) {
  let decodedR = "";
  let decodedP = "";
  let i: number = 0;
  const [relationships, powerRankings] = [c.relationships, c.powerRankings];
  m.houseguests.forEach((hg) => {
    if (hg.isEvicted || hg.isJury) return;
    m.nonEvictedIDs.forEach((id) => {
      if (hg.id === id) return;
      //////////////////////////////////////////////// relationships
      if (decodedR.length === 0) {
        const r: string | undefined = lookup.get(relationships[i]);
        if (r === undefined) throw new Error("Invalid code");
        decodedR = r;
      }
      m.setRelationship(
        hg.name,
        m.houseguests[id].name,
        fromTernary.get(decodedR[0]),
        "likedBy",
        "dislikedBy",
        "relationships"
      );
      //////////////////////////////////////////////// powerRankings
      if (decodedP.length === 0) {
        const p: string | undefined = lookup.get(powerRankings[i]);
        if (p === undefined) throw new Error("Invalid code");
        decodedP = p;
      }
      m.setRelationship(
        hg.name,
        m.houseguests[id].name,
        fromTernary.get(decodedP[0]),
        "thinksImThreat",
        "thinksImWeak",
        "powerRankings"
      );
    });
  });
}
