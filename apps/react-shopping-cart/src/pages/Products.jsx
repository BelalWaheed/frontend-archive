import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/slices/productsSlice";

function Products() {
  const { items } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-100 mb-8">All Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="h-52 bg-slate-950 rounded-xl p-4 flex items-center justify-center mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  {product.description}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-sky-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">
                    {product.count > 0 ? `${product.count} in stock` : "Out of stock"}
                  </span>
                </div>

                <button
                  disabled={product.count <= 0}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold transition ${
                    product.count > 0
                      ? "bg-sky-500 hover:bg-sky-400 text-slate-950"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                  onClick={() => dispatch(addProduct(product))}
                >
                  <FaCartPlus />
                  {product.count > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
