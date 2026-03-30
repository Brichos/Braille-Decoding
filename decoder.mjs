import fs from "node:fs"
const readFile = fs.readFileSync("data.txt", "utf-8");
//console.log(readFile);

const BRAILLE_TO_TEXT = {
  
  "100000": "a",
  "110000": "b",
  "100100": "c",
  "100110": "d",
  "100010": "e",
  "110100": "f",
  "110110": "g",
  "110010": "h",
  "010100": "i",
  "010110": "j",
  "101000": "k",
  "111000": "l",
  "101100": "m",
  "101110": "n",
  "101010": "o",
  "111100": "p",
  "111110": "q",
  "111010": "r",
  "011100": "s",
  "011110": "t",
  "101001": "u",
  "111001": "v",
  "010111": "w",
  "101101": "x",
  "101111": "y",
  "101011": "z",

   "000000": " ",
  "010000": ",",
  "011000": ";",
  "010010": ":",
  "011010": ".",
  "011001": "!",
  "001000": "'",
  "001010": "-",
  "001001": "?",
  "001100": '"',
  "001101": "(",
  "001111": "#",
  "000001": "^", 
  "000011": "/", 
};

const NUMBER_MAP = {
  a: "1",
  b: "2",
  c: "3",
  d: "4",
  e: "5",
  f: "6",
  g: "7",
  h: "8",
  i: "9",
  j: "0",
};

function decodeBrailleBitString(bitString) {
  if (bitString.length % 6 !== 0) {
    throw new Error(`Bit string length must be a multiple of 6, got ${bitString.length}`);
  }
    const cells = bitString.match(/.{6}/g) || [];
  let result = "";
  let capitalizeNext = false;
  let numberMode = false;

   for (const cell of cells) {
    const ch = BRAILLE_TO_TEXT[cell];

    if (!ch) {
      result += `?`; 
      numberMode = false;
      capitalizeNext = false;
      continue;
    }

    if (ch === "^") {
      capitalizeNext = true;
      continue;
    }

    if (ch === "#") {
      numberMode = true;
      continue;
    }

    let out = ch;

    if (numberMode) {
      if (NUMBER_MAP[out]) {
        out = NUMBER_MAP[out];
      } else {
        numberMode = false;
      }
    }

    if (capitalizeNext && /^[a-z]$/.test(out)) {
      out = out.toUpperCase();
      capitalizeNext = false;
    } else {
      capitalizeNext = false;
    }

    result += out;
  }

  return result;
  
} 
const braille = readFile.trim();
const decoded = decodeBrailleBitString(braille);

console.log("Braille to Base64:");
console.log(decoded);

function looksLikeBase64(str) {
  return /^[A-Za-z0-9+/=\n\r]+$/.test(str);
}

console.log("Looks like Base64?", looksLikeBase64(decoded));

const plaintext = Buffer.from(decoded, "base64").toString("utf8");

console.log("\nBase64 to plaintext:");
console.log(plaintext);
