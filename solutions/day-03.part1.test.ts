import { describe, expect, it } from "vitest";
import { largestJoltage } from "./day-03.part1";

describe("largestJoltage", () => {
  it.each([
    { input: "987654321111111", expected: 98 },
    { input: "81111111111119", expected: 89 },
    { input: "234234234234278", expected: 78 },
    { input: "818181911112111", expected: 92 },
    { input: "1234567899", expected: 99 },
  ])("$input -> $expected", ({ input, expected }) => {
    expect(largestJoltage(input)).toEqual(expected);
  });
});
