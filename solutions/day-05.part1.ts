import { readFileSync } from "node:fs";

/**
 * Whether the given number is in the provided range
 * @param number Number to test
 * @param range The lower and upper bounds to test against, inclusive
 */
export function isNumberInRange(number: number, range: [number, number]) {
  return number >= range[0] && number <= range[1];
}

if (import.meta.main) {
  const input = readFileSync("./inputs/day05-input.txt").toString();
  const ranges: Array<[number, number]> = [];
  const ingredients: Array<number> = [];

  for (const line of input.split("\n")) {
    if (line.trim() === "") continue;
    if (line.includes("-")) {
      const range = line.split("-").map(s => Number.parseInt(s, 10));
      ranges.push(range as [number, number]);
      continue;
    }
    ingredients.push(Number.parseInt(line, 10));
  }

  const freshIngredientCount = ingredients
    .filter(i => ranges.some(range => isNumberInRange(i, range)))
    .reduce((prev, _) => prev + 1, 0);
  console.log("Fresh ingredient count:", freshIngredientCount);
}
