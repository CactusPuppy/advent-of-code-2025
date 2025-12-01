import { readFileSync } from "node:fs";

const input = readFileSync("./inputs/day01-input.txt").toString();

let instructions = input.split("\n");
instructions = instructions.filter(l => l.length);
console.log("Now processing", instructions.length.toString(10), "instructions...");

export type Instruction =  `${"L" | "R"}${number}`;

export function rotateDial(currentReading: number, instruction: Instruction) {
  const displacement = (instruction.charAt(0) === "L" ? -1 : 1) * Number.parseInt(instruction.slice(1));
  let finalReading = currentReading + displacement;
  let timesWrapped = 0;
  while (finalReading < 0) {
    finalReading += 100;
    timesWrapped += 1;
  }
  while (finalReading > 99) {
    finalReading -= 100;
    timesWrapped += 1;
  }
  return { finalReading, timesWrapped };
}

export function isInstruction(input: string): input is Instruction {
  return /^[LR]\d+$/.test(input);
}

export function processInstructions(instructions: string[]) {
  let dialReading = 50;
  let timesReadingZero = 0;

  for (const instruction of instructions) {
    if (!isInstruction(instruction)) continue;
    
    let turnResult = rotateDial(dialReading, instruction);
    timesReadingZero += turnResult.timesWrapped;
    // Correction factor: if we started on zero and went left, we will have wrapped,
    // but we will NOT have clicked onto zero
    if (instruction.startsWith("L") && dialReading == 0) timesReadingZero -= 1;

    dialReading = turnResult.finalReading;
    
    // If we wrap from 99 to 0 (R instruction) and stop at zero, we'll overcount
    if (dialReading == 0 && instruction.startsWith("L")) timesReadingZero += 1;
  }
  return timesReadingZero;
}

console.log("Times the dial read zero:", processInstructions(instructions));

