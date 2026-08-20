import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseI,
  increaseI,
  removeFromCart,
} from "../redux/slices/cartSlice";

function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-72 gap-6 text-center">
          <p className="text-2xl font-bold text-pink-700">Your cart is empty</p>
          <Button color="gray" className="px-6 py-3">
            <Typography as={Link} to="/products" className="text-lg">
              Shop
            </Typography>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center max-w-7xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4">
            {cart.map((product) => (
              <li key={product.id} className="flex justify-center">
                <Card className="w-full max-w-xs flex flex-col">
                  <CardHeader floated={false} className="relative h-44">
                    <img
                      src={product.image}
                      alt="card-image"
                      className="w-full h-full object-contain p-2"
                    />
                  </CardHeader>

                  <CardBody className="flex-grow">
                    <Typography
                      className="text-sm text-gray-600 overflow-hidden text-ellipsis"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.title}
                    </Typography>
                  </CardBody>

                  <CardFooter className="pt-0 flex flex-col gap-2">
                    <div className="flex justify-between items-center w-full">
                      <h1 className="text-red-700 font-semibold text-lg">
                        ${(product.price * product.quantity).toFixed(2)}
                      </h1>
                      <Button
                        color="red"
                        size="sm"
                        onClick={() => dispatch(removeFromCart(product.id))}
                      >
                        <FaTrash className="text-sm" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <FaMinus
                        className="text-xl cursor-pointer"
                        onClick={() => dispatch(decreaseI(product.id))}
                      />
                      <Typography variant="h6" color="blue">
                        {product.quantity}
                      </Typography>
                      <FaPlus
                        className="text-xl cursor-pointer"
                        onClick={() => dispatch(increaseI(product.id))}
                      />
                    </div>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-sm w-full max-w-md text-center">
            <h3 className="text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
