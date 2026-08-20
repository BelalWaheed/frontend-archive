import { ComplexNavbar } from "./components/ComplexNavbar";
import { Route, Routes } from "react-router-dom";
import { ErrorSection7 } from "./pages/ErrorSection7";
import Home from "./pages/Home";
import { Foterr } from "./components/Foterr";
import { use, useEffect, useState } from "react";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./redux/slices/productSlice";
import { initTheme } from "./redux/slices/homeSlices";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(initTheme());
  }, [theme]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data));
      });
  }, []);

  return (
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

        <Route path="/login" element={<Login/>} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/profile" element={<div>Profile Page</div>} />

        <Route path="/orders" element={<div>Orders Page</div>} />

        <Route path="/wishlist" element={<div>Wishlist Page</div>} />

        <Route path="/404" element={<div>404 Not Found Page</div>} />

        <Route path="*" element={<ErrorSection7 />} />
      </Routes>
      <Foterr />
    </div>
  );
}

export default App;
