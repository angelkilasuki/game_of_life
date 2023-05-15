const fs = require("fs");

function importPattern(fileName) {
  const patternFile = fs.readFileSync(fileName, "utf-8");
  const rows = patternFile
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((row) => Array.from(row)[0] != "!");
  const patternStr = rows.map((row) => Array.from(row));
  const pattern = patternStr.map((row) =>
    row.map((element) => (element === "." ? 0 : 1))
  );
  return pattern;
}
const pattern = importPattern("angel.cells");
for (let row of pattern) {
  console.log(row);
}
