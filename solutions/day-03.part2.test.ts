import { describe, expect, it } from "vitest";
import { largestJoltage } from "./day-03.part2";

describe("largestJoltage", () => {
  it.each([
    { input: "987654321111111", expected: 987654321111 },
    { input: "81111111111119", expected: 811111111119 },
    { input: "234234234234278", expected: 434234234278 },
    { input: "818181911112111", expected: 888911112111 },
  ])("$input -> $expected", ({ input, expected }) => {
    expect(largestJoltage(input)).toEqual(expected);
  });
});
