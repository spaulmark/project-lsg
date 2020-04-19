function componentToHex(c: any) {
  var hex = Math.round(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export class Rgb {
  public r: number;
  public g: number;
  public b: number;
  public toHex() {
    return (
      "#" +
      componentToHex(this.r) +
      componentToHex(this.g) +
      componentToHex(this.b)
    );
  }
  public toRgba(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, 1)`;
  }
  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

// function hexToRgb(hex: string): Rgb | null {
//   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result
//     ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16),
//       }
//     : null;
// }

export function interpolateColor(min: Rgb, max: Rgb, percent: number): string {
  return new Rgb(
    min.r + percent * (max.r - min.r),
    min.g + percent * (max.g - min.g),
    min.b + percent * (max.b - min.b)
  ).toHex();
}
