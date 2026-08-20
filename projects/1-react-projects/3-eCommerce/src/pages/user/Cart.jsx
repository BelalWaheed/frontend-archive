import { Card, Typography, Button } from "@material-tailwind/react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseN,
  decreaseN,
  removeFromCart,
} from "../../redux/userSlices/productSlice";

function Cart() {
  const { cart } = useSelector((state) => state.products);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] text-gray-900 dark:text-white">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-10 text-center pt-serif-bold-italic">
        <span className="text-red-700 dark:text-red-400">🛒</span> Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-72 gap-6 text-center">
          <p className="text-xl sm:text-2xl font-bold text-pink-700 dark:text-pink-300">
            Your cart is empty
          </p>
          <Button color="gray" className="px-6 py-3">
            <Typography as={Link} to="/products" className="text-lg text-white">
              Shop
            </Typography>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex-1 space-y-4 sm:space-y-6">
            {cart.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 gap-4 bg-white dark:bg-[#1e293b] shadow-md"
              >
                <div className="flex items-center gap-4 w-full sm:w-1/2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                  <Typography className="font-semibold text-sm dark:text-white">
                    {product.title}
                  </Typography>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 w-full sm:w-1/2">
                  <Typography className="text-sm font-medium whitespace-nowrap">
                    ${product.price}
                  </Typography>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => dispatch(decreaseN(product))}
                      size="sm"
                      className="bg-blue-gray-100 dark:bg-white/10 p-2 rounded hover:bg-blue-gray-200 dark:hover:bg-white/20"
                    >
                      <FaMinus />
                    </Button>
                    <Typography variant="h6" color="blue">
                      {product.quantity}
                    </Typography>
                    <Button
                      onClick={() => dispatch(increaseN(product))}
                      size="sm"
                      className="bg-blue-gray-100 dark:bg-white/10 p-2 rounded hover:bg-blue-gray-200 dark:hover:bg-white/20"
                    >
                      <FaPlus />
                    </Button>
                  </div>

                  <Typography className="text-red-700 dark:text-red-400 font-semibold whitespace-nowrap">
                    ${(product.price * product.quantity).toFixed(2)}
                  </Typography>

                  <Button
                    color="red"
                    size="sm"
                    onClick={() => dispatch(removeFromCart(product))}
                    className="rounded-full p-2"
                  >
                    <FaTrash className="text-sm" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="w-full lg:w-1/3 bg-white dark:bg-[#1e293b] shadow-md rounded-lg p-4 sm:p-6 h-fit">
            <Typography variant="h5" className="mb-4 font-bold">
              Summary
            </Typography>
            <div className="space-y-3 text-sm text-gray-800 dark:text-gray-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${(total * 0.14).toFixed(2)}</span>
              </div>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${(total + total * 0.14).toFixed(2)}</span>
              </div>
            </div>
            <Button
              color="red"
              className="w-full mt-6 py-3 text-white font-semibold text-sm hover:scale-105 transition"
            >
              CHECKOUT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
