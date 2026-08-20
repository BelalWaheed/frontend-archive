import { configureStore } from "@reduxjs/toolkit";
import { products } from "./slices/productSlice";
import { cart } from "./slices/cartSlice";
import { theme } from "./slices/homeSlices";
import { signUser } from "./slices/signUpSlice";
import { loginUser } from "./slices/loginSlice";
import { users } from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    products,
    cart,
    theme,
    loginUser,
    signUser,
    users,
  },
});
export default store;
