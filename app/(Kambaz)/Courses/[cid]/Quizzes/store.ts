import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducer";
import quizzesReducer from "./quizzesReducer";

const store = configureStore({
  reducer: {
    accountReducer,
    quizzesReducer,
  },
});

export default store;
