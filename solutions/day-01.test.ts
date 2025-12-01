import { describe, expect, it } from "vitest";
import { rotateDial, isInstruction, processInstructions, type Instruction } from "./day-01";

describe("isInstruction", () => {
  it.each([
    "L99",
    "R1",
    "R42",
    "L2"
  ])('is true for %s', (instruction) => {
    expect(isInstruction(instruction)).toBeTruthy();
  });

  it.each([
    "l94",
    "100",
    "rasdf"
  ])('is false for %s', (str) => {
    expect(isInstruction(str)).toBeFalsy();
  });
});

describe("rotateDial", () => {
  it.each([
    { start: 50, instruction: "L1", result: { finalReading: 49, timesWrapped: 0 } },
    { start: 50, instruction: "R1", result: { finalReading: 51, timesWrapped: 0 } },
    { start: 0,  instruction: "L1", result: { finalReading: 99, timesWrapped: 1 } },
    { start: 0,  instruction: "R1", result: { finalReading: 1, timesWrapped: 0 } },
    { start: 99, instruction: "R1", result: { finalReading: 0, timesWrapped: 1 } },
    { start: 4,  instruction: "L4", result: { finalReading: 0, timesWrapped: 0 } },
    { start: 50, instruction: "R1000", result: { finalReading: 50, timesWrapped: 10 } },
  ])('($start, $instruction) -> $result', ({ start, instruction, result }) => {
    expect(rotateDial(start, instruction as Instruction)).toStrictEqual(result);
  })
})

describe("processInstructions", () => {
  it.each([
    {
      instructions: ["L68", "L30", "R48"],
      result: 2
    },
    {
      instructions: ["L68", "L30", "R48", "L5", "R60", "L55", "L1", "L99", "R14", "L82"],
      result: 6
    },
    {
      instructions: ["R50"],
      result: 1
    },
  ])('$instructions -> $result', ({ instructions, result }) => {
    expect(processInstructions(instructions)).toEqual(result);
  });
})
