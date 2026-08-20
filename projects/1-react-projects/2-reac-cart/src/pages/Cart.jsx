import { Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseN,
  removeFromCart,
  decreaseN,
  updateTotal,
} from "../../redux/slices/productsSlice";

import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.products);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.14;
  useEffect(() => {
    dispatch(updateTotal());
  }, [cart]);
  return (
    <div className="min-h-screen  bg-gradient-to-r from-gray-900 via-[#241939] to-black  text-white px-4 py-12">
      {cart.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">Shopping Cart</h2>
          <p className="text-white/80 mb-10">
            {cart.length} item{cart.length !== 1 && "s"} in your cart
          </p>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/10 p-4 rounded-xl shadow backdrop-blur-md gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain rounded bg-white p-1"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-white/70 text-sm">
                        Color: {item.color}
                      </p>
                      <p className="font-bold mt-1">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-center sm:justify-end">
                    {item.quantity === 1 ? (
                      <Button
                        disabled
                        onClick={() => dispatch(decreaseN(item))}
                        className="bg-white/10 p-1 rounded hover:bg-white/20 transition"
                      >
                        <FaMinusCircle />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => dispatch(decreaseN(item))}
                        className="bg-white/10 p-1 rounded hover:bg-white/20 transition"
                      >
                        <FaMinusCircle />
                      </Button>
                    )}
                    <span className="text-lg">{item.quantity}</span>
                    <Button
                      onClick={() => dispatch(increaseN(item))}
                      className="bg-white/10 p-1 rounded hover:bg-white/20 transition"
                    >
                      <FaPlusCircle />
                    </Button>
                    <Button
                      onClick={() => dispatch(removeFromCart(item))}
                      className="text-2xl text-red-300 hover:text-red-200 transition"
                    >
                      <TiDelete />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
              <h4 className="text-2xl font-semibold mb-6">Order Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/30 my-4"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition">
                  Proceed to Checkout
                </Button>
                <Link
                  to="/products"
                  className="block w-full border border-white/40 text-white/90 text-center py-2 rounded-lg hover:bg-white/10 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-white px-4 pt-40 ">
          <ShoppingBagIcon className="h-16 w-16 text-gray-400 mb-6" />

          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to get started!</p>

          <Link
            to="/products"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
