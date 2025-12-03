import { readFileSync } from "node:fs";

export interface Battery {
  value: number;
  index: number;
}

export function largestJoltage(bank: string): number {
  const batteries = bank.split("").map((s) => Number.parseInt(s, 10));
  const earliestDigitIndices = Array(10).fill(-1);
  const latestDigitIndices = Array(10).fill(-1);
  for (const [i, battery] of batteries.entries()) {
    if (earliestDigitIndices[battery] == -1) earliestDigitIndices[battery] = i;
    latestDigitIndices[battery] = i;
  }
  // Check we don't have two of the same index
  const seenIndices: Set<number> = new Set();
  for (const index of earliestDigitIndices) {
    if (index == -1) continue;
    if (seenIndices.has(index))
      console.error("Saw index", index, "before!", earliestDigitIndices);
    seenIndices.add(index);
  }
  seenIndices.clear();
  for (const index of latestDigitIndices) {
    if (index == -1) continue;
    if (seenIndices.has(index))
      console.error("Saw index", index, "before!", latestDigitIndices);
    seenIndices.add(index);
  }
  for (let digit = 9; digit >= 0; digit -= 1) {
    const earliestIndex = earliestDigitIndices[digit];
    const latestIndex = latestDigitIndices[digit];
    if (latestIndex == -1) continue;

    // Special case: the largest digit is last, meaning we need the second largest digit to lead
    if (earliestIndex == batteries.length - 1) {
      let result = digit;
      while (--digit >= 0) {
        if (latestIndex == -1) continue;
        result += digit * 10;
        break;
      }
      return result;
    }

    // Otherwise, the largest digit should lead, and we should pull the second largest digit which follows
    let result = digit * 10;
    while (digit >= 0) {
      if (
        latestDigitIndices[digit] == -1 ||
        latestDigitIndices[digit] <= earliestIndex
      ) {
        --digit;
        continue;
      }
      result += digit;
      break;
    }
    return result;
  }
  throw new Error("Iterated through all digits without returning a result?!");
}

if (import.meta.main) {
  const input = readFileSync("./inputs/day03-input.txt").toString();
  const banks = input.split("\n").slice(0, -1);
  const joltages = banks.map(largestJoltage);
  // console.log(joltages.map((joltage, i) => ({ bank: banks[i], joltage })));
  console.log(
    "Total joltage:",
    joltages.reduce((prev, next) => prev + next),
  );
}
