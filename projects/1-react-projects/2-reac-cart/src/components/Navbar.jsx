import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const { cart } = useSelector((state) => state.products);

  return (
    <header
      className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-purple-700 shadow-md
     opacity-95 py-4 px-6 flex justify-between items-center"
    >
      <h1 className="text-white text-2xl font-bold">Material Tailwind</h1>

      <nav className="flex items-center gap-6 text-white text-lg relative">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/products" className="hover:underline">
          Products
        </Link>

        <div className="relative">
          <Link to="/cart" className="hover:scale-125 transition-all">
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black  text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow">
              {cart.length}
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
