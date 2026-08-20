import { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "../redux/slices/homeSlices";
import { useState } from "react";
export function ComplexNavbar() {
  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <Navbar
      className="mx-auto max-w-screen-xl px-4 py-2 
    rounded-2xl shadow-lg overflow-hidden 
    transition-transform duration-300

    bg-gradient-to-l from-gray-50 to-gray-100 
    dark:bg-gradient-to-l dark:from-[#0f172a] dark:to-[#1e293b] 
"
    >
      <div className="flex items-center justify-between text-blue-gray-900     dark:text-white">
        <Typography
          as={Link}
          to="/"
          className="mr-4 md:text-4xl text-3xl cursor-pointer py-1.5 lg:ml-2 pt-serif-bold-italic"
        >
          Hola fushoin
        </Typography>

        <div className="flex gap-2 underline">
          <Typography
            as={Link}
            to="/"
            className=" cursor-pointer md:text-3xl text-2xl py-1.5 lg:ml-2 pt-serif-regular-italic"
          >
            Home
          </Typography>

          <Typography
            as={Link}
            to="/products "
            className="mr-4 cursor-pointer md:text-3xl text-2xl py-1.5 lg:ml-2 pt-serif-regular-italic"
          >
            Shop
          </Typography>
        </div>
        <div className="hidden gap-2 lg:flex">
          <div className="mr-4 flex items-center ">
            <Typography
              as={Link}
              to="/cart"
              variant="h3"
              className="cursor-pointer py-1.5 pt-serif-regular-italic"
            >
              <FaCartPlus className="text-2xl cursor-pointer" />
            </Typography>
          </div>
          <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              {theme ? (
                <CiDark
                  className="text-2xl   cursor-pointer transition-colors duration-300"
                  onClick={() => dispatch(darkMode())}
                />
              ) : (
                <MdOutlineLightMode
                  className="text-2xl dark:text-white  cursor-pointer transition-colors duration-300 "
                  onClick={() => dispatch(lightMode())}
                />
              )}
            </Typography>
          </ul>

          <Typography
            as={Link}
            to="/login"
            variant="h3"
            className="cursor-pointer py-1.5 pt-serif-regular-italic"
          >
            <Button variant="text" size="sm" className=" bg-teal-200">
              Log In
            </Button>
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="flex  w-full flex-nowrap items-center justify-center gap-2 lg:hidden">
          <div className="mr-4 flex items-center ">
            <Typography
              as={Link}
              to="/cart"
              variant="h3"
              className="cursor-pointer py-1.5 pt-serif-regular-italic"
            >
              <FaCartPlus className="text-2xl text-black  dark:text-white  cursor-pointer" />
            </Typography>
          </div>
          <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              {theme ? (
                <CiDark
                  className="text-2xl cursor-pointer transition-colors duration-300 "
                  onClick={() => dispatch(darkMode())}
                />
              ) : (
                <MdOutlineLightMode
                  className="text-2xl  dark:text-white  cursor-pointer transition-colors duration-300"
                  onClick={() => dispatch(lightMode())}
                />
              )}
            </Typography>
          </ul>
          <Button variant="text" size="sm" className=" bg-teal-200">
            Log In
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
