import { readFileSync } from "node:fs";

export function magnitudeOf(i: number): number {
  return i.toString(10).length;
}

export function allDoublesInRange(min: number, max: number): number[] {
  let nextNumber = min;
  const doubles: number[] = [];

  while (nextNumber <= max) {
    // A double cannot be formed from an odd number of digits
    if (magnitudeOf(nextNumber) % 2 == 1) {
      nextNumber = Math.pow(10, magnitudeOf(nextNumber));
      continue;
    }

    let firstHalf = Number.parseInt(
      nextNumber.toString(10).slice(0, magnitudeOf(nextNumber) / 2),
      10,
    );
    let breakFlag = false;
    while (firstHalf < Math.pow(10, magnitudeOf(nextNumber) / 2)) {
      // console.log(firstHalf);
      const possibleInvalid = Number.parseInt(`${firstHalf}${firstHalf}`, 10);
      if (possibleInvalid > max) {
        breakFlag = true;
        break;
      }
      if (possibleInvalid >= min) doubles.push(possibleInvalid);
      firstHalf += 1;
    }
    if (breakFlag) break;
    nextNumber = Math.pow(10, magnitudeOf(nextNumber) + 2);
  }

  return doubles;
}

export function rangeFromString(str: string): [number, number] {
  const result = str.split("-");
  if (result.length != 2)
    throw new Error(`Instruction ${str} did not split into two numbers`);
  return result.map((s) => Number.parseInt(s)) as [number, number];
}

const input = readFileSync("./inputs/day02-input.txt").toString();

const instructions = input.split(",");
const invalidIDs = instructions
  .map(rangeFromString)
  .flatMap((range) => allDoublesInRange(range[0], range[1]));
// console.log(invalidIDs);
console.log(
  "Sum of all invalid IDs:",
  invalidIDs.reduce((prev, next) => prev + next),
);
