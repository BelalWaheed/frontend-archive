import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      name: "Wireless Mouse",
      price: 25.99,
      description: "Ergonomic wireless mouse with adjustable DPI.",
      color: "Black",
      count: 10,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Bluetooth Headphones",
      price: 79.99,
      description: "Over-ear headphones with noise cancellation.",
      color: "Blue",
      count: 8,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Gaming Keyboard",
      price: 49.99,
      description: "Mechanical keyboard with RGB lighting.",
      color: "White",
      count: 12,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      name: "Smartphone Stand",
      price: 9.99,
      description: "Adjustable aluminum stand for smartphones.",
      color: "Silver",
      count: 30,
      image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      name: "USB-C Hub",
      price: 39.99,
      description: "Multiport hub with HDMI, USB, and SD card slots.",
      color: "Gray",
      count: 20,
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: 6,
      name: "Laptop Backpack",
      price: 59.99,
      description: "Water-resistant backpack with padded laptop sleeve.",
      color: "Green",
      count: 15,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80",
    },
  ],
  cart: [],
  total: 0,
};

const productsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    updateTotal: (state) => {
      const subtotal = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const tax = subtotal * 0.14;
      state.total = subtotal + tax;
    },
    addProduct: (state, { payload }) => {
      const productInItems = state.items.find((item) => item.id === payload.id);
      const productInCart = state.cart.find((item) => item.id === payload.id);

      if (productInItems && productInItems.count > 0) {
        productInItems.count -= 1;

        if (productInCart) {
          productInCart.quantity += 1;
        } else {
          state.cart.push({ ...payload, quantity: 1 });
        }
      }
    },
    removeFromCart: (state, { payload }) => {
      const productInCart = state.cart.find((item) => item.id === payload.id);
      const productInItems = state.items.find((item) => item.id === payload.id);
      if (productInCart) {
        productInItems.count += productInCart.quantity;
        state.cart = state.cart.filter((item) => item.id !== payload.id);
      }
    },
    increaseN: (state, { payload }) => {
      const productInCart = state.cart.find((item) => item.id === payload.id);
      const productInItems = state.items.find((item) => item.id === payload.id);
      if (productInCart && productInCart.count > productInCart.quantity) {
        productInCart.quantity += 1;
        productInItems.count -= 1;
      }
    },
    decreaseN: (state, { payload }) => {
      const productInCart = state.cart.find((item) => item.id === payload.id);
      const productInItems = state.items.find((item) => item.id === payload.id);
      if (productInCart && productInCart.quantity > 1) {
        productInCart.quantity -= 1;
        productInItems.count += 1;
      } else if (productInCart && productInCart.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== payload.id);
        productInItems.count += 1;
      }
    },
  },
});

export const products = productsSlice.reducer;
export const { addProduct, increaseN, decreaseN, removeFromCart, updateTotal } = productsSlice.actions;
