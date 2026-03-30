import fs from "node:fs"
const readFile = fs.readFileSync("data.txt", "utf-8");
console.log(readFile);