import React from "react";
import "./Buttons.css"

const CalculatorButtons = ({
  onClear,
  onClick,
  getFontSize,
  onClickEqual,
  onClickDecimal,
  onClickBackspace,
  onClickPercentage,
  state
 }) => {
  return (
    <>
      <div id="display">
        <span className="history"></span>
        <span className="expressions" style={{ fontSize: getFontSize() }}> {state.displayString}</span>
      </div>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button id="clear" className="function-key" onClick={onClear}>AC</button>
            <button className="function-key" onClick={onClickBackspace} title="Delete one simbol">&lt;</button>
            <button className="function-key" onClick={onClickPercentage}>%</button>
          </div>
          <div className="digit-keys">
            <button id="zero" className="digit-key" onClick={onClick}>0</button>
            <button id="decimal" className="digit-key" onClick={onClickDecimal}>.</button>
            <button id="one" className="digit-key" onClick={onClick}>1</button>
            <button id="two" className="digit-key" onClick={onClick}>2</button>
            <button id="three" className="digit-key" onClick={onClick}>3</button>
            <button id="four" className="digit-key" onClick={onClick}>4</button>
            <button id="five" className="digit-key" onClick={onClick}>5</button>
            <button id="six" className="digit-key" onClick={onClick}>6</button>
            <button id="seven" className="digit-key" onClick={onClick}>7</button>
            <button id="eight" className="digit-key" onClick={onClick}>8</button>
            <button id="nine" className="digit-key" onClick={onClick}>9</button>
          </div>
          <div className="operator-keys">
            <button id="divide" className="operator-key" onClick={onClick}>÷</button>
            <button id="multiply" className="operator-key" onClick={onClick}>×</button>
            <button id="subtract" className="operator-key" onClick={onClick}>−</button>
            <button id="add" className="operator-key" onClick={onClick}>+</button>
            <button id="equals" className="operator-key" onClick={onClickEqual}>=</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CalculatorButtons;