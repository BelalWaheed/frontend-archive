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

function Cart({ cart, increaseI, decreaseI, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col  justify-center items-center h-72 gap-7">
          <p className="text-2xl font-bold text-pink-700">Your cart is empty</p>
          <Button color="gray" className="h-16">
            {" "}
            <Typography
              as={Link}
              to="/"
              variant="h6"
              className="mr-4 cursor-pointer py-1.5"
            >
              home
            </Typography>
          </Button>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 m-3 text-center">
            {cart.map((product) => (
              <li key={product.id}>
                <Card className="mt-6 sm:w-72 md:w-60 flex">
                  <CardHeader color="blue-gray" className="relative h-48">
                    <img src={product.thumbnail} alt="card-image" />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {product.title}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <div className="flex justify-between items-center">
                      <h1 className="text-red-700 ">
                        $ {(product.price * product.quantity).toFixed(2)}
                      </h1>
                      <div className="flex items-center gap-2">
                        <FaMinus
                          className="text-xl cursor-pointer"
                          onClick={() => decreaseI(product.id)}
                        />
                        <span>{product.quantity}</span>
                        <FaPlus
                          className="text-xl cursor-pointer"
                          onClick={() => increaseI(product.id)}
                        />
                      </div>
                      <Button
                        color="red"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <FaTrash className="text-sm" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
