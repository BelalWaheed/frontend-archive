import { createContext } from "react";

const Store = createContext({
  count: 0,
  setCount: () => {
    0;
  },
  products: [],
  addToCart: () => {},
  cart: [],
  increaseI: () => {},
  decreaseI: () => {},
  removeFromCart: () => {},

  theme: "",
  setTheme: () => {},
});

export default Store;
