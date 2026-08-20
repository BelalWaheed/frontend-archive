import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const { cart } = useSelector((state) => state.products);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#1e293b] border-b border-[#334155] py-4 px-6 flex justify-between items-center shadow-md">
      <Link to="/" className="text-white text-2xl font-bold tracking-tight flex items-center gap-2">
        <span className="text-sky-400">Cart</span>App
      </Link>

      <nav className="flex items-center gap-6 text-white text-base">
        <Link to="/" className="hover:text-sky-400 transition-colors">
          Home
        </Link>
        <Link to="/products" className="hover:text-sky-400 transition-colors">
          Products
        </Link>

        <Link to="/cart" className="relative p-2 hover:text-sky-400 transition-colors" aria-label="Shopping Cart">
          <ShoppingCartIcon className="h-6 w-6" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-sky-500 text-slate-950 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
              {totalCartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
