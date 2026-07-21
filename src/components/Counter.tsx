import "../Counter.css";
import {Button} from "./Button";
import {type ErrorType, getErrorText} from "./Logic";
import {useSelector, useDispatch} from "react-redux";
import {type RootState} from "../app/types";
import { incrementCounterAC, resetCounterAC } from "../state/counter-actions";

type CounterType = {
  error: ErrorType;
};

export function Counter(props: CounterType) {
  const {error} = props;

  const dispatch = useDispatch();

  const counter = useSelector((state: RootState) => state.counterState.counter);
  const maxValue = useSelector(
    (state: RootState) => state.counterState.maxValue,
  );
  const isSet = useSelector((state: RootState) => state.counterState.isSet);

  const handleIncrement = () => {
    dispatch(incrementCounterAC());
  };
  const handleReset = () => {
    dispatch(resetCounterAC());
  };
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
          title={"Inc"}
          onClick={handleIncrement}
          disabled={!isSet || counter >= maxValue}
        />
        <Button title={"Reset"} onClick={handleReset} disabled={!isSet} />
      </div>
    </div>
  );
}
