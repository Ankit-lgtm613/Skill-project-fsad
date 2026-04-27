import { configureStore } from "@reduxjs/toolkit";
import shareReducer from "./shareSlice";

export const store = configureStore({
  reducer: {
    share: shareReducer,
  },
});

export default store;
