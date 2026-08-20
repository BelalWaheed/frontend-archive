import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const logged = true; // Placeholder for authentication state
  const cart = [1, 2]; // Placeholder for cart items

  return (
    <Navbar
      className="bg-havelock-blue-main text-white mx-auto max-w-screen-xl px-4 py-3 rounded-2xl shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <Typography
          as={Link}
          to="/"
          className="text-3xl md:text-4xl font-bold italic font-serif tracking-wide cursor-pointer"
        >
          Hola Watches
        </Typography>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 items-center">
          <Typography
            as={Link}
            to="/"
            className="text-lg hover:text-havelock-blue-100 transition"
          >
            Home
          </Typography>
          <Typography
            as={Link}
            to="/products"
            className="text-lg hover:text-havelock-blue-100 transition"
          >
            Shop
          </Typography>

          <div className="relative">
            <Link
              to={logged ? "/cart" : "/login"}
              className="hover:scale-110 transition-transform"
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-havelock-blue-dark text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-sm">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <IconButton
          variant="text"
          className="lg:hidden text-white"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      {/* Mobile Menu */}
      <Collapse open={openNav}>
        <div className="flex flex-col items-center gap-4 py-4 lg:hidden">
          <Typography
            as={Link}
            to="/"
            className="text-base hover:text-havelock-blue-100 transition"
          >
            Home
          </Typography>
          <Typography
            as={Link}
            to="/products"
            className="text-base hover:text-havelock-blue-100 transition"
          >
            Shop
          </Typography>
          <Link
            to={logged ? "/cart" : "/login"}
            className="hover:scale-110 transition-transform"
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>
        </div>
      </Collapse>
    </Navbar>
  );
}
