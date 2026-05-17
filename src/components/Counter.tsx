import "../Counter.css";
import {Button} from "./Button";
import { type ErrorType, getErrorText } from "./Logic";


type CounterType = {
  counter: number;
  maxValue: number;
  error: ErrorType;
  isSet: boolean;
  maxNumber: () => void;
  resetButton: () => void;
};

export function Counter(props: CounterType) {
  const {counter, maxValue, error, isSet, maxNumber, resetButton} = props;

  const hasError = error !== null;

  const display = hasError
    ? getErrorText(error)
    : !isSet
      ? "Enter start and max values, then press Set"
      : counter;
  return (
    <div className="counter-container">
      <div
        className={`display 
            ${hasError ? "error-text" : ""}
            ${!isSet && !hasError ? "display-text" : ""}
            ${isSet && !hasError ? "value" : ""}
                ${isSet && counter >= maxValue && !hasError ? "counter-max" : ""}`}
      >
        {display}
      </div>
      <div className="buttons">
        <Button
          title={"Start"}
          onClick={maxNumber}
          disabled={!isSet || counter >= maxValue}
        />
        <Button title={"Reset"} onClick={resetButton} disabled={!isSet} />
      </div>
    </div>
  );
}
