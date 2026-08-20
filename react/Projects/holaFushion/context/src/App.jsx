import { ComplexNavbar } from "./components/ComplexNavbar";
import { Route, Routes } from "react-router-dom";
import { ErrorSection7 } from "./pages/ErrorSection7";
import Home from "./pages/Home";
import { Foterr } from "./components/Foterr";
import { useEffect, useState } from "react";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Store from "./context/Store";
function App() {
  const [theme, setTheme] = useState(
    localStorage.theme === "dark" ? false : true
  );

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
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

  const [count, setCount] = useState(0);
  //theme={theme} setTheme={setTheme}
  return (
    <Store.Provider
      value={{
        count,
        setCount,
        products,
        theme,
        setTheme,
        cart,
        addToCart,
        increaseI,
        decreaseI,
        removeFromCart,
      }}
    >
      <div>
        <div
          className="
    transition-transform duration-300

    bg-gradient-to-l from-gray-50 to-gray-100 
    dark:bg-gradient-to-l dark:from-[#0f172a] dark:to-[#1e293b] "
        >
          <ComplexNavbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<div>Checkout Page</div>} />

          <Route path="/login" element={<div>Login Page</div>} />

          <Route path="/register" element={<div>Register Page</div>} />

          <Route path="/profile" element={<div>Profile Page</div>} />

          <Route path="/orders" element={<div>Orders Page</div>} />

          <Route path="/wishlist" element={<div>Wishlist Page</div>} />

          <Route path="/404" element={<div>404 Not Found Page</div>} />

          <Route path="*" element={<ErrorSection7 />} />
        </Routes>
        <Foterr />
      </div>
    </Store.Provider>
  );
}

export default App;
