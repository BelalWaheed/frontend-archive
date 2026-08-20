import { Navbar, Typography } from "@material-tailwind/react";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavList({ theme, setTheme, cart }) {
  const darkMode = () => {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    setTheme(false);
  };
  const lightMode = () => {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    setTheme(true);
  };
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {theme ? (
          <CiDark className="text-2xl cursor-pointer " onClick={darkMode} />
        ) : (
          <MdOutlineLightMode
            className="text-2xl cursor-pointer"
            onClick={lightMode}
          />
        )}
      </Typography>
    </ul>
  );
}

export function NavB({ theme, setTheme, cart }) {
  useEffect(() => {
    if (localStorage.theme == "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, []);

  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl  dark:bg-blue-gray-500 px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex justify-center">
          <Typography
            as={Link}
            to="/"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            products
          </Typography>
        </div>

        <div className=" lg:block">
          <NavList theme={theme} setTheme={setTheme} />
        </div>

        <div className="dropdown dropdown-end">
          <Link to={"/cart"}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
                </svg>
                <span>{cart.length}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}
