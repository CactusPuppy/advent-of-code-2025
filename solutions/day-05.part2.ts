import { readFileSync } from "node:fs";

/**
 * Whether the given number is in the provided range
 * @param number Number to test
 * @param range The lower and upper bounds to test against, inclusive
 */
export function isNumberInRange(number: number, range: [number, number]): boolean {
  return number >= range[0] && number <= range[1];
}

export function doRangesOverlap(range1: [number, number], range2: [number, number]): boolean {
  return isNumberInRange(range1[0], range2) || isNumberInRange(range1[1], range2) || isNumberInRange(range2[0], range1);
}

export function mergeRanges(range1: [number, number], range2: [number, number]): [number, number] {
  if (!doRangesOverlap(range1, range2)) throw Error("Provided ranges do not overlap");
  return [Math.min(range1[0], range2[0]), Math.max(range1[1], range2[1])];
}

export function countOfRange(range: [number, number]): number {
  return range[1] - range[0] + 1;
}

if (import.meta.main) {
  const input = readFileSync("./inputs/day05-input.txt").toString();
  const ranges: Array<[number, number]> = [];

  for (const line of input.split("\n")) {
    if (line.trim() === "") break;
    if (line.includes("-")) {
      let range = line.split("-").map(s => Number.parseInt(s, 10)) as [number, number];
      let overlappingRangeIndex = ranges.findIndex(existingRange => doRangesOverlap(range, existingRange));
      while (overlappingRangeIndex != -1) {
        const overlappingRange = ranges.splice(overlappingRangeIndex, 1)[0];
        range = mergeRanges(range, overlappingRange);
        overlappingRangeIndex = ranges.findIndex(existingRange => doRangesOverlap(range, existingRange));
      }
      ranges.push(range)
    }
  }

  console.assert(ranges.every((range, i) =>
    !ranges.toSpliced(i, 1).some(range2 => {
      const overlap = doRangesOverlap(range, range2);
      if (overlap) console.error(range, "and", range2, "overlap");
      return overlap;
    })
  ), "Some ranges overlap!");

  const freshCount = ranges.map(countOfRange).reduce((prev, next) => prev + next);
  console.log("Fresh count:", freshCount);
}
