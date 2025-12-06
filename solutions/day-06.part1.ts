import { readFileSync } from "node:fs";


export function applyOperatorToOperands(operator: string, operands: number[]) {
  switch (operator) {
    case "*":
      return operands.reduce((prev, next) => prev * next);
    case "+":
      return operands.reduce((prev, next) => prev + next);
    default:
      throw Error(`Unknown operator ${operator}`);
  }
}

if (import.meta.main) {
  const input = readFileSync("./inputs/day06-input.txt").toString();
  let operands: number[][] = [];
  let operators: string[] = [];

  for (const line of input.split("\n")) {
    if (line.trim() == "") continue;
    if (line.startsWith("*") || line.startsWith("+")) {
      operators = line.split(" ").filter(entry => entry.trim() != "");
      continue;
    }
    const numbers = line.split(" ").filter(entry => entry.trim() != "").map(s => Number.parseInt(s, 10));
    if (operands.length == 0) {
      operands = numbers.map(n => [n]);
    } else {
      numbers.forEach((n, i) => operands[i].push(n));
    }
  }

  // console.log("Operands[0]", operands[0]);
  // console.log("Operators[0]", operators[0]);
  const results = operands.map((operands2, i) => applyOperatorToOperands(operators[i], operands2));
  // console.log("Results[0]", results[0]);
  console.log("Sum of results:", results.reduce((prev, next) => prev + next));
}
