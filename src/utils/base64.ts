export const Base64 = (function () {
  var digitsStr =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-";
  var digits = digitsStr.split("");
  var digitsMap: Map<string, number> = new Map<string, number>();
  for (var i = 0; i < digits.length; i++) {
    digitsMap.set(digits[i], i);
  }
  return {
    fromInt: function (int32: number) {
      var result = "";
      while (true) {
        result = digits[int32 & 0x3f] + result;
        int32 >>>= 6;
        if (int32 === 0) break;
      }
      return result;
    },
    toInt: function (digitsStr: string) {
      var result = 0;
      var digits = digitsStr.split("");
      for (var i = 0; i < digits.length; i++) {
        const m = digitsMap.get(digits[i]);
        if (m === undefined)
          throw new Error("Tried to decode an invalid B64 string");
        result = (result << 6) + m;
      }
      return result;
    },
  };
})();
