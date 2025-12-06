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

export function convertHumanNumbersToCephlapodNumbers(input: string[]): number[] {
  const firstNumberLength = input[0].length;
  if (input.some(s => s.length != firstNumberLength))
    throw Error("Not all strings of same length!");

  let results: number[] = [];
  for (let index = firstNumberLength - 1; index >= 0; --index) {
    let number = '';
    for (const line of input) {
      const char = line.charAt(index);
      if (char == " ") continue;
      number = number + char;
    }
    results.push(Number.parseInt(number, 10));
  }
  return results;
}

if (import.meta.main) {
  const input = readFileSync("./inputs/day06-input.txt").toString();
  let operators: string[] = [];
  let columnDigitCount: number[] = [];
  let operands: string[][];

  for (let line of input.split("\n").toReversed()) {
    if (line.trim() == "") continue;
    if (line.startsWith("*") || line.startsWith("+")) {
      // We can infer the number of digits in each column by the number of spaces between the operators
      let spaceCount = 0;
      for (const char of line.split("")) {
        switch (char) {
          case "+":
          case "*":
            columnDigitCount.push(spaceCount);
            spaceCount = 0;
            operators.push(char);
            break;
          case " ":
            ++spaceCount;
            break;
          default:
            throw Error("Unknown character " + char);
        }
      }
      columnDigitCount.push(spaceCount + 1); // +1 for the operator taking up a column
      columnDigitCount.splice(0, 1);
      operands = operators.map(_ => []);
      continue;
    }
    console.assert(columnDigitCount.length > 0);
    for (const [i, substringLength] of Object.entries(columnDigitCount)) {
      operands[i].push(line.substring(0, substringLength));
      line = line.substring(substringLength + 1);
    }
  }
  operands = operands.map(arr => arr.toReversed());
  const numOperands = operands.map(convertHumanNumbersToCephlapodNumbers);
  const results = numOperands.map((operands2, i) => applyOperatorToOperands(operators[i], operands2));
  console.log("Test operands", numOperands.at(-1));
  console.log("Test result", results.at(-1));
  console.log("Sum of results:", results.reduce((prev, next) => prev + next));
}
