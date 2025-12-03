import { describe, expect, it } from "vitest";
import {
  magnitudeOf,
  allInvalidIDsInRange,
  rangeFromString,
} from "./day-02.part2";

describe("magnitudeOf", () => {
  it("should return the magnitude of a number", () => {
    expect(magnitudeOf(123)).toBe(3);
    expect(magnitudeOf(1234)).toBe(4);
    expect(magnitudeOf(12345)).toBe(5);
  });
});

describe("allInvalidIDsInRange", () => {
  it.each([
    { min: 11, max: 22, output: [11, 22] },
    { min: 95, max: 115, output: [99, 111] },
    { min: 998, max: 1012, output: [999, 1010] },
    { min: 1188511880, max: 1188511890, output: [1188511885] },
    { min: 222220, max: 222224, output: [222222] },
    { min: 1698522, max: 1698528, output: [] },
    { min: 446443, max: 446449, output: [446446] },
    { min: 38593856, max: 38593862, output: [38593859] },
    { min: 565653, max: 565659, output: [565656] },
    { min: 824824821, max: 824824827, output: [824824824] },
    { min: 2121212118, max: 2121212124, output: [2121212121] },
    {
      min: 100,
      max: 1020,
      output: [111, 222, 333, 444, 555, 666, 777, 888, 999, 1010],
    },
    {
      min: 989133,
      max: 1014784,
      output: [
        989898, 989989, 990990, 991991, 992992, 993993, 994994, 995995, 996996,
        997997, 998998, 999999,
      ],
    },
    {
      min: 26,
      max: 45,
      output: [33, 44],
    },
  ])("[$min, $max] -> $output", ({ min, max, output }) => {
    expect(allInvalidIDsInRange(min, max)).toEqual(output);
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
