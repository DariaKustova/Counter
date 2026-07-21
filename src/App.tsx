import {useEffect} from "react";
import {Counter} from "./components/Counter";
import {Settings} from "./components/Settings";
import {getError} from "./components/Logic";
import "./App.css";
import "./Counter.css";
import {useSelector, useDispatch} from "react-redux";
import {type RootState} from "./app/types";
import {
  changeMaxValueAC,
  changeStartValueAC,
  changeThemeAC,
  setValuesAC,
} from "./state/counter-actions";
function App() {
  const startValue = useSelector(
    (state: RootState) => state.counterState.startValue,
  );
  const maxValue = useSelector(
    (state: RootState) => state.counterState.maxValue,
  );
  const theme = useSelector((state: RootState) => state.counterState.theme);
  const isSet = useSelector((state: RootState) => state.counterState.isSet);

  const dispatch = useDispatch();

  const error = getError(startValue, maxValue);
  const hasError = error !== null;

  //Enter values and press set
  //загрузка из localstorage
  useEffect(() => {
    const savedStart = localStorage.getItem("startValue");
    const savedMax = localStorage.getItem("maxValue");
    const savedTheme = localStorage.getItem("theme");

    if (savedStart && savedMax) {
      const start = Number(savedStart);
      const max = Number(savedMax);
      dispatch(changeStartValueAC(start));
      dispatch(changeMaxValueAC(max));
      dispatch(setValuesAC());
    }
    if (savedTheme === "light") {
      dispatch(changeThemeAC("light"));
    }
  }, []);

  useEffect(() => {
    if (isSet && !hasError) {
      localStorage.setItem("startValue", startValue.toString());
      localStorage.setItem("maxValue", maxValue.toString());
    }
    localStorage.setItem("theme", theme);
  }, [isSet, hasError, startValue, maxValue, theme]);

  return (
    <div className={`app ${theme}`}>
      <div className="theme-switch">
        <span>Dark</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={theme == "light"}
            onChange={() => {
              dispatch(changeThemeAC(theme === "dark" ? "light" : "dark"));
            }}
          />
          <span className="slider"></span>
        </label>
        <span>Light</span>
      </div>
      <Settings hasError={hasError} error={error} />
      <Counter error={error} />
    </div>
  );
}

export default App;
