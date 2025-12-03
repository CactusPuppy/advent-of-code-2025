import { readFileSync } from "node:fs";

export function magnitudeOf(i: number): number {
  return i.toString(10).length;
}

export function allInvalidIDsInRange(min: number, max: number): number[] {
  const invalidIDs: Set<number> = new Set();

  const maxMagnitudeOfRepeat = Math.floor(magnitudeOf(max) / 2);

  for (let magnitude = 1; magnitude <= maxMagnitudeOfRepeat; magnitude += 1) {
    for (
      let repeatTemplate = Math.pow(10, magnitude - 1);
      repeatTemplate < Math.pow(10, magnitude);
      repeatTemplate += 1
    ) {
      let test = Number.parseInt(`${repeatTemplate}`.repeat(2), 10);
      while (test <= max) {
        if (test >= min) invalidIDs.add(test);
        test = Number.parseInt(`${test}${repeatTemplate}`, 10);
      }
    }
  }

  return [...invalidIDs.values()].sort((a, b) => a - b);
}

export function rangeFromString(str: string): [number, number] {
  const result = str.split("-");
  if (result.length != 2)
    throw new Error(`Instruction ${str} did not split into two numbers`);
  return result.map((s) => Number.parseInt(s)) as [number, number];
}

const input = readFileSync("./inputs/day02-input.txt").toString();

if (import.meta.main) {
  const instructions = input.split(",");
  const invalidIDs = instructions
    .map(rangeFromString)
    .flatMap((range) => allInvalidIDsInRange(range[0], range[1]));
  // console.log(
  //   invalidIDs.map((ids, i) => ({
  //     instruction: instructions[i],
  //     invalids: ids,
  //   })),
  // );
  console.log(
    "Sum of all invalid IDs:",
    invalidIDs.reduce((prev, next) => prev + next),
  );
}
