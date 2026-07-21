import {configureStore} from "@reduxjs/toolkit";
import {counterReducer} from "../state/counter-reducer";

export const store = configureStore({
  reducer: {
    counterState: counterReducer,
  },
});
