import { CalculatorOperations, PRIORITY_OPERATIONS } from "./constants"

export function calculate(arrayOfExpressions) {
  if (arrayOfExpressions.length === 0) {
    return ""
  }
  let result = arrayOfExpressions[0];
  for (let i = 1; i < arrayOfExpressions.length; i += 2) {
    const operation = arrayOfExpressions[i];
    result = CalculatorOperations[operation](result, arrayOfExpressions[i + 1])
  }
  return result;
}

export const findIndexOfPriorityOperator = (array, initialSearchIndex = 0) => {
  return array.findIndex((el, index) => index >= initialSearchIndex && PRIORITY_OPERATIONS.includes(el));
}