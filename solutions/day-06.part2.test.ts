import { describe, it, expect } from "vitest";
import { convertHumanNumbersToCephlapodNumbers } from "./day-06.part2";

describe("convertHumanNumbersToCephlapodNumbers", () => {
  it.each([
    {
      input: [
        "4673",
        "4869",
        "283 ",
        "441 "
      ],
      expected: [
        39,
        7631,
        6884,
        4424
      ],
    },
    {
      input: [
        "961",
        "357",
        "259",
        " 47",
      ],
      expected: [
        1797,
        6554,
        932,
      ],
    },
    {
      input: [
        "8  ",
        "13 ",
        "69 ",
        "596",
      ],
      expected: [
        6,
        399,
        8165,
      ],
    },
    {
      input: [
        "  2",
        "195",
        "935",
        "286",
      ],
      expected: [
        2556,
        938,
        192,
      ],
    }
  ])("$input -> $expected", ({ input, expected }) => {
    expect(convertHumanNumbersToCephlapodNumbers(input)).toEqual(expected);
  })
})
