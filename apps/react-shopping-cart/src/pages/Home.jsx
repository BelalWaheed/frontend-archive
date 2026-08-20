import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { items } = useSelector((state) => state.products);

  return (
    <div className="text-white">
      <section className="py-20 flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 text-center">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-sky-400">
            Shop with Ease
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            A high-performance reactive e-commerce cart built with React 18, Vite, and Redux Toolkit.
          </p>
          <Link
            to="/products"
            className="inline-block bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3 px-8 rounded-xl shadow-lg transition duration-200"
          >
            Explore Catalog
          </Link>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between"
              >
                <div className="overflow-hidden rounded-xl bg-slate-950 p-4 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-xl font-bold text-sky-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link
                    to="/products"
                    className="text-sm font-semibold text-sky-400 hover:underline"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
