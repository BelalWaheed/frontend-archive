import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaCartPlus } from "react-icons/fa";

function Products({ products, addToCart }) {
  return (
    <div className="flex justify-center">
      <ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 m-3 text-center">
          {products.map((product) => (
            <li key={product.id}>
              <Card className="mt-6 sm:w-72 md:w-60 lg:w-80 2xl:w-96 flex">
                <CardHeader color="blue-gray" className="relative h-56">
                  <img src={product.thumbnail} alt="card-image" />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {product.title}
                  </Typography>
                  <Typography>{product.description}</Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <div className="flex justify-between">
                    <h1 className="text-red-700 text-2xl text-start">
                      $ {product.price}
                    </h1>
                    <Button onClick={() => addToCart(product)}>
                      <FaCartPlus className="text-2xl" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default Products;