import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { items } = useSelector((state) => state.products);

  return (
    <div className="bg-[#0f0f1b] text-white">
      <section className="py-20 flex items-center justify-center bg-gradient-to-r from-gray-900 via-[#1a0f2e] to-black px-4">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-purple-400 drop-shadow">
            Shop with Ease
          </h1>
          <p className="text-lg md:text-2xl text-gray-300">
            Discover amazing products at unbeatable prices
          </p>
          <Link
            to="/products"
            className="inline-block bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
          >
            START SHOPPING
          </Link>
        </div>
      </section>

      <section className="py-16 bg-[#0f0f1b] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-10 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/products`}
                className="group bg-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain bg-white p-2 rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white line-clamp-1">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {product.description}
                </p>
                <p className="mt-2 text-lg font-bold text-purple-500">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
