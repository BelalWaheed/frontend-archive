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
import { addToCart } from "../redux/slices/cartSlice";

function Products() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const starRating = (count) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill={i < count ? "currentColor" : "none"}
        stroke="currentColor"
        className={`size-4 ${i < count ? "text-yellow-500" : "text-gray-300"}`}
      >
        <path
          fillRule="evenodd"
          d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
          clipRule="evenodd"
        />
      </svg>
    ));
  };
  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 p-4 w-full max-w-7xl">
        {products.map((product) => (
          <li key={product.id} className="flex justify-center">
            <Card className="w-full max-w-sm flex flex-col dark:bg-blue-gray-50 dark:text-white  justify-between shadow-md">
              <CardHeader floated={false} className="relative h-56">
                <img
                  src={product.image}
                  alt="card-image"
                  className="w-full h-full object-contain p-2"
                />
              </CardHeader>
              <CardBody>
                <div className="flex gap-1 mb-2">
                  {starRating(Math.floor(product.rating.rate))}
                </div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 line-clamp-2"
                >
                  {product.title}
                </Typography>
                <Typography
                  className="text-sm text-gray-600 overflow-hidden text-ellipsis"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 flex justify-between items-center">
                <h1 className="text-red-700 text-2xl font-semibold">
                  ${product.price}
                </h1>
                <Button
                  onClick={() => dispatch(addToCart(product))}
                  color="gray"
                  size="sm"
                  className="rounded-full"
                >
                  <FaCartPlus className="text-lg" />
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
