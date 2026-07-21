import {createAction} from "@reduxjs/toolkit";

export const incrementCounterAC = createAction("counter/increment");
export const resetCounterAC = createAction("counter/reset");
export const setValuesAC = createAction("counter/setValues");
export const changeStartValueAC = createAction<number>("counter/changeStartValue");
export const changeMaxValueAC = createAction<number>("counter/changeMaxValue");
export const changeThemeAC = createAction<"dark" | "light">("counter/changeTheme");
export const resetSettingsAC = createAction("counter/resetSettings");




