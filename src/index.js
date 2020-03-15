const MORSE_TABLE = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0"
};

String.prototype.splitNative = String.prototype.split;

String.prototype.split = function(separator, limit, chunksize) {
  if (chunksize === undefined || chunksize === 1)
    return this.splitNative(separator, limit);

  // кастомное разбиение тут и прибавляется каждые 2 или 5 строки в новый массив.
  let result = [];
  for (let i = 0; i < this.length; i += chunksize) {
    result.push(this.substr(i, chunksize));
  }

  return result;
};

function boolean2morze(str) {
  let arr = str.split("", undefined, 2);

  const morze = arr.map(v => {
    switch (v) {
      case "10":
        return ".";
      case "11":
        return "-";
      case "**":
        return "*";
      case "00":
        return "_";
      default:
        return "";
    }
  });

  return morze.join("");
}

function decode(expr) {
  let str = "";
  const morze = boolean2morze(expr);
  const arr = morze.split(expr, undefined, 5);

  arr.forEach(v => {
    if (v.indexOf("*") >= 0) {
      str = str + " ";
    } else {
      const key = v.replace(/_/g, "");
      str = str + MORSE_TABLE[key];
    }
  });
  return str;
}

module.exports = {
  decode
};
