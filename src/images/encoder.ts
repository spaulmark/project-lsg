import { RelationshipMapper } from "./RelationshipMapper";
import _ from "lodash";
import { Base64 } from "../utils/base64";

const decode = (s: string) => Base64.toInt(s).toString(3).padStart(7, "0"); // base64 --> ternary
const encode = (s: string) => encodeNumber(parseInt(s, 3)).padStart(2, "0"); // ternary --> base64

// 0 : left child   : false
// 1 : middle child : true
// 2 : right child  : undefined
function toTernary(r: boolean | undefined): string {
  if (r === undefined) return "2";
  if (r === true) return "1";
  return "0";
}

function encodeNumber(n: number): string {
  return Base64.fromInt(n).padStart(2, "0"); // don't remove the padStart, idiot
}

function encodeEvictees(m: RelationshipMapper): string {
  let result = "";
  m.houseguests.forEach((hg) => {
    if (!hg.isEvicted) return;
    if (encodeNumber(hg.id) === undefined) {
      throw new Error(`Invalid houseguest ID: ${hg.id}`);
    }
    result += encodeNumber(hg.id);
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
      ids += encodeNumber(hg.id);
    });
    const spacer = encodedTribes !== "" ? "=" : "";
    encodedTribes += `${spacer}${tribeName}${color}${ids}`;
  });
  return encodedTribes;
}

function encodeRelationships(m: RelationshipMapper): string {
  let relationships = "";
  let rBuffer: string = "";
  let validateBuffer = (s: string) => {
    if (decode(encode(s)) !== s) {
      throw new Error(
        `encoding failure: ${s} (${encode(s)}) encoded to 
        ${decode(encode(s))} `
      );
    }
  };
  m.houseguests.forEach((hg) => {
    if (hg.isEvicted || hg.disabled) return; // we skip evicted houseguests
    m.nonEvictedIDs.forEach((id) => {
      if (id === hg.id) return; // we don't declare relationships for ourselves
      ///// relationships
      const nextCharR = toTernary(hg.relationships[id]);
      rBuffer += nextCharR;
      if (rBuffer.length === 7) {
        const e: string = encode(rBuffer);
        if (e.length !== 2)
          throw new Error(`Byte misalignment prevented: (${e})`);
        validateBuffer(rBuffer);
        relationships += e;
        rBuffer = "";
      }
    });
  });
  if (rBuffer !== "") {
    rBuffer = rBuffer.padEnd(7, "0");
    validateBuffer(rBuffer);
    relationships += encode(rBuffer);
  }
  return relationships;
}

export function encodeRelationshipMapper(m: RelationshipMapper): string {
  const relationships = encodeRelationships(m);
  return `${encodeTribes(m)}|${encodeEvictees(m)}|${relationships}|`;
}
