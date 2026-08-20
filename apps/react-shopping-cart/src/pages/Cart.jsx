import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseN,
  removeFromCart,
  decreaseN,
  updateTotal,
} from "../redux/slices/productsSlice";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.products);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.14;

  useEffect(() => {
    dispatch(updateTotal());
  }, [cart, dispatch]);

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white px-4 py-12">
      {cart.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-slate-400 mb-8">
            {cart.length} unique item{cart.length !== 1 && "s"} in your cart
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-lg bg-slate-950 p-2"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-slate-400 text-sm">Color: {item.color}</p>
                      <p className="font-bold text-sky-400 mt-1">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                      <button
                        onClick={() => dispatch(decreaseN(item))}
                        className="text-slate-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <FaMinusCircle />
                      </button>
                      <span className="font-bold px-2">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseN(item))}
                        className="text-slate-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <FaPlusCircle />
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item))}
                      className="text-2xl text-rose-400 hover:text-rose-300"
                      aria-label="Remove product"
                    >
                      <TiDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Estimated Tax (14%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-800 my-4"></div>
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span className="text-sky-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3 rounded-xl transition">
                  Proceed to Checkout
                </button>
                <Link
                  to="/products"
                  className="block w-full border border-slate-700 text-slate-300 text-center py-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-24">
          <ShoppingBagIcon className="h-20 w-20 text-slate-600 mb-4" />
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Your cart is empty</h2>
          <p className="text-slate-400 mb-6">Add products from the catalog to get started</p>
          <Link
            to="/products"
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition"
          >
            Explore Catalog
          </Link>
        </div>
      )}
    </div>
  );
}
