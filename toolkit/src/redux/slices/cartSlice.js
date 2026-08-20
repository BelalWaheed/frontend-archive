import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState, //
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    increaseI: (state, action) => {
      const productId = action.payload;
      const existingItem = state.cart.find((item) => item.id === productId);
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    },
    decreaseI: (state, action) => {
      const productId = action.payload;

      state.cart = state.cart.map((item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      const productId = state.cart.find((item) => item.id === action.payload);
      if (productId) {
        state.cart = state.cart.filter((item) => item.id !== productId.id);
      }
    },
  },
});

export const { addToCart, increaseI, decreaseI, removeFromCart } =
  cartSlice.actions;
export const cart = cartSlice.reducer;
