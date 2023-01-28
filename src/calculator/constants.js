export const OPERATION_SYMBOLS = {
  PLUS: '+',
  MINUS: '−',
  MULTIPLY: '×',
  DIVIDE: '÷'
}

export const CalculatorOperations = {
  [OPERATION_SYMBOLS.PLUS]: (a, b) => a + b,
  [OPERATION_SYMBOLS.MINUS]: (a, b) => a - b,
  [OPERATION_SYMBOLS.MULTIPLY]: (a, b) => a * b,
  [OPERATION_SYMBOLS.DIVIDE]: (a, b) => a / b,
  [OPERATION_SYMBOLS.MULTIPLY + OPERATION_SYMBOLS.MINUS]: (a, b) => a * -b,
  [OPERATION_SYMBOLS.DIVIDE + OPERATION_SYMBOLS.MINUS]: (a, b) => a / -b,
}

export const NON_PRIORITY_OPERATIONS = [OPERATION_SYMBOLS.MINUS, OPERATION_SYMBOLS.PLUS];

export const PRIORITY_OPERATIONS = Object.keys(CalculatorOperations)
  .filter(key => !NON_PRIORITY_OPERATIONS.includes(key));

export const KeyMap = {
  '/': '÷',
  '*': '×',
  '+': '+',
  '-': '−'
}

export const OPERATOR_REGEX = new RegExp(
  Object.keys(CalculatorOperations)
    .map(symbol => "\\" + symbol)
    .reverse()
    .join("|"), "g"
);

export const INITIAL_STATE = {
  displayString: '0',
}  