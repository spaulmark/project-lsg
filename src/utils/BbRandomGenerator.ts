import prand from "pure-rand";
import { BehaviorSubject } from "rxjs";
import { hashcode } from "./utilities";
import { cast$ } from "../subjects/subjects";

export class BbRandomGenerator {
  private rng: prand.RandomGenerator;

  public randomFloat(): number {
    let result: number;
    [result, this.rng] = this.rng.next();
    return result / 2147483647.0;
  }

  public randomInt(a: number, b: number): number {
    let result: number;
    [result, this.rng] = prand.uniformIntDistribution(a, b, this.rng);
    return result;
  }

  public flipCoin(): boolean {
    let result: number;
    [result, this.rng] = this.rng.next();
    return result % 2 === 0;
  }

  public seed(seed: number) {
    this.rng = prand.xorshift128plus(seed);
  }

  public constructor(seed: number) {
    this.rng = prand.xorshift128plus(seed);
  }
}

export function rng() {
  return new BbRandomGenerator(0);
}
