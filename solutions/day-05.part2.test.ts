import { describe, expect, it } from "vitest";
import { doRangesOverlap, mergeRanges } from "./day-05.part2";

describe("doRangesOverlap", () => {
  it.each([
    { range1: [3, 5], range2: [6, 7], result: false },
    { range1: [3, 5], range2: [5, 7], result: true },
    { range1: [3, 5], range2: [-1, 2], result: false },
    { range1: [3, 5], range2: [-2, 3], result: true },
    { range1: [3, 5], range2: [1, 4], result: true },
    { range1: [1, 10], range2: [3, 5], result: true },
  ])("$range1 overlaps $range2 -> $result", ({ range1, range2, result }) => {
    expect(doRangesOverlap(range1 as [number, number], range2 as [number, number])).toEqual(result);
  });
});

describe("mergeRanges", () => {
  it.each([
    { range1: [3, 5], range2: [5, 7], result: [3, 7] },
    { range1: [3, 5], range2: [-2, 3], result: [-2, 5] },
    { range1: [3, 5], range2: [1, 4], result: [1, 5] },
  ])("$range1 + $range2 -> $result", ({ range1, range2, result }) => {
    expect(mergeRanges(range1 as [number, number], range2 as [number, number])).toEqual(result);
  });

  it.each([
    { range1: [3, 5], range2: [6, 7] },
    { range1: [3, 5], range2: [-1, 2] },
  ])("($range1, $range2) to error", ({ range1, range2 }) => {
    expect(() => mergeRanges(range1 as [number, number], range2 as [number, number]))
      .toThrowError("Provided ranges do not overlap");
  })
});
