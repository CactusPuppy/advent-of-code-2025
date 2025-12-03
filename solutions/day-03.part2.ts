import { readFileSync } from "node:fs";

export interface Battery {
  value: number;
  index: number;
}

export function largestJoltage(bank: string, batteriesRemaining = 12): number {
  const batteries = bank.split("").map((s) => Number.parseInt(s, 10));
  const earliestDigitIndices = Array(10).fill(-1);
  for (const [i, battery] of batteries.entries()) {
    if (earliestDigitIndices[battery] == -1) {
      earliestDigitIndices[battery] = i;
      if (earliestDigitIndices.every((i) => i !== -1)) break;
    }
  }
  // Check we don't have two of the same index
  const seenIndices: Set<number> = new Set();
  for (const index of earliestDigitIndices) {
    if (index == -1) continue;
    if (seenIndices.has(index))
      console.error("Saw index", index, "before!", earliestDigitIndices);
    seenIndices.add(index);
  }
  for (let digit = 9; digit >= 0; digit -= 1) {
    const index = earliestDigitIndices[digit];
    if (index == -1) continue;
    if (batteries.length - index >= batteriesRemaining) {
      if (batteriesRemaining == 1) return digit;
      return (
        digit * Math.pow(10, batteriesRemaining - 1) +
        largestJoltage(bank.substring(index + 1), batteriesRemaining - 1)
      );
    }
  }
  throw new Error("Iterated through all digits without returning a result?!");
}

if (import.meta.main) {
  const input = readFileSync("./inputs/day03-input.txt").toString();
  const banks = input.split("\n").slice(0, -1);
  const joltages = banks.map((bank) => largestJoltage(bank));
  // console.log(joltages.map((joltage, i) => ({ bank: banks[i], joltage })));
  console.log(
    "Total joltage:",
    joltages.reduce((prev, next) => prev + next),
  );
}
