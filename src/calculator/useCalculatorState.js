import { useState, useEffect } from "react";
import { OPERATION_SYMBOLS, CalculatorOperations, NON_PRIORITY_OPERATIONS, KeyMap, OPERATOR_REGEX, INITIAL_STATE } from "./constants";
import { calculate } from "./Calculate";

export const useCalculatorState = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const addToExpression = (textToAdd) => {
    setState(prevState => {
      const functionalKeys = Object.values(OPERATION_SYMBOLS);
      const specialFunctionalKeys = [OPERATION_SYMBOLS.MULTIPLY, OPERATION_SYMBOLS.DIVIDE]
      const prevDispString = prevState.displayString;
      const isInitalState = prevState.displayString === INITIAL_STATE.displayString;

      // if user had clicked any functional key
      if (functionalKeys.includes(textToAdd)) {
        // if last symbol is functional key
        const prevSymbol = prevDispString[prevDispString.length - 1];
        let displayString = ''
        if (!functionalKeys.includes(prevSymbol) || specialFunctionalKeys.includes(prevSymbol) && textToAdd === OPERATION_SYMBOLS.MINUS) {
          displayString = prevDispString + textToAdd
        } else {
          const symbolsToRemove = functionalKeys.includes(prevDispString[prevDispString.length - 2]) ? 2 : 1
          displayString = prevDispString.substring(0, prevDispString.length - symbolsToRemove) + textToAdd
        }
        return {
          ...prevState,
          displayString
        }
      }

      return {
        ...prevState,
        displayString: isInitalState ? textToAdd : prevState.displayString + textToAdd
      }
    })
  }

  const onClick = ({ target: { innerText } }) => {
    addToExpression(innerText);
  }

  const onClear = () => {
    setState(INITIAL_STATE)
  }

  const getFontSize = () => {
    const length = state.displayString.length;
    if (length <= 10) {
      return '38px';
    }
    else if (length > 10 && length <= 13) {
      return '30px';
    }
  }

  const onClickBackspace = () => {
    setState(prevState => {
      const newDisplayString = prevState.displayString?.substring(0, prevState?.displayString.length - 1)
      return {
        ...prevState,
        //set 0 when displayString is empty
        displayString: newDisplayString.length === 0 ? INITIAL_STATE.displayString : newDisplayString
      }
    })
  }

  const onClickDecimal = () => {
    setState(prevState => {
      const arrayOfNumbers = prevState.displayString.split(OPERATOR_REGEX);
      const lastNumber = arrayOfNumbers[arrayOfNumbers.length - 1];
      return {
        ...prevState,
        displayString: lastNumber.includes(".") ? prevState.displayString : prevState.displayString + "."
      }
    })
  }

  const onClickPercentage = () => {
    setState(prevState => {
      const arrayOfNumbers = prevState.displayString.split(OPERATOR_REGEX);
      const currentValue = arrayOfNumbers[arrayOfNumbers.length - 1];
      if (currentValue === 0) {
        return;
      }
      // const fixedDigits = prevState.displayString.replace(/^-?\d*\.?/, '');
      const newValue = currentValue / 100;
      // handle the last one expression
      const lastOperationIndex = prevState.displayString.split("").findLastIndex(s => Object.values(OPERATION_SYMBOLS).includes(s));
      return {
        ...prevState,
        displayString: lastOperationIndex === -1 ? newValue + "" : prevState.displayString.substr(0, lastOperationIndex + 1) + newValue
      }
    })
  }

  const onClickEqual = () => {
    setState(prevState => {
      const arrayOfNumbers = prevState.displayString.split(OPERATOR_REGEX);
      const operations = Array.from(prevState.displayString.matchAll(OPERATOR_REGEX));

      const arrayOfStrings = [+arrayOfNumbers[0]];
      for (let i = 1; i < arrayOfNumbers.length; i++) {
        const operationRegexRes = operations[i - 1];
        const operationKey = operationRegexRes[0];
        arrayOfStrings.push(operationKey, +arrayOfNumbers[i]);
      }

      const withoutPriorityArr = [];

      let res = arrayOfStrings[0];
      if (arrayOfStrings.length <= 3) {
        withoutPriorityArr.push(...arrayOfStrings)
      } else {
        for (let i = 1; i < arrayOfStrings.length; i += 2) {
          const operationKey = arrayOfStrings[i];
          const nextNumber = arrayOfStrings[i + 1]
          if (NON_PRIORITY_OPERATIONS.includes(operationKey)) {
            withoutPriorityArr.push(res, operationKey)
            res = null;
            if (NON_PRIORITY_OPERATIONS.includes(arrayOfStrings[i + 2]) || i + 2 === arrayOfStrings.length) {
              withoutPriorityArr.push(nextNumber);
            } else {
              res = nextNumber;
            }
          } else {
            res = CalculatorOperations[operationKey](res, nextNumber)
            if (arrayOfStrings.length === i + 2) {
              withoutPriorityArr.push(res);
            }
          }
        }
      }

      return {
        ...prevState,
        displayString: "" + calculate(withoutPriorityArr.filter(v => v != null))
      }
    })
  }

  const handleKeydown = (e) => {
    const type = e.key.match(/^[0-9]$/g) ? 'number' : e.key
    switch (type) {
      case 'number':
        addToExpression(e.key);
        return;
      case '/':
      case '*':
      case '+':
      case '-':
        addToExpression(KeyMap[e.key]);
        return;
      case 'Backspace':
        onClickBackspace();
        return;
      case 'Enter':
        onClickEqual();
        return;
      case '.':
        onClickDecimal();
        return;
      case '%':
        onClickPercentage();
        return;
      default:
        return;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    }
  }, [])

  return {
    onClear,
    onClick,
    getFontSize,
    onClickEqual,
    onClickDecimal,
    onClickBackspace,
    onClickPercentage,
    state
  }
}