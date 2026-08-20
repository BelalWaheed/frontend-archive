import { configureStore } from "@reduxjs/toolkit";
import { products } from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    products,
  },
});
export default store;
