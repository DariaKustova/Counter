import type {ErrorType} from "./Logic";
import "../Counter.css";
import { Button } from "./Button";

type SettingsType = {
  startValue: number;
  maxValue: number;
  setStartValue: (number: number) => void;
  setMaxValue: (number: number) => void;
  setValues: () => void;
  hasError: boolean;
  error: ErrorType;
  resetSettings: () => void;
  isSet: boolean;
};

// сообщение изначальное: enter values and press 'set'
export const Settings = (props: SettingsType) => {
  const {
    startValue,
    maxValue,
    setStartValue,
    setMaxValue,
    setValues,
    hasError,
    error,
    resetSettings,
    isSet,
  } = props;

  // const isMaxError = isSet && (maxValue <= startValue || maxValue < 0) ? 'input-error' : ''
  // const isStartError = isSet && (startValue < 0) ? 'input-error' : ''

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
          onChange={(e) => setMaxValue(Number(e.currentTarget.value))}
        />
      </div>
      <div className="input-group">
        <label>Start value: </label>
        <input
          className={isStartError}
          type="number"
          value={startValue}
          onChange={(e) => {
            setStartValue(Number(e.currentTarget.value));
          }}
        />
      </div>
      <div className="buttons">
        <Button title={"Set"} onClick={setValues} disabled={hasError} />
        <Button
          title={"Reset Settings"}
          onClick={resetSettings}
          disabled={!!isSet && startValue === 0 && maxValue === 0}
        />
      </div>
    </div>
  );
};
