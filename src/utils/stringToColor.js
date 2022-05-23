// Simplified version of string-to-color
// credit: https://github.com/Gustu/string-to-color
const SEED = 16777215;
const FACTOR = 49979693;

export function stringToColor(text) {
  let b = 1;
  let d = 0;
  let f = 1;
  if (text.length > 0) {
    for (let i = 0; i < text.length; i++)
      text[i].charCodeAt(0) > d && (d = text[i].charCodeAt(0)),
        (f = parseInt(SEED / d)),
        (b = (b + text[i].charCodeAt(0) * f * FACTOR) % SEED);
  }
  let hex = ((b * text.length) % SEED).toString(16);
  return '#' + hex.padEnd(6, hex);
}
