import {createReducer} from "@reduxjs/toolkit";
import { changeMaxValueAC, changeStartValueAC, changeThemeAC, incrementCounterAC, resetCounterAC, resetSettingsAC, setValuesAC } from "./counter-actions";
//state
const initialState = {
  startValue: 0,
  maxValue: 0,
  counter: 0,
  theme: "dark",
  isSet: false,
};

export const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementCounterAC, (state) => {
      state.counter++;
    })
    .addCase(resetCounterAC, (state) => {
      state.counter = state.startValue;
    })
    .addCase(setValuesAC, (state) => {
      state.counter = state.startValue;
      state.isSet = true;
    })
    .addCase(changeStartValueAC, (state, action) => {
      state.startValue = action.payload;
    })
    .addCase(changeMaxValueAC, (state, action) => {
      state.maxValue = action.payload;
    })
    .addCase(changeThemeAC, (state, action) => {
      state.theme = action.payload;
    })
    .addCase(resetSettingsAC, (state) => {
      state.startValue = 0;
      state.maxValue = 0;
      state.counter = 0;
      state.isSet = false;
    });
});
