import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Users/reducer"

const store = configureStore({
  reducer: {
    accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;