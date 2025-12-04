import { readFileSync } from "node:fs";

export function doesGridPosHaveRoll(
  grid: boolean[][],
  row: number,
  column: number,
): boolean {
  if (row < 0 || row >= grid.length) return false;
  if (column < 0 || column >= grid[row].length) return false;
  return grid[row][column];
}

export function countNeighbors(
  grid: boolean[][],
  row: number,
  column: number,
): number {
  let neighborCount = 0;
  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      if (rowOffset == 0 && colOffset == 0) continue;
      if (doesGridPosHaveRoll(grid, row + rowOffset, column + colOffset))
        neighborCount += 1;
    }
  }

  return neighborCount;
}

export function convertLineToGridLine(line: string): boolean[] {
  return line.split("").map((char) => char == "@");
}

if (import.meta.main) {
  const input = readFileSync("./inputs/day04-input.txt").toString();
  const lines = input.split("\n").slice(0, -1);
  const rollGrid = lines.map(convertLineToGridLine);

  let rollsRemoved = 0;
  let rollsRemovedThisIteration: number;
  do {
    rollsRemovedThisIteration = 0;
    for (let row = 0; row < rollGrid.length; ++row) {
      for (let col = 0; col < rollGrid[0].length; ++col) {
        if (!rollGrid[row][col]) continue;
        if (countNeighbors(rollGrid, row, col) < 4) {
          rollGrid[row][col] = false;
          ++rollsRemoved;
          ++rollsRemovedThisIteration;
        }
      }
    }
  } while (rollsRemovedThisIteration > 0);
  console.log("Removed rolls count:", rollsRemoved);
}
