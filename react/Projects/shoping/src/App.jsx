import React, { useEffect, useState } from "react";
import { NavB } from "./componentes/NavB";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import ErrorSection7 from "./pages/ErrorSection7";
import Cart from "./pages/Cart";

const App = () => {
  const [theme, setTheme] = useState(localStorage.theme || false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const increaseI = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseI = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          if (item.quantity === 1) return item;
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <NavB
        theme={theme}
        setTheme={setTheme}
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        cart={cart}
      />
      <Routes>
        <Route
          path="/"
          element={<Products products={products} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseI={increaseI}
              decreaseI={decreaseI}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="*" element={<ErrorSection7 />} />
      </Routes>
    </div>
  );
};

export default App;
