import { describe, expect, it } from "vitest";
import {
  magnitudeOf,
  allDoublesInRange,
  rangeFromString,
} from "./day-02.part1";

describe("magnitudeOf", () => {
  it("should return the magnitude of a number", () => {
    expect(magnitudeOf(123)).toBe(3);
    expect(magnitudeOf(1234)).toBe(4);
    expect(magnitudeOf(12345)).toBe(5);
  });
});

describe("allDoublesInRange", () => {
  it.each([
    { min: 11, max: 22, output: [11, 22] },
    { min: 95, max: 115, output: [99] },
    { min: 998, max: 1012, output: [1010] },
    { min: 1188511880, max: 1188511890, output: [1188511885] },
    { min: 222220, max: 222224, output: [222222] },
    { min: 1698522, max: 1698528, output: [] },
    { min: 446443, max: 446449, output: [446446] },
    { min: 38593856, max: 38593862, output: [38593859] },
    { min: 565653, max: 565659, output: [] },
  ])("[$min, $max] -> $output", ({ min, max, output }) => {
    expect(allDoublesInRange(min, max)).toEqual(output);
  });
});

describe("rangeFromString", () => {
  it.each([
    { input: "11-22", expected: [11, 22] },
    { input: "95-115", expected: [95, 115] },
    { input: "222220-222224", expected: [222220, 222224] },
  ])("$input -> $expected", ({ input, expected }) => {
    expect(rangeFromString(input)).toEqual(expected);
  });
});
