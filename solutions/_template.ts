import { readFileSync } from "node:fs";

if (import.meta.main) {
  const input = readFileSync("./inputs/day01-input.txt").toString();
  console.log("Problem solving code here!");
}
