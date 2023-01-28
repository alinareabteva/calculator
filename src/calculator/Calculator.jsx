import React from "react";
import CalculatorButtons from "../buttons/Buttons";
import { useCalculatorState } from "./useCalculatorState";
import "./Calculator.css"


const Calculator = () => {
  const config = useCalculatorState();

  return (
    <div className="calculator">
      <CalculatorButtons {...config} />
    </div>
  );
}

export default Calculator;
