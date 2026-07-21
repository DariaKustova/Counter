import type {ErrorType} from "./Logic";
import "../Counter.css";
import {Button} from "./Button";
import {useSelector, useDispatch} from "react-redux";
import {type RootState} from "../app/types";
import type {ChangeEvent} from "react";
import {
  changeMaxValueAC,
  changeStartValueAC,
  resetSettingsAC,
  setValuesAC,
} from "../state/counter-actions";

type SettingsType = {
  hasError: boolean;
  error: ErrorType;
};

// сообщение изначальное: enter values and press 'set'
export const Settings = (props: SettingsType) => {
  const {hasError, error} = props;

  const dispatch = useDispatch();

  const startValue = useSelector(
    (state: RootState) => state.counterState.startValue,
  );
  const maxValue = useSelector(
    (state: RootState) => state.counterState.maxValue,
  );

  const isSet = useSelector((state: RootState) => state.counterState.isSet);

  const handleMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMaxValueAC(Number(e.currentTarget.value)));
  };

  const handleStartValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeStartValueAC(Number(e.currentTarget.value)));
  };

  const handleSetValues = () => dispatch(setValuesAC());

  const handleResetSettings = () => {
    dispatch(resetSettingsAC());
    localStorage.removeItem("startValue");
    localStorage.removeItem("maxValue");
  };
  
  const isMaxError =
    error === "RANGE_ERROR" || error === "MAX_ERROR" ? "input-error" : "";
  const isStartError = error === "START_ERROR" ? "input-error" : "";

  return (
    <div className="counter-container">
      <div className="input-group">
        <label>Max value: </label>
        <input
          className={isMaxError}
          type="number"
          value={maxValue}
          onChange={handleMaxValueChange}
        />
      </div>
      <div className="input-group">
        <label>Start value: </label>
        <input
          className={isStartError}
          type="number"
          value={startValue}
          onChange={handleStartValueChange}
        />
      </div>
      <div className="buttons">
        <Button title={"Set"} onClick={handleSetValues} disabled={hasError} />
        <Button
          title={"Reset Settings"}
          onClick={handleResetSettings}
          disabled={!!isSet && startValue === 0 && maxValue === 0}
        />
      </div>
    </div>
  );
};
