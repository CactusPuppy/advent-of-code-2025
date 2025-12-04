import { describe, expect, it } from "vitest";
import { countNeighbors, doesGridPosHaveRoll } from "./day-04.part1";

const grid = `..@@.@@@@.
  @@@.@.@.@@
  @@@@@.@.@@
  @.@@@@..@.
  @@.@@@@.@@
  .@@@@@@@.@
  .@.@.@.@@@
  @.@@@.@@@@
  .@@@@@@@@.
  @.@.@@@.@.`
  .split("\n")
  .map((l) =>
    l
      .trim()
      .split("")
      .map((c) => c == "@"),
  );

describe("doesGridPosHaveRoll", () => {
  it.each([
    { pos: { row: 0, col: 0 }, expected: false },
    { pos: { row: -1, col: 0 }, expected: false },
    { pos: { row: 0, col: 2 }, expected: true },
    { pos: { row: 3, col: 1 }, expected: false },
    { pos: { row: 3, col: -1 }, expected: false },
    { pos: { row: 9, col: 9 }, expected: false },
    { pos: { row: 9, col: 8 }, expected: true },
    { pos: { row: 10, col: 8 }, expected: false },
    { pos: { row: 9, col: 10 }, expected: false },
  ])("($pos.row, $pos.col) -> $expected", ({ pos, expected }) => {
    expect(doesGridPosHaveRoll(grid, pos.row, pos.col)).toEqual(expected);
  });
});

describe("countNeighbors", () => {
  it.each([
    { pos: { row: 0, col: 0 }, expected: 2 },
    { pos: { row: 2, col: 4 }, expected: 5 },
    { pos: { row: 4, col: 4 }, expected: 8 },
  ])("($pos.row, $pos.col) -> $expected", ({ pos, expected }) => {
    expect(countNeighbors(grid, pos.row, pos.col)).toEqual(expected);
  });
});
