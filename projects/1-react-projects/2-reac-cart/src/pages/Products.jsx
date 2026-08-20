import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/slices/productsSlice";

function Products() {
  const { items } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a0f2e] to-black text-white">
      <div className="flex justify-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 p-8 w-full max-w-7xl">
          {items.map((product) => (
            <li key={product.id} className="flex justify-center">
              <Card className="w-full max-w-sm bg-black text-white border border-gray-800 shadow-lg">
                <CardHeader
                  floated={false}
                  className="relative h-56 bg-white rounded-md"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h6" className="text-white line-clamp-2">
                    {product.title}
                  </Typography>
                  <Typography className="text-sm text-gray-400 mt-2 line-clamp-2">
                    {product.description}
                  </Typography>
                </CardBody>
                {product.count > 0 ? (
                  <CardFooter className="flex flex-col gap-2">
                    <div className="flex justify-between items-center w-full">
                      <h1 className="text-red-400 text-xl font-semibold">
                        ${product.price}
                      </h1>
                      <span className="text-cyan-400 font-medium">
                        In Stock
                      </span>
                    </div>
                    <Button
                      fullWidth
                      className="flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg"
                      onClick={() => dispatch(addProduct(product))}
                    >
                      <FaCartPlus className="text-lg" />
                      ADD TO CART
                    </Button>
                  </CardFooter>
                ) : (
                  <CardFooter className="flex flex-col gap-2">
                    <div className="flex justify-between items-center w-full">
                      <h1 className="text-red-400 text-xl font-semibold">
                        ${product.price}
                      </h1>
                      <span className="text-red-500 font-medium">
                        Out of Stock
                      </span>
                    </div>
                    <Button
                      fullWidth
                      disabled
                      className="flex items-center justify-center gap-2 bg-purple-700 text-white font-semibold rounded-lg opacity-50 cursor-not-allowed"
                    >
                      <FaCartPlus className="text-lg" />
                      ADD TO CART
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
