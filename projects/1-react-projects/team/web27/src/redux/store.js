import { configureStore } from "@reduxjs/toolkit";
import { stock } from "./slices/productSlice";

const store = configureStore({
  reducer: { stock },
});

export default store;
